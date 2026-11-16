"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("filter-form");
    var minInput = document.getElementById("min-budget");
    var maxInput = document.getElementById("max-budget");
    var projects = readStorage("sb_projects", []);

    function renderProjects(items) {
        var container = document.getElementById("project-list");
        if (!items.length) {
            container.innerHTML = '<p class="empty-state">No projects match these filters. Try broadening your search.</p>';
            return;
        }
        container.innerHTML = items.map(function (project) {
            return '<article class="data-card"><h3>' + escapeHTML(project.title) + '</h3>' +
                '<p><strong>' + escapeHTML(project.id) + '</strong> · ' + escapeHTML(project.category) + '</p>' +
                '<p>' + escapeHTML(project.description) + '</p>' +
                '<p><strong>Client:</strong> ' + escapeHTML(project.clientName) + '</p>' +
                '<p><strong>Budget:</strong> BDT ' + Number(project.minBudget).toLocaleString("en-BD") +
                ' – ' + Number(project.maxBudget).toLocaleString("en-BD") + '</p>' +
                '<p><strong>Skills:</strong> ' + project.skills.map(escapeHTML).join(", ") + '</p>' +
                '<p><strong>Deadline:</strong> ' + escapeHTML(project.deadline) + '</p>' +
                '<span class="' + getStatusBadgeClass(project.status || "Open") + '">' + escapeHTML(project.status || "Open") + '</span>' +
                '<br><button class="button apply-project" type="button" data-id="' + escapeHTML(project.id) + '">Apply / Submit Proposal</button></article>';
        }).join("");
    }

    function applyFilters() {
        var values = getFormData(form);
        var keyword = String(values.keyword || "").trim().toLowerCase();
        var minimum = values.minBudget === "" ? null : Number(values.minBudget);
        var maximum = values.maxBudget === "" ? null : Number(values.maxBudget);
        var category = values.category || "";
        var skill = values.skill || "";
        var deadline = values.deadline || "";
        var mode = values.deadlineMode || "on-or-before";
        var filtered = projects.filter(function (project) {
            var matchesKeyword = !keyword || (project.title + " " + project.description).toLowerCase().indexOf(keyword) !== -1;
            var matchesCategory = !category || project.category === category;
            var matchesMinimum = minimum == null || project.maxBudget >= minimum;
            var matchesMaximum = maximum == null || project.minBudget <= maximum;
            var matchesSkill = !skill || project.skills.indexOf(skill) !== -1;
            var matchesDeadline = !deadline || (mode === "on-or-after" ? project.deadline >= deadline : project.deadline <= deadline);
            return matchesKeyword && matchesCategory && matchesMinimum && matchesMaximum && matchesSkill && matchesDeadline;
        });

        if (values.sort === "budget-desc") filtered.sort(function (a, b) { return b.maxBudget - a.maxBudget; });
        else if (values.sort === "budget-asc") filtered.sort(function (a, b) { return a.minBudget - b.minBudget; });
        else if (values.sort === "deadline") filtered.sort(function (a, b) { return a.deadline.localeCompare(b.deadline); });
        renderProjects(filtered);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var minValid = !validateRequired(minInput.value) || validateNumber(minInput.value, 0);
        var maxValid = !validateRequired(maxInput.value) || validateNumber(maxInput.value, 0);
        if (minValid) clearError(minInput);
        else showError(minInput, "Minimum budget must be a non-negative number.");
        if (maxValid) clearError(maxInput);
        else showError(maxInput, "Maximum budget must be a non-negative number.");
        if (!minValid || !maxValid) return;

        if (minInput.value !== "" && maxInput.value !== "" && Number(minInput.value) > Number(maxInput.value)) {
            showError(maxInput, "Maximum budget must be at least the minimum budget.");
            return;
        }
        if (maxInput.value !== "") clearError(maxInput);
        applyFilters();
        var resultCount = document.querySelectorAll("#project-list .data-card").length;
        showSuccess(document.getElementById("result"), "Filters applied. Showing " + resultCount + " matching project" + (resultCount === 1 ? "" : "s") + ".");
        showToast("Project filters applied.");
    });

    document.getElementById("reset-filters").addEventListener("click", function () {
        form.reset();
        minInput.classList.remove("input-invalid", "input-valid");
        maxInput.classList.remove("input-invalid", "input-valid");
        [minInput, maxInput].forEach(function (input) {
            var error = input.closest(".filter-field").querySelector(".field-error");
            error.textContent = "";
            error.hidden = true;
        });
        renderProjects(projects);
    });

    document.getElementById("project-list").addEventListener("click", function (event) {
        var button = event.target.closest(".apply-project");
        if (!button) return;
        localStorage.setItem("sb_selected_project", button.dataset.id);
        window.location.href = "SubmitProposal.html?projectId=" + encodeURIComponent(button.dataset.id);
    });

    renderProjects(projects);
});
