"use strict";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-role]").forEach(function (button) {
        button.addEventListener("click", function () {
            var role = button.dataset.role;
            var destinations = {
                freelancer: "Freelancer/FreelancerLogin.html",
                client: "Client/ClientLogin.html",
                admin: "Admin/AdminLogin.html"
            };
            if (destinations[role]) {
                window.location.href = destinations[role];
                return;
            }
            showToast(role.charAt(0).toUpperCase() + role.slice(1) + " pages are not available in this project module.", "error");
        });
    });
});