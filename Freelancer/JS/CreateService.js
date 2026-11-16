function validateService() {
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let desc = document.getElementById("description").value;
    let price = parseFloat(document.getElementById("price").value);
    let time = document.getElementById("deliveryTime").value;
    let img = document.getElementById("imageFile").value;

    let isValid = true;

    document.getElementById("titleErr").innerHTML = (title.length < 10 || title.length > 100) ? "Title must be between 10 and 100 characters." : "";
    if (title.length < 10 || title.length > 100) isValid = false;

    document.getElementById("catErr").innerHTML = category === "" ? "Please select a category." : "";
    if (category === "") isValid = false;

    document.getElementById("descErr").innerHTML = desc.length < 100 ? "Description must be at least 100 characters." : "";
    if (desc.length < 100) isValid = false;

    document.getElementById("priceErr").innerHTML = (isNaN(price) || price <= 0) ? "Price must be greater than 0." : "";
    if (isNaN(price) || price <= 0) isValid = false;

    document.getElementById("timeErr").innerHTML = time === "" ? "Delivery time is required." : "";
    if (time === "") isValid = false;

    document.getElementById("imgErr").innerHTML = img === "" ? "Please upload an image." : "";
    if (img === "") isValid = false;

    if (!isValid) return false;

    alert("Service Created Successfully!");
    return true;
}