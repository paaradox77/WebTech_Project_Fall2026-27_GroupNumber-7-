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

//Review Report
function showReport()
{
    let ReportId = document.getElementById("ReportId").value;
    let Position = findById(reports, ReportId);

    if(Position === -1)
    {
        document.getElementById("Reporter").value = "";
        document.getElementById("ReportedUser").value = "";
        document.getElementById("ReportCategory").value = "";
        document.getElementById("ReportDescription").value = "";
        document.getElementById("EvidenceUrl").value = "";
    }
    else
    {
        document.getElementById("Reporter").value = reports[Position].reporter;
        document.getElementById("ReportedUser").value = reports[Position].reportedUser;
        document.getElementById("ReportCategory").value = reports[Position].category;
        document.getElementById("ReportDescription").value = reports[Position].description;
        document.getElementById("EvidenceUrl").value = reports[Position].evidence;
    }
}

function validateReportId()
{
    let ReportId = document.getElementById("ReportId").value;
    let IdError = document.getElementById("ReportIdError");
    if(ReportId === "")
    {
        IdError.innerHTML = "Please select a Report ID";
        return false;
    }
    IdError.innerHTML = "";
    return true;
}

function validateEvidence()
{
    let Url = document.getElementById("EvidenceUrl").value.trim();
    let UrlError = document.getElementById("EvidenceError");
    if(Url !== "" && !isUrl(Url))
    {
        UrlError.innerHTML = "The URL must start with http:// or https://";
        return false;
    }
    UrlError.innerHTML = "";
    return true;
}

function validateReportDecision()
{
    let Decision = document.getElementById("ReportDecision").value;
    let DecisionError = document.getElementById("ReportDecisionError");
    if(Decision === "")
    {
        DecisionError.innerHTML = "Please select a decision";
        return false;
    }
    DecisionError.innerHTML = "";
    return true;
}

function validateReportNotes()
{
    let Notes = document.getElementById("ReportNotes").value.trim();
    let Decision = document.getElementById("ReportDecision").value;
    let NotesError = document.getElementById("ReportNotesError");
    if(Notes === "")
    {
        NotesError.innerHTML = "Enter The Moderator notes";
        return false;
    }
    if(Decision === "Content Restricted" || Decision === "Content Removed" || Decision === "Account Suspended")
    {
        if(Notes.length < 10)
        {
            NotesError.innerHTML = "A reason is required for this decision, Atleast 10 Char";
            return false;
        }
    }
    NotesError.innerHTML = "";
    return true;
}

function collect_report()
{
    let validid = validateReportId();
    let validevidence = validateEvidence();
    let validdecision = validateReportDecision();
    let validnotes = validateReportNotes();
    let Message = document.getElementById("ReportMessage");

    if(validid && validevidence && validdecision && validnotes)
    {
        let ReportId = document.getElementById("ReportId").value;
        let Decision = document.getElementById("ReportDecision").value;
 let Status = "Reviewed";
        if(Decision === "Escalate to Admin")
        {
            Status = "Escalated";
        }
        let Position = findById(reports, ReportId);
        document.getElementById("ReportStatus" + Position).innerHTML = Status;
        document.getElementById("ReportStatus" + Position).style.color = "green";

        Message.innerHTML = "Decision saved for " + ReportId + " (a recommendation only)";
        Message.style.color = "green";
    }
    else
    {
        Message.innerHTML = "";
    }
    return false;
}

function clearReport()
{
    document.getElementById("ReportIdError").innerHTML = "";
    document.getElementById("EvidenceError").innerHTML = "";
    document.getElementById("ReportDecisionError").innerHTML = "";
    document.getElementById("ReportNotesError").innerHTML = "";
    document.getElementById("ReportMessage").innerHTML = "";
}

//Disputes

function showOrder()
{
    let OrderId = document.getElementById("OrderId").value;
    let Position = findById(orders, OrderId);

    if(Position === -1)
    {
        document.getElementById("ClientName").value = "";
        document.getElementById("FreelancerName").value = "";
        document.getElementById("DisputeCategory").value = "";
        document.getElementById("DisputeDescription").value = "";
        document.getElementById("DisputeEvidence").value = "";
    }
    else
    {
        document.getElementById("ClientName").value = orders[Position].client;
        document.getElementById("FreelancerName").value = orders[Position].freelancer;
        document.getElementById("DisputeCategory").value = orders[Position].category;
        document.getElementById("DisputeDescription").value = orders[Position].description;
        document.getElementById("DisputeEvidence").value = orders[Position].evidence;
    }
}

function validateOrderId()
{
    let OrderId = document.getElementById("OrderId").value;
    let IdError = document.getElementById("OrderIdError");
    if(OrderId === "")
    {
        IdError.innerHTML = "Please select an Order ID";
        return false;
    }
    IdError.innerHTML = "";
    return true;
}

function validateClient()
{
    let Client = document.getElementById("ClientName").value.trim();
    let ClientError = document.getElementById("ClientError");
    if(Client === "")
    {
        ClientError.innerHTML = "Enter the client name";
        return false;
    }
    ClientError.innerHTML = "";
    return true;
}

function validateFreelancer()
{
    let Freelancer = document.getElementById("FreelancerName").value.trim();
    let FreelancerError = document.getElementById("FreelancerError");
    if(Freelancer === "")
    {
        FreelancerError.innerHTML = "Enter the freelancer name";
        return false;
    }
    FreelancerError.innerHTML = "";
    return true;
}

function validateDisputeCategory()
{
    let Category = document.getElementById("DisputeCategory").value;
    let CategoryError = document.getElementById("DisputeCategoryError");
    if(Category === "")
    {
        CategoryError.innerHTML = "Please select a dispute category";
        return false;
    }
    CategoryError.innerHTML = "";
    return true;
}

function validateDisputeEvidence()
{
    let Url = document.getElementById("DisputeEvidence").value.trim();
    let Decision = document.getElementById("DisputeDecision").value;
    let UrlError = document.getElementById("DisputeEvidenceError");
    if(Url === "" && Decision === "Request More Evidence")
    {
        UrlError.innerHTML = "Evidence URL is required when requesting more evidence";
        return false;
    }
    if(Url !== "" && !isUrl(Url))
    {
        UrlError.innerHTML = "The URL must start with http:// or https://";
        return false;
    }
    UrlError.innerHTML = "";
    return true;
}

function validateDisputeDecision()
{
    let Decision = document.getElementById("DisputeDecision").value;
    let DecisionError = document.getElementById("DisputeDecisionError");
    if(Decision === "")
    {
        DecisionError.innerHTML = "Please select a decision";
        return false;
    }
    DecisionError.innerHTML = "";
    return true;
}

function validateDisputeNotes()
{
    let Notes = document.getElementById("DisputeNotes").value.trim();
    let NotesError = document.getElementById("DisputeNotesError");
    if(Notes.length < 10)
    {
        NotesError.innerHTML = "Resolution notes Must Be atleast 10 Char";
        return false;
    }
    NotesError.innerHTML = "";
    return true;
}

function collect_dispute()
{
    let validid = validateOrderId();
    let validclient = validateClient();
    let validfreelancer = validateFreelancer();
    let validcategory = validateDisputeCategory();
    let validevidence = validateDisputeEvidence();
    let validdecision = validateDisputeDecision();
    let validnotes = validateDisputeNotes();
    let Message = document.getElementById("DisputeMessage");

    if(validid && validclient && validfreelancer && validcategory && validevidence && validdecision && validnotes)
    {
        let OrderId = document.getElementById("OrderId").value;
        let Decision = document.getElementById("DisputeDecision").value;

        let Status = "Resolved";
        if(Decision === "Request More Evidence")
        {
            Status = "Evidence Requested";
        }
        if(Decision === "Escalate to Admin")
        {
            Status = "Escalated";
        }
        let Position = findById(orders, OrderId);
        document.getElementById("DisputeStatus" + Position).innerHTML = Status;
        document.getElementById("DisputeStatus" + Position).style.color = "green";

        Message.innerHTML = "Decision saved for " + OrderId + " (a recommendation only)";
        Message.style.color = "green";
    }
    else
    {
        Message.innerHTML = "";
    }
    return false;
}

function clearDispute()
{
    document.getElementById("OrderIdError").innerHTML = "";
    document.getElementById("ClientError").innerHTML = "";
    document.getElementById("FreelancerError").innerHTML = "";
    document.getElementById("DisputeCategoryError").innerHTML = "";
    document.getElementById("DisputeEvidenceError").innerHTML = "";
    document.getElementById("DisputeDecisionError").innerHTML = "";
    document.getElementById("DisputeNotesError").innerHTML = "";
    document.getElementById("DisputeMessage").innerHTML = "";
}

//Payments

function showTransaction()
{
    let TransactionId = document.getElementById("TransactionId").value;
    let Position = findById(payments, TransactionId);

    if(Position === -1)
    {
        document.getElementById("PayOrderId").value = "";
        document.getElementById("PayClient").value = "";
        document.getElementById("PayFreelancer").value = "";
        document.getElementById("OriginalAmount").value = "";
        document.getElementById("PaymentStatus").value = "";
        document.getElementById("RefundAmount").value = "";
    }
    else
    {
        document.getElementById("PayOrderId").value = payments[Position].orderId;
        document.getElementById("PayClient").value = payments[Position].client;
        document.getElementById("PayFreelancer").value = payments[Position].freelancer;
        document.getElementById("OriginalAmount").value = payments[Position].amount;
        document.getElementById("PaymentStatus").value = payments[Position].status;
        document.getElementById("RefundAmount").value = payments[Position].refund;
    }
}

function validateTransactionId()
{
    let TransactionId = document.getElementById("TransactionId").value;
    let IdError = document.getElementById("TransactionError");
    if(TransactionId === "")
    {
        IdError.innerHTML = "Please select a Transaction ID";
        return false;
    }
    IdError.innerHTML = "";
    return true;
}

function validateOriginal()
{
    let AmountText = document.getElementById("OriginalAmount").value.trim();
    let AmountError = document.getElementById("OriginalError");
    if(AmountText === "")
    {
        AmountError.innerHTML = "Enter The Original Amount";
        return false;
    }
    if(AmountText * 1 <= 0)
    {
        AmountError.innerHTML = "The amount must be more than 0";
        return false;
    }
    AmountError.innerHTML = "";
    return true;
}

function validateRefund()
{
    let RefundText = document.getElementById("RefundAmount").value.trim();
    let AmountText = document.getElementById("OriginalAmount").value.trim();
    let RefundError = document.getElementById("RefundError");
    if(RefundText === "")
    {
        RefundError.innerHTML = "Enter The Requested Refund";
        return false;
    }
    if(RefundText * 1 < 0)
    {
        RefundError.innerHTML = "The refund cannot be less than 0";
        return false;
    }
    if(AmountText !== "" && RefundText * 1 > AmountText * 1)
    {
        RefundError.innerHTML = "The refund cannot be more than the original amount";
        return false;
    }
    RefundError.innerHTML = "";
    return true;
}

function validatePaymentDecision()
{
    let Decision = document.getElementById("PaymentDecision").value;
    let DecisionError = document.getElementById("PaymentDecisionError");
    if(Decision === "")
    {
        DecisionError.innerHTML = "Please select a decision";
        return false;
    }
    DecisionError.innerHTML = "";
    return true;
}

function validatePaymentNotes()
{
    let Notes = document.getElementById("PaymentNotes").value.trim();
    let Decision = document.getElementById("PaymentDecision").value;
    let NotesError = document.getElementById("PaymentNotesError");
    if(Notes === "")
    {
        NotesError.innerHTML = "Enter The Investigation notes";
        return false;
    }
    if(Decision === "Refund Rejected" && Notes.length < 10)
    {
        NotesError.innerHTML = "A reason is required to reject a refund, Atleast 10 Char";
        return false;
    }
    NotesError.innerHTML = "";
    return true;
}

function collect_payment()
{
    let validid = validateTransactionId();
    let validamount = validateOriginal();
    let validrefund = validateRefund();
    let validdecision = validatePaymentDecision();
    let validnotes = validatePaymentNotes();
    let Message = document.getElementById("PaymentMessage");

    if(validid && validamount && validrefund && validdecision && validnotes)
    {
        let TransactionId = document.getElementById("TransactionId").value;
        let Decision = document.getElementById("PaymentDecision").value;
 let Status = "Reviewed";
        if(Decision === "Escalate to Admin")
        {
            Status = "Escalated";
        }
        let Position = findById(payments, TransactionId);
        document.getElementById("TransactionStatus" + Position).innerHTML = Status;
        document.getElementById("TransactionStatus" + Position).style.color = "green";

        Message.innerHTML = "Decision saved for " + TransactionId + ". No money was moved.";
        Message.style.color = "green";
    }
    else
    {
        Message.innerHTML = "";
    }
    return false;
}

function clearPayment()
{
    document.getElementById("TransactionError").innerHTML = "";
    document.getElementById("OriginalError").innerHTML = "";
    document.getElementById("RefundError").innerHTML = "";
    document.getElementById("PaymentDecisionError").innerHTML = "";
    document.getElementById("PaymentNotesError").innerHTML = "";
    document.getElementById("PaymentMessage").innerHTML = "";
}


