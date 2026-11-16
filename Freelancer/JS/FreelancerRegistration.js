"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("registration-form");
    var nameInput = document.getElementById("full-name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var dobInput = document.getElementById("date-of-birth");
    var titleInput = document.getElementById("title");
    var passwordInput = document.getElementById("password");
    var confirmInput = document.getElementById("confirm-password");
    var termsInput = document.getElementById("terms");
    var result = document.getElementById("result");

    dobInput.max = getToday();

    function renderFreelancers() {
        var users = readStorage("sb_freelancers", []);
        document.getElementById("registered-list").innerHTML = users.map(function (user) {
            return "<tr><td>" + escapeHTML(user.id) + "</td><td>" + escapeHTML(user.name) +
                "</td><td>" + escapeHTML(user.title || "Freelancer") + '</td><td><span class="' +
                getStatusBadgeClass(user.status || "Active") + '">' + escapeHTML(user.status || "Active") +
                "</span></td></tr>";
        }).join("");
    }

    document.getElementById("fill-sample").addEventListener("click", function () {
        nameInput.value = "Samira Akter";
        emailInput.value = "samira.akter@example.com";
        phoneInput.value = "01912345678";
        var birth = new Date();
        birth.setFullYear(birth.getFullYear() - 24);
        var localBirth = new Date(birth.getTime() - birth.getTimezoneOffset() * 60000);
        dobInput.value = localBirth.toISOString().slice(0, 10);
        titleInput.value = "Full-Stack Web Developer";
        passwordInput.value = "SkillBridge12";
        confirmInput.value = "SkillBridge12";
        termsInput.checked = true;
        form.querySelectorAll("input").forEach(function (input) {
            if (input.type !== "checkbox") clearError(input);
        });
        showToast("Sample freelancer details filled.");
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        result.hidden = true;
        var users = readStorage("sb_freelancers", []);
        var nameValid = validateTextLength(nameInput.value, 3, 60);
        var emailValid = validateEmail(emailInput.value);
        var emailUnique = !users.some(function (user) {
            return user.email.toLowerCase() === emailInput.value.trim().toLowerCase();
        });
        var phoneValid = validatePhone(phoneInput.value);
        var dobValid = validateDate(dobInput.value) && dobInput.value <= getToday();
        var adult = false;
        if (dobValid) {
            var birthDate = new Date(dobInput.value + "T00:00:00");
            var today = new Date(getToday() + "T00:00:00");
            var age = today.getFullYear() - birthDate.getFullYear();
            var birthdayNotReached = today.getMonth() < birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
            adult = age - (birthdayNotReached ? 1 : 0) >= 18;
        }
        var titleValid = validateRequired(titleInput.value) && validateTextLength(titleInput.value, 1, 80);
        var passwordValid = validatePassword(passwordInput.value);
        var confirmValid = validateConfirmPassword(confirmInput.value, passwordInput.value);
        var termsValid = validateCheckbox(termsInput);
        var valid = true;

        if (nameValid) clearError(nameInput); else { showError(nameInput, "Enter a name between 3 and 60 characters."); valid = false; }
        if (!emailValid) { showError(emailInput, "Enter a valid email address."); valid = false; }
        else if (!emailUnique) { showError(emailInput, "An account with this email already exists."); valid = false; }
        else clearError(emailInput);
        if (phoneValid) clearError(phoneInput); else { showError(phoneInput, "Enter a valid Bangladesh number, such as 01712345678."); valid = false; }
        if (!dobValid) { showError(dobInput, "Enter a valid date of birth that is not in the future."); valid = false; }
        else if (!adult) { showError(dobInput, "You must be at least 18 years old to register."); valid = false; }
        else clearError(dobInput);
        if (titleValid) clearError(titleInput);         else { showError(titleInput, "Enter a professional title of 1–80 characters."); valid = false; }
        if (passwordValid) clearError(passwordInput); else { showError(passwordInput, "Use at least 8 characters with uppercase, lowercase, and a number."); valid = false; }
        if (confirmValid) clearError(confirmInput); else { showError(confirmInput, "The passwords do not match."); valid = false; }
        if (termsValid) clearError(termsInput); else { showError(termsInput, "Accept the terms and conditions to continue."); valid = false; }
        if (!valid) return;

        var nextId = users.reduce(function (highest, user) {
            var match = /^FRE-(\d+)$/i.exec(user.id || "");
            return match ? Math.max(highest, Number(match[1])) : highest;
        }, 1000) + 1;
        var freelancer = {
            id: "FRE-" + String(nextId).padStart(4, "0"),
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            dateOfBirth: dobInput.value,
            title: titleInput.value.trim(),
            password: passwordInput.value,
            status: "Active"
        };
        users.push(freelancer);
        if (!writeStorage("sb_freelancers", users)) return;
        localStorage.setItem("sb_current_freelancer", freelancer.id);
        renderFreelancers();
        showSuccess(result, "Account created successfully. Your Freelancer ID is " + freelancer.id + ".");
        showToast("Welcome to SkillBridge BD, " + freelancer.name + "!");
        form.reset();
    });

    renderFreelancers();
});
