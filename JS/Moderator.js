console.log("Connected");

let officialDomain = "@onelink.com";
let moderators = [
    { id: "MOD-1001", password: "mod12345" }
];

let reports = [
    { id: "RP-101", reporter: "Nadia Islam", reportedUser: "Tanvir Ahed", category: "Fake profile", description: "The profile photo and name look copied from another person.", evidence: "https://example.com/evidence/101" },
    { id: "RP-102", reporter: "Karim Hossain", reportedUser: "Imran Hasan", category: "Harassment", description: "Sent rude messages after the order was cancelled.", evidence: "https://example.com/evidence/102" },
    { id: "RP-103", reporter: "Sadia Rahman", reportedUser: "Mitu Akter", category: "Scam", description: "Asked to be paid outside the platform.", evidence: "" },
    { id: "RP-104", reporter: "Rahim Uddin", reportedUser: "Farhana Yasmin", category: "Inappropriate content", description: "A product photo was not suitable.", evidence: "https://example.com/evidence/104" }
];

let orders = [
    { id: "ORD-2001", client: "Nadia Islam", freelancer: "Rahim Uddin", category: "Late Delivery", description: "The work came one week after the agreed date.", evidence: "https://example.com/chat/2001" },
    { id: "ORD-2002", client: "Karim Hossain", freelancer: "Sadia Rahman", category: "Work Quality", description: "The logo does not match the design brief.", evidence: "https://example.com/files/2002" },
    { id: "ORD-2003", client: "Mitu Akter", freelancer: "Tavir Ahmed", category: "Incomplete Work", description: "Only 3 of the 5 pages were delivered.", evidence: "" },
    { id: "ORD-2004", client: "Farhana Yasmin", freelancer: "Imran Hasan", category: "Communication Problem", description: "The freelancer has not replied for two weeks.", evidence: "https://example.com/chat/2004" }
];

let payments = [
    { id: "TX-1001", orderId: "ORD-2001", client: "Nadia Islam", freelancer: "Rahim Uddin", amount: 1500, status: "Completed", refund: 1500 },
    { id: "TX-1002", orderId: "ORD-2002", client: "Karim Hossain", freelancer: "Sadia Rahman", amount: 2000, status: "Completed", refund: 500 },
    { id: "TX-1003", orderId: "ORD-2003", client: "Mit Akter", freelancer: "Tanvir Ahmed", amount: 800, status: "Pending", refund: 800 },
    { id: "TX-1004", orderId: "ORD-2004", client: "Farhana Yasmin", freelancer: "Imran Hasan", amount: 1200, status: "Failed", refund: 1200 }
];

function showPage(PageName)
{
    document.getElementById("LoginPage").style.display = "none";
    document.getElementById("RegisterPage").style.display = "none";
    document.getElementById("ReviewPages").style.display = "none";
    document.getElementById("ReportsSection").style.display = "none";
    document.getElementById("DisputesSection").style.display = "none";
    document.getElementById("PaymentsSection").style.display = "nne";

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
            document.getElementById("BtnReports").style.fontSize = "20px";
        }
        else if(PageName === "Disputes")
        {
            document.getElementById("DisputesSection").style.display = "block";
            document.getElementById("BtnDisputes").style.fontSize = "18px";
        }
        else if(PageName === "Payments")
        {
            document.getElementById("PaymentsSection").style.display = "block";
            document.getElementById("BtnPayment").style.fontSize = "18px";
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
