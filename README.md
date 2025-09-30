# Sabka Pro HIRIN - Job Consultancy & Training Platform

A comprehensive job consultancy and training platform built with Next.js and Tailwind CSS, connecting verified candidates with verified employers.

## Features

- **Landing Page** - Professional landing page with lead capture forms
- **CRM Dashboard** - Complete staff management system with analytics
- **Candidate Module** - Manage candidates, CVs, video resumes
- **Employer Module** - Job posting and candidate management for employers
- **ATS System** - Applicant Tracking System with resume parsing
- **Training Courses** - Video-based training with progress tracking
- **Lead Management** - Track and convert leads with proposal system
- **Payment Integration** - Handle subscriptions and payments

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Architecture**: MVVM (Model-View-ViewModel)
- **Language**: JavaScript (No TypeScript)

## Project Structure (MVVM)

\`\`\`
sabka-pro-hirin/
├── app/                    # Next.js app directory
│   ├── page.jsx           # Landing page
│   ├── register/          # Registration forms
│   ├── crm/              # CRM dashboard pages
│   ├── student/          # Student PWA pages
│   ├── employer/         # Employer PWA pages
│   ├── layout.jsx        # Root layout
│   └── globals.css       # Global styles & theme
├── models/                # Data models & business logic
│   ├── LeadModel.js
│   ├── CandidateModel.js
│   ├── EmployerModel.js
│   ├── JobModel.js
│   ├── ApplicationModel.js
│   └── CourseModel.js
├── viewmodels/            # Presentation logic & state
│   ├── LeadViewModel.js
│   ├── CandidateViewModel.js
│   ├── EmployerViewModel.js
│   ├── DashboardViewModel.js
│   ├── ATSViewModel.js
│   └── CourseViewModel.js
├── views/                 # UI components
│   ├── landing/          # Landing page components
│   ├── forms/            # Lead capture forms
│   ├── crm/              # CRM dashboard components
│   ├── student/          # Student app components
│   └── employer/         # Employer app components
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
└── .vscode/              # VSCode workspace settings
    ├── settings.json     # Editor settings
    └── extensions.json   # Recommended extensions
\`\`\`

## Installation & Setup for VSCode

### Prerequisites

1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org/)
   - Recommended: Node.js 18.x or higher
   - Verify installation: `node --version` and `npm --version`

2. **Install Visual Studio Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

### Step 1: Download the Project

**Option A: Download from v0**
- Click the three dots in the top right of the v0 interface
- Select "Download ZIP"
- Extract the ZIP file to your desired location

**Option B: Clone from GitHub**
- Click the GitHub icon in v0 to push your code
- Clone the repository: `git clone <your-repo-url>`

### Step 2: Open in VSCode

1. Open Visual Studio Code
2. Click **File → Open Folder**
3. Navigate to the extracted/cloned project folder
4. Click **Select Folder**

### Step 3: Install Recommended Extensions

When you open the project, VSCode will prompt you to install recommended extensions. Click **Install All** or install them manually:

- **ES7+ React/Redux/React-Native snippets** - Code snippets for React
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **Prettier** - Code formatter
- **ESLint** - JavaScript linting
- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **Path Intellisense** - Autocomplete for file paths

### Step 4: Install Dependencies

1. Open the integrated terminal in VSCode:
   - Press **Ctrl + `** (backtick) or **View → Terminal**

2. Install project dependencies:
   \`\`\`bash
   npm install
   \`\`\`

   Or if you prefer yarn:
   \`\`\`bash
   yarn install
   \`\`\`

3. Wait for the installation to complete (may take 2-3 minutes)

### Step 5: Run Development Server

In the VSCode terminal, run:

\`\`\`bash
npm run dev
\`\`\`

Or with yarn:

\`\`\`bash
yarn dev
\`\`\`

You should see output like:
\`\`\`
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Ready in 2.5s
\`\`\`

### Step 6: Open in Browser

1. Hold **Ctrl** (or **Cmd** on Mac) and click the `http://localhost:3000` link in the terminal
2. Or manually open your browser and go to `http://localhost:3000`

### Step 7: Explore the Application

The application has multiple sections accessible via different routes:

- **Landing Page**: `http://localhost:3000/`
- **Registration**: `http://localhost:3000/register`
- **CRM Dashboard**: `http://localhost:3000/crm`
- **Student Portal**: `http://localhost:3000/student`
- **Employer Portal**: `http://localhost:3000/employer`

## VSCode Tips & Shortcuts

### Useful Keyboard Shortcuts

- **Ctrl + P** - Quick file search
- **Ctrl + Shift + F** - Search across all files
- **Ctrl + `** - Toggle terminal
- **Alt + Up/Down** - Move line up/down
- **Ctrl + D** - Select next occurrence
- **Ctrl + /** - Toggle comment
- **F2** - Rename symbol

### Tailwind CSS IntelliSense

The project is configured to provide autocomplete for Tailwind classes:
- Start typing a class name in `className=""` and press **Ctrl + Space**
- Hover over a class to see its CSS properties

### Code Formatting

- Files will auto-format on save (configured in `.vscode/settings.json`)
- Manual format: **Shift + Alt + F**

## Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Database (when you add database integration)
DATABASE_URL=your_database_url

# Email Service (for notifications)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Payment Gateway (Stripe/Razorpay)
PAYMENT_API_KEY=your_payment_key

# WhatsApp API (for notifications)
WHATSAPP_API_KEY=your_whatsapp_key
\`\`\`

## MVVM Architecture Explained

### Models (`/models`)
- Define data structures
- Handle business logic
- Validation methods
- Data serialization
- Example: `CandidateModel.js`, `JobModel.js`

### ViewModels (`/viewmodels`)
- Manage component state
- Handle user interactions
- API calls and data fetching
- Presentation logic
- Example: `DashboardViewModel.js`, `ATSViewModel.js`

### Views (`/views`)
- UI components
- Display data from ViewModels
- User interface only
- No business logic
- Example: `CRMDashboard.jsx`, `StudentDashboard.jsx`

## Design Theme

The application uses a professional dark blue theme:

- **Primary Color**: Deep Blue (#1e40af)
- **Background**: Dark Navy (#0f172a)
- **Surface**: Slate (#1e293b)
- **Accent**: Cyan/Teal (#06b6d4)
- **Text**: Almost White (#f8fafc)

All colors are defined in `app/globals.css` using CSS custom properties for easy theming.

## Building for Production

### Step 1: Create Production Build

\`\`\`bash
npm run build
\`\`\`

This will:
- Optimize your code
- Generate static pages
- Create production bundles

### Step 2: Test Production Build Locally

\`\`\`bash
npm start
\`\`\`

### Step 3: Deploy to Vercel (Recommended)

1. Click the **Publish** button in v0 (top right)
2. Or manually:
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Follow the prompts

## Troubleshooting

### Port 3000 Already in Use

If you see "Port 3000 is already in use":
\`\`\`bash
# Kill the process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
\`\`\`

### Module Not Found Errors

\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Tailwind Classes Not Working

1. Make sure Tailwind CSS IntelliSense extension is installed
2. Restart VSCode
3. Check that `globals.css` is imported in `layout.jsx`

### Hot Reload Not Working

1. Save the file again
2. Refresh the browser
3. Restart the dev server: **Ctrl + C** then `npm run dev`

## Next Steps

1. **Add Database Integration**
   - Recommended: Supabase or Neon
   - Update models to connect to real database

2. **Implement Authentication**
   - Add login/signup functionality
   - Protect routes with middleware

3. **Set Up Payment Gateway**
   - Integrate Stripe or Razorpay
   - Handle Pro user subscriptions

4. **Configure Notifications**
   - Email service (SendGrid, Resend)
   - WhatsApp API integration

5. **Add File Upload**
   - CV/Resume uploads
   - Video resume recording
   - Document storage (Vercel Blob, AWS S3)

## Project Routes Overview

| Route | Description | User Type |
|-------|-------------|-----------|
| `/` | Landing page with lead forms | Public |
| `/register` | Candidate/Employer registration | Public |
| `/crm` | CRM dashboard | Staff |
| `/crm/leads` | Leads management | Staff |
| `/crm/candidates` | Candidate management | Staff |
| `/crm/employers` | Employer management | Staff |
| `/crm/jobs` | Job postings management | Staff |
| `/crm/ats` | Applicant tracking system | Staff |
| `/crm/courses` | Course management | Staff |
| `/student` | Student dashboard | Candidates |
| `/student/courses` | Student courses | Candidates |
| `/employer` | Employer dashboard | Employers |

## Support

For issues or questions:
- Email: info@sabkapro.com
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Check the [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

© 2025 Sabka Pro HIRIN. All rights reserved.
