"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("service-form");
    var titleInput = document.getElementById("service-title");
    var descriptionInput = document.getElementById("description");
    var thumbnailInput = document.getElementById("thumbnail");
    var priceInput = document.getElementById("price");
    var result = document.getElementById("result");
    var titleCount = document.getElementById("title-count");
    var descriptionCount = document.getElementById("description-count");

    function renderServices() {
        var services = readStorage("sb_services", []);
        var container = document.getElementById("service-list");
        if (!services.length) {
            container.innerHTML = '<p class="empty-state">No services published yet. Your new gigs will appear here.</p>';
            return;
        }
        container.innerHTML = services.map(function (service) {
            return '<article class="data-card"><h3>' + escapeHTML(service.title) + '</h3>' +
                '<p><strong>' + escapeHTML(service.id) + '</strong> · ' + escapeHTML(service.category) + '</p>' +
                '<p><strong>Price:</strong> BDT ' + Number(service.price).toLocaleString("en-BD") +
                ' · <strong>Delivery:</strong> ' + escapeHTML(service.deliveryDays) + ' days</p>' +
                '<p><strong>Freelancer:</strong> ' + escapeHTML(service.freelancerId || "FRE-1001") + '</p>' +
                '<span class="' + getStatusBadgeClass(service.status || "Published") + '">' + escapeHTML(service.status || "Published") + '</span>' +
                '<br><button class="button button-danger delete-service" type="button" data-id="' + escapeHTML(service.id) + '">Delete</button></article>';
        }).join("");
    }

    function updateCounters() {
        showCharCount(titleInput, titleCount, 11, 99);
        showCharCount(descriptionInput, descriptionCount, 100);
    }
    titleInput.addEventListener("input", updateCounters);
    descriptionInput.addEventListener("input", updateCounters);
    updateCounters();

    document.getElementById("fill-sample").addEventListener("click", function () {
        titleInput.value = "Responsive e-commerce website design";
        document.getElementById("category").value = "Web Development";
        descriptionInput.value = "I will build a fast, mobile-friendly e-commerce website for your Bangladesh business. The service includes a polished home page, product listings, responsive layouts, and clear calls to action tailored to your customers.";
        document.getElementById("price").value = "8500";
        document.getElementById("delivery-days").value = "7";
        document.getElementById("revisions").value = "3";
        form.querySelectorAll('input[name="skills"]').forEach(function (input) {
            input.checked = ["HTML/CSS", "JavaScript"].indexOf(input.value) !== -1;
        });
        updateCounters();
        showToast("Sample gig details filled. Add a thumbnail if you want.");
    });

    document.getElementById("service-list").addEventListener("click", function (event) {
        var button = event.target.closest(".delete-service");
        if (!button || !confirmAction("Delete this published service?")) return;
        var services = readStorage("sb_services", []).filter(function (service) { return service.id !== button.dataset.id; });
        if (writeStorage("sb_services", services)) {
            renderServices();
            showToast("Service deleted.");
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        result.hidden = true;
        var category = document.getElementById("category");
        var delivery = document.getElementById("delivery-days");
        var revisions = document.getElementById("revisions");
        var selectedSkills = Array.from(form.querySelectorAll('input[name="skills"]:checked')).map(function (input) { return input.value; });
        var valid = true;

        if (validateTextLength(titleInput.value, 11, 99)) clearError(titleInput);
        else { showError(titleInput, "Service title must contain 11–99 characters."); valid = false; }
        if (validateSelect(category.value)) clearError(category);
        else { showError(category, "Choose a service category."); valid = false; }
        if (validateTextLength(descriptionInput.value, 100)) clearError(descriptionInput);
        else { showError(descriptionInput, "Describe your service in at least 100 characters."); valid = false; }
        if (thumbnailInput.files.length && !validateFile(thumbnailInput.files[0], [".jpg", ".jpeg", ".png", ".webp"], 5 * 1024 * 1024)) {
            showError(thumbnailInput, "Choose a JPG, JPEG, PNG, or WebP image no larger than 5 MB.");
            valid = false;
        } else if (thumbnailInput.files.length) clearError(thumbnailInput);
        else clearError(thumbnailInput);

        var firstSkill = form.querySelector('input[name="skills"]');
        if (selectedSkills.length) clearError(firstSkill);
        else { showError(firstSkill, "Select at least one skill for this service."); valid = false; }
        if (validateNumber(priceInput.value, Number.MIN_VALUE)) clearError(priceInput);
        else { showError(priceInput, "Enter a starting price greater than BDT 0."); valid = false; }
        if (validateRange(delivery.value, 1, 60)) clearError(delivery);
        else { showError(delivery, "Delivery time must be a whole number from 1 to 60 days."); valid = false; }
        if (validateSelect(revisions.value)) clearError(revisions);
        else { showError(revisions, "Choose a revision limit."); valid = false; }
        if (!valid) return;

        var services = readStorage("sb_services", []);
        var nextNumber = services.reduce(function (highest, service) {
            var match = /^SRV-(\d+)$/i.exec(service.id || "");
            return match ? Math.max(highest, Number(match[1])) : highest;
        }, 1000) + 1;
        var service = {
            id: "SRV-" + String(nextNumber).padStart(4, "0"),
            freelancerId: localStorage.getItem("sb_current_freelancer") || "FRE-1001",
            title: titleInput.value.trim(),
            category: category.value,
            description: descriptionInput.value.trim(),
            thumbnailName: thumbnailInput.files[0] ? thumbnailInput.files[0].name : "",
            skills: selectedSkills,
            price: Number(priceInput.value),
            deliveryDays: Number(delivery.value),
            revisions: revisions.value,
            status: "Published"
        };
        services.unshift(service);
        if (!writeStorage("sb_services", services)) return;
        renderServices();
        showSuccess(result, "Service " + service.id + " was published for BDT " + service.price.toLocaleString("en-BD") + ".");
        showToast("Your service has been published.");
        form.reset();
        updateCounters();
    });

    renderServices();
});
