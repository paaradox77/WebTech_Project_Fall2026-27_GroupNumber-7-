function validateDeptName()
{
    let input = document.getElementById("DeptName");
    let name = input.value.trim();
    if (!validateRequired(name))
    {
        adminSetError(input, "DeptNameError", "Please enter the category name.");
        return false;
    }
    if (!/^[A-Za-z0-9 &\/.-]{3,40}$/.test(name))
    {
        adminSetError(input, "DeptNameError", "Use 3 to 40 letters, numbers, spaces, or basic punctuation.");
        return false;
    }
    adminClearError(input, "DeptNameError");
    return true;
}

function validateCategorySkills()
{
    if (!adminValidateCheckbox("facility", "FacilityError", "related skill", 1))
    {
        return false;
    }
    return true;
}

function validateBudgetRange()
{
    let minimum = Number(document.getElementById("Floor").value);
    let maximumInput = document.getElementById("Beds");
    let maximum = Number(maximumInput.value);
    if (maximum < minimum)
    {
        adminSetError(maximumInput, "BedsError", "Maximum budget must be equal to or greater than the minimum budget.");
        return false;
    }
    return true;
}

function validateCategoryForm()
{
    let validCode        = adminValidatePattern("DeptCode", "DeptCodeError", "Category code", /^[A-Z]{3}-\d{2}$/i, "WEB-01");
    let validName        = validateDeptName();
    let validHead        = adminValidateName("HeadName", "HeadError", "Category lead");
    let validMinimum     = adminValidateNumber("Floor", "FloorError", "Minimum typical budget", 500, 500000, true);
    let validMaximum     = adminValidateNumber("Beds", "BedsError", "Maximum typical budget", 500, 5000000, true);
    let validBudget      = validMinimum && validMaximum && validateBudgetRange();
    let validStatus      = adminValidateRadio("emergency", "EmergencyError", "Category status");
    let validSkills      = validateCategorySkills();
    let validDescription = adminValidateTextLength("Description", "DescriptionError", "Category description", 20, 200);

    let isValid = validCode && validName && validHead && validMinimum && validMaximum &&
                  validBudget && validStatus && validSkills && validDescription;

    if (isValid)
    {
        let name = document.getElementById("DeptName").value.trim();
        let code = document.getElementById("DeptCode").value.trim().toUpperCase();
        adminShowResult(true, "Service category " + name + " (" + code + ") passed all validation checks.");
    }
    else
    {
        adminShowResult(false, "Please correct the highlighted fields.");
    }

    return false;
}

function resetCategoryForm()
{
    adminClearFormErrors();
    let counter = document.getElementById("DescCount");
    counter.textContent = "0 / 200 characters";
    counter.classList.remove("char-count-met", "char-count-over");
}
