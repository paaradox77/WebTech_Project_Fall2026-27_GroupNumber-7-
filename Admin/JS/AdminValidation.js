function adminSetError(inputs, errorId, message)
{
    let fields = Array.isArray(inputs) ? inputs : [inputs];
    fields.filter(Boolean).forEach(function (input) {
        input.classList.remove("input-valid");
        input.classList.add("input-invalid");
        input.setAttribute("aria-invalid", "true");
    });
    let error = document.getElementById(errorId);
    if (error) error.textContent = message;
    return false;
}

function adminClearError(inputs, errorId)
{
    let fields = Array.isArray(inputs) ? inputs : [inputs];
    fields.filter(Boolean).forEach(function (input) {
        input.classList.remove("input-invalid");
        input.classList.add("input-valid");
        input.setAttribute("aria-invalid", "false");
    });
    let error = document.getElementById(errorId);
    if (error) error.textContent = "";
}

function adminValidatePattern(inputId, errorId, label, pattern, example)
{
    let input = document.getElementById(inputId);
    let value = input.value.trim();
    if (!validateRequired(value)) return adminSetError(input, errorId, label + " is required.");
    if (!pattern.test(value)) return adminSetError(input, errorId, "Enter " + label + " in the format " + example + ".");
    adminClearError(input, errorId);
    return true;
}

function adminValidateName(inputId, errorId, label)
{
    let input = document.getElementById(inputId);
    let value = input.value.trim();
    if (!validateRequired(value)) return adminSetError(input, errorId, label + " is required.");
    if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(value)) {
        return adminSetError(input, errorId, "Enter a valid " + label.toLowerCase() + " using 2 to 50 characters.");
    }
    adminClearError(input, errorId);
    return true;
}

function adminValidateEmail(inputId, errorId)
{
    let input = document.getElementById(inputId);
    if (!validateRequired(input.value)) return adminSetError(input, errorId, "Email is required.");
    if (!validateEmail(input.value)) return adminSetError(input, errorId, "Enter a valid email address.");
    adminClearError(input, errorId);
    return true;
}

function adminValidatePhone(inputId, errorId)
{
    let input = document.getElementById(inputId);
    if (!validateRequired(input.value)) return adminSetError(input, errorId, "Phone number is required.");
    if (!validatePhone(input.value)) return adminSetError(input, errorId, "Enter a valid Bangladesh mobile number.");
    adminClearError(input, errorId);
    return true;
}

function adminValidateRadio(name, errorId, label)
{
    let inputs = Array.from(document.querySelectorAll('input[type="radio"][name="' + name + '"]'));
    if (!inputs.some(function (input) { return input.checked; })) {
        return adminSetError(inputs, errorId, "Select " + label.toLowerCase() + ".");
    }
    adminClearError(inputs, errorId);
    return true;
}

function adminValidateSelect(inputId, errorId, label)
{
    let input = document.getElementById(inputId);
    if (!validateRequired(input.value)) return adminSetError(input, errorId, "Select " + label.toLowerCase() + ".");
    adminClearError(input, errorId);
    return true;
}

function adminValidateCheckbox(name, errorId, label, minimum)
{
    let inputs = Array.from(document.querySelectorAll('input[type="checkbox"][name="' + name + '"]'));
    let selected = inputs.filter(function (input) { return input.checked; }).length;
    let required = minimum || 1;
    if (selected < required) {
        return adminSetError(inputs, errorId, "Select at least " + required + " " + label.toLowerCase() + (required === 1 ? "." : "s."));
    }
    adminClearError(inputs, errorId);
    return true;
}

function adminValidateUsername(inputId, errorId)
{
    let input = document.getElementById(inputId);
    let value = input.value.trim();
    if (!validateRequired(value)) return adminSetError(input, errorId, "Username is required.");
    if (!/^[A-Za-z0-9_]{4,15}$/.test(value)) {
        return adminSetError(input, errorId, "Use 4 to 15 letters, numbers, or underscores.");
    }
    adminClearError(input, errorId);
    return true;
}

function adminValidatePassword(inputId, errorId)
{
    let input = document.getElementById(inputId);
    if (!validateRequired(input.value)) return adminSetError(input, errorId, "Password is required.");
    if (!validatePassword(input.value)) {
        return adminSetError(input, errorId, "Use at least 8 characters with an uppercase letter, a lowercase letter, and a number.");
    }
    adminClearError(input, errorId);
    return true;
}

function adminValidateConfirmPassword(passwordId, confirmId, errorId)
{
    let password = document.getElementById(passwordId);
    let confirm = document.getElementById(confirmId);
    if (!validateRequired(confirm.value)) return adminSetError(confirm, errorId, "Please confirm your password.");
    if (!validateConfirmPassword(confirm.value, password.value)) {
        return adminSetError(confirm, errorId, "Passwords do not match.");
    }
    adminClearError(confirm, errorId);
    return true;
}

function adminValidateNumber(inputId, errorId, label, minimum, maximum, integerOnly)
{
    let input = document.getElementById(inputId);
    let value = input.value.trim();
    let number = Number(value);
    if (!validateRequired(value)) return adminSetError(input, errorId, label + " is required.");
    if (!validateNumber(value, minimum, maximum) || (integerOnly && !Number.isInteger(number))) {
        return adminSetError(input, errorId, label + " must be " + (integerOnly ? "a whole number" : "a number") + " between " + minimum + " and " + maximum + ".");
    }
    adminClearError(input, errorId);
    return true;
}

function adminValidateDateWindow(inputId, errorId, label, minimumDays, maximumDays)
{
    let input = document.getElementById(inputId);
    let value = input.value;
    if (!validateDate(value)) return adminSetError(input, errorId, "Enter a valid " + label.toLowerCase() + ".");
    let offset = daysBetween(getToday(), value);
    if (offset < minimumDays || offset > maximumDays) {
        return adminSetError(input, errorId, label + " must be between " + minimumDays + " and " + maximumDays + " days from today.");
    }
    adminClearError(input, errorId);
    return true;
}

function adminValidateDateRange(startId, endId, errorId, maximumDays)
{
    let start = document.getElementById(startId).value;
    let endInput = document.getElementById(endId);
    let end = endInput.value;
    if (!validateDateRange(start, end)) return adminSetError(endInput, errorId, "To date must be on or after From date.");
    if (daysBetween(start, end) + 1 > maximumDays) {
        return adminSetError(endInput, errorId, "The selected date range cannot exceed " + maximumDays + " days.");
    }
    adminClearError(endInput, errorId);
    return true;
}

function adminValidateTextLength(inputId, errorId, label, minimum, maximum)
{
    let input = document.getElementById(inputId);
    let value = input.value.trim();
    if (!validateRequired(value)) return adminSetError(input, errorId, label + " is required.");
    if (!validateTextLength(value, minimum, maximum)) {
        return adminSetError(input, errorId, label + " must be between " + minimum + " and " + maximum + " characters.");
    }
    adminClearError(input, errorId);
    return true;
}

function adminShowResult(isValid, message)
{
    let result = document.getElementById("ResultText");
    result.textContent = message;
    result.className = isValid ? "success" : "failed";
}

function adminClearFormErrors()
{
    document.querySelectorAll(".input-valid, .input-invalid").forEach(function (input) {
        input.classList.remove("input-valid", "input-invalid");
        input.removeAttribute("aria-invalid");
    });
    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });
    let result = document.getElementById("ResultText");
    if (result) {
        result.textContent = "";
        result.className = "";
    }
}