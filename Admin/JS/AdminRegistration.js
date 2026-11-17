function validateAdminForm()
{
    let validName       = adminValidateName("AdminName", "NameError", "Full name");
    let validAdminID    = adminValidatePattern("AdminID", "AdminIDError", "Admin ID", /^ADM-[0-9]{4}$/i, "ADM-1234");
    let validEmail      = adminValidateEmail("AdminEmail", "EmailError");
    let validPhone      = adminValidatePhone("AdminPhone", "PhoneError");
    let validGender     = adminValidateRadio("gender", "GenderError", "Gender");
    let validRole       = adminValidateSelect("AdminRole", "RoleError", "Admin role");
    let validPermission = adminValidateCheckbox("permission", "PermissionError", "permission", 1);
    let validUsername   = adminValidateUsername("UserName", "UserNameError");
    let validPassword   = adminValidatePassword("Password", "PasswordError");
    let validConfirm    = adminValidateConfirmPassword("Password", "ConfirmPassword", "ConfirmError");

    let isValid = validName && validAdminID && validEmail && validPhone && validGender &&
                  validRole && validPermission && validUsername && validPassword && validConfirm;

    
    if (isValid)
    {
        let name = document.getElementById("AdminName").value.trim();
        adminShowResult(true, "Admin " + name + " passed all validation checks.");
    }
    else
    {
        adminShowResult(false, "Please correct the highlighted fields.");
    }

    return false;
}