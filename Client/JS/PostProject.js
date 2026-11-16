"use strict";

// Phase 3: simple browser-only project posting, using faculty-taught forms,
// DOM, events, conditions, arrays/objects, and shared JS/Common.js functions.
var postProjectForm = document.getElementById("postProjectForm");
var projectTitle = document.getElementById("projectTitle");
var category = document.getElementById("category");
var description = document.getElementById("description");
var minBudget = document.getElementById("minBudget");
var maxBudget = document.getElementById("maxBudget");
var deadline = document.getElementById("deadline");
var experienceLevel = document.getElementById("experienceLevel");
var attachment = document.getElementById("attachment");
var skillsGroup = document.getElementById("skillsGroup");
var skillsError = document.getElementById("skillsError");
var result = document.getElementById("projectResult");
var publishButton = document.getElementById("publishButton");
var loginNotice = document.getElementById("loginNotice");
var signedInAs = document.getElementById("signedInAs");
var projectsList = document.getElementById("myProjectsList");
var fields = [projectTitle, category, description, minBudget, maxBudget,
    deadline, experienceLevel, attachment];

// Read the same session format that ClientLogin.js creates.
function getSignedInClient() {
    var session = readStorage("sb_client_session", null);
    if (!session) {
        try { session = JSON.parse(sessionStorage.getItem("sb_client_session") || "null"); }
        catch (error) { session = null; }
    }
    var clients = readStorage("sb_clients", []);
    if (!session || !Array.isArray(clients)) return null;
    for (var index = 0; index < clients.length; index += 1) {
        if (clients[index].id === session.clientId) return clients[index];
    }
    return null;
}

function selectedSkills() {
    var selections = skillsGroup.querySelectorAll('input[name="skills"]:checked');
    var skills = [];
    selections.forEach(function (item) { skills.push(item.value); });
    return skills;
}

function validateSkills() {
    if (selectedSkills().length === 0) {
        skillsGroup.classList.add("client-group-invalid");
        skillsError.textContent = "Select at least one required skill.";
        skillsError.hidden = false;
        return false;
    }
    skillsGroup.classList.remove("client-group-invalid");
    skillsError.textContent = "";
    skillsError.hidden = true;
    return true;
}

function validateProjectField(input) {
    var value = input.value.trim();
    var message = "";
    if (input === projectTitle) {
        if (!validateRequired(value)) message = "Enter a project title.";
        else if (!validateTextLength(value, 10, 100)) message = "Title must be 10 to 100 characters.";
    } else if (input === category) {
        if (!validateSelect(value)) message = "Choose a project category.";
    } else if (input === description) {
        if (!validateTextLength(value, 100)) message = "Description must be at least 100 characters.";
    } else if (input === minBudget) {
        if (!validateNumber(value, 1) || !Number.isInteger(Number(value))) message = "Minimum budget must be a positive whole number.";
    } else if (input === maxBudget) {
        if (!validateNumber(value, 1) || !Number.isInteger(Number(value))) message = "Maximum budget must be a positive whole number.";
        else if (validateNumber(minBudget.value, 1) && Number(value) < Number(minBudget.value)) {
            message = "Maximum budget cannot be lower than minimum budget.";
        }
    } else if (input === deadline) {
        if (!validateDate(value)) message = "Choose a valid deadline.";
        else if (value <= getToday()) message = "Deadline must be a future date.";
    } else if (input === experienceLevel) {
        if (!validateSelect(value)) message = "Choose an experience level.";
    } else if (input === attachment) {
        if (input.files.length > 0 && !validateFile(input.files[0],
            [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"], 5 * 1024 * 1024)) {
            message = "Choose a PDF, DOC, DOCX, JPG or PNG file up to 5 MB.";
        }
    }
    if (message) return showError(input, message);
    clearError(input);
    return true;
}

function refreshCounters() {
    showCharCount(projectTitle, "#titleCount", 10, 100);
    showCharCount(description, "#descriptionCount", 100);
}

function clearValidation() {
    fields.forEach(function (input) {
        input.classList.remove("input-valid", "input-invalid");
        input.removeAttribute("aria-invalid");
        var error = input.closest(".form-field").querySelector(".field-error");
        if (error) { error.hidden = true; error.textContent = ""; }
    });
    skillsGroup.classList.remove("client-group-invalid");
    skillsError.hidden = true;
    skillsError.textContent = "";
    refreshCounters();
}

function displayMyProjects() {
    var client = getSignedInClient();
    projectsList.textContent = "";
    if (!client) {
        projectsList.textContent = "Sign in to see projects you have published.";
        return;
    }
    var projects = readStorage("sb_projects", []);
    if (!Array.isArray(projects)) projects = [];
    var ownProjects = projects.filter(function (project) {
        return project.clientId === client.id;
    });
    if (ownProjects.length === 0) {
        projectsList.textContent = "You have not published a project yet.";
        return;
    }
    ownProjects.slice().reverse().forEach(function (project) {
        var card = document.createElement("article");
        card.className = "client-project-card";
        var heading = document.createElement("h4");
        heading.textContent = project.title;
        var meta = document.createElement("p");
        meta.textContent = project.id + " · " + project.category + " · BDT " +
            Number(project.minBudget).toLocaleString("en-BD") + "–" +
            Number(project.maxBudget).toLocaleString("en-BD") +
            " · Deadline: " + project.deadline + " · " + project.status;
        card.appendChild(heading);
        card.appendChild(meta);
        projectsList.appendChild(card);
    });
}

function refreshSession() {
    var client = getSignedInClient();
    loginNotice.hidden = Boolean(client);
    signedInAs.hidden = !client;
    if (client) signedInAs.textContent = "Posting as: " + client.name;
    // Pages remain viewable to visitors, but publishing requires a demo client session.
    publishButton.disabled = !client;
    displayMyProjects();
}

// Live feedback: faculty-taught DOM events and shared validator helpers.
fields.forEach(function (input) {
    input.addEventListener("blur", function () { validateProjectField(input); });
    input.addEventListener("change", function () {
        if (input.classList.contains("input-invalid")) validateProjectField(input);
        if (input === minBudget && maxBudget.value) validateProjectField(maxBudget);
    });
    input.addEventListener("input", function () {
        if (input === projectTitle || input === description) refreshCounters();
        if (input.classList.contains("input-invalid")) validateProjectField(input);
        if (input === minBudget && maxBudget.value) validateProjectField(maxBudget);
    });
});
skillsGroup.addEventListener("change", validateSkills);

postProjectForm.addEventListener("submit", function (event) {
    event.preventDefault();
    result.hidden = true;
    var client = getSignedInClient();
    if (!client) {
        showToast("Please sign in as a Client before publishing.", "error");
        refreshSession();
        return;
    }

    var valid = true;
    fields.forEach(function (input) {
        if (!validateProjectField(input)) valid = false;
    });
    if (!validateSkills()) valid = false;
    if (!valid) {
        showToast("Please correct the highlighted project fields.", "error");
        var firstInvalid = postProjectForm.querySelector(".input-invalid");
        if (firstInvalid) firstInvalid.focus();
        else skillsGroup.querySelector("input").focus();
        return;
    }

    var projects = readStorage("sb_projects", []);
    if (!Array.isArray(projects)) projects = [];
    var newProject = {
        id: "PRJ-" + Date.now(),
        clientId: client.id,
        clientName: client.companyName || client.name,
        title: projectTitle.value.trim(),
        category: category.value,
        description: description.value.trim(),
        skills: selectedSkills(),
        minBudget: Number(minBudget.value),
        maxBudget: Number(maxBudget.value),
        deadline: deadline.value,
        experienceLevel: experienceLevel.value,
        attachmentName: attachment.files.length ? attachment.files[0].name : "",
        status: "Open",
        createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    if (!writeStorage("sb_projects", projects)) return;

    postProjectForm.reset();
    clearValidation();
    showSuccess(result, "Project published successfully! Project ID: " + newProject.id);
    showToast("Project published successfully!", "success");
    displayMyProjects();
});

postProjectForm.addEventListener("reset", function () {
    result.hidden = true;
    // Reset event runs before browser clears values; wait one task for counters.
    setTimeout(clearValidation, 0);
});

deadline.min = getToday();
refreshCounters();
refreshSession();
