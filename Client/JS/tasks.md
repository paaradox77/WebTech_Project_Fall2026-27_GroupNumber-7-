# Client JavaScript Tasks

Create one file per page:

- [ ] `ClientLogin.js` - accept a valid email or Bangladesh phone, validate the password and track failed attempts.
- [ ] `ClientRegistration.js` - validate all fields, the phone format and duplicate email addresses.
- [ ] `PostProject.js` - validate title/description lengths, budget range, future deadline and selected skills.
- [ ] `HireFreelancer.js` - validate the selected freelancer, price, delivery date and agreement.
- [ ] `MakePayment.js` - validate the method, amount, mobile number, card with `validateLuhn`, expiry, CVV and confirmation.

Also:

- [ ] Use `addEventListener("submit", ...)` and `preventDefault()` on every form.
- [ ] Reuse the validators in `../JS/Common.js` instead of rewriting rules.
- [ ] Show/hide mobile banking or card fields based on the selected payment method.
- [ ] Save mock projects, hires and payments in `localStorage` with safe dummy data.
