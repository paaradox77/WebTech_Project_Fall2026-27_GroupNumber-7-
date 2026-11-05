# Admin JavaScript Tasks

Create one file per page:

- [ ] `AdminLogin.js` - validate the Admin ID format and CAPTCHA answer.
- [ ] `AdminRegistration.js` - validate the official email, ID, role and at least one permission.
- [ ] `ManageUsers.js` - filter users, update statuses, confirm destructive actions and block self-suspension.
- [ ] `ManageCategories.js` - validate name length, unique code, duplicate names and image type.
- [ ] `GenerateReports.js` - validate report type, past-only dates, date order and the 366-day maximum.

Also:

- [ ] Use `addEventListener("submit", ...)` and `preventDefault()` on every form.
- [ ] Reuse the validators in `../JS/Common.js` instead of rewriting rules.
- [ ] Show mock users, categories and reports in tables with status badges.
- [ ] Save mock data in `localStorage` where the page needs persistence.
