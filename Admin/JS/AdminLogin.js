console.log("AdminLogin.js Connected");

// ---------- simple math captcha ----------
// A global variable keeps the correct answer so validateCaptcha() can check it
let captchaAnswer = 0;

// Called by <body onload="makeCaptcha()"> and by the "New question" button
function makeCaptcha()
{
    let first = Math.floor(Math.random() * 9) + 1;    // random number 1 - 9
    let second = Math.floor(Math.random() * 9) + 1;
    captchaAnswer = first + second;

    document.getElementById("CaptchaQuestion").innerHTML = "What is " + first + " + " + second + " ?";
    document.getElementById("Captcha").value = "";
}

// Admin-only rule: the captcha answer must match
function validateCaptcha()
{
    let value = document.getElementById("Captcha").value.trim();

    if (value === "")
    {
        showError("CaptchaError", "Please answer the security question");
        return false;
    }
    if (Number(value) !== captchaAnswer)
    {
        showError("CaptchaError", "Wrong answer. A new question has been given, please try again");
        makeCaptcha();
        return false;
    }
    clearError("CaptchaError");
    return true;
}

// Called by <form onsubmit="return validateAdminLogin()">
function validateAdminLogin()
{
    let validAdminID = validatePattern("AdminID", "AdminIDError", "Admin ID", /^ADM-[0-9]{4}$/, "ADM-1234");
    let validPassword = validatePassword("Password", "PasswordError");   // must follow the registration rules
    let validCaptcha = validateCaptcha();

    let isValid = validAdminID && validPassword && validCaptcha;

    if (isValid)
    {
        let adminID = document.getElementById("AdminID").value.trim().toUpperCase();
        let message = "Login details for " + adminID + " are valid!";

        if (document.getElementById("Remember").checked)
        {
            message = message + " (Remember me is ON)";
        }
        showResult(true, message);
    }
    else
    {
        showResult(false);
    }

    return false;   // validation-only project: no server yet
}
