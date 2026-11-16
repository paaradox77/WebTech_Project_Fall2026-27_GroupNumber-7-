console.log("GenerateReport.js Connected");


function validateFormat()
{
    if (!validateRadio("format", "FormatError", "File format"))
    {
        return false;
    }

    let format = getRadioValue("format");
    let chartsBox = document.querySelector('input[name="section"][value="Charts"]');

    if (format === "CSV" && chartsBox.checked)
    {
        showError("FormatError", "CSV cannot include charts. Choose PDF / Excel or untick Charts");
        return false;
    }
    return true;
}

// Called by <form onsubmit="return validateReportForm()">
function validateReportForm()
{
    let validType = validateSelect("ReportType", "ReportTypeError", "Report type");

    // Both dates: within the last 5 years (1825 days) and not in the future
    let validFrom = validateDateWindow("FromDate", "FromError", "From date", -1825, 0);
    let validTo   = validateDateWindow("ToDate", "ToError", "To date", -1825, 0);

    // Compare the two dates only when both are valid on their own
    let validRange = false;
    if (validFrom && validTo)
    {
        validRange = validateDateRange("FromDate", "ToDate", "ToError", 366);
    }

    let validSections = validateCheckbox("section", "SectionError", "section", 2);
    let validFormat   = validateFormat();
    let validEmail    = validateEmail("SendTo", "SendToError");

    let isValid = validType && validFrom && validTo && validRange &&
                  validSections && validFormat && validEmail;

    if (isValid)
    {
        let type = document.getElementById("ReportType").value;
        let from = document.getElementById("FromDate").value;
        let to = document.getElementById("ToDate").value;
        let days = daysBetween(makeDate(from), makeDate(to)) + 1;
        showResult(true, type + " report (" + from + " to " + to + ", " + days + " days, " +
                         getRadioValue("format") + ") is ready to generate!");
    }
    else
    {
        showResult(false);
    }

    return false;  
}
