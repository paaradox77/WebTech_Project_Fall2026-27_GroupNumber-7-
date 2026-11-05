SkillBridge BD — Team Task Distribution

The project will be divided among 4 team members, with each person responsible for one complete user role. 

Each member will develop their own 5 HTML pages, 5 JavaScript validation files, and role-specific functionality.

Jubayer Ahamed — Admin Module
Jami Mohammad Jishan — Freelancer Module
Lameya Nourin — Client Module
Fatema Abdden - Moderator Module




Jami Mohammad Jishan
 Freelancer

Responsibility: Everything a freelancer needs to find work, publish services, and submit proposals.
No.	HTML Page	Main Tasks
1	FreelancerLogin.html	Login form, email validation, password validation, show/hide password
2	FreelancerRegistration.html	Registration form, personal details, email, phone, password and confirmation validation
3	CreateService.html	Create a service, title, description, category, price, delivery time and image upload validation
4	BrowseProjects.html	Display available projects, search, category filter, budget filter and sorting
5	SubmitProposal.html	Submit project proposal, cover letter, proposed budget and delivery-time validation

JavaScript files:
    - FreelancerLogin.js
    - FreelancerRegistration.js
    - CreateService.js
    - BrowseProjects.js
    - SubmitProposal.js
Specific responsibilities:
    - Freelancer dashboard/navigation.
    - Freelancer profile and service-related mock data.
    - Proposal submission and validation.
    - Displaying available projects.
    - Freelancer-specific UI styling.


Lameya Nourin — Client Module

 Client


Responsibility: Everything a client needs to post projects, hire freelancers, and manage simulated payments.
No.	HTML Page	Main Tasks
1	ClientLogin.html	Login form, email/phone validation and password validation
2	ClientRegistration.html	Client registration, name, email, phone, company information and password validation
3	PostProject.html	Project title, description, category, budget range, deadline and required skills
4	HireFreelancer.html	Select freelancer, select proposal, agree on price, delivery date and confirm hiring
5	MakePayment.html	Simulated payment form, payment method selection, amount and conditional field validation

JavaScript files:
- ClientLogin.js
- ClientRegistration.js
- PostProject.js
- HireFreelancer.js
- MakePayment.js
Specific responsibilities:
- Client dashboard/navigation.
- Project posting and project listing mock data.
- Freelancer selection and hiring interface.
- Simulated payment workflow using dummy information only.
- Client-specific UI styling.

Person 3 — Admin Module
Person 3
 Admin


Responsibility: Overall platform management, user management, category management and administrative reports.
No.	HTML Page	Main Tasks
1	AdminLogin.html	Admin ID, password and CAPTCHA validation
2	AdminRegistration.html	Admin registration interface, official email, ID and permission validation
3	ManageUsers.html	View users, search, filter, activate/deactivate and manage user status
4	ManageCategories.html	Add, edit and delete project/service categories with validation
5	GenerateReports.html	Select report type, date range, report format and generate mock reports

JavaScript files:
- AdminLogin.js
- AdminRegistration.js
- ManageUsers.js
- ManageCategories.js
- GenerateReports.js
Specific responsibilities:
- Admin dashboard/navigation.
- User management interface.
- Category management.
- Platform-wide report generation.
- Admin-specific UI styling.
Note: Admin registration is only a frontend demonstration. In a real system, administrator accounts would require authorization.

Fatema Abdden — Moderator Module
Fatema Abdden
 Moderator


Responsibility: Supervise interactions between freelancers and clients, investigate complaints, and review disputes and payment-related issues.
No.	HTML Page	Main Tasks
1	ModeratorLogin.html	Moderator ID, password and CAPTCHA validation
2	ModeratorRegistration.html	Moderator registration interface, official email, department and password validation
3	ReviewReports.html	View submitted reports, review evidence, select decisions and write moderation notes
4	ManageDisputes.html	Review disputes, inspect order information, record findings and propose resolutions
5	ReviewPayments.html	Review transaction complaints, verify payment information and record refund recommendations or escalations

JavaScript files:
- ModeratorLogin.js
- ModeratorRegistration.js
- ReviewReports.js
- ManageDisputes.js
- ReviewPayments.js
Specific responsibilities:
- Moderator dashboard/navigation.
- Report and complaint management.
- Dispute investigation interface.
- Payment complaint review.
- Moderator-specific UI styling.
Important: Moderators review and recommend actions within their permissions. They do not directly transfer money or perform actual refunds.

Shared project responsibilities
These files should be handled together or assigned to one team member as a shared responsibility.
File / Component	Responsibility
index.html	Main homepage with four role-selection buttons
Design/Style.css	Shared CSS, responsive layouts and common components
JS/Index.js	Homepage interactions and role navigation
JS/Common.js	Reusable JavaScript validation functions
Images/	Shared images, logos and role illustrations

Recommended arrangement: Person 3 can coordinate the shared files, while all four members contribute their requirements and test their own pages.
Final folder ownership
SkillBridge-BD/
│
├── index.html                 [Shared]
│
├── Design/
│   └── Style.css              [Shared]
│
├── Images/                    [Shared]
│
├── JS/
│   ├── Index.js               [Shared]
│   └── Common.js              [Shared]
│
├── Freelancer/                [PERSON 1]
│   ├── FreelancerLogin.html
│   ├── FreelancerRegistration.html
│   ├── CreateService.html
│   ├── BrowseProjects.html
│   ├── SubmitProposal.html
│   └── JS/
│
├── Client/                    [PERSON 2]
│   ├── ClientLogin.html
│   ├── ClientRegistration.html
│   ├── PostProject.html
│   ├── HireFreelancer.html
│   ├── MakePayment.html
│   └── JS/
│
├── Admin/                     [PERSON 3]
│   ├── AdminLogin.html
│   ├── AdminRegistration.html
│   ├── ManageUsers.html
│   ├── ManageCategories.html
│   ├── GenerateReports.html
│   └── JS/
│
└── Moderator/                 [PERSON 4]
    ├── ModeratorLogin.html
    ├── ModeratorRegistration.html
    ├── ReviewReports.html
    ├── ManageDisputes.html
    ├── ReviewPayments.html
    └── JS/