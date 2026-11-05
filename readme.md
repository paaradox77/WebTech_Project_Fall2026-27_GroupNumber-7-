# SkillBridge BD — Freelancing Marketplace (Web Technologies - JS Validation)

A Bangladesh-focused freelancing marketplace frontend built using HTML, CSS and Vanilla JavaScript.

**Four users, each in its own folder with 5 pages**, and every page contains at least one form validated using JavaScript.

`index.html` contains four buttons: Freelancer, Client, Admin and Moderator. Each button opens that user's Login page. The navigation menu at the top of every user page links to that user's 5 pages.

Visitors can browse the public website without logging in. They are not a separate registered user role.

Open `index.html` in a browser. No server is needed.

---

## 1. User Roles

| User | Responsibility |
|---|---|
| Freelancer | Provides services, finds projects, submits proposals and completes jobs |
| Client | Posts projects, hires freelancers, purchases services and manages orders |
| Admin | Manages the entire platform, users, categories, services and system settings |
| Moderator | Monitors freelancer-client interactions, reviews reports, handles disputes and supervises payment-related issues |

### Visitor (Public Access)

Visitors do not have a separate dashboard or user folder.

They can:
- Browse the homepage.
- Explore freelancers.
- Browse available services.
- View published projects.
- Search and filter listings.
- Register as a Freelancer or Client.
- Log in to an existing account.

---

## 2. Folder Structure

```text
SkillBridge-BD/
│
├── index.html
│
├── Design/
│   └── Style.css
│
├── Images/
│   ├── logo.png
│   ├── freelancer.png
│   ├── client.png
│   ├── admin.png
│   └── moderator.png
│
├── JS/
│   ├── Index.js
│   └── Common.js
│
├── Freelancer/
│   ├── FreelancerLogin.html
│   ├── FreelancerRegistration.html
│   ├── CreateService.html
│   ├── BrowseProjects.html
│   ├── SubmitProposal.html
│   │
│   └── JS/
│       ├── FreelancerLogin.js
│       ├── FreelancerRegistration.js
│       ├── CreateService.js
│       ├── BrowseProjects.js
│       └── SubmitProposal.js
│
├── Client/
│   ├── ClientLogin.html
│   ├── ClientRegistration.html
│   ├── PostProject.html
│   ├── HireFreelancer.html
│   ├── MakePayment.html
│   │
│   └── JS/
│       ├── ClientLogin.js
│       ├── ClientRegistration.js
│       ├── PostProject.js
│       ├── HireFreelancer.js
│       └── MakePayment.js
│
├── Admin/
│   ├── AdminLogin.html
│   ├── AdminRegistration.html
│   ├── ManageUsers.html
│   ├── ManageCategories.html
│   ├── GenerateReports.html
│   │
│   └── JS/
│       ├── AdminLogin.js
│       ├── AdminRegistration.js
│       ├── ManageUsers.js
│       ├── ManageCategories.js
│       └── GenerateReports.js
│
└── Moderator/
    ├── ModeratorLogin.html
    ├── ModeratorRegistration.html
    ├── ReviewReports.html
    ├── ManageDisputes.html
    ├── ReviewPayments.html
    │
    └── JS/
        ├── ModeratorLogin.js
        ├── ModeratorRegistration.js
        ├── ReviewReports.js
        ├── ManageDisputes.js
        └── ReviewPayments.js
```

**Total:**
- 4 user types.
- 20 user pages.
- 20 individual page JavaScript files.
- 1 shared CSS file.
- 1 shared validation JavaScript file.
- 1 homepage JavaScript file.

---

# 3. Pages and Their Special Validation Rules

## A. Freelancer (5 Pages)

The freelancer provides services and completes projects for clients.

| Page | Main Functionality | Special JavaScript Validation |
|---|---|---|
| FreelancerLogin.html | Freelancer login | Freelancer ID or email; password; login attempt counter; 30-second lock after 3 failed attempts |
| FreelancerRegistration.html | Create freelancer account | Full name, email, Bangladesh phone, date of birth (18+), password strength, confirm password, terms acceptance |
| CreateService.html | Publish a freelancing service | Service title 10–100 characters; category selection; description 100+ characters; price greater than 0; delivery time; image format and size |
| BrowseProjects.html | Browse and filter available projects | Minimum and maximum budget validation; category and skill filters; deadline filter; prevent minimum budget exceeding maximum |
| SubmitProposal.html | Apply for a client project | Cover letter 50+ characters; proposed budget within project budget range; delivery days 1–90; portfolio URL validation; duplicate proposal prevention |

### Freelancer Page Details

**1. Freelancer Login**
- Email or Freelancer ID.
- Password.
- Remember me.
- Show/hide password.

Special rule: After three consecutive failed login attempts, disable the login button for 30 seconds using `setInterval()`.

**2. Freelancer Registration**
- Full name.
- Email.
- Phone number.
- Date of birth.
- Professional title.
- Password.
- Confirm password.
- Terms and conditions.

Special rule: Freelancer must be at least 18 years old.

**3. Create Service**
- Service title.
- Category.
- Description.
- Service thumbnail.
- Skills.
- Starting price (BDT).
- Delivery time.
- Revision limit.

Special rule: Service title must be 10–100 characters, description at least 100 characters and price must be positive.

**4. Browse Projects**
- Search project.
- Select category.
- Minimum budget.
- Maximum budget.
- Required skill.
- Deadline.

Special rule: Minimum budget must not exceed maximum budget.

**5. Submit Proposal**
- Project selection.
- Cover letter.
- Proposed price.
- Delivery days.
- Portfolio URL.
- Additional information.

Special rule: Proposed price must fall within the selected project's budget range.

---

## B. Client (5 Pages)

The client hires freelancers and purchases services.

| Page | Main Functionality | Special JavaScript Validation |
|---|---|---|
| ClientLogin.html | Client login | Email or phone; password; login attempt counter |
| ClientRegistration.html | Create client account | Name, email, Bangladesh phone, company name (optional), password and confirm password |
| PostProject.html | Publish a new project | Title 10–100 characters; description 100+ characters; minimum/maximum budget; future deadline; at least one required skill |
| HireFreelancer.html | Select and hire a freelancer | Freelancer selection; project selection; agreed budget; delivery deadline; agreement checkbox |
| MakePayment.html | Simulated payment submission | Payment method selection; BDT amount; mobile banking or card fields; payment information validation |

### Client Page Details

**1. Client Login**
- Email or phone.
- Password.
- Remember me.

Special rule: Accept either a valid email address or a valid Bangladesh mobile number.

**2. Client Registration**
- Full name.
- Email.
- Phone number.
- Company name (optional).
- Password.
- Confirm password.

Special rule: Email must be unique in the mock user database.

**3. Post Project**
- Project title.
- Category.
- Description.
- Required skills.
- Minimum budget.
- Maximum budget.
- Deadline.
- Experience level.
- Project attachment.

Special rules:
- Minimum budget must be greater than zero.
- Maximum budget must be greater than or equal to minimum budget.
- Deadline must be in the future.
- At least one skill must be selected.
- Description must contain at least 100 characters.

**4. Hire Freelancer**
- Freelancer selection.
- Project/service selection.
- Agreed price.
- Delivery deadline.
- Terms and agreement checkbox.

Special rules:
- Freelancer must be selected.
- Agreed price must be greater than zero.
- Delivery date must be valid.
- Agreement must be checked.

**5. Make Payment**

Payment method selection:
- bKash.
- Nagad.
- Rocket.
- Card.

Special rules:
- Payment method is required.
- Amount must be greater than zero.
- Mobile banking number must be a valid Bangladesh mobile number.
- Card number must pass the Luhn algorithm.
- Expiry date must be in the future.
- CVV must contain the required number of digits.
- Payment confirmation checkbox must be checked.

**Important:** This page simulates payment validation only. No real money will be transferred.

---

## C. Admin (5 Pages)

The administrator controls the overall freelancing marketplace.

| Page | Main Functionality | Special JavaScript Validation |
|---|---|---|
| AdminLogin.html | Administrator login | Admin ID format (ADM-1234); password; math CAPTCHA generated using `Math.random()` |
| AdminRegistration.html | Create administrator account interface | Name, official email, admin ID, role, permission selection, password and confirmation |
| ManageUsers.html | Manage freelancers and clients | Search, role filtering, account status selection, confirmation before deactivation |
| ManageCategories.html | Create and manage service categories | Category name 3–40 characters; unique category code; image validation; duplicate category prevention |
| GenerateReports.html | Generate platform reports | Report type selection; valid date range; past-only dates; maximum range 366 days; export format selection |

### Admin Page Details

**1. Admin Login**
- Admin ID.
- Password.
- CAPTCHA.

Special rule: Admin ID must follow `ADM-1234` format.

A simple mathematical CAPTCHA should be generated on page load.

**2. Admin Registration**
- Full name.
- Official email.
- Admin ID.
- Admin role.
- Permissions.
- Password.
- Confirm password.

Special rule: At least one permission must be selected. In the frontend demonstration, administrator registration is simulated; real admin accounts would be created only by an authorized platform owner.

**3. Manage Users**
- Search users.
- Select user role.
- Filter by account status.
- Activate account.
- Suspend account.
- Deactivate account.

Special rule: Before changing an account's status, display a confirmation dialog. The Admin must not accidentally suspend their own account.

**4. Manage Categories**
- Category name.
- Category code.
- Category description.
- Category image.
- Category status.

Special rules:
- Category name must contain 3–40 characters.
- Category code must be unique.
- Duplicate categories are not allowed.
- Image must be a supported format.

**5. Generate Reports**
- Report type.
- Start date.
- End date.
- User type.
- Report format (CSV/PDF).

Special rules:
- Start date cannot be after end date.
- Both dates must be in the past.
- Date range cannot exceed 366 days.
- Report type must be selected.

---

## D. Moderator (5 Pages)

The moderator supervises interactions between freelancers and clients, monitors payment-related issues, handles complaints and ensures that platform rules are followed.

Unlike the Admin, the Moderator does not control the entire platform or manage administrator permissions.

| Page | Main Functionality | Special JavaScript Validation |
|---|---|---|
| ModeratorLogin.html | Moderator login | Moderator ID format (MOD-1234); password; CAPTCHA |
| ModeratorRegistration.html | Moderator account registration interface | Name, official email, moderator ID, department, password and confirmation |
| ReviewReports.html | Review user-submitted reports | Report ID validation; report category; evidence selection; decision and explanation required |
| ManageDisputes.html | Resolve conflicts between clients and freelancers | Order ID; dispute category; evidence requirement; decision selection; resolution explanation 50+ characters |
| ReviewPayments.html | Review payment and refund complaints | Transaction ID; payment status; amount verification; refund amount cannot exceed original amount; reason required |

### Moderator Page Details

**1. Moderator Login**
- Moderator ID.
- Password.
- CAPTCHA.
- Remember me.

Special rule: Moderator ID must follow `MOD-1234` format.

**2. Moderator Registration**
- Full name.
- Official email.
- Moderator ID.
- Department.
- Password.
- Confirm password.

Special rule: Moderator department must be selected. Real moderator accounts would require Admin authorization; registration here is a frontend demonstration.

**3. Review Reports**

The moderator reviews reports submitted by users.

Form fields:
- Report ID.
- Reporter.
- Reported user.
- Report category.
- Report description.
- Evidence URL.
- Moderation decision.
- Moderator notes.

Available decisions:
- No Violation.
- Warning Issued.
- Content Restricted.
- Content Removed.
- Account Suspended.
- Escalate to Admin.

Special rules:
- Report ID must be selected.
- Decision must be selected.
- Moderator notes are required.
- Evidence URL must be valid if provided.
- A reason is required for restrictive decisions.

**4. Manage Disputes**

The moderator handles disputes between clients and freelancers.

Form fields:
- Order ID.
- Client name.
- Freelancer name.
- Dispute category.
- Dispute description.
- Evidence URL.
- Dispute decision.
- Resolution notes.

Dispute categories:
- Work Quality.
- Late Delivery.
- Incomplete Work.
- Payment Issue.
- Communication Problem.
- Order Cancellation.
- Other.

Possible decisions:
- Resolve in Client's Favor.
- Resolve in Freelancer's Favor.
- Request More Evidence.
- Mutual Cancellation.
- Escalate to Admin.

Special rules:
- Order ID must exist in mock order data.
- Dispute category is required.
- Resolution notes must contain at least 50 characters.
- Additional evidence is required when requesting further investigation.
- Both client and freelancer must be identified.

**5. Review Payments**

The moderator investigates payment-related complaints.

Form fields:
- Transaction ID.
- Order ID.
- Client.
- Freelancer.
- Original payment amount.
- Payment status.
- Requested refund amount.
- Investigation decision.
- Investigation notes.

Possible decisions:
- Payment Verified.
- Payment Issue Detected.
- Refund Recommended.
- Refund Rejected.
- Escalate to Admin.

Special rules:
- Transaction ID must be valid.
- Payment amount must be greater than zero.
- Refund amount cannot exceed original payment amount.
- Refund amount cannot be negative.
- Investigation notes are required.
- A reason is mandatory when rejecting a refund.

**Important:** Moderators investigate and recommend or record decisions according to their permissions. Actual money transfers and payment-provider operations are outside the frontend project's scope. Financial execution and final administrative overrides belong to the authorized platform administration process.

---

# 4. Shared JavaScript Validation (Common.js)

All 20 pages will load the same `Common.js` file.

This file contains reusable validation functions to avoid writing the same validation code repeatedly.

### Core Validation Functions

| Function | Purpose |
|---|---|
| `validateRequired()` | Check empty fields |
| `validateEmail()` | Validate email format |
| `validatePhone()` | Validate Bangladesh phone number |
| `validatePassword()` | Validate password strength |
| `validateConfirmPassword()` | Match password and confirmation |
| `validateTextLength()` | Minimum and maximum character length |
| `validateNumber()` | Validate numeric values |
| `validateDecimal()` | Validate decimal numbers |
| `validateDate()` | Validate date input |
| `validateDateWindow()` | Check date within a specified period |
| `validateDateRange()` | Compare start and end dates |
| `validateTime()` | Validate time input |
| `validateURL()` | Validate website URLs |
| `validateFile()` | Validate file type and size |
| `validateCheckbox()` | Validate checkbox selection |
| `validateSelect()` | Validate dropdown selection |
| `validateDifferent()` | Ensure two values are different |
| `validateRange()` | Check minimum and maximum values |
| `validateBangladeshID()` | Validate ADM/MOD/FRE/CLI ID patterns |
| `validateLuhn()` | Validate card number |
| `showCharCount()` | Display live character count |
| `togglePassword()` | Show/hide password |
| `getRadioValue()` | Retrieve selected radio value |
| `getToday()` | Get today's date |
| `daysBetween()` | Calculate difference between dates |
| `timeToMinutes()` | Convert time to minutes |

### Additional Helper Functions

- `showError()`
- `clearError()`
- `showSuccess()`
- `showToast()`
- `confirmAction()`
- `getRadioValue()`
- `getFormData()`

### Validation UI Rules

Every form should support:

- Red border for invalid inputs.
- Green border for valid inputs.
- Error messages below the relevant fields.
- Live validation when appropriate.
- Character counters for long text fields.
- Success notifications after submission.
- Submission blocked when validation fails.

---

# 5. Shared CSS (Style.css)

All pages use the same stylesheet.

Different body classes will provide different dashboard color themes.

| User | Suggested Theme |
|---|---|
| Freelancer | Blue |
| Client | Purple |
| Admin | Dark Navy |
| Moderator | Teal |

Shared components:
- Navigation menu.
- Dashboard header.
- Form containers.
- Input fields.
- Select dropdowns.
- Textareas.
- Checkboxes.
- Radio buttons.
- Buttons.
- Tables.
- Cards.
- Status badges.
- Error messages.
- Success messages.
- Modal dialogs.

---

# 6. JavaScript Loading Rules

Each page loads:

1. Shared CSS.
2. Shared `Common.js`.
3. Its own page-specific JavaScript file.

Example for `Freelancer/FreelancerLogin.html`:

```html
<link rel="stylesheet" href="../Design/Style.css">

<script src="../JS/Common.js"></script>
<script src="JS/FreelancerLogin.js"></script>
```

Example for `Client/MakePayment.html`:

```html
<link rel="stylesheet" href="../Design/Style.css">

<script src="../JS/Common.js"></script>
<script src="JS/MakePayment.js"></script>
```

Every page-specific JavaScript file should contain the validation and interaction logic for that page only.

---

# 7. GET and POST Concepts

Although there is no backend, the project should demonstrate the concepts of GET and POST through frontend interactions.

### GET Concept

Used to retrieve and display information.

Examples:
- Display all freelancers.
- Display available projects.
- Search services.
- Filter categories.
- View submitted proposals.
- View transaction records.

### POST Concept

Used to submit new information.

Examples:
- Register a user.
- Create a service.
- Publish a project.
- Submit a proposal.
- Make a simulated payment.
- Submit a dispute.
- Submit a moderation decision.

All operations will be simulated using JavaScript arrays and LocalStorage.

---

# 8. Important Development Rules

1. Use only HTML5, CSS3 and Vanilla JavaScript.
2. No backend is required.
3. No React, Vue, Angular or other frontend frameworks.
4. Every user must have exactly 5 pages.
5. Every page must contain at least one functional form.
6. Every form must have JavaScript validation.
7. Use `addEventListener()` for form submission.
8. Use `preventDefault()` to prevent normal form submission.
9. Keep CSS and JavaScript in separate files.
10. Reuse validation functions from `Common.js`.
11. Each page must have its own JavaScript file.
12. All buttons must perform their intended frontend action.
13. All navigation links must work.
14. Use LocalStorage for simulated data persistence.
15. Use confirmation dialogs before destructive actions.
16. Use different dashboard themes for each user.
17. Use mock data for users, projects, services, orders and transactions.
18. Do not store real passwords or payment information.
19. Visitors can access public pages without logging in.
20. Role-based navigation should prevent ordinary users from accessing other dashboards in the demonstration.

---

# 9. Sample Valid Data

| Field | Example |
|---|---|
| Freelancer ID | FRE-1001 |
| Client ID | CLI-1001 |
| Admin ID | ADM-1234 |
| Moderator ID | MOD-1234 |
| Email | rahim@example.com |
| Bangladesh Phone | 01712345678 |
| Password | Abcdef12 |
| Service Price | 2500 BDT |
| Project Budget | 5000–15000 BDT |
| Delivery Time | 7 Days |
| Order ID | ORD-000123 |
| Transaction ID | TXN-000123 |
| Dispute ID | DSP-000123 |
| Report ID | RPT-000123 |

---

# 10. Final Project Requirements

At completion, the project should contain:

- 1 public homepage.
- 4 user types.
- 5 pages per user.
- 20 user-specific HTML pages.
- 20 page-specific JavaScript files.
- 1 shared JavaScript validation file.
- 1 shared CSS file.
- Functional forms on all 20 pages.
- Reusable validation functions.
- Form submission handling.
- DOM manipulation.
- Conditional form sections.
- Search and filtering.
- Tables and status management.
- Simulated user workflows.
- Responsive layouts.

**Main objective:** Build a connected, interactive Bangladesh-focused freelancing marketplace that demonstrates HTML forms, CSS styling, JavaScript validation, DOM manipulation, event handling, conditional rendering and frontend data management.

The project should be simple enough for a Web Technologies academic assignment while providing realistic workflows for freelancers, clients, administrators and moderators.