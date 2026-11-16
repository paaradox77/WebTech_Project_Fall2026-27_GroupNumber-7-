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

