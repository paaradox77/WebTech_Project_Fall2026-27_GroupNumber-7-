console.log("ManageDepartment.js Connected");

// Department name: letters and spaces only, 3 - 30 characters
function validateDeptName()
{
    let name = document.getElementById("DeptName").value.trim();

    if (name === "")
    {
        showError("DeptNameError", "Please enter the department name");
        return false;
    }
    if (!/^[A-Za-z ]{3,30}$/.test(name))
    {
        showError("DeptNameError", "Use 3 - 30 letters and spaces only");
        return false;
    }
    clearError("DeptNameError");
    return true;
}

// Page-only rule: if ICU or IPD (in-patient) is ticked, the department needs at least 5 beds
function validateFacilities()
{
    if (!validateCheckbox("facility", "FacilityError", "facility", 1))
    {
        return false;
    }

    let boxes = document.querySelectorAll('input[name="facility"]');
    let needsBeds = false;

    for (let i = 0; i < boxes.length; i++)
    {
        if (boxes[i].checked && (boxes[i].value === "ICU" || boxes[i].value === "IPD"))
        {
            needsBeds = true;
        }
    }

    let bedsText = document.getElementById("Beds").value.trim();
    let beds = Number(bedsText);
    if (needsBeds && bedsText !== "" && beds < 5)     // empty beds box already shows its own error
    {
        showError("FacilityError", "ICU / IPD needs at least 5 beds (now " + beds + ")");
        return false;
    }
    return true;
}

// Called by <form onsubmit="return validateDepartmentForm()">
function validateDepartmentForm()
{
    let validCode        = validatePattern("DeptCode", "DeptCodeError", "Department code", /^[A-Z]{3}-[0-9]{2}$/, "CAR-01");
    let validName        = validateDeptName();
    let validHead        = validateName("HeadName", "HeadError");
    let validFloor       = validateNumber("Floor", "FloorError", "Floor no", 0, 15);
    let validBeds        = validateNumber("Beds", "BedsError", "Total beds", 0, 300);
    let validEmergency   = validateRadio("emergency", "EmergencyError", "Emergency option");
    let validFacilities  = validateFacilities();
    let validDescription = validateTextLength("Description", "DescriptionError", "Description", 20, 200);

    let isValid = validCode && validName && validHead && validFloor && validBeds &&
                  validEmergency && validFacilities && validDescription;

    if (isValid)
    {
        let name = safeText(document.getElementById("DeptName").value.trim());
        let code = document.getElementById("DeptCode").value.trim().toUpperCase();
        showResult(true, "Department " + name + " (" + code + ") passed all validation checks!");
    }
    else
    {
        showResult(false);
    }

    return false;   // validation-only project: no server yet
}

// Called by onreset: clear errors and set the character counter back to 0
function resetDepartmentForm()
{
    clearAllErrors();
    let counter = document.getElementById("DescCount");
    counter.innerHTML = "0 / 200 characters";
    counter.style.color = "";
}
