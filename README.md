# 🚀 **SarsAI – AI Career Coach**

## 🚀 Landing Page Preview

![Landing page](https://raw.githubusercontent.com/DevSars24/ai-career-coach/main/public/homepage-preview.png)

SarsAI is your AI-powered personal career assistant designed to accelerate your professional growth through intelligent interview preparation, resume building, real-time insights, and smart cover letter generation.

---

## ⭐️ **Features**

SarsAI provides a complete AI-driven toolkit to help users advance their careers:

---

### 🎯 **1. AI Cover Letter Generator**

* Generates personalized, professional cover letters
* Uses your profile + job description
* Outputs clean Markdown formatting
* Powered by Gemini 2.5 Flash

---

### 📝 **2. Resume Builder**

* Create, update, and store multiple resumes
* ATS-optimized formatting
* Automatically enhances sections like experience and skills

---

### 🎤 **3. AI Interview Coach**

* Mock interview simulation
* Behavioral + technical questions
* Instant evaluation and improvement feedback
* Score and insights generated through AI

---

### 📊 **4. Career Dashboard**

* Displays your personalized insights
* Resume performance and activities
* History tracking
* Quick access to all tools in one place

---

### ⚙️ **5. Smart Onboarding**

Collects and stores essential user information:

* Industry
* Work experience
* Skills
* Professional bio

This data is reused across all AI tools to generate better, more personalized results.

---

### 🔐 **6. Authentication (Clerk)**

* Secure email + social login
* Session management
* Automatic linking of users to the database

---

# 🏗️ **Tech Stack**

| Layer        | Technology                               |
| ------------ | ---------------------------------------- |
| **Frontend** | Next.js 15, React 19, Tailwind CSS       |
| **UI**       | shadcn/ui, Lucide Icons                  |
| **Auth**     | Clerk                                    |
| **Database** | PostgreSQL (Neon)                        |
| **ORM**      | Prisma                                   |
| **AI Model** | Gemini 2.5 Flash                         |
| **Styling**  | Custom Tailwind animations & gradient UI |

---

# 📂 **Folder Architecture Explained**

```
📦 ai-career-coach
│
├── app
│   ├── (auth)             # Clerk authentication pages
│   ├── (main)             # Protected pages for logged-in users
│   │   ├── dashboard
│   │   ├── ai-cover-letter
│   │   ├── interview
│   │   ├── onboarding
│   │   ├── resume
│   │   ├── settings
│   ├── layout.js          # Global layout
│   └── page.js            # Landing page
│
├── components
│   ├── ui                 # shadcn components
│   ├── header.jsx         # Navigation bar
│   ├── hero.jsx           # Hero section
│   └── theme-provider.jsx # Theme configuration
│
├── data
│   ├── industries.js
│   ├── testimonial.js
│   ├── features.js
│   └── faqs.js
│
├── lib
│   ├── prisma.js          # Prisma client setup
│   ├── client.js          # Additional client utilities
│   └── function.js        # Helper functions
│
├── actions                # Server actions
│   ├── onboarding.js
│   ├── resume.js
│   ├── interview.js
│   └── coverletter.js
│
├── prisma
│   └── schema.prisma      # Database schema
│
├── public                 # Static assets
│   ├── banner.jpeg
│   ├── banner2.jpeg
│   ├── banner3.jpeg
│   └── logo.png
│
└── hooks
    └── use-fetch.js       # Custom fetching hook
```

---

# 🧠 **Why This Folder Structure?**

### ✔️ **Clean Separation of Responsibilities**

* UI components grouped together
* Server actions isolated
* Prisma & DB logic separate
* App routes modular and scalable

### ✔️ **Highly Scalable**

Each tool (resume, interview, cover letter) has its own module, making it easy to expand.

### ✔️ **Next.js 15 Best Practices**

* `(auth)` → public routes
* `(main)` → protected user routes
* Server Actions → optimized for performance and edge environments

---

# ⚙️ **Environment Variables**

Add these to your `.env` file:

```
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxxxx
CLERK_SECRET_KEY=xxxxx
GEMINI_API_KEY=xxxxx
```

---

# 🛠️ **Installation & Setup**

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-career-coach.git
cd ai-career-coach
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Push Database Schema

```bash
npx prisma db push
```

### 4. Start the Development Server

```bash
npm run dev
```

---

# 🧪 **Prisma Schema Example**

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

---

# 🤖 **How the AI Cover Letter Generator Works**

1. The app retrieves your profile data
2. Combines it with your job description
3. Builds a structured AI prompt
4. Sends it to Gemini 2.5 Flash
5. Receives a complete cover letter
6. Saves it in the database
7. Displays it in your dashboard

---

# 🤝 **Contributing**

We welcome contributions!
Please submit pull requests and follow consistent formatting and structure.


