"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("proposal-form");
    var projectSelect = document.getElementById("project");
    var coverLetter = document.getElementById("cover-letter");
    var priceInput = document.getElementById("proposed-price");
    var daysInput = document.getElementById("delivery-days");
    var portfolioInput = document.getElementById("portfolio-url");
    var projects = readStorage("sb_projects", []);
    var result = document.getElementById("result");

    function renderProjectOptions() {
        projectSelect.innerHTML = '<option value="">Choose a project</option>' + projects.map(function (project) {
            return '<option value="' + escapeHTML(project.id) + '">' + escapeHTML(project.id + ": " + project.title +
                " (Budget: " + Number(project.minBudget).toLocaleString("en-BD") + " – " +
                Number(project.maxBudget).toLocaleString("en-BD") + " BDT)") + "</option>";
        }).join("");
    }

    function updateProjectInfo() {
        var project = projects.find(function (item) { return item.id === projectSelect.value; });
        var banner = document.getElementById("project-info");
        if (!project) {
            banner.textContent = "Select a project to see its budget and deadline.";
            return;
        }
        banner.textContent = project.id + " · Allowed budget: BDT " +
            Number(project.minBudget).toLocaleString("en-BD") + " – " +
            Number(project.maxBudget).toLocaleString("en-BD") + " · Deadline: " + project.deadline;
        priceInput.min = project.minBudget;
        priceInput.max = project.maxBudget;
    }

    function renderProposals() {
        var proposals = readStorage("sb_proposals", []);
        var container = document.getElementById("proposal-list");
        if (!proposals.length) {
            container.innerHTML = '<p class="empty-state">No proposals submitted yet.</p>';
            return;
        }
        container.innerHTML = '<div class="table-wrap"><table class="data-table"><thead><tr>' +
            '<th>Project</th><th>Freelancer</th><th>Proposed price</th><th>Status</th><th>Action</th>' +
            '</tr></thead><tbody>' + proposals.map(function (proposal) {
                var project = projects.find(function (item) { return item.id === proposal.projectId; });
                return '<tr><td>' + escapeHTML(proposal.projectId) + '<br>' + escapeHTML(project ? project.title : "Project") +
                    '</td><td>' + escapeHTML(proposal.freelancerId) + '</td><td>BDT ' +
                    Number(proposal.proposedPrice).toLocaleString("en-BD") + '</td><td><span class="' +
                    getStatusBadgeClass(proposal.status) + '">' + escapeHTML(proposal.status) + '</span></td><td>' +
                    (proposal.status === "Withdrawn" ? '<span class="muted">Withdrawn</span>' :
                        '<button class="button button-danger withdraw-proposal" type="button" data-id="' +
                        escapeHTML(proposal.id) + '">Withdraw Proposal</button>') + '</td></tr>';
            }).join("") + "</tbody></table></div>";
    }

    coverLetter.addEventListener("input", function () {
        showCharCount(coverLetter, document.getElementById("cover-count"), 50);
    });
    projectSelect.addEventListener("change", updateProjectInfo);

    document.getElementById("fill-sample").addEventListener("click", function () {
        var proposals = readStorage("sb_proposals", []);
        var project = projects.find(function (item) {
            return !proposals.some(function (proposal) { return proposal.projectId === item.id; });
        });
        if (!project) {
            showToast("There are no projects available for a new demo proposal.", "error");
            return;
        }
        projectSelect.value = project.id;
        updateProjectInfo();
        coverLetter.value = "I can deliver a thoughtful, high-quality solution for your project. My experience with similar Bangladesh-based clients means I understand the audience and can keep communication clear throughout delivery.";
        priceInput.value = Math.round((project.minBudget + project.maxBudget) / 2);
        daysInput.value = "7";
        portfolioInput.value = "https://example.com/portfolio";
        document.getElementById("additional-info").value = "I can share relevant work samples and provide regular progress updates.";
        showCharCount(coverLetter, document.getElementById("cover-count"), 50);
        clearError(projectSelect);
        showToast("Sample proposal details filled.");
    });

    document.getElementById("proposal-list").addEventListener("click", function (event) {
        var button = event.target.closest(".withdraw-proposal");
        if (!button || !confirmAction("Withdraw this proposal?")) return;
        var proposals = readStorage("sb_proposals", []);
        var proposal = proposals.find(function (item) { return item.id === button.dataset.id; });
        if (!proposal) return;
        proposal.status = "Withdrawn";
        proposal.withdrawnAt = new Date().toISOString();
        if (writeStorage("sb_proposals", proposals)) {
            renderProposals();
            showToast("Proposal withdrawn.");
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        result.hidden = true;
        var selectedProject = projects.find(function (item) { return item.id === projectSelect.value; });
        var valid = true;
        if (validateSelect(projectSelect.value)) clearError(projectSelect);
        else { showError(projectSelect, "Choose a project before submitting your proposal."); valid = false; }

        if (validateTextLength(coverLetter.value, 50)) clearError(coverLetter);
        else { showError(coverLetter, "Your cover letter must contain at least 50 characters."); valid = false; }

        var proposedPrice = Number(priceInput.value);
        if (!validateNumber(priceInput.value, Number.MIN_VALUE)) {
            showError(priceInput, "Enter a proposed price greater than BDT 0.");
            valid = false;
        } else if (selectedProject && (proposedPrice < selectedProject.minBudget || proposedPrice > selectedProject.maxBudget)) {
            showError(priceInput, "For " + selectedProject.id + ", your price must be BDT " +
                Number(selectedProject.minBudget).toLocaleString("en-BD") + "–" +
                Number(selectedProject.maxBudget).toLocaleString("en-BD") + ".");
            valid = false;
        } else if (selectedProject) clearError(priceInput);

        if (validateRange(daysInput.value, 1, 90)) clearError(daysInput);
        else { showError(daysInput, "Delivery time must be a whole number from 1 to 90 days."); valid = false; }
        if (validateURL(portfolioInput.value, true)) clearError(portfolioInput);
        else { showError(portfolioInput, "Enter a valid portfolio URL beginning with http:// or https://."); valid = false; }
        if (!valid) return;

        var proposals = readStorage("sb_proposals", []);
        var duplicate = proposals.some(function (proposal) {
            return proposal.projectId === selectedProject.id;
        });
        if (duplicate) {
            showError(projectSelect, "You have already applied to this project.");
            return;
        }

        var proposal = {
            id: "PROP-" + Date.now(),
            projectId: selectedProject.id,
            freelancerId: localStorage.getItem("sb_current_freelancer") || "FRE-1001",
            coverLetter: coverLetter.value.trim(),
            proposedPrice: proposedPrice,
            deliveryDays: Number(daysInput.value),
            portfolioUrl: portfolioInput.value.trim(),
            additionalInfo: document.getElementById("additional-info").value.trim(),
            status: "Pending Client Review",
            submittedAt: new Date().toISOString()
        };
        proposals.unshift(proposal);
        if (!writeStorage("sb_proposals", proposals)) return;
        renderProposals();
        showSuccess(result, "Proposal " + proposal.id + " submitted for " + selectedProject.id + " at BDT " +
            proposedPrice.toLocaleString("en-BD") + ".");
        showToast("Your proposal has been submitted.");
        form.reset();
        showCharCount(coverLetter, document.getElementById("cover-count"), 50);
        updateProjectInfo();
    });

    renderProjectOptions();
    var params = new URLSearchParams(window.location.search);
    var selectedId = params.get("projectId") || localStorage.getItem("sb_selected_project") || "";
    if (projects.some(function (project) { return project.id === selectedId; })) projectSelect.value = selectedId;
    updateProjectInfo();
    showCharCount(coverLetter, document.getElementById("cover-count"), 50);
    renderProposals();
});
