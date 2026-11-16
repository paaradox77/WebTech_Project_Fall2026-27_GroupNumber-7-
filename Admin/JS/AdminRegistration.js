console.log("AdminRegistration.js Connected");

function validateAdminForm()
{
    let validName       = validateName("AdminName", "NameError");
    let validAdminID    = validatePattern("AdminID", "AdminIDError", "Admin ID", /^ADM-[0-9]{4}$/, "ADM-1234");
    let validEmail      = validateEmail("AdminEmail", "EmailError");
    let validPhone      = validatePhone("AdminPhone", "PhoneError");
    let validGender     = validateRadio("gender", "GenderError", "Gender");
    let validRole       = validateSelect("AdminRole", "RoleError", "Admin role");
    let validPermission = validateCheckbox("permission", "PermissionError", "permission", 1);
    let validUsername   = validateUsername("UserName", "UserNameError");
    let validPassword   = validatePassword("Password", "PasswordError");
    let validConfirm    = validateConfirmPassword("Password", "ConfirmPassword", "ConfirmError");

    let isValid = validName && validAdminID && validEmail && validPhone && validGender &&
                  validRole && validPermission && validUsername && validPassword && validConfirm;

    
    if (isValid)
    {
        let name = safeText(document.getElementById("AdminName").value.trim());
        showResult(true, "Admin " + name + " passed all validation checks!");
    }
    else
    {
        showResult(false);
    }

    return false;
}