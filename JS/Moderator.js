console.log("Connected");

let officialDomain = "@onelink.com";
let moderators = [
    { id: "MOD-1001", password: "mod12345" }
];

let reports = [
    { id: "RP-101", reporter: "Nadia Islam", reportedUser: "Tanvir Ahmed", category: "Fake profile", description: "The profile photo and name look copied from another person.", evidence: "https://example.com/evidence/101" },
    { id: "RP-102", reporter: "Karim Hossain", reportedUser: "Imran Hasan", category: "Harassment", description: "Sent rude messages after the order was cancelled.", evidence: "https://example.com/evidence/102" },
    { id: "RP-103", reporter: "Sadia Rahman", reportedUser: "Mitu Akter", category: "Scam", description: "Asked to be paid outside the platform.", evidence: "" },
    { id: "RP-104", reporter: "Rahim Uddin", reportedUser: "Farhana Yasmin", category: "Inappropriate content", description: "A product photo was not suitable.", evidence: "https://example.com/evidence/104" }
];

let orders = [
    { id: "ORD-2001", client: "Nadia Islam", freelancer: "Rahim Uddin", category: "Late Delivery", description: "The work came one week after the agreed date.", evidence: "https://example.com/chat/2001" },
    { id: "ORD-2002", client: "Karim Hossain", freelancer: "Sadia Rahman", category: "Work Quality", description: "The logo does not match the design brief.", evidence: "https://example.com/files/2002" },
    { id: "ORD-2003", client: "Mitu Akter", freelancer: "Tanvir Ahmed", category: "Incomplete Work", description: "Only 3 of the 5 pages were delivered.", evidence: "" },
    { id: "ORD-2004", client: "Farhana Yasmin", freelancer: "Imran Hasan", category: "Communication Problem", description: "The freelancer has not replied for two weeks.", evidence: "https://example.com/chat/2004" }
];

let payments = [
    { id: "TX-1001", orderId: "ORD-2001", client: "Nadia Islam", freelancer: "Rahim Uddin", amount: 1500, status: "Completed", refund: 1500 },
    { id: "TX-1002", orderId: "ORD-2002", client: "Karim Hossain", freelancer: "Sadia Rahman", amount: 2000, status: "Completed", refund: 500 },
    { id: "TX-1003", orderId: "ORD-2003", client: "Mitu Akter", freelancer: "Tanvir Ahmed", amount: 800, status: "Pending", refund: 800 },
    { id: "TX-1004", orderId: "ORD-2004", client: "Farhana Yasmin", freelancer: "Imran Hasan", amount: 1200, status: "Failed", refund: 1200 }
];

function showPage(PageName)
{
    document.getElementById("LoginPage").style.display = "none";
    document.getElementById("RegisterPage").style.display = "none";
    document.getElementById("ReviewPages").style.display = "none";
    document.getElementById("ReportsSection").style.display = "none";
    document.getElementById("DisputesSection").style.display = "none";
    document.getElementById("PaymentsSection").style.display = "none";

     document.getElementById("BtnReports").style.fontSize = "15px";
    document.getElementById("BtnDisputes").style.fontSize = "15px";
    document.getElementById("BtnPayments").style.fontSize = "15px";

    if(PageName === "Login")
    {
        document.getElementById("LoginPage").style.display = "flex";
    }
    else if(PageName === "Register")
    {
        document.getElementById("RegisterPage").style.display = "flex";
    }
    else
    {
        document.getElementById("ReviewPages").style.display = "flex";

         if(PageName === "Reports")
        {
            document.getElementById("ReportsSection").style.display = "block";
            document.getElementById("BtnReports").style.fontSize = "18px";
        }
        else if(PageName === "Disputes")
        {
            document.getElementById("DisputesSection").style.display = "block";
            document.getElementById("BtnDisputes").style.fontSize = "18px";
        }
        else if(PageName === "Payments")
        {
            document.getElementById("PaymentsSection").style.display = "block";
            document.getElementById("BtnPayments").style.fontSize = "18px";
        }
    }
}

function logOut()
{
    document.getElementById("LoginId").value = "";
    document.getElementById("LoginPassword").value = "";
    document.getElementById("LoginMessage").innerHTML = "";
    showPage("Login");
}

//Login
function validateLoginId()
{
    let LoginId = document.getElementById("LoginId").value.trim();
    let IdError = document.getElementById("LoginIdError");
    if(LoginId === "")
    {
        IdError.innerHTML = "Enter The Moderator ID";
        return false;
    }
    if(!isModeratorId(LoginId))
    {
        IdError.innerHTML = "Moderator ID must look like MOD-1234";
        return false;
    }
    IdError.innerHTML = "";
    return true;
}

function validateLoginPassword()
{
    let Password = document.getElementById("LoginPassword").value;
    let PasswordError = document.getElementById("LoginPasswordError");
    if(Password === "")
    {
        PasswordError.innerHTML = "Enter The Password";
        return false;
    }
    if(Password.length < 6)
    {
        PasswordError.innerHTML = "Password Must Be atleast 6 Char";
        return false;
    }
    PasswordError.innerHTML = "";
    return true;
}

function checkAccount()
{
    let LoginId = document.getElementById("LoginId").value.trim();
    let Password = document.getElementById("LoginPassword").value;
    let IdError = document.getElementById("LoginIdError");
    let PasswordError = document.getElementById("LoginPasswordError");

    let Position = findById(moderators, LoginId);
    if(Position === -1)
    {
        IdError.innerHTML = "This Moderator ID is not registered, please register first";
        return false;
    }
    if(moderators[Position].password !== Password)
    {
        PasswordError.innerHTML = "Wrong password";
        return false;
    }
    return true;
}

function collect_login()
{
    let validid = validateLoginId();
    let validpassword = validateLoginPassword();
    let Message = document.getElementById("LoginMessage");

    if(validid && validpassword && checkAccount())
    {
        document.getElementById("LoginPassword").value = "";
        Message.innerHTML = "";
        showPage("Reports");
    }
    else
    {
        Message.innerHTML = "Login failed, please check the red messages below";
        Message.style.color = "red";
    }
    return false;
}

//Registration
function validateRegName()
{
    let Name = document.getElementById("RegName").value.trim();
    let NameError = document.getElementById("RegNameError");
    if(Name === "")
    {
        NameError.innerHTML = "Enter The Name";
        return false;
    }
    if(Name.length < 3)
    {
        NameError.innerHTML = "Name Must Be atleast 3 Char";
        return false;
    }
    NameError.innerHTML = "";
    return true;
}

function validateRegEmail()
{
    let Email = document.getElementById("RegEmail").value.trim();
    let EmailError = document.getElementById("RegEmailError");
    if(Email === "")
    {
        EmailError.innerHTML = "Please Enter The Email";
        return false;
    }
    if(!isEmail(Email))
    {
        EmailError.innerHTML = "Please Enter The Email Again";
        return false;
    }
    if(Email.slice(Email.length - officialDomain.length) !== officialDomain)
    {
        EmailError.innerHTML = "Use your official email ending with " + officialDomain;
        return false;
    }
    EmailError.innerHTML = "";
    return true;
}

function validateRegId()
{
    let RegId = document.getElementById("RegId").value.trim();
    let IdError = document.getElementById("RegIdError");
    if(RegId === "")
    {
        IdError.innerHTML = "Enter The Moderator ID";
        return false;
    }
    if(!isModeratorId(RegId))
    {
        IdError.innerHTML = "Moderator ID must look like MOD-1234";
        return false;
    }
    IdError.innerHTML = "";
    return true;
}

function validateRegPassword()
{
    let Password = document.getElementById("RegPassword").value;
    let PasswordError = document.getElementById("RegPasswordError");
    if(Password === "")
    {
        PasswordError.innerHTML = "Enter The Password";
        return false;
    }
    if(Password.length < 6)
    {
        PasswordError.innerHTML = "Password Must Be atleast 6 Char";
        return false;
    }
    PasswordError.innerHTML = "";
    return true;
}

function validateRegConfirm()
{
    let Password = document.getElementById("RegPassword").value;
    let Confirm = document.getElementById("RegConfirm").value;
    let ConfirmError = document.getElementById("RegConfirmError");
    if(Confirm === "")
    {
        ConfirmError.innerHTML = "Enter the Password again";
        return false;
    }
    if(Confirm !== Password)
    {
        ConfirmError.innerHTML = "The two passwords do not match";
        return false;
    }
    ConfirmError.innerHTML = "";
    return true;
}

function collect_registration()
{
    let validname = validateRegName();
    let validemail = validateRegEmail();
    let validid = validateRegId();
    let validpassword = validateRegPassword();
    let validconfirm = validateRegConfirm();

    if(validname && validemail && validid && validpassword && validconfirm)
    {
        let RegId = document.getElementById("RegId").value.trim();
        let Password = document.getElementById("RegPassword").value;

         if(findById(moderators, RegId) !== -1)
        {
            document.getElementById("RegIdError").innerHTML = "This Moderator ID is already registered";
            return false;
        }

         moderators.push({ id: RegId, password: Password });
          document.getElementById("RegName").value = "";
        document.getElementById("RegEmail").value = "";
        document.getElementById("RegId").value = "";
        document.getElementById("RegPassword").value = "";
        document.getElementById("RegConfirm").value = "";
         document.getElementById("LoginId").value = RegId;
        document.getElementById("LoginPassword").value = "";
        let Message = document.getElementById("LoginMessage");
        Message.innerHTML = "Registration saved. Log in with " + RegId;
        Message.style.color = "green";
        showPage("Login");
    }
    return false;
}

