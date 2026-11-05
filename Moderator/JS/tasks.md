# Moderator JavaScript Tasks

Create one file per page:

- [ ] `ModeratorLogin.js` - validate the Moderator ID format, password and CAPTCHA.
- [ ] `ModeratorRegistration.js` - validate the official email, ID, department and matching passwords.
- [ ] `ReviewReports.js` - require a report, decision, notes and a reason for restrictive decisions.
- [ ] `ManageDisputes.js` - check that the order exists, both parties are identified and notes are 50+ characters.
- [ ] `ReviewPayments.js` - validate the transaction and ensure the refund is not negative or above the original amount.

Also:

- [ ] Use `addEventListener("submit", ...)` and `preventDefault()` on every form.
- [ ] Reuse the validators in `../JS/Common.js` instead of rewriting rules.
- [ ] Show mock reports, disputes and transactions with status badges and decisions.
- [ ] Save mock moderation decisions in `localStorage` when persistence is needed.
