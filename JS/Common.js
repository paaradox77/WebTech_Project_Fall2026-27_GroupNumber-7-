"use strict";

function validateRequired(value) {
    return String(value == null ? "" : value).trim().length > 0;
}

function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || "").trim());
}

function validatePhone(value) {
    return /^(?:\+?88)?01[3-9]\d{8}$/.test(String(value || "").trim());
}

function validatePassword(value) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(String(value || ""));
}

function validateConfirmPassword(value, password) {
    return String(value || "") === String(password || "") && validateRequired(value);
}

function validateTextLength(value, min, max) {
    var length = String(value == null ? "" : value).trim().length;
    return length >= min && (max == null || length <= max);
}

function validateNumber(value, min, max) {
    var number = Number(value);
    return validateRequired(value) && Number.isFinite(number) &&
        (min == null || number >= min) && (max == null || number <= max);
}

function validateDecimal(value, min, max) {
    return validateNumber(value, min, max);
}

function validateDate(value) {
    if (!validateRequired(value)) return false;
    var date = new Date(value + "T00:00:00Z");
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateDateWindow(value, minDate, maxDate) {
    if (!validateDate(value)) return false;
    return (!minDate || value >= minDate) && (!maxDate || value <= maxDate);
}

function validateDateRange(start, end) {
    return validateDate(start) && validateDate(end) && start <= end;
}

function validateTime(value) {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value || ""));
}

function validateURL(value, requireProtocol) {
    try {
        var url = new URL(String(value || "").trim());
        return (url.protocol === "http:" || url.protocol === "https:") &&
            (!requireProtocol || /^https?:\/\//i.test(String(value || "").trim()));
    } catch (error) {
        return false;
    }
}

function validateFile(file, extensions, maxBytes) {
    if (!file) return false;
    var allowed = Array.isArray(extensions) ? extensions : [".jpg", ".jpeg", ".png", ".webp"];
    var extension = "." + String(file.name || "").split(".").pop().toLowerCase();
    var limit = maxBytes == null ? 5 * 1024 * 1024 : maxBytes;
    return allowed.map(function (item) { return item.toLowerCase(); }).indexOf(extension) !== -1 &&
        file.size <= limit;
}

function validateCheckbox(checkbox) {
    return Boolean(checkbox && checkbox.checked);
}

function validateSelect(value) {
    return validateRequired(value);
}

function validateDifferent(first, second) {
    return String(first == null ? "" : first) !== String(second == null ? "" : second);
}

function validateRange(value, min, max) {
    return validateNumber(value, min, max) && Number.isInteger(Number(value));
}

function validateBangladeshID(value, prefix) {
    var text = String(value || "").trim();
    if (prefix) {
        return new RegExp("^" + String(prefix).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "-\\d{4}$", "i").test(text);
    }
    return /^(?:\d{10}|\d{13}|\d{17})$/.test(text);
}

function validateLuhn(value) {
    var digits = String(value || "").replace(/[\s-]/g, "");
    if (!/^\d+$/.test(digits)) return false;
    var sum = 0;
    var doubleDigit = false;
    for (var index = digits.length - 1; index >= 0; index -= 1) {
        var digit = Number(digits.charAt(index));
        if (doubleDigit) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        doubleDigit = !doubleDigit;
    }
    return sum % 10 === 0;
}

function showCharCount(input, counter, minimum, maximum) {
    var element = typeof counter === "string" ? document.querySelector(counter) : counter;
    if (!element || !input) return;
    var length = input.value.length;
    element.textContent = maximum == null
        ? length + (minimum ? " / " + minimum + " minimum" : " characters")
        : length + " / " + maximum + " characters" + (minimum ? " (minimum " + minimum + ")" : "");
    element.classList.toggle("char-count-met", !minimum || length >= minimum);
    element.classList.toggle("char-count-over", maximum != null && length > maximum);
}

function togglePassword(inputId, button) {
    var input = typeof inputId === "string" ? document.getElementById(inputId) : inputId;
    if (!input) return;
    var visible = input.type === "password";
    input.type = visible ? "text" : "password";
    if (button) button.textContent = visible ? "Hide" : "Show";
}

function getRadioValue(name, form) {
    var scope = form || document;
    var selected = scope.querySelector('input[type="radio"][name="' + name + '"]:checked');
    return selected ? selected.value : "";
}

function getToday() {
    var now = new Date();
    var local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
}

function daysBetween(first, second) {
    var start = new Date(first + "T00:00:00Z");
    var end = new Date(second + "T00:00:00Z");
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return NaN;
    return Math.round((end.getTime() - start.getTime()) / 86400000);
}

function timeToMinutes(value) {
    if (!validateTime(value)) return NaN;
    var pieces = value.split(":");
    return Number(pieces[0]) * 60 + Number(pieces[1]);
}

function findErrorElement(input) {
    if (!input) return null;
    var field = input.closest(".form-field");
    if (field) return field.querySelector(".field-error");
    return input.parentElement ? input.parentElement.querySelector(".field-error") : null;
}

function showError(input, message) {
    if (input) {
        input.classList.remove("input-valid");
        input.classList.add("input-invalid");
        input.setAttribute("aria-invalid", "true");
        var error = findErrorElement(input);
        if (error) {
            error.textContent = message;
            error.hidden = false;
        }
    }
    return false;
}

function clearError(input) {
    if (!input) return;
    input.classList.remove("input-invalid");
    input.classList.add("input-valid");
    input.setAttribute("aria-invalid", "false");
    var error = findErrorElement(input);
    if (error) {
        error.textContent = "";
        error.hidden = true;
    }
}

function showSuccess(target, message) {
    var element = typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return;
    element.textContent = message;
    element.className = "result-box success";
    element.hidden = false;
}

function showToast(message, type) {
    var toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = "toast toast-" + (type || "success") + " is-visible";
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(function () {
        toast.classList.remove("is-visible");
    }, 3500);
}

function confirmAction(message) {
    return window.confirm(message || "Are you sure you want to continue?");
}

function getFormData(form) {
    var result = {};
    new FormData(form).forEach(function (value, key) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
            if (!Array.isArray(result[key])) result[key] = [result[key]];
            result[key].push(value);
        } else {
            result[key] = value;
        }
    });
    return result;
}

function getStatusBadgeClass(status) {
    var normalized = String(status || "").toLowerCase();
    if (normalized.indexOf("shortlist") !== -1 || normalized.indexOf("active") !== -1 ||
        normalized.indexOf("published") !== -1 || normalized.indexOf("approved") !== -1) return "badge badge-success";
    if (normalized.indexOf("pending") !== -1 || normalized.indexOf("review") !== -1) return "badge badge-pending";
    if (normalized.indexOf("withdraw") !== -1 || normalized.indexOf("closed") !== -1) return "badge badge-muted";
    return "badge";
}

function readStorage(key, fallback) {
    try {
        var value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        console.error("Could not read " + key + " from localStorage.", error);
        return fallback;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error("Could not save " + key + " to localStorage.", error);
        showToast("Your browser could not save this data. Check available storage.", "error");
        return false;
    }
}

function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
}

function seedDemoData() {
    var freelancers = readStorage("sb_freelancers", null);
    if (!Array.isArray(freelancers) || freelancers.length === 0) {
        freelancers = [
            { id: "FRE-1001", name: "Rahim Ahmed", email: "rahim@example.com", phone: "01712345678", title: "Full-Stack Web Developer", password: "Abcdef12", status: "Active" },
            { id: "FRE-1002", name: "Nusrat Jahan", email: "nusrat@example.com", phone: "01812345678", title: "UI/UX & Graphic Designer", password: "Design12A", status: "Active" }
        ];
        writeStorage("sb_freelancers", freelancers);
    }

    if (!Array.isArray(readStorage("sb_projects", null))) {
        writeStorage("sb_projects", [
            { id: "PRJ-1001", title: "E-Commerce UI Redesign", description: "Redesign a mobile-first storefront for a Dhaka fashion retailer.", clientName: "Dhaka Threads", category: "UI/UX Design", minBudget: 5000, maxBudget: 15000, skills: ["Figma", "UI/UX Design"], deadline: "2027-01-20", status: "Open" },
            { id: "PRJ-1002", title: "Restaurant Website and Online Menu", description: "Build a responsive site for a family restaurant in Chattogram.", clientName: "Meghna Kitchen", category: "Web Development", minBudget: 10000, maxBudget: 25000, skills: ["HTML/CSS", "JavaScript"], deadline: "2027-01-28", status: "Open" },
            { id: "PRJ-1003", title: "Social Media Launch Campaign", description: "Create a month of launch content for a local skincare brand.", clientName: "Jui Organics", category: "Digital Marketing", minBudget: 4000, maxBudget: 12000, skills: ["SEO", "Photoshop"], deadline: "2027-02-02", status: "Open" },
            { id: "PRJ-1004", title: "Inventory Dashboard for a Small Business", description: "Develop a simple dashboard with stock alerts and sales summaries.", clientName: "Chattogram Traders", category: "Web Development", minBudget: 15000, maxBudget: 35000, skills: ["React", "Node.js"], deadline: "2027-02-10", status: "Open" },
            { id: "PRJ-1005", title: "Bengali Learning App Prototype", description: "Design a friendly mobile learning app prototype for children.", clientName: "Shobdo Learning", category: "Mobile App Dev", minBudget: 8000, maxBudget: 22000, skills: ["Figma", "UI/UX Design"], deadline: "2027-02-15", status: "Open" },
            { id: "PRJ-1006", title: "Short Product Video and Motion Graphics", description: "Edit a 45-second product explainer for a local electronics shop.", clientName: "Tech Bazar BD", category: "Video & Animation", minBudget: 6000, maxBudget: 18000, skills: ["Photoshop", "Video & Animation"], deadline: "2027-01-25", status: "Open" }
        ]);
    }
    var services = readStorage("sb_services", null);
    if (!Array.isArray(services)) {
        writeStorage("sb_services", [
            { id: "SRV-1001", freelancerId: "FRE-1001", title: "Responsive business website", category: "Web Development", description: "A clean, mobile-friendly site for a small business.", skills: ["HTML/CSS", "JavaScript"], price: 7500, deliveryDays: 7, revisions: "3", status: "Published" },
            { id: "SRV-1002", freelancerId: "FRE-1002", title: "Modern brand and social media kit", category: "Graphic Design", description: "A coordinated visual identity for a growing local brand.", skills: ["Figma", "Photoshop"], price: 5000, deliveryDays: 5, revisions: "2", status: "Published" }
        ]);
    }
    var proposals = readStorage("sb_proposals", null);
    if (!Array.isArray(proposals)) {
        writeStorage("sb_proposals", [
            { id: "PROP-1001", projectId: "PRJ-1001", freelancerId: "FRE-1002", proposedPrice: 9500, deliveryDays: 7, status: "Pending Client Review", submittedAt: "2026-11-10T09:00:00.000Z" },
            { id: "PROP-1002", projectId: "PRJ-1004", freelancerId: "FRE-1001", proposedPrice: 24000, deliveryDays: 12, status: "Shortlisted", submittedAt: "2026-11-12T10:00:00.000Z" }
        ]);
    }
}

if (typeof window !== "undefined") {
    seedDemoData();
}
