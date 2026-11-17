let captchaAnswer = 0;

function makeCaptcha()
{
    let first = Math.floor(Math.random() * 9) + 1;
    let second = Math.floor(Math.random() * 9) + 1;
    captchaAnswer = first + second;

    document.getElementById("CaptchaQuestion").textContent = "What is " + first + " + " + second + "?";
    document.getElementById("Captcha").value = "";
    clearError(document.getElementById("Captcha"));
}

function validateAdminID()
{
    let input = document.getElementById("AdminID");
    let value = input.value.trim();

    if (!validateRequired(value))
    {
        showError(input, "Please enter your Admin ID.");
        return false;
    }
    if (!/^ADM-\d{4}$/i.test(value))
    {
        showError(input, "Enter an Admin ID in the format ADM-1234.");
        return false;
    }

    clearError(input);
    return true;
}

function validateAdminPassword()
{
    let input = document.getElementById("Password");
    let value = input.value;

    if (!validateRequired(value))
    {
        showError(input, "Please enter your password.");
        return false;
    }
    if (!validatePassword(value))
    {
        showError(input, "Use at least 8 characters with an uppercase letter, a lowercase letter, and a number.");
        return false;
    }

    clearError(input);
    return true;
}

function validateCaptcha()
{
    let input = document.getElementById("Captcha");
    let value = input.value.trim();

    if (!validateRequired(value))
    {
        showError(input, "Please answer the security question.");
        return false;
    }
    if (!/^\d+$/.test(value) || Number(value) !== captchaAnswer)
    {
        makeCaptcha();
        showError(input, "Incorrect answer. A new question has been generated.");
        return false;
    }

    clearError(input);
    return true;
}

function showLoginResult(isValid, message)
{
    let result = document.getElementById("ResultText");
    result.textContent = message;
    result.className = isValid ? "success" : "failed";
}

function validateAdminLogin()
{
    let validAdminID = validateAdminID();
    let validPassword = validateAdminPassword();
    let validCaptcha = validateCaptcha();
    let isValid = validAdminID && validPassword && validCaptcha;

    if (isValid)
    {
        let adminID = document.getElementById("AdminID").value.trim().toUpperCase();
        let message = "Login details for " + adminID + " passed validation.";

        if (document.getElementById("Remember").checked)
        {
            message += " Remember me is on.";
        }
        showLoginResult(true, message);
    }
    else
    {
        showLoginResult(false, "Please correct the highlighted fields.");
    }

    return false;
}

function clearLoginErrors()
{
    ["AdminID", "Password", "Captcha"].forEach(function (id) {
        let input = document.getElementById(id);
        input.classList.remove("input-valid", "input-invalid");
        input.removeAttribute("aria-invalid");
        let error = input.parentElement.querySelector(".error");
        if (error) error.textContent = "";
    });
    let result = document.getElementById("ResultText");
    result.textContent = "";
    result.className = "";
}
