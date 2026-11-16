"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("login-form");
    var identifier = document.getElementById("identifier");
    var password = document.getElementById("password");
    var submitButton = document.getElementById("login-submit");
    var lockoutMessage = document.getElementById("lockout-message");
    var result = document.getElementById("result");
    var failedAttempts = 0;
    var lockInterval = null;
    var remembered = localStorage.getItem("sb_remembered_freelancer");

    if (remembered) {
        identifier.value = remembered;
        document.getElementById("remember").checked = true;
    }

    function renderFreelancers() {
        var users = readStorage("sb_freelancers", []);
        document.getElementById("freelancer-list").innerHTML = users.map(function (user) {
            return '<article class="data-card"><h3>' + escapeHTML(user.name) + '</h3>' +
                '<p><strong>ID:</strong> ' + escapeHTML(user.id) + '</p>' +
                '<p>' + escapeHTML(user.title || "Freelancer") + '</p>' +
                '<span class="' + getStatusBadgeClass(user.status || "Active") + '">' + escapeHTML(user.status || "Active") + '</span>' +
                '<br><button class="button button-secondary use-account" type="button" data-id="' + escapeHTML(user.id) + '">Use Account</button></article>';
        }).join("");
    }

    function lockForThirtySeconds() {
        var remaining = 30;
        submitButton.disabled = true;
        lockoutMessage.textContent = "Locked: Try again in " + remaining + "s...";
        lockInterval = window.setInterval(function () {
            remaining -= 1;
            if (remaining <= 0) {
                window.clearInterval(lockInterval);
                lockInterval = null;
                failedAttempts = 0;
                submitButton.disabled = false;
                lockoutMessage.textContent = "";
            } else {
                lockoutMessage.textContent = "Locked: Try again in " + remaining + "s...";
            }
        }, 1000);
    }

    document.getElementById("freelancer-list").addEventListener("click", function (event) {
        var button = event.target.closest(".use-account");
        if (!button) return;
        var user = readStorage("sb_freelancers", []).find(function (item) { return item.id === button.dataset.id; });
        if (!user) return;
        identifier.value = user.id;
        password.value = user.password || "";
        clearError(identifier);
        clearError(password);
    });

    document.getElementById("demo-login").addEventListener("click", function () {
        identifier.value = "rahim@example.com";
        password.value = "Abcdef12";
        document.getElementById("remember").checked = false;
        clearError(identifier);
        clearError(password);
        showToast("Demo login details filled.");
    });

    document.getElementById("failed-login").addEventListener("click", function () {
        identifier.value = "FRE-1001";
        password.value = "WrongPass1";
        form.requestSubmit();
    });

    [identifier, password].forEach(function (input) {
        input.addEventListener("input", function () {
            input.classList.remove("input-invalid", "input-valid");
            var error = input.closest(".form-field").querySelector(".field-error");
            error.textContent = "";
            error.hidden = true;
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (submitButton.disabled) return;
        result.hidden = true;
        var normalizedIdentifier = identifier.value.trim();
        var validIdentifier = validateEmail(normalizedIdentifier) ||
            validateBangladeshID(normalizedIdentifier, "FRE");
        var valid = true;

        if (validIdentifier) clearError(identifier);
        else {
            showError(identifier, "Enter a valid email address or Freelancer ID such as FRE-1001.");
            valid = false;
        }
        if (validatePassword(password.value)) clearError(password);
        else {
            showError(password, "Enter a password with 8+ characters, uppercase, lowercase, and a number.");
            valid = false;
        }
        if (!valid) return;

        var account = readStorage("sb_freelancers", []).find(function (user) {
            return user.id.toLowerCase() === normalizedIdentifier.toLowerCase() ||
                user.email.toLowerCase() === normalizedIdentifier.toLowerCase();
        });
        if (!account || account.password !== password.value) {
            failedAttempts += 1;
            showError(password, "The email / Freelancer ID or password is incorrect.");
            showToast("Login failed. Check your credentials.", "error");
            if (failedAttempts >= 3) lockForThirtySeconds();
            return;
        }

        failedAttempts = 0;
        localStorage.setItem("sb_current_freelancer", account.id);
        if (document.getElementById("remember").checked) {
            localStorage.setItem("sb_remembered_freelancer", account.email);
        } else {
            localStorage.removeItem("sb_remembered_freelancer");
        }
        showSuccess(result, "Welcome back, " + account.name + "! You are signed in as " + account.id + ".");
        showToast("Welcome back, " + account.name + "!");
    });

    renderFreelancers();
});
