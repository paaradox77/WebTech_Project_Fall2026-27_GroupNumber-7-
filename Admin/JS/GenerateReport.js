function validateFormat()
{
    let inputs = Array.from(document.querySelectorAll('input[type="radio"][name="format"]'));
    if (!adminValidateRadio("format", "FormatError", "File format"))
    {
        return false;
    }

    let format = getRadioValue("format");
    let chartsBox = document.querySelector('input[name="section"][value="Charts"]');

    if (format === "CSV" && chartsBox.checked)
    {
        adminSetError(inputs, "FormatError", "CSV cannot include charts. Choose PDF or Excel, or untick Charts.");
        return false;
    }
    inputs.forEach(function (input) { adminClearError(input, "FormatError"); });
    return true;
}

function validateReportForm()
{
    let validType = adminValidateSelect("ReportType", "ReportTypeError", "Report type");
    let validFrom = adminValidateDateWindow("FromDate", "FromError", "From date", -1825, 0);
    let validTo   = adminValidateDateWindow("ToDate", "ToError", "To date", -1825, 0);
    let validRange = false;
    if (validFrom && validTo)
    {
        validRange = adminValidateDateRange("FromDate", "ToDate", "ToError", 366);
    }

    let validSections = adminValidateCheckbox("section", "SectionError", "section", 2);
    let validFormat   = validateFormat();
    let validEmail    = adminValidateEmail("SendTo", "SendToError");

    let isValid = validType && validFrom && validTo && validRange &&
                  validSections && validFormat && validEmail;

    if (isValid)
    {
        let type = document.getElementById("ReportType").value;
        let from = document.getElementById("FromDate").value;
        let to = document.getElementById("ToDate").value;
        let days = daysBetween(from, to) + 1;
        adminShowResult(true, type + " report (" + from + " to " + to + ", " + days + " days, " +
                 getRadioValue("format") + ") is ready to generate.");
    }
    else
    {
        adminShowResult(false, "Please correct the highlighted fields.");
    }

    return false;
}
