"use strict";

// Phase 4: DOM + form validation + arrays/objects + browser LocalStorage.
// All hiring is a classroom simulation; no real contracts are created.
var hireForm = document.getElementById("hireForm");
var hireProject = document.getElementById("hireProject");
var hireFreelancer = document.getElementById("hireFreelancer");
var agreedPrice = document.getElementById("agreedPrice");
var deliveryDeadline = document.getElementById("deliveryDeadline");
var hireAgreement = document.getElementById("hireAgreement");
var confirmHireButton = document.getElementById("confirmHireButton");
var hireResult = document.getElementById("hireResult");
var projectInfo = document.getElementById("selectedProjectInfo");
var freelancerInfo = document.getElementById("selectedFreelancerInfo");
var proposalInfo = document.getElementById("relatedProposalInfo");
var myHiresList = document.getElementById("myHiresList");
var hireLoginNotice = document.getElementById("hireLoginNotice");
var hireProjectNotice = document.getElementById("hireProjectNotice");
var hireSignedIn = document.getElementById("hireSignedIn");
var hireFields = [hireProject, hireFreelancer, agreedPrice, deliveryDeadline];

// Match the session format saved by ClientLogin.js ("Remember Me" on/off).
function currentHireClient() {
    var session = readStorage("sb_client_session", null);
    if (!session) {
        try { session = JSON.parse(sessionStorage.getItem("sb_client_session") || "null"); }
        catch (error) { session = null; }
    }
    var clients = readStorage("sb_clients", []);
    if (!session || !Array.isArray(clients) || session.role !== "Client") return null;
    for (var i = 0; i < clients.length; i += 1) {
        if (clients[i].id === session.clientId && clients[i].status !== "Suspended") return clients[i];
    }
    return null;
}

function hireProjects() {
    var projects = readStorage("sb_projects", []);
    return Array.isArray(projects) ? projects : [];
}

function hireFreelancers() {
    var freelancers = readStorage("sb_freelancers", []);
    return Array.isArray(freelancers) ? freelancers : [];
}

function hireOrders() {
    var orders = readStorage("sb_orders", []);
    return Array.isArray(orders) ? orders : [];
}

function chosenProject() {
    var client = currentHireClient();
    if (!client) return null;
    return hireProjects().find(function (project) {
        return project.id === hireProject.value && project.clientId === client.id && project.status === "Open";
    }) || null;
}

function chosenFreelancer() {
    return hireFreelancers().find(function (person) {
        return person.id === hireFreelancer.value && person.status !== "Suspended" && person.status !== "Inactive";
    }) || null;
}

// A freelancer may have submitted a proposal for a project. Show it if available.
function matchingProposal() {
    var proposals = readStorage("sb_proposals", []);
    if (!Array.isArray(proposals)) return null;
    return proposals.find(function (proposal) {
        return proposal.projectId === hireProject.value && proposal.freelancerId === hireFreelancer.value &&
            proposal.status !== "Withdrawn" && proposal.status !== "Rejected";
    }) || null;
}

function addSelectOption(select, value, label) {
    var option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
}

function fillHireOptions() {
    var client = currentHireClient();
    var previousProject = hireProject.value;
    var previousFreelancer = hireFreelancer.value;
    hireProject.length = 1;
    hireFreelancer.length = 1;

    var openProjects = [];
    if (client) {
        openProjects = hireProjects().filter(function (project) {
            return project.clientId === client.id && project.status === "Open";
        });
    }
    openProjects.forEach(function (project) {
        addSelectOption(hireProject, project.id, project.title + " (" + project.id + ")");
    });
    hireFreelancers().forEach(function (person) {
        if (person.status !== "Suspended" && person.status !== "Inactive") {
            addSelectOption(hireFreelancer, person.id, person.name + " — " + (person.title || "Freelancer"));
        }
    });
    hireProject.value = openProjects.some(function (p) { return p.id === previousProject; }) ? previousProject : "";
    hireFreelancer.value = chosenFreelancerOptionExists(previousFreelancer) ? previousFreelancer : "";
    hireLoginNotice.hidden = Boolean(client);
    hireSignedIn.hidden = !client;
    if (client) hireSignedIn.textContent = "Hiring as: " + client.name;
    hireProjectNotice.hidden = !client || openProjects.length > 0;
    confirmHireButton.disabled = !client || openProjects.length === 0;
    updateHireDetails();
}

function chosenFreelancerOptionExists(id) {
    for (var i = 0; i < hireFreelancer.options.length; i += 1) {
        if (hireFreelancer.options[i].value === id) return true;
    }
    return false;
}

function updateHireDetails() {
    var project = chosenProject();
    var freelancer = chosenFreelancer();
    projectInfo.hidden = !project;
    freelancerInfo.hidden = !freelancer;
    proposalInfo.hidden = true;
    if (project) {
        projectInfo.textContent = "Project: " + project.title + " | Budget: BDT " +
            Number(project.minBudget).toLocaleString("en-BD") + "–" +
            Number(project.maxBudget).toLocaleString("en-BD") + " | Deadline: " + project.deadline;
    }
    if (freelancer) {
        freelancerInfo.textContent = freelancer.name + " | " + (freelancer.title || "Freelancer") +
            " | ID: " + freelancer.id;
    }
    var proposal = matchingProposal();
    if (project && freelancer && proposal) {
        proposalInfo.hidden = false;
        proposalInfo.textContent = "Proposal " + proposal.id + ": proposed BDT " +
            Number(proposal.proposedPrice).toLocaleString("en-BD") +
            " | " + proposal.deliveryDays + " delivery days | " + proposal.status;
    }
}

function validateHireField(input) {
    var message = "";
    var value = input.value.trim();
    if (input === hireProject) {
        if (!validateSelect(value) || !chosenProject()) message = "Select one of your open projects.";
        else if (hireOrders().some(function (order) {
            return order.projectId === value && order.status !== "Cancelled";
        })) message = "This project already has a hiring order.";
    } else if (input === hireFreelancer) {
        if (!validateSelect(value) || !chosenFreelancer()) message = "Select an available freelancer.";
    } else if (input === agreedPrice) {
        if (!validateNumber(value, 1) || !Number.isInteger(Number(value))) {
            message = "Agreed price must be a positive whole BDT amount.";
        }
    } else if (input === deliveryDeadline) {
        if (!validateDate(value)) message = "Choose a valid delivery date.";
        else if (value <= getToday()) message = "Delivery date must be in the future.";
    }
    if (message) return showError(input, message);
    clearError(input);
    return true;
}

function validateHireAgreement() {
    if (!validateCheckbox(hireAgreement)) {
        return showError(hireAgreement, "You must agree before confirming the hire.");
    }
    clearError(hireAgreement);
    return true;
}

function displayMyHires() {
    myHiresList.textContent = "";
    var client = currentHireClient();
    if (!client) { myHiresList.textContent = "Sign in to view your hiring orders."; return; }
    var ownOrders = hireOrders().filter(function (order) { return order.clientId === client.id; });
    if (!ownOrders.length) { myHiresList.textContent = "You have not hired a freelancer yet."; return; }
    ownOrders.slice().reverse().forEach(function (order) {
        var card = document.createElement("article");
        card.className = "client-project-card";
        var heading = document.createElement("h4");
        heading.textContent = order.projectTitle + " — " + order.freelancerName;
        var details = document.createElement("p");
        details.textContent = "Order: " + order.id + " | BDT " +
            Number(order.amount).toLocaleString("en-BD") + " | Delivery: " +
            order.deliveryDeadline + " | Status: " + order.status + " | Payment: " + order.paymentStatus;
        card.appendChild(heading);
        card.appendChild(details);
        myHiresList.appendChild(card);
    });
}

function clearHireValidation() {
    hireFields.concat([hireAgreement]).forEach(function (input) {
        input.classList.remove("input-valid", "input-invalid");
        input.removeAttribute("aria-invalid");
        var error = input.closest(".form-field").querySelector(".field-error");
        if (error) { error.textContent = ""; error.hidden = true; }
    });
    hireResult.hidden = true;
}

hireFields.forEach(function (input) {
    input.addEventListener("blur", function () { validateHireField(input); });
    input.addEventListener("change", function () {
        if (input === hireProject || input === hireFreelancer) updateHireDetails();
        if (input.classList.contains("input-invalid")) validateHireField(input);
    });
    input.addEventListener("input", function () {
        if (input.classList.contains("input-invalid")) validateHireField(input);
    });
});
hireAgreement.addEventListener("change", function () {
    if (hireAgreement.checked || hireAgreement.classList.contains("input-invalid")) validateHireAgreement();
});

hireForm.addEventListener("submit", function (event) {
    event.preventDefault();
    hireResult.hidden = true;
    var client = currentHireClient();
    if (!client) { showToast("Please sign in before hiring.", "error"); fillHireOptions(); return; }
    var isValid = true;
    hireFields.forEach(function (input) {
        if (!validateHireField(input)) isValid = false;
    });
    if (!validateHireAgreement()) isValid = false;
    if (!isValid) {
        showToast("Please correct the highlighted hiring fields.", "error");
        var firstInvalid = hireForm.querySelector(".input-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
    }
    var project = chosenProject();
    var freelancer = chosenFreelancer();
    if (!project || !freelancer) { showToast("Your selection is no longer available.", "error"); fillHireOptions(); return; }
    // The project can only have one active demo hiring order.
    var orders = hireOrders();
    if (orders.some(function (order) { return order.projectId === project.id && order.status !== "Cancelled"; })) {
        showError(hireProject, "This project already has a hiring order.");
        return;
    }
    var proposal = matchingProposal();
    var order = {
        id: "ORD-" + Date.now(),
        clientId: client.id,
        clientName: client.name,
        projectId: project.id,
        projectTitle: project.title,
        freelancerId: freelancer.id,
        freelancerName: freelancer.name,
        proposalId: proposal ? proposal.id : "",
        amount: Number(agreedPrice.value),
        agreedPrice: Number(agreedPrice.value),
        deliveryDeadline: deliveryDeadline.value,
        status: "Hired",
        paymentStatus: "Unpaid",
        createdAt: new Date().toISOString()
    };
    orders.push(order);
    if (!writeStorage("sb_orders", orders)) return;

    // Mark the project as hired so it no longer appears among open projects.
    var projects = hireProjects();
    projects.forEach(function (item) {
        if (item.id === project.id) { item.status = "Hired"; item.hiredFreelancerId = freelancer.id; }
    });
    if (!writeStorage("sb_projects", projects)) {
        showToast("Order saved, but project status could not be updated. Please refresh.", "error");
        displayMyHires();
        return;
    }
    // If a matching proposal exists, record that it was accepted.
    if (proposal) {
        var proposals = readStorage("sb_proposals", []);
        if (Array.isArray(proposals)) {
            proposals.forEach(function (item) {
                if (item.id === proposal.id) item.status = "Accepted";
            });
            writeStorage("sb_proposals", proposals);
        }
    }
    hireForm.reset();
    clearHireValidation();
    fillHireOptions();
    displayMyHires();
    showSuccess(hireResult, "Freelancer hired successfully! Demo order ID: " + order.id + ". Continue to Make Payment when ready.");
    showToast("Freelancer hired successfully!", "success");
});

hireForm.addEventListener("reset", function () {
    setTimeout(function () { clearHireValidation(); updateHireDetails(); }, 0);
});
deliveryDeadline.min = getToday();
fillHireOptions();
displayMyHires();
