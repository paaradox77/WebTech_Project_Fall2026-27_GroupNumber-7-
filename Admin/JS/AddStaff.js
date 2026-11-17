function validateStaffDepartment()
{
    if (!adminValidateSelect("Department", "DepartmentError", "Department"))
    {
        return false;
    }

    let staffType = getRadioValue("stafftype");
    let department = document.getElementById("Department").value;

    if (staffType === "Platform Support Specialist" && department !== "Client Support")
    {
        adminSetError(document.getElementById("Department"), "DepartmentError", "A Platform Support Specialist must be assigned to Client Support.");
        return false;
    }
    if (staffType === "Trust & Safety Moderator" && department !== "Trust & Safety")
    {
        adminSetError(document.getElementById("Department"), "DepartmentError", "A Trust & Safety Moderator must be assigned to Trust & Safety.");
        return false;
    }
    if (staffType === "Operations Coordinator" && department !== "Platform Operations")
    {
        adminSetError(document.getElementById("Department"), "DepartmentError", "An Operations Coordinator must be assigned to Platform Operations.");
        return false;
    }
    if (staffType === "Finance Assistant" && department !== "Finance")
    {
        adminSetError(document.getElementById("Department"), "DepartmentError", "A Finance Assistant must be assigned to Finance.");
        return false;
    }
    adminClearError(document.getElementById("Department"), "DepartmentError");
    return true;
}

function validateStaffSalary()
{
    if (!adminValidateNumber("Salary", "SalaryError", "Salary", 10000, 500000, true))
    {
        return false;
    }

    let type = document.getElementById("EmploymentType").value;
    let salary = Number(document.getElementById("Salary").value);

    if (type === "Part-time" && salary > 100000)
    {
        adminSetError(document.getElementById("Salary"), "SalaryError", "Part-time monthly compensation cannot exceed 100000 BDT.");
        return false;
    }
    adminClearError(document.getElementById("Salary"), "SalaryError");
    return true;
}

function validateAddStaffForm()
{
    let validType       = adminValidateRadio("stafftype", "StaffTypeError", "Staff type");
    let validName       = adminValidateName("StaffName", "NameError", "Full name");
    let validEmail      = adminValidateEmail("StaffEmail", "EmailError");
    let validPhone      = adminValidatePhone("StaffPhone", "PhoneError");
    let validDepartment = validateStaffDepartment();
    let validEmployment = adminValidateSelect("EmploymentType", "EmploymentError", "Employment type");
    let validJoining    = adminValidateDateWindow("JoiningDate", "JoiningError", "Joining date", -3650, 30);
    let validSalary     = validateStaffSalary();

    let isValid = validType && validName && validEmail && validPhone && validDepartment &&
                  validEmployment && validJoining && validSalary;

    if (isValid)
    {
        let name = document.getElementById("StaffName").value.trim();
        let staffType = getRadioValue("stafftype");
        adminShowResult(true, staffType + " " + name + " passed validation and can be added to the staff list.");
    }
    else
    {
        adminShowResult(false, "Please correct the highlighted fields.");
    }

    return false;
}
