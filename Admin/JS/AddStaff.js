console.log("AddStaff.js Connected");


function validateStaffDepartment()
{
    if (!validateSelect("Department", "DepartmentError", "Department"))
    {
        return false;
    }

    let staffType = getRadioValue("stafftype");
    let department = document.getElementById("Department").value;

    if (staffType === "Receptionist" && department !== "Front Desk")
    {
        showError("DepartmentError", "A receptionist must be placed at the Front Desk");
        return false;
    }
    if (staffType === "Lab Technician" && department !== "Pathology Lab")
    {
        showError("DepartmentError", "A lab technician must be placed in the Pathology Lab");
        return false;
    }
    if ((staffType === "Doctor" || staffType === "Nurse") &&
        (department === "Front Desk" || department === "Pathology Lab"))
    {
        showError("DepartmentError", "A " + staffType.toLowerCase() + " must be placed in a clinical department");
        return false;
    }
    return true;
}

// Page-only rule: part-time staff salary cannot be more than 100000
function validateStaffSalary()
{
    if (!validateNumber("Salary", "SalaryError", "Salary", 10000, 500000))
    {
        return false;
    }

    let type = document.getElementById("EmploymentType").value;
    let salary = Number(document.getElementById("Salary").value);

    if (type === "Part-time" && salary > 100000)
    {
        showError("SalaryError", "Part-time salary cannot be more than 100000 BDT");
        return false;
    }
    return true;
}

// Called by <form onsubmit="return validateAddStaffForm()">
function validateAddStaffForm()
{
    let validType       = validateRadio("stafftype", "StaffTypeError", "Staff type");
    let validName       = validateName("StaffName", "NameError");
    let validEmail      = validateEmail("StaffEmail", "EmailError");
    let validPhone      = validatePhone("StaffPhone", "PhoneError");
    let validDepartment = validateStaffDepartment();
    let validEmployment = validateSelect("EmploymentType", "EmploymentError", "Employment type");
    let validJoining    = validateDateWindow("JoiningDate", "JoiningError", "Joining date", -3650, 30);
    let validSalary     = validateStaffSalary();

    let isValid = validType && validName && validEmail && validPhone && validDepartment &&
                  validEmployment && validJoining && validSalary;

    if (isValid)
    {
        let name = safeText(document.getElementById("StaffName").value.trim());
        let staffType = getRadioValue("stafftype");
        showResult(true, staffType + " " + name + " can be added to the staff list!");
    }
    else
    {
        showResult(false);
    }

    return false; //Server not available
}
