function validateProposal() {
    let cover = document.getElementById("coverLetter").value;
    let price = parseFloat(document.getElementById("proposedPrice").value);
    let days = parseInt(document.getElementById("deliveryDays").value);
    let url = document.getElementById("portfolioUrl").value;

    let isValid = true;

    document.getElementById("coverErr").innerHTML = cover.length < 50 ? "Cover letter must be at least 50 characters." : "";
    if (cover.length < 50) isValid = false;

    document.getElementById("priceErr").innerHTML = (isNaN(price) || price <= 0) ? "Please enter a valid proposed price." : "";
    if (isNaN(price) || price <= 0) isValid = false;

    document.getElementById("daysErr").innerHTML = (isNaN(days) || days < 1 || days > 90) ? "Delivery days must be between 1 and 90." : "";
    if (isNaN(days) || days < 1 || days > 90) isValid = false;

    document.getElementById("urlErr").innerHTML = url === "" ? "Portfolio URL is required." : "";
    if (url === "") isValid = false;

    if (!isValid) return false;

    alert("Proposal Submitted Successfully!");
    return true;
}