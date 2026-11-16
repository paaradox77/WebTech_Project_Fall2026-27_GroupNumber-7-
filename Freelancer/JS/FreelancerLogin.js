let failedAttempts = 0;
let isLocked = false;

function togglePassword() {
    let passField = document.getElementById("password");
    if (passField.type === "password") {
        passField.type = "text";
    } else {
        passField.type = "password";
    }
}

function validateLogin() {
    if (isLocked) return false;

    let identifier = document.getElementById("identifier").value;
    let password = document.getElementById("password").value;
    let idError = document.getElementById("identifierError");
    let passError = document.getElementById("passwordError");
    let lockoutMsg = document.getElementById("lockoutMsg");

    idError.innerHTML = "";
    passError.innerHTML = "";

    let isValid = true;

    if (identifier === "") {
        idError.innerHTML = "Email or ID is required.";
        isValid = false;
    }
    if (password === "") {
        passError.innerHTML = "Password is required.";
        isValid = false;
    }

    if (!isValid) return false;

    // Hardcoded check for demonstration (user@gmail.com / 12345678)
    if (identifier === "user@gmail.com" && password === "12345678") {
        alert("Login Successful!");
        return true;
    } else {
        failedAttempts++;
        if (failedAttempts >= 3) {
            isLocked = true;
            document.getElementById("submitBtn").disabled = true;
            let countdown = 30;
            lockoutMsg.innerHTML = `Too many failed attempts. Locked for ${countdown} seconds.`;
            
            let timer = setInterval(function() {
                countdown--;
                lockoutMsg.innerHTML = `Too many failed attempts. Locked for ${countdown} seconds.`;
                if (countdown <= 0) {
                    clearInterval(timer);
                    isLocked = false;
                    failedAttempts = 0;
                    document.getElementById("submitBtn").disabled = false;
                    lockoutMsg.innerHTML = "";
                }
            }, 1000);
        } else {
            passError.innerHTML = `Invalid credentials. Attempt ${failedAttempts} of 3.`;
        }
        return false;
    }
}