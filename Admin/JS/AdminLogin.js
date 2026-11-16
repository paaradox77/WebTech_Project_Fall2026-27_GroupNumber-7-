console.log("AdminLogin.js Connected");

let capthaAnswer = 0;

function makeCaptcha()
{
    let first = Math.floor(Math.random() * 9) + 1;
    let second = Math.floor(Math.random() * 9) +1;

    captchaAnswer = first + second;

    document.getElementById("captchaQuestion").innerHTML ="What is" + first + " + " + second + " ?";
    document.getElementById("Captcha").value = "";
}


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

    return false;  
}
