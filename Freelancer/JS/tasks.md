# Freelancer JavaScript Tasks

Create one file per page:

- [x] `FreelancerLogin.js` - validate the login form, count failed attempts and lock the button for 30 seconds with `setInterval`.
- [x] `FreelancerRegistration.js` - validate name, email, phone, date of birth (18+) and matching passwords.
- [x] `CreateService.js` - enforce title length, description length, positive price and file rules.
- [x] `BrowseProjects.js` - validate the budget range and apply search/category/skill filters.
- [x] `SubmitProposal.js` - validate the cover letter, budget range, delivery days, URL and duplicate proposals.

Also:

- [x] Use `addEventListener("submit", ...)` and `preventDefault()` on every form.
- [x] Reuse the validators in `../JS/Common.js` instead of rewriting rules.
- [x] Show inline errors plus a result box after submission.
- [x] Save mock services and proposals in `localStorage` with safe dummy data.
