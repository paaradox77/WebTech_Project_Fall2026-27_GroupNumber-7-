"use strict";

// This page reuses validation and LocalStorage helpers from JS/Common.js.
// Demo passwords are checked but are NEVER saved in LocalStorage.

var registrationForm = document.getElementById("registrationForm");
var fullNameInput = document.getElementById("fullName");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var companyNameInput = document.getElementById("companyName");
var passwordInput = document.getElementById("password");
var confirmPasswordInput = document.getElementById("confirmPassword");
var showPasswordsCheckbox = document.getElementById("showPasswords");
var registrationResult = document.getElementById("registrationResult");

function validateField(input) {
    var value = input.value.trim();
    var error = "";

    if (input.id === "fullName") {
        if (!validateRequired(value)) error = "Please enter your full name.";
        else if (!validateTextLength(value, 2, 80)) error = "Name must be 2 to 80 characters.";
    } else if (input.id === "email") {
        if (!validateRequired(value)) error = "Please enter your email.";
        else if (!validateEmail(value)) error = "Enter a valid email address.";
        else {
            var clients = readStorage("sb_clients", []);
            if (!Array.isArray(clients)) clients = [];
            var duplicate = clients.some(function (client) {
                return String(client.email || "").toLowerCase() === value.toLowerCase();
            });
            if (duplicate) error = "This email is already registered.";
        }
    } else if (input.id === "phone") {
        if (!validateRequired(value)) error = "Please enter your mobile number.";
        else if (!validatePhone(value)) error = "Enter a valid Bangladesh mobile number.";
    } else if (input.id === "companyName") {
        if (value && !validateTextLength(value, 1, 100)) error = "Company name cannot exceed 100 characters.";
    } else if (input.id === "password") {
        if (!validateRequired(input.value)) error = "Please enter a demo password.";
        else if (!validatePassword(input.value)) error = "Use 8+ characters with uppercase, lowercase and a number.";
    } else if (input.id === "confirmPassword") {
        if (!validateRequired(input.value)) error = "Please confirm your demo password.";
        else if (!validateConfirmPassword(input.value, passwordInput.value)) error = "Passwords do not match.";
    }

    if (error) return showError(input, error);
    clearError(input);
    return true;
}

var fields = [fullNameInput, emailInput, phoneInput, companyNameInput, passwordInput, confirmPasswordInput];

fields.forEach(function (input) {
    input.addEventListener("blur", function () {
        validateField(input);
    });
    input.addEventListener("input", function () {
        if (input.classList.contains("input-invalid")) validateField(input);
        if (input === passwordInput && confirmPasswordInput.value) {
            validateField(confirmPasswordInput);
        }
    });
});

showPasswordsCheckbox.addEventListener("change", function () {
    passwordInput.type = showPasswordsCheckbox.checked ? "text" : "password";
    confirmPasswordInput.type = showPasswordsCheckbox.checked ? "text" : "password";
});

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    registrationResult.hidden = true;

    var formIsValid = true;
    fields.forEach(function (input) {
        if (!validateField(input)) formIsValid = false;
    });

    if (!formIsValid) {
        showToast("Please fix the highlighted fields.", "error");
        var firstInvalid = registrationForm.querySelector(".input-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    var clients = readStorage("sb_clients", []);
    if (!Array.isArray(clients)) clients = [];

    // Check again immediately before saving to avoid duplicate email submissions.
    var email = emailInput.value.trim().toLowerCase();
    var alreadyExists = clients.some(function (client) {
        return String(client.email || "").toLowerCase() === email;
    });
    if (alreadyExists) {
        showError(emailInput, "This email is already registered.");
        emailInput.focus();
        return;
    }

    var client = {
        id: "CLI-" + String(Date.now()),
        name: fullNameInput.value.trim(),
        email: email,
        phone: phoneInput.value.trim(),
        companyName: companyNameInput.value.trim(),
        role: "Client",
        status: "Active",
        createdAt: new Date().toISOString()
    };

    clients.push(client);
    if (!writeStorage("sb_clients", clients)) return;

    registrationForm.reset();
    fields.forEach(function (input) {
        input.classList.remove("input-valid", "input-invalid");
        input.removeAttribute("aria-invalid");
        var error = input.closest(".form-field").querySelector(".field-error");
        if (error) { error.textContent = ""; error.hidden = true; }
    });
    passwordInput.type = "password";
    confirmPasswordInput.type = "password";

    showSuccess(registrationResult, "Client registration successful! Your demo profile was saved. You may now open Client Login.");
    showToast("Client account created successfully!", "success");
});

registrationForm.addEventListener("reset", function () {
    registrationResult.hidden = true;
    fields.forEach(function (input) {
        input.classList.remove("input-valid", "input-invalid");
        input.removeAttribute("aria-invalid");
        var error = input.closest(".form-field").querySelector(".field-error");
        if (error) { error.textContent = ""; error.hidden = true; }
    });
    passwordInput.type = "password";
    confirmPasswordInput.type = "password";
});
