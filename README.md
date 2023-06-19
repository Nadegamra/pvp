# Product development project (Kaunas University of Technology student group project)
### Webpage idea:
- A platform for lending/borrowing various gaming consoles
### Main functionalities: 
- Lend consoles (Lenders)
- Borrow consoles (Borrowing companies)
- Manage available console categories (Admin)
- Manage registered consoles and borrowings (Admin)
- Create chats with borrowers/lenders (Admin)
- Converse in created chats + share files (All user roles)
### Other features:
- I18n (Available languages: Lithuanian and English)
- Multiple themes (Light and Dark)
- Responsive design  
# Technology stack:
- .NET7 + EF Core
- React.js + TypeScript
- MySql
# Launch instructions
## Frontend
### Requirements
- Having NPM(Node Package Manager) installed
### How to launch
- Open a console/terminal window
- Navigate to `frontend` directory
- Execute `npm i`
- Execute `npm start` 
## Backend
### Requirements
- Having MySql installed
- Having Visual Studio 2022 installed
### How to launch
- Configure app (Backend/appsettings.json):
  - Specify MySql ConnectionString (REQUIRED)
  - Specify SMTP account credentials (Email functionalities)
  - Specify Cloudinary credentials (File Upload functionality) and update frontend/src/models/Image.tsx imagePathToUrl() function (image display)
    NOTE: This will prevent images in default data from displaying
- Generate local database:
  `Update-Database` from Visual Studio Package Manager Console OR `dotnet ef database update` from a console/terminal window
- Launch project from Visual Studio

### Default user accounts
- Admin: Username='admin@admin.com' Password='Password123!'
- Customer: Username='customer@example.com' Password='Password123!'
- Company: Username='company@example.com' Password='Password123!'
