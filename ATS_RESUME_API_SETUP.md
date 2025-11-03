# 🚀 ATS Resume Component - API Integration Guide

## Overview
Comprehensive ATS-optimized resume system integrating multiple AI-powered APIs for parsing, scoring, templates, and optimization.

---

## 📋 Table of Contents
1. [Resume Parsing APIs](#resume-parsing-apis)
2. [ATS Scoring APIs](#ats-scoring-apis)
3. [Template APIs](#template-apis)
4. [Environment Setup](#environment-setup)
5. [Implementation Guide](#implementation-guide)

---

## 🔍 Resume Parsing APIs

### 1. **Affinda Resume Parser** (Primary)
**Website:** https://www.affinda.com/resume-parser

**Features:**
- 99.6% accuracy in data extraction
- Extracts: Personal info, education, experience, skills
- Supports: PDF, DOCX, DOC, RTF, TXT
- Multi-language support (100+ languages)

**Setup:**
```bash
# Sign up at: https://app.affinda.com/signup
# Get API key from dashboard

# .env
NEXT_PUBLIC_AFFINDA_API_KEY=your_affinda_api_key
```

**Pricing:**
- Free tier: 100 parses/month
- Starter: $99/month (1,000 parses)
- Professional: $299/month (5,000 parses)

---

### 2. **RChilli Parser** (Fallback)
**Website:** https://www.rchilli.com/

**Features:**
- AI-powered parsing
- 40+ data points extraction
- Real-time parsing
- Custom field extraction

**Setup:**
```bash
# Sign up at: https://www.rchilli.com/free-trial

# .env
NEXT_PUBLIC_RCHILLI_API_KEY=your_rchilli_userkey
```

**Pricing:**
- Free trial: 100 credits
- Pay as you go: $0.10 per parse
- Enterprise: Custom pricing

---

### 3. **Sovren** (Alternative)
**Website:** https://www.sovren.com/

**Features:**
- Resume parsing & matching
- Skills taxonomy
- Job title normalization

**Setup:**
```bash
# .env
NEXT_PUBLIC_SOVREN_ACCOUNT_ID=your_account_id
NEXT_PUBLIC_SOVREN_API_KEY=your_service_key
```

**Pricing:**
- Contact for enterprise pricing

---

## 📊 ATS Scoring APIs

### 1. **Jobscan** (Primary)
**Website:** https://www.jobscan.co/

**Features:**
- ATS compatibility scoring
- Keyword matching analysis
- Missing keywords detection
- Hard & soft skills analysis
- Recommendations for improvement

**Setup:**
```bash
# Contact Jobscan for API access
# .env
NEXT_PUBLIC_JOBSCAN_API_KEY=your_jobscan_api_key
```

**What it provides:**
```javascript
{
  match_rate: 85,
  matched_keywords: ["Python", "React", "AWS"],
  missing_keywords: ["Docker", "Kubernetes"],
  recommendations: ["Add action verbs", "Quantify achievements"],
  hard_skills: ["JavaScript", "TypeScript"],
  soft_skills: ["Leadership", "Communication"]
}
```

**Pricing:**
- API access via enterprise plan
- Contact sales

---

### 2. **ResumeWorded** (Fallback)
**Website:** https://resumeworded.com/

**Features:**
- AI-powered resume scoring
- Line-by-line feedback
- Industry-specific recommendations
- Impact metrics

**Setup:**
```bash
# .env
NEXT_PUBLIC_RESUMEWORDED_API_KEY=your_api_key
```

**Pricing:**
- Pro: $19/month
- API: Contact for pricing

---

### 3. **VMock**
**Website:** https://www.vmock.com/

**Features:**
- Smart Resume Platform
- Comprehensive scoring
- Presentation, impact, competencies analysis

**Setup:**
```bash
# .env
NEXT_PUBLIC_VMOCK_API_KEY=your_vmock_key
```

**Pricing:**
- Enterprise/University licenses

---

## 🎨 Template APIs

### 1. **Canva API**
**Website:** https://www.canva.com/developers/

**Features:**
- Professional resume templates
- Design API access
- Template customization
- Export to PDF

**Setup:**
```bash
# Sign up at: https://www.canva.com/developers/
# Create app and get credentials

# .env
NEXT_PUBLIC_CANVA_API_KEY=your_canva_api_key
NEXT_PUBLIC_CANVA_CLIENT_ID=your_client_id
```

**Pricing:**
- Free tier available
- Pro templates: Canva Pro subscription

---

### 2. **Novoresume API**
**Website:** https://novoresume.com/

**Features:**
- ATS-friendly templates
- Pre-scored templates
- Modern designs

**Setup:**
```bash
# .env
NEXT_PUBLIC_NOVORESUME_API_KEY=your_novoresume_key
```

---

### 3. **FlowCV API**
**Website:** https://flowcv.com/

**Features:**
- Modern resume templates
- Real-time preview
- Multiple export formats

**Setup:**
```bash
# .env
NEXT_PUBLIC_FLOWCV_API_KEY=your_flowcv_key
```

---

### 4. **JSON Resume** (Open Source)
**Website:** https://jsonresume.org/

**Features:**
- Open-source standard
- Free templates
- Community-driven
- 100% ATS compatible

**Setup:**
```bash
# No API key needed - open source!
npm install resume-schema
```

**10 Free Themes:**
- Elegant
- Kendall
- Autumn
- Macchiato
- Papirus
- StackOverflow
- Short
- Class
- Even
- Spartan

---

## ⚙️ Environment Setup

### Complete .env Configuration

```bash
# ========== RESUME PARSING APIS ==========
NEXT_PUBLIC_AFFINDA_API_KEY=aff_xxxxxxxxxxxxx
NEXT_PUBLIC_RCHILLI_API_KEY=rchilli_xxxxxxxxxxxxx
NEXT_PUBLIC_SOVREN_ACCOUNT_ID=sovren_account
NEXT_PUBLIC_SOVREN_API_KEY=sovren_xxxxxxxxxxxxx

# ========== ATS SCORING APIS ==========
NEXT_PUBLIC_JOBSCAN_API_KEY=jobscan_xxxxxxxxxxxxx
NEXT_PUBLIC_RESUMEWORDED_API_KEY=rw_xxxxxxxxxxxxx
NEXT_PUBLIC_VMOCK_API_KEY=vmock_xxxxxxxxxxxxx

# ========== TEMPLATE APIS ==========
NEXT_PUBLIC_CANVA_API_KEY=canva_xxxxxxxxxxxxx
NEXT_PUBLIC_CANVA_CLIENT_ID=canva_client_xxxxxxxxxxxxx
NEXT_PUBLIC_NOVORESUME_API_KEY=novo_xxxxxxxxxxxxx
NEXT_PUBLIC_FLOWCV_API_KEY=flowcv_xxxxxxxxxxxxx

# ========== BACKEND API ==========
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🛠️ Implementation Guide

### Step 1: Install Dependencies

```bash
npm install axios framer-motion lucide-react
```

### Step 2: Set Up API Keys

1. Sign up for each service
2. Get API keys
3. Add to `.env.local`
4. Restart development server

### Step 3: Create API Routes (Next.js)

Create these API routes in your Next.js app:

```
/app/api/resume/
  ├── parse/
  │   ├── affinda/route.js
  │   ├── rchilli/route.js
  │   └── sovren/route.js
  ├── score/
  │   ├── jobscan/route.js
  │   ├── resumeworded/route.js
  │   └── vmock/route.js
  └── templates/
      ├── canva/route.js
      ├── novoresume/route.js
      └── flowcv/route.js
```

### Step 4: Example API Route (Affinda)

```javascript
// app/api/resume/parse/affinda/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    
    const response = await fetch("https://api.affinda.com/v3/resume_parser", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AFFINDA_API_KEY}`,
      },
      body: formData,
    });
    
    const data = await response.json();
    return NextResponse.json({ success: true, parsed: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
```

### Step 5: Test the Component

```bash
npm run dev
# Navigate to /student/ats-resume
# Upload a test resume
# View parsing and scoring results
```

---

## 📈 Feature Workflow

### Complete Resume Upload Flow:

```
1. User uploads PDF/DOCX resume
   ↓
2. Parse with Affinda (fallback to RChilli)
   → Extract: Name, Email, Phone, Skills, Experience
   ↓
3. Score with Jobscan (fallback to ResumeWorded)
   → Get: ATS Score, Matched Keywords, Missing Keywords
   ↓
4. Generate improvement suggestions
   → Provide: Actionable recommendations
   ↓
5. Save to database with all metadata
   ↓
6. Display results in dashboard
```

---

## 💰 Cost Estimation

### Free Tier Usage (100 resumes/month):
- Affinda: FREE
- JSON Resume Templates: FREE
- Total: $0/month

### Startup Plan (1,000 resumes/month):
- Affinda: $99/month
- RChilli (backup): Pay-as-you-go
- Jobscan API: Contact for pricing
- Templates: Canva Pro $12.99/month
- **Total: ~$150-200/month**

### Growth Plan (5,000 resumes/month):
- Affinda Pro: $299/month
- Jobscan Enterprise: ~$500/month
- All template APIs: ~$50/month
- **Total: ~$850/month**

---

## 🎯 Recommended Setup (Budget-Friendly)

### Phase 1: MVP (Free)
```bash
✅ Affinda (100 free parses/month)
✅ JSON Resume (unlimited free templates)
✅ Basic scoring (custom algorithm)
Cost: $0/month
```

### Phase 2: Growth
```bash
✅ Affinda Starter ($99/month)
✅ RChilli fallback (pay-as-you-go)
✅ ResumeWorded API
✅ Canva templates
Cost: ~$150/month
```

### Phase 3: Scale
```bash
✅ All APIs enabled
✅ Full fallback chains
✅ Premium templates
Cost: ~$850/month
```

---

## 🔒 Security Best Practices

1. **Never expose API keys in frontend**
   - Use server-side API routes
   - Proxy all requests through your backend

2. **Rate limiting**
   ```javascript
   // Implement rate limiting
   const rateLimit = {
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
   };
   ```

3. **Validate file uploads**
   ```javascript
   // Max file size: 10MB
   const MAX_FILE_SIZE = 10 * 1024 * 1024;
   // Allowed types
   const ALLOWED_TYPES = ['.pdf', '.docx', '.doc'];
   ```

---

## 📞 Support & Resources

- **Affinda Docs:** https://docs.affinda.com/
- **RChilli Docs:** https://docs.rchilli.com/
- **Jobscan API:** https://www.jobscan.co/contact
- **JSON Resume:** https://jsonresume.org/getting-started/

---

## ✅ Implementation Checklist

- [ ] Sign up for Affinda account
- [ ] Get RChilli API key (fallback)
- [ ] Configure Jobscan API access
- [ ] Set up environment variables
- [ ] Create API routes
- [ ] Test file upload
- [ ] Test parsing functionality
- [ ] Test scoring functionality
- [ ] Add error handling
- [ ] Implement fallback logic
- [ ] Add loading states
- [ ] Test mobile responsiveness
- [ ] Deploy to production

---

**Status:** ✅ Ready for Implementation
**Last Updated:** November 2025
**Version:** 1.0.0
