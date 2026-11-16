"use strict";

// Phase 5: Client payment is a classroom simulation. NEVER store payment credentials.
var paymentForm = document.getElementById("paymentForm");
var paymentOrder = document.getElementById("paymentOrder");
var paymentAmount = document.getElementById("paymentAmount");
var paymentMethod = document.getElementById("paymentMethod");
var mobilePaymentNumber = document.getElementById("mobilePaymentNumber");
var cardHolder = document.getElementById("cardHolder");
var cardNumber = document.getElementById("cardNumber");
var cardExpiry = document.getElementById("cardExpiry");
var cardCVV = document.getElementById("cardCVV");
var paymentConfirm = document.getElementById("paymentConfirm");
var submitPayment = document.getElementById("submitPayment");
var paymentResult = document.getElementById("paymentResult");
var paymentHistory = document.getElementById("paymentHistory");
var paymentOrderDetails = document.getElementById("paymentOrderDetails");
var mobilePaymentFields = document.getElementById("mobilePaymentFields");
var cardPaymentFields = document.getElementById("cardPaymentFields");
var paymentInputs = [paymentOrder, paymentAmount, paymentMethod, mobilePaymentNumber,
    cardHolder, cardNumber, cardExpiry, cardCVV, paymentConfirm];

// Same session format as ClientLogin and HireFreelancer.
function currentPaymentClient() {
    var session = readStorage("sb_client_session", null);
    if (!session) {
        try { session = JSON.parse(sessionStorage.getItem("sb_client_session") || "null"); }
        catch (error) { session = null; }
    }
    var clients = readStorage("sb_clients", []);
    if (!session || session.role !== "Client" || !Array.isArray(clients)) return null;
    for (var index = 0; index < clients.length; index += 1) {
        if (clients[index].id === session.clientId && clients[index].status !== "Suspended") return clients[index];
    }
    return null;
}

function getPaymentOrders() {
    var orders = readStorage("sb_orders", []);
    return Array.isArray(orders) ? orders : [];
}
function getTransactions() {
    var transactions = readStorage("sb_transactions", []);
    return Array.isArray(transactions) ? transactions : [];
}
function availablePaymentOrders() {
    var client = currentPaymentClient();
    if (!client) return [];
    var transactions = getTransactions();
    return getPaymentOrders().filter(function (order) {
        return order.clientId === client.id && order.status !== "Cancelled" &&
            order.paymentStatus !== "Paid" && !transactions.some(function (transaction) {
                return transaction.orderId === order.id && transaction.status === "Simulated Paid";
            });
    });
}
function chosenPaymentOrder() {
    return availablePaymentOrders().find(function (order) {
        return order.id === paymentOrder.value;
    }) || null;
}
function clearPaymentInput(input) {
    input.classList.remove("input-valid", "input-invalid");
    input.removeAttribute("aria-invalid");
    var field = input.closest(".form-field");
    var error = field ? field.querySelector(".field-error") : null;
    if (error) { error.textContent = ""; error.hidden = true; }
}
function clearPaymentValidation() {
    paymentInputs.forEach(clearPaymentInput);
    paymentResult.hidden = true;
}
function updateMethodFields() {
    var mobile = ["bKash", "Nagad", "Rocket"].indexOf(paymentMethod.value) !== -1;
    var card = paymentMethod.value === "Card";
    mobilePaymentFields.hidden = !mobile;
    cardPaymentFields.hidden = !card;
    mobilePaymentNumber.disabled = !mobile;
    [cardHolder, cardNumber, cardExpiry, cardCVV].forEach(function (input) { input.disabled = !card; });
    // Hide and clear potentially sensitive inputs whenever the method changes.
    mobilePaymentNumber.value = "";
    cardHolder.value = "";
    cardNumber.value = "";
    cardExpiry.value = "";
    cardCVV.value = "";
    [mobilePaymentNumber, cardHolder, cardNumber, cardExpiry, cardCVV].forEach(clearPaymentInput);
}
function updateOrderDetails() {
    var order = chosenPaymentOrder();
    paymentOrderDetails.hidden = !order;
    if (order) {
        paymentOrderDetails.textContent = "Project: " + order.projectTitle +
            " | Freelancer: " + order.freelancerName + " | Agreed amount: BDT " +
            Number(order.amount).toLocaleString("en-BD");
        paymentAmount.value = String(order.amount);
    } else {
        paymentAmount.value = "";
    }
    clearPaymentInput(paymentAmount);
}
function fillPaymentOrders() {
    var client = currentPaymentClient();
    var savedChoice = paymentOrder.value;
    var unpaidOrders = availablePaymentOrders();
    paymentOrder.length = 1;
    unpaidOrders.forEach(function (order) {
        var option = document.createElement("option");
        option.value = order.id;
        option.textContent = order.id + " — " + order.projectTitle + " (BDT " +
            Number(order.amount).toLocaleString("en-BD") + ")";
        paymentOrder.appendChild(option);
    });
    paymentOrder.value = unpaidOrders.some(function (order) { return order.id === savedChoice; }) ? savedChoice : "";
    document.getElementById("paymentLoginNotice").hidden = Boolean(client);
    document.getElementById("paymentSignedIn").hidden = !client;
    if (client) document.getElementById("paymentSignedIn").textContent = "Signed in as: " + client.name;
    document.getElementById("paymentOrderNotice").hidden = !client || unpaidOrders.length !== 0;
    submitPayment.disabled = !client || !unpaidOrders.length;
    updateOrderDetails();
}
function validatePaymentInput(input) {
    var error = "";
    var value = input.value.trim();
    var order = chosenPaymentOrder();
    var method = paymentMethod.value;
    if (input === paymentOrder) {
        if (!validateSelect(value) || !order) error = "Select one of your unpaid hiring orders.";
    } else if (input === paymentAmount) {
        if (!validateNumber(value, 1) || !Number.isInteger(Number(value))) {
            error = "Enter a positive whole BDT amount.";
        } else if (!order || Number(value) !== Number(order.amount)) {
            error = "Amount must match the agreed hiring order amount.";
        }
    } else if (input === paymentMethod) {
        if (["bKash", "Nagad", "Rocket", "Card"].indexOf(value) === -1) error = "Choose a payment method.";
    } else if (input === mobilePaymentNumber && method !== "Card") {
        if (!validatePhone(value)) error = "Enter a valid Bangladesh mobile number.";
    } else if (input === cardHolder && method === "Card") {
        if (!validateTextLength(value, 2, 80)) error = "Enter the name printed on your test card.";
    } else if (input === cardNumber && method === "Card") {
        var digits = value.replace(/[\s-]/g, "");
        if (!/^\d{13,19}$/.test(digits) || !validateLuhn(digits)) {
            error = "Enter a 13–19 digit test card number passing the Luhn check.";
        }
    } else if (input === cardExpiry && method === "Card") {
        var todayMonth = getToday().slice(0, 7);
        if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value) || value <= todayMonth) {
            error = "Choose an expiry month after the current month.";
        }
    } else if (input === cardCVV && method === "Card") {
        if (!/^\d{3,4}$/.test(value)) error = "CVV must have 3 or 4 digits.";
    } else if (input === paymentConfirm) {
        if (!validateCheckbox(paymentConfirm)) error = "You must confirm this is only a simulated payment.";
    }
    if (error) return showError(input, error);
    clearError(input);
    return true;
}
function displayPaymentHistory() {
    paymentHistory.textContent = "";
    var client = currentPaymentClient();
    if (!client) { paymentHistory.textContent = "Sign in to view your demo payment records."; return; }
    var records = getTransactions().filter(function (record) { return record.clientId === client.id; });
    if (!records.length) { paymentHistory.textContent = "No demo payments have been made yet."; return; }
    records.slice().reverse().forEach(function (record) {
        var card = document.createElement("article");
        card.className = "client-project-card";
        var heading = document.createElement("h4");
        heading.textContent = record.id + " — " + record.projectTitle;
        var details = document.createElement("p");
        details.textContent = "Order: " + record.orderId + " | BDT " +
            Number(record.amount).toLocaleString("en-BD") + " | Method: " + record.method +
            " | Status: " + record.status + " | Date: " + new Date(record.createdAt).toLocaleString("en-BD");
        card.appendChild(heading);
        card.appendChild(details);
        paymentHistory.appendChild(card);
    });
}

paymentOrder.addEventListener("change", function () { updateOrderDetails(); validatePaymentInput(paymentOrder); });
paymentMethod.addEventListener("change", function () { updateMethodFields(); validatePaymentInput(paymentMethod); });
paymentInputs.forEach(function (input) {
    input.addEventListener("blur", function () {
        if (input !== paymentConfirm && !input.disabled &&
            (input === paymentOrder || input === paymentAmount || input === paymentMethod ||
            !input.closest("[hidden]"))) validatePaymentInput(input);
    });
    input.addEventListener("input", function () {
        if (input.classList.contains("input-invalid")) validatePaymentInput(input);
    });
});
paymentConfirm.addEventListener("change", function () { validatePaymentInput(paymentConfirm); });

paymentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    paymentResult.hidden = true;
    var client = currentPaymentClient();
    if (!client) { showToast("Please sign in before making a demo payment.", "error"); fillPaymentOrders(); return; }
    var fields = [paymentOrder, paymentAmount, paymentMethod];
    if (["bKash", "Nagad", "Rocket"].indexOf(paymentMethod.value) !== -1) {
        fields.push(mobilePaymentNumber);
    } else if (paymentMethod.value === "Card") {
        fields = fields.concat([cardHolder, cardNumber, cardExpiry, cardCVV]);
    }
    fields.push(paymentConfirm);
    var valid = true;
    fields.forEach(function (input) { if (!validatePaymentInput(input)) valid = false; });
    if (!valid) {
        showToast("Please correct the highlighted payment fields.", "error");
        var firstError = paymentForm.querySelector(".input-invalid");
        if (firstError) firstError.focus();
        return;
    }
    var order = chosenPaymentOrder();
    if (!order) { showToast("That order is no longer available for payment.", "error"); fillPaymentOrders(); return; }
    if (!confirmAction("Record a SIMULATED payment of BDT " + order.amount + " for " + order.id + "? No money will be transferred.")) return;

    var records = getTransactions();
    // Recheck to prevent submitting the same order twice from this page.
    if (records.some(function (record) { return record.orderId === order.id && record.status === "Simulated Paid"; })) {
        showToast("A simulated payment already exists for this order.", "error");
        fillPaymentOrders();
        return;
    }
    var record = {
        id: "TXN-" + Date.now(),
        orderId: order.id,
        projectId: order.projectId,
        projectTitle: order.projectTitle,
        clientId: client.id,
        freelancerId: order.freelancerId,
        amount: Number(order.amount),
        method: paymentMethod.value,
        status: "Simulated Paid",
        createdAt: new Date().toISOString()
    };
    records.push(record);
    if (!writeStorage("sb_transactions", records)) return;
    var orders = getPaymentOrders();
    orders.forEach(function (item) {
        if (item.id === order.id) { item.paymentStatus = "Paid"; item.transactionId = record.id; }
    });
    if (!writeStorage("sb_orders", orders)) {
        showToast("Transaction saved, but order payment status was not updated. Refresh before retrying.", "error");
        return;
    }
    // Do not keep card number, CVV or mobile banking details after submission.
    paymentForm.reset();
    updateMethodFields();
    clearPaymentValidation();
    fillPaymentOrders();
    displayPaymentHistory();
    showSuccess(paymentResult, "Demo payment recorded! Transaction ID: " + record.id + ". No real money was transferred.");
    showToast("Simulated payment successful!", "success");
});
paymentForm.addEventListener("reset", function () {
    window.setTimeout(function () {
        updateMethodFields();
        clearPaymentValidation();
        updateOrderDetails();
    }, 0);
});
updateMethodFields();
fillPaymentOrders();
displayPaymentHistory();
