# 🚀 **SarsAI – AI Career Coach**

## 🚀 Homepage Preview

<img src="https://raw.githubusercontent.com/DevSars24/ai-career-coach/main/public/homepage-preview.png" width="800" />


Your personal AI-powered assistant for career growth, interview preparation, resume building, and smart cover letters.


---

## ⭐️ **Features**

SarsAI provides a complete career acceleration toolkit powered by AI:

### 🎯 **1. AI Cover Letter Generator**

* Generates personalized, professional cover letters
* Uses your profile + job description
* Format in markdown
* Uses Gemini 2.5 Flash

### 📝 **2. Resume Builder**

* Create, store, and update resumes
* ATS optimized format
* Skill-based section generation

### 🎤 **3. AI Interview Coach**

* Mock interview
* Behavior + Technical questions
* Smart evaluation
* Score & improvement report

### 📊 **4. Career Dashboard**

* Shows insights
* Resume performance
* Applications & history
* Quick tools access

### ⚙️ **5. Smart Onboarding**

* Industry
* Experience
* Skills
* Bio
* Stored in database for future AI use

### 🔐 **6. Authentication (Clerk)**

* Social + Email sign-in
* Secure user session
* Auto user linking to database

```

# 🏗️ **Tech Stack**

| Layer        | Technology                             |
| ------------ | -------------------------------------- |
| **Frontend** | Next.js 15, React 19, Tailwind CSS     |
| **UI**       | shadcn/ui, Lucide Icons                |
| **Auth**     | Clerk                                  |
| **Database** | PostgreSQL (Neon)                      |
| **ORM**      | Prisma                                 |
| **AI Model** | Gemini 2.5 Flash                       |
| **Styling**  | Custom Tailwind gradients + animations |

---
```
# 📂 **Folder Architecture Explained**

```
📦 ai-career-coach
│
├── app
│   ├── (auth)             # Clerk auth routes (sign-in, sign-up)
│   ├── (main)             # Authenticated application pages
│   │   ├── dashboard
│   │   ├── ai-cover-letter
│   │   ├── interview
│   │   ├── onboarding
│   │   ├── resume
│   │   ├── settings
│   ├── layout.js          # Root layout
│   └── page.js            # Landing page
│
├── components
│   ├── ui                 # shadcn components
│   ├── header.jsx         # Navbar
│   ├── hero.jsx           # Hero section
│   └── theme-provider.jsx # Dark/light theme
│
├── data
│   ├── industries.js
│   ├── testimonial.js
│   ├── features.js
│   └── faqs.js
│
├── lib
│   ├── prisma.js          # Prisma client
│   ├── client.js          # Supabase/Gemini helpers (if needed)
│   └── function.js        # Utility functions
│
├── actions
│   ├── onboarding.js
│   ├── resume.js
│   ├── interview.js
│   └── coverletter.js
│
├── prisma
│   ├── schema.prisma      # DB Schema
│
├── public
│   ├── banner.jpeg
│   ├── banner2.jpeg
│   ├── banner3.jpeg
│   └── logo.png
│
└── hooks
    └── use-fetch.js
```

---

# 🧠 **Why This Folder Structure?**

### ✔️ **Separation of concerns**

* UI components sab ek jagah
* Server actions alag
* Prisma + DB alag
* App routes clean & modular

### ✔️ **Scalable**

Har tool (resume, interview, cover letter) ka apna module.

### ✔️ **Best practice (Next.js 15)**

* (auth) → free layouts for public pages
* (main) → protected routes
* Server Actions → edge-ready & fast

---

# ⚙️ **Environment Variables**

`.env` →

```
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxxx
CLERK_SECRET_KEY=xxxx
GEMINI_API_KEY=xxxx
```

---

# 🛠️ **Installation & Running Locally**

```bash
git clone https://github.com/your-username/ai-career-coach.git
cd ai-career-coach
npm install
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Push Schema to DB

```bash
npx prisma db push
```

### Start Dev Server

```bash
npm run dev
```

---

# 🧪 **Prisma Schema Overview**

(Example)

```prisma
model User {
  id           String   @id @default(cuid())
  clerkUserId  String   @unique
  industry     String?
  experience   Int?
  skills       String[]
  bio          String?
  coverLetters CoverLetter[]
}
```

# 🤖 **AI Cover Letter – How It Works**

* User profile fetch hota hai
* Job description + your skills combine hoti hain
* Gemini prompt generate hota hai
* AI letter create karta hai
* DB me store + UI me show hota hai

---
```

---

# 🤝 **Contributing**

Pull requests welcome!
Follow issue templates and maintain code formatting.

---

