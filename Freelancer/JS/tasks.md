# Freelancer JavaScript Tasks

Create one file per page:

- [ ] `FreelancerLogin.js` - validate the login form, count failed attempts and lock the button for 30 seconds with `setInterval`.
- [ ] `FreelancerRegistration.js` - validate name, email, phone, date of birth (18+) and matching passwords.
- [ ] `CreateService.js` - enforce title length, description length, positive price and file rules.
- [ ] `BrowseProjects.js` - validate the budget range and apply search/category/skill filters.
- [ ] `SubmitProposal.js` - validate the cover letter, budget range, delivery days, URL and duplicate proposals.

Also:

- [ ] Use `addEventListener("submit", ...)` and `preventDefault()` on every form.
- [ ] Reuse the validators in `../JS/Common.js` instead of rewriting rules.
- [ ] Show inline errors plus a result box after submission.
- [ ] Save mock services and proposals in `localStorage` with safe dummy data.
