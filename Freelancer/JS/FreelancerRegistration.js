function validateRegistration() {
    let name = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let dob = document.getElementById("dob").value;
    let pass = document.getElementById("regPass").value;
    let conf = document.getElementById("confirmPass").value;
    let terms = document.getElementById("terms").checked;

    let isValid = true;

    document.getElementById("nameErr").innerHTML = name === "" ? "Name is required." : "";
    if (name === "") isValid = false;

    document.getElementById("emailErr").innerHTML = email === "" ? "Email is required." : "";
    if (email === "") isValid = false;

    // Simple BD phone verification check (starts with 01 and total 11 digits)
    let phoneRegex = /^01[3-9]\d{8}$/;
    document.getElementById("phoneErr").innerHTML = !phoneRegex.test(phone) ? "Enter valid BD phone (e.g., 01712345678)." : "";
    if (!phoneRegex.test(phone)) isValid = false;

    // 18+ Age Validation logic
    let dobDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    let m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }

    let dobErr = document.getElementById("dobErr");
    if (dob === "") {
        dobErr.innerHTML = "Date of birth is required.";
        isValid = false;
    } else if (age < 18) {
        dobErr.innerHTML = "You must be at least 18 years old.";
        isValid = false;
    } else {
        dobErr.innerHTML = "";
    }

    document.getElementById("passErr").innerHTML = pass.length < 6 ? "Password must be at least 6 characters." : "";
    if (pass.length < 6) isValid = false;

    document.getElementById("confErr").innerHTML = pass !== conf ? "Passwords do not match." : "";
    if (pass !== conf) isValid = false;

    document.getElementById("termsErr").innerHTML = !terms ? "You must accept the terms." : "";
    if (!terms) isValid = false;

    if (!isValid) return false;

    alert("Registration Successful!");
    return true;
}