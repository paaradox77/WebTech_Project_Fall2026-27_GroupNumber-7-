"use strict";

// This page demonstrates login form validation, attempt counting, DOM updates,
// and a browser-only session. It does NOT perform real authentication.
// Phase 1 never stores registration passwords. Use this public classroom demo code instead.
var DEMO_LOGIN_CODE = "ClientDemo12";
var MAX_FAILED_ATTEMPTS = 3;
var LOCK_SECONDS = 30;
var SESSION_KEY = "sb_client_session";
var ATTEMPTS_KEY = "sb_client_login_attempts";

var loginForm = document.getElementById("loginForm");
var identifierInput = document.getElementById("identifier");
var loginCodeInput = document.getElementById("loginCode");
var showLoginCodeCheckbox = document.getElementById("showLoginCode");
var rememberMeCheckbox = document.getElementById("rememberMe");
var loginButton = document.getElementById("loginButton");
var loginResult = document.getElementById("loginResult");
var attemptMessage = document.getElementById("attemptMessage");
var sessionPanel = document.getElementById("sessionPanel");
var welcomeMessage = document.getElementById("welcomeMessage");
var logoutButton = document.getElementById("logoutButton");

var failedAttempts = Number(sessionStorage.getItem(ATTEMPTS_KEY)) || 0;
var lockUntil = Number(sessionStorage.getItem("sb_client_lock_until")) || 0;
var countdownTimer = null;

function normalizedPhone(value) {
    var phone = String(value || "").trim();
    return phone.indexOf("+88") === 0 ? phone.slice(3) :
        (phone.indexOf("88") === 0 ? phone.slice(2) : phone);
}

function clearLoginFeedback() {
    [identifierInput, loginCodeInput].forEach(function (input) {
        input.classList.remove("input-valid", "input-invalid");
        input.removeAttribute("aria-invalid");
        var error = input.closest(".form-field").querySelector(".field-error");
        if (error) { error.textContent = ""; error.hidden = true; }
    });
    loginResult.hidden = true;
}

function validateLoginForm() {
    var identifier = identifierInput.value.trim();
    var valid = true;
    if (!validateRequired(identifier)) {
        showError(identifierInput, "Please enter your email or mobile number.");
        valid = false;
    } else if (!validateEmail(identifier) && !validatePhone(identifier)) {
        showError(identifierInput, "Enter a valid email or Bangladesh mobile number.");
        valid = false;
    } else {
        clearError(identifierInput);
    }

    if (!validateRequired(loginCodeInput.value)) {
        showError(loginCodeInput, "Please enter the demo login code.");
        valid = false;
    } else {
        clearError(loginCodeInput);
    }
    return valid;
}

function findClient(identifier) {
    var clients = readStorage("sb_clients", []);
    if (!Array.isArray(clients)) return null;
    var lowercaseIdentifier = identifier.toLowerCase();
    var phoneIdentifier = normalizedPhone(identifier);
    for (var index = 0; index < clients.length; index += 1) {
        var client = clients[index];
        if (String(client.email || "").toLowerCase() === lowercaseIdentifier ||
            normalizedPhone(client.phone) === phoneIdentifier) {
            return client;
        }
    }
    return null;
}

function getDemoSession() {
    var saved = readStorage(SESSION_KEY, null);
    if (!saved) {
        try { saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); }
        catch (error) { saved = null; }
    }
    return saved;
}

function displaySession() {
    var saved = getDemoSession();
    var clients = readStorage("sb_clients", []);
    var client = Array.isArray(clients) && saved
        ? clients.find(function (item) { return item.id === saved.clientId; }) : null;
    if (!client) {
        sessionPanel.hidden = true;
        return;
    }
    welcomeMessage.textContent = "Welcome, " + client.name + "! You are signed in for this classroom demo.";
    sessionPanel.hidden = false;
}

function updateAttemptMessage() {
    if (Date.now() < lockUntil) {
        var remaining = Math.ceil((lockUntil - Date.now()) / 1000);
        loginButton.disabled = true;
        attemptMessage.textContent = "Too many failed attempts. Try again in " + remaining + " seconds.";
        return;
    }
    if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
    lockUntil = 0;
    sessionStorage.removeItem("sb_client_lock_until");
    loginButton.disabled = false;
    attemptMessage.textContent = failedAttempts > 0
        ? "Failed attempts: " + failedAttempts + " of " + MAX_FAILED_ATTEMPTS + "."
        : "";
}

function registerFailedAttempt() {
    failedAttempts += 1;
    sessionStorage.setItem(ATTEMPTS_KEY, String(failedAttempts));
    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
        lockUntil = Date.now() + LOCK_SECONDS * 1000;
        sessionStorage.setItem("sb_client_lock_until", String(lockUntil));
        failedAttempts = 0;
        sessionStorage.setItem(ATTEMPTS_KEY, "0");
        countdownTimer = setInterval(updateAttemptMessage, 1000);
    }
    updateAttemptMessage();
}

showLoginCodeCheckbox.addEventListener("change", function () {
    loginCodeInput.type = showLoginCodeCheckbox.checked ? "text" : "password";
});

[identifierInput, loginCodeInput].forEach(function (input) {
    input.addEventListener("input", function () {
        if (input.classList.contains("input-invalid")) {
            if (input === identifierInput &&
                (validateEmail(input.value.trim()) || validatePhone(input.value.trim()))) clearError(input);
            if (input === loginCodeInput && validateRequired(input.value)) clearError(input);
        }
        loginResult.hidden = true;
    });
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    loginResult.hidden = true;
    if (Date.now() < lockUntil) { updateAttemptMessage(); return; }
    if (!validateLoginForm()) {
        showToast("Please correct the highlighted fields.", "error");
        return;
    }

    var client = findClient(identifierInput.value.trim());
    if (!client || client.status === "Suspended" || loginCodeInput.value !== DEMO_LOGIN_CODE) {
        registerFailedAttempt();
        showError(loginCodeInput, "Demo login failed. Check your account and demo code.");
        showToast("Invalid demo login details.", "error");
        return;
    }

    failedAttempts = 0;
    sessionStorage.removeItem(ATTEMPTS_KEY);
    updateAttemptMessage();
    var session = { clientId: client.id, role: "Client", signedInAt: new Date().toISOString() };
    // Store only a minimal demonstration session, never passwords or card details.
    if (rememberMeCheckbox.checked) {
        if (!writeStorage(SESSION_KEY, session)) return;
        sessionStorage.removeItem(SESSION_KEY);
    } else {
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    clearError(loginCodeInput);
    loginCodeInput.value = "";
    showSuccess(loginResult, "Login successful! Welcome, " + client.name + ".");
    showToast("Demo login successful!", "success");
    displaySession();
});

loginForm.addEventListener("reset", function () {
    clearLoginFeedback();
    loginCodeInput.type = "password";
});

logoutButton.addEventListener("click", function () {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    sessionPanel.hidden = true;
    loginForm.reset();
    showSuccess(loginResult, "You have logged out of the classroom demo.");
    showToast("Logged out successfully!", "success");
});

updateAttemptMessage();
if (lockUntil > Date.now()) countdownTimer = setInterval(updateAttemptMessage, 1000);
displaySession();
