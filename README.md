<p align="center">
  <img src="./public/banner.jpeg" alt="AI Career Coach" width="700" />
</p>

<h1 align="center">🚀 AI Career Coach</h1>

<p align="center"><b>Your intelligent career co-pilot — powered by Google Gemini AI</b></p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?style=for-the-badge&logo=google" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk" />
  <img src="https://img.shields.io/badge/Inngest-BG_Jobs-FF6C37?style=for-the-badge" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss" />
</p>

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Live Features](#-live-features)
3. [System Design & Architecture](#-system-design--architecture)
4. [Tech Stack & Why We Chose It](#-tech-stack--why-we-chose-it)
5. [Project Structure](#-project-structure)
6. [File-by-File Pseudocode & Key Functions](#-file-by-file-pseudocode--key-functions)
7. [Database Schema](#-database-schema)
8. [Environment Variables](#-environment-variables)
9. [Getting Started](#-getting-started)
10. [Deployment](#-deployment)

---

## 🌟 Overview

**AI Career Coach** is a full-stack, AI-powered career acceleration platform. It combines Google's Gemini LLM, a PostgreSQL database, serverless background jobs, and a beautiful Next.js frontend to give professionals an unfair advantage in their careers.

> The platform acts as a personal career strategist — it generates tailored interview quizzes, builds ATS-optimized resumes, drafts personalized cover letters, and provides real-time industry insights.

---

## ✨ Live Features

| Feature | Description |
|---|---|
| 🎯 **AI Interview Prep** | Generates 10 industry-specific MCQ questions via Gemini AI with instant feedback & explanations |
| 📝 **Smart Resume Builder** | Markdown-based resume editor with AI section improvement powered by Gemini |
| 💌 **Cover Letter Generator** | Creates tailored, professional cover letters from job description input |
| 📊 **Career Dashboard** | Real-time industry insights: salary ranges, demand levels, key trends, and growth rates |
| 🔐 **Secure Auth** | Full Clerk authentication with protected routes and session management |
| 🔄 **Auto-Updated Insights** | Weekly background job (Inngest cron) refreshes all industry data automatically |
| 🌗 **Dark / Light Mode** | Fully themed UI with `next-themes` |
| 📄 **PDF Export** | Export your resume as a PDF with `html2pdf.js` |

---

## 🏗️ System Design & Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          CLIENT BROWSER                                  │
│                                                                          │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌──────────┐ ┌────────────┐  │
│  │  Hero /  │ │Dashboard │ │  Interview │ │  Resume  │ │Cover Letter│  │
│  │  Landing │ │  Page    │ │  Quiz Page │ │  Builder │ │ Generator  │  │
│  └────┬─────┘ └────┬─────┘ └─────┬──────┘ └────┬─────┘ └─────┬──────┘  │
└───────┼────────────┼─────────────┼──────────────┼─────────────┼─────────┘
        │            │             │              │             │
        ▼            ▼             ▼              ▼             ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                NEXT.JS 15 APP ROUTER  (SSR + RSC)                        │
│                                                                          │
│  ┌────────────────┐   ┌─────────────────────────────────────────────┐   │
│  │ middleware.js  │   │         Server Actions  ("use server")       │   │
│  │ (Clerk route   │   │  ┌────────┐ ┌──────────┐ ┌───────────────┐  │   │
│  │  guard)        │   │  │user.js │ │interview │ │cover-letter.js│  │   │
│  └────────────────┘   │  └────────┘ └──────────┘ └───────────────┘  │   │
│                        │  ┌─────────┐ ┌──────────┐                  │   │
│                        │  │resume.js│ │dashboard │                  │   │
│                        │  └─────────┘ └──────────┘                  │   │
│                        └─────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
        │                              │
        ▼                              ▼
┌──────────────────┐       ┌───────────────────────┐
│   CLERK AUTH     │       │  GOOGLE GEMINI AI     │
│  (JWT Sessions   │       │  gemini-2.5-flash     │
│   + Middleware)  │       │                       │
└──────────────────┘       │  • Quiz Generation    │
                           │  • Resume Improvement │
                           │  • Cover Letter Gen   │
                           │  • Industry Insights  │
                           └───────────────────────┘
        │
        ▼
┌────────────────────────────────────────────────────┐
│                 PRISMA ORM                         │
│  (Type-safe query builder + migrations)            │
└────────────────────┬───────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────┐
│            POSTGRESQL DATABASE                     │
│                                                    │
│  ┌──────────┐  ┌────────────┐  ┌─────────────┐    │
│  │   User   │  │ Assessment │  │   Resume    │    │
│  └──────────┘  └────────────┘  └─────────────┘    │
│  ┌─────────────┐  ┌─────────────────────────────┐  │
│  │ CoverLetter │  │     IndustryInsight          │  │
│  └─────────────┘  └─────────────────────────────┘  │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│            INNGEST  (Background Jobs)              │
│                                                    │
│  generateIndustryInsights()                        │
│  Cron: Every Sunday @ midnight                     │
│  → Fetches all industries from DB                  │
│  → Calls Gemini for fresh insights                 │
│  → Updates IndustryInsight records in DB           │
└────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack & Why We Chose It

### ⚡ Core Framework

| Technology | Version | Why It Matters |
|---|---|---|
| **Next.js** | `^15.5.9` | App Router enables server components, server actions, and streaming. Turbopack provides blazing-fast HMR. Eliminates the need for a separate Express backend. |
| **React** | `^18.3.1` | Concurrent rendering with `Suspense` and `useTransition` enables smooth UX during AI generation waits. |

### 🤖 AI & Intelligence Layer

| Technology | Version | Why It Matters |
|---|---|---|
| **@google/generative-ai** | `^0.21.0` | Direct SDK access to **Gemini 2.5 Flash** — Google's fastest model for structured JSON output. Powers quiz generation, resume improvement, cover letters, and industry analysis. |

### 🔐 Authentication

| Technology | Version | Why It Matters |
|---|---|---|
| **@clerk/nextjs** | `^6.9.10` | Drop-in auth with JWT session management, social logins, and pre-built UI. Middleware integration protects entire route groups in a single file. |
| **@clerk/themes** | `^2.2.5` | Syncs Clerk's modal UI with the app's dark/light theme seamlessly. |

### 🗄️ Database & ORM

| Technology | Version | Why It Matters |
|---|---|---|
| **PostgreSQL** | Latest | Relational DB with JSONB support — perfect for mixed structured (`User`, `Resume`) and semi-structured (`questions[]`, `salaryRanges[]`) data. |
| **Prisma** | `^6.2.1` | Type-safe ORM with auto-generated client, schema-first migrations, and `$transaction()` for ACID-compliant multi-step operations. |

### ⚙️ Background Jobs

| Technology | Version | Why It Matters |
|---|---|---|
| **Inngest** | `^3.54.0` | Serverless-native event-driven job queue with built-in cron scheduling. Runs the weekly industry insight update without a separate worker server. `step.ai.wrap()` enables durable AI calls that survive failures. |

### 🎨 UI & Styling

| Technology | Version | Why It Matters |
|---|---|---|
| **TailwindCSS** | `^3.4.1` | Utility-first CSS for rapid, consistent design directly in JSX. |
| **Radix UI** | Various | Headless, accessible component primitives (Dialog, Tabs, Accordion) styled with Tailwind. Zero accessibility debt. |
| **Framer Motion** | `^12.23.26` | Production-grade animations — parallax scrolling, staggered reveals, and the typing cursor in the hero. |
| **shadcn/ui** | — | Component library built on Radix + Tailwind for consistent Button, Card, Badge, and form components. |
| **Lucide React** | `^0.471.1` | Crisp, consistent SVG icon set. |
| **next-themes** | `^0.4.4` | Zero-flash dark/light mode switching integrated with Tailwind's dark variant. |

### 📋 Forms & Validation

| Technology | Version | Why It Matters |
|---|---|---|
| **React Hook Form** | `^7.54.2` | Performant form management with minimal re-renders — critical for the multi-section onboarding flow. |
| **Zod** | `^3.24.1` | Schema-first validation — validates form inputs on the client before hitting server actions. |
| **@hookform/resolvers** | `^3.10.0` | Bridges Zod schemas directly into React Hook Form without custom validators. |

### 📊 Data Visualization

| Technology | Version | Why It Matters |
|---|---|---|
| **Recharts** | `^2.15.0` | Composable charts for salary range bar charts and quiz performance trend lines on the dashboard. |

### 🔧 Utilities

| Technology | Version | Why It Matters |
|---|---|---|
| **html2pdf.js** | `^0.10.2` | Client-side PDF generation from resume HTML content — no server-side rendering required. |
| **react-markdown** | `^9.0.3` | Renders Gemini's Markdown output (cover letters, resume sections) as formatted HTML. |
| **@uiw/react-md-editor** | `^4.0.5` | Full-featured Markdown editor for the resume builder with live preview. |
| **date-fns** | `^4.1.0` | Lightweight date utility for formatting timestamps. |
| **sonner** | `^1.7.1` | Beautiful, accessible toast notifications for quiz feedback and save confirmations. |
| **react-spinners** | `^0.15.0` | Loading indicators (`BarLoader`) shown during AI generation. |
| **clsx + tailwind-merge** | — | Compose conditional Tailwind class names safely without conflicts. |

---

## 📁 Project Structure

```
ai-career-coach/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (auth)/                   # Auth route group (Clerk sign-in/sign-up)
│   ├── 📁 (main)/                   # Protected main app routes
│   │   ├── 📁 dashboard/            # Career insights dashboard
│   │   ├── 📁 interview/            # AI quiz + mock interview
│   │   │   └── 📁 _components/      # Quiz, QuizResult, StatsCards
│   │   ├── 📁 resume/               # Resume builder
│   │   │   └── 📁 _components/      # ResumeBuilder, EntryForm
│   │   ├── 📁 ai-cover-letter/      # Cover letter generator & list
│   │   ├── 📁 onboarding/           # First-login industry/skill setup
│   │   └── 📁 settings/             # User profile settings
│   ├── 📁 api/
│   │   └── 📁 inngest/              # Inngest webhook endpoint
│   ├── layout.js                    # Root layout + ThemeProvider + Clerk
│   ├── page.js                      # Landing page
│   └── globals.css                  # Global styles + dot-grid + gradient-title
│
├── 📁 actions/                      # Next.js Server Actions ("use server")
│   ├── cover-letter.js              # CRUD for cover letters
│   ├── dashboard.js                 # Industry insights generation
│   ├── interview.js                 # Quiz generation + assessment saving
│   ├── resume.js                    # Resume save/get/AI-improve
│   └── user.js                      # User profile + onboarding status
│
├── 📁 components/                   # Shared UI components
│   ├── header.jsx                   # Navbar with auth + theme toggle
│   ├── hero.jsx                     # Landing hero with typing animation
│   ├── theme-provider.jsx           # next-themes wrapper
│   └── 📁 ui/                       # shadcn/ui primitives
│
├── 📁 hooks/
│   └── use-fetch.js                 # Universal async data-fetching hook
│
├── 📁 lib/
│   ├── checkUser.js                 # Clerk → Prisma user sync
│   ├── prisma.js                    # Prisma client singleton
│   ├── utils.js                     # cn() utility
│   └── 📁 inngest/
│       ├── client.js                # Inngest client init
│       └── function.js              # generateIndustryInsights cron job
│
├── 📁 prisma/
│   ├── schema.prisma                # DB schema (User, Assessment, Resume...)
│   └── 📁 migrations/               # Migration history
│
├── 📁 data/                         # Static data (industry lists, etc.)
├── middleware.js                    # Clerk auth middleware + route protection
├── next.config.mjs                  # Next.js config
├── tailwind.config.mjs              # Tailwind theme config
└── package.json                     # Dependencies & scripts
```

---

## 🔍 File-by-File Pseudocode & Key Functions

---

### `middleware.js` — Route Guard

**Purpose:** Intercepts every request and enforces authentication on protected routes.

```
FUNCTION: clerkMiddleware (default export)
INPUT: auth context, incoming request (req)

1. Define protected routes:
   [/dashboard, /resume, /interview, /ai-cover-letter, /onboarding]

2. Extract userId from Clerk auth session

3. IF userId is null AND route is protected:
     → Redirect to Clerk sign-in page

4. ELSE → Allow request to proceed (NextResponse.next)

🔑 KEY FUNCTIONS:
  createRouteMatcher([...routes]) — builds URL matcher for protected paths
  clerkMiddleware(handler)         — wraps Next.js middleware with Clerk context
  auth().redirectToSignIn()        — redirects unauthenticated users
```

---

### `lib/checkUser.js` — User Sync

**Purpose:** On every authenticated request, ensures the Clerk user exists in PostgreSQL.

```
FUNCTION: checkUser()

1. Call Clerk's currentUser() to get auth session
2. IF no user → return null (guest/public page)

3. QUERY db.user WHERE clerkUserId = user.id
4. IF found → return existing DB user

5. IF NOT found (first login):
   → CREATE new User record with: { clerkUserId, name, imageUrl, email }
   → Return newly created user

🔑 KEY FUNCTIONS:
  currentUser()        — Clerk server-side session getter
  db.user.findUnique() — Prisma query by clerkUserId
  db.user.create()     — Provision new user in DB on first login
```

---

### `lib/prisma.js` — Database Client Singleton

**Purpose:** Creates a single, reused Prisma client to prevent connection pool exhaustion in serverless environments.

```
PATTERN: Global Singleton

IF global.prisma already exists:
  → Reuse the existing PrismaClient instance
ELSE:
  → Create new PrismaClient()
  → Store on globalThis to survive hot-reloads

EXPORT: db (the singleton PrismaClient)

🔑 KEY PATTERN:
  globalThis.prisma ?? new PrismaClient() — prevents N+1 connections in dev
```

---

### `lib/inngest/function.js` — Background Cron Job

**Purpose:** Runs every Sunday at midnight to refresh industry insights for all industries via Gemini AI.

```
FUNCTION: generateIndustryInsights
TRIGGER:  cron("0 0 * * 0") — Every Sunday, midnight

STEP 1 — "Fetch industries":
  → db.industryInsight.findMany()
  → Returns list of all tracked industry strings

FOR EACH industry in industries:
  STEP 2 — AI Generation (step.ai.wrap):
    → Build Gemini prompt for industry analysis
    → Call model.generateContent(prompt)
    → Parse JSON response:
      { salaryRanges, growthRate, demandLevel,
        topSkills, marketOutlook, keyTrends, recommendedSkills }

  STEP 3 — "Update {industry} insights":
    → db.industryInsight.update()
    → Set lastUpdated = now()
    → Set nextUpdate  = now() + 7 days

🔑 KEY FUNCTIONS:
  inngest.createFunction()          — registers the background job
  step.run("label", fn)             — durable step execution (survives crashes)
  step.ai.wrap("gemini", fn, p)     — AI call with Inngest retry layer
  model.generateContent(prompt)     — Gemini API call
  db.industryInsight.update()       — Prisma update of cached insights
```

---

### `actions/user.js` — User Profile Server Actions

**Purpose:** Handles user onboarding profile updates and status checks using Prisma transactions.

```
FUNCTION: updateUser(data)

1. auth() → get userId from Clerk
2. db.user.findUnique(clerkUserId)

3. db.$transaction([
     a. Check if IndustryInsight exists for industry
     b. IF NOT → generateAIInsights(industry)
               → db.industryInsight.create(...)
     c. db.user.update({ industry, experience, bio, skills })
   ], { timeout: 10000 })

4. revalidatePath("/") → clear Next.js page cache

────────────────────────────────────────────────────
FUNCTION: getUserOnboardingStatus()

1. auth() → userId
2. db.user.findUnique(select: { industry })
3. RETURN { isOnboarded: !!user.industry }

────────────────────────────────────────────────────
FUNCTION: getUser()

1. auth() → userId
2. db.user.findUnique(clerkUserId)
3. RETURN full user object

🔑 KEY FUNCTIONS:
  db.$transaction(fn, { timeout })   — ACID-safe multi-step DB operation
  generateAIInsights(industry)       — Gemini-powered industry data generator
  revalidatePath("/")                — Invalidates Next.js cache after mutation
```

---

### `actions/dashboard.js` — Industry Insights Server Actions

**Purpose:** Fetches or lazily generates industry insight data for the logged-in user's career field.

```
FUNCTION: generateAIInsights(industry)

1. Build structured Gemini prompt requesting:
   { salaryRanges[], growthRate, demandLevel,
     topSkills[], marketOutlook, keyTrends[], recommendedSkills[] }
2. model.generateContent(prompt)
3. Strip markdown code fences from response
4. JSON.parse → return structured insight object

────────────────────────────────────────────────────
FUNCTION: getIndustryInsights()

1. auth() → userId
2. db.user.findUnique({ include: { industryInsight } })
3. IF insight exists → return it  (CACHE HIT)
4. IF NOT (cache miss):
   → generateAIInsights(user.industry)
   → db.industryInsight.create(insights)
   → Set nextUpdate = now() + 7 days
   → return new record

🔑 KEY FUNCTIONS:
  generateAIInsights(industry)           — Gemini-powered insight generation
  getIndustryInsights()                  — Lazy-cache pattern for DB + AI
  text.replace(/```(?:json)?\n?/g, "")  — Strips AI markdown fences from JSON
```

---

### `actions/interview.js` — Interview Quiz Server Actions

**Purpose:** Generates personalized quiz questions via Gemini, saves quiz results, and fetches assessment history.

```
FUNCTION: generateQuiz()

1. auth() → userId
2. db.user.findUnique(select: { industry, skills })
3. Build prompt:
   "Generate 10 MCQ questions for a {industry} professional
    with expertise in {skills}"
   Expected JSON: { questions: [{question, options[], correctAnswer, explanation}] }
4. model.generateContent(prompt)
5. Parse and clean JSON response
6. RETURN questions[]

────────────────────────────────────────────────────
FUNCTION: saveQuizResult(questions, answers, score)

1. auth() → userId
2. Map questions → questionResults[]
   { question, answer, userAnswer, isCorrect }
3. Filter wrong answers
4. IF wrongAnswers.length > 0:
   → Build improvementPrompt with wrong Q&A pairs
   → model.generateContent(improvementPrompt)
   → Extract improvementTip string
5. db.assessment.create({
     userId, quizScore, questions, category: "Technical", improvementTip })

────────────────────────────────────────────────────
FUNCTION: getAssessments()

1. auth() → userId
2. db.assessment.findMany(orderBy: createdAt ASC)
3. RETURN assessments[] for charting trend lines

🔑 KEY FUNCTIONS:
  generateQuiz()                       — AI-powered personalized quiz creator
  saveQuizResult(q, a, score)          — Persists results + generates AI tips
  getAssessments()                     — Fetches history for trend charts
  model.generateContent(prompt)        — Gemini 2.5 Flash API call
```

---

### `actions/resume.js` — Resume Server Actions

**Purpose:** Handles resume CRUD and AI-powered section content improvement.

```
FUNCTION: saveResume(content)

1. auth() → userId
2. db.resume.upsert({
     where:  { userId },
     update: { content },
     create: { userId, content }
   })  ← One resume per user guaranteed
3. revalidatePath("/resume")

────────────────────────────────────────────────────
FUNCTION: getResume()

1. auth() → userId
2. db.resume.findUnique(userId)
3. RETURN resume or null

────────────────────────────────────────────────────
FUNCTION: improveWithAI({ current, type })

1. auth() → userId
2. db.user.findUnique(include: industryInsight)
3. Build expert resume writer prompt:
   "Improve this {type} section for a {industry} professional.
    Use action verbs, quantify achievements, add industry keywords."
4. model.generateContent(prompt)
5. RETURN improved text (single paragraph)

🔑 KEY FUNCTIONS:
  saveResume(content)                  — Upsert pattern for single-user resume
  improveWithAI({ current, type })     — Gemini-powered resume enhancement
  db.resume.upsert()                   — Atomic create-or-update operation
  revalidatePath("/resume")            — Cache busting after save
```

---

### `actions/cover-letter.js` — Cover Letter Server Actions

**Purpose:** Full CRUD for AI-generated cover letters using user profile + job description context.

```
FUNCTION: generateCoverLetter(data)
INPUT: { jobTitle, companyName, jobDescription }

1. auth() → userId
2. db.user.findUnique() → get user profile
3. Build context-rich prompt with:
   - User: industry, experience, skills, bio
   - Job:  title, company, description
   - Rules: professional tone, 400 words max, markdown format
4. model.generateContent(prompt) → Markdown letter
5. db.coverLetter.create({
     content, jobDescription, companyName,
     jobTitle, status: "completed", userId })
6. RETURN saved cover letter

────────────────────────────────────────────────────
FUNCTION: getCoverLetters()
→ db.coverLetter.findMany(userId, orderBy: desc)

FUNCTION: getCoverLetter(id)
→ db.coverLetter.findUnique({ id, userId })

FUNCTION: deleteCoverLetter(id)
→ db.coverLetter.delete({ id, userId })

🔑 KEY FUNCTIONS:
  generateCoverLetter(data)     — Context-rich Gemini letter generation
  deleteCoverLetter(id)         — Scoped deletion (user owns resource check)
  getCoverLetters()             — List with descending date sort
```

---

### `hooks/use-fetch.js` — Universal Async Data Hook

**Purpose:** Reusable React hook that wraps any async Server Action with loading, error, and data states. Eliminates async state boilerplate in every component.

```
HOOK: useFetch(cb)
INPUT: cb = any async Server Action function

STATE:
  data    = undefined   (response data)
  loading = null        (boolean flag)
  error   = null        (Error object)

FUNCTION fn(...args):
  1. setLoading(true), setError(null)
  2. TRY:
     response = await cb(...args)
     setData(response)
  3. CATCH(error):
     setError(error)
     toast.error(error.message)  ← automatic toast notification!
  4. FINALLY: setLoading(false)

RETURN: { data, loading, error, fn, setData }

🔑 KEY PATTERN:
  useFetch(generateQuiz)    — wraps Server Action in React state
  useFetch(saveQuizResult)  — second instance for save operation
  setData()                 — allows resetting state (e.g., startNewQuiz)
```

---

### `components/hero.jsx` — Landing Page Hero Section

**Purpose:** Animated landing page with a typewriter effect, parallax scrolling image, and animated stats.

```
COMPONENT: HeroSection()

STATE:
  index      = current word index (0-4)
  subIndex   = current character position
  isDeleting = typing direction flag

PARALLAX EFFECT:
  scrollY    = useScroll()
  yParallax  = useTransform(scrollY, [0, 600], [0, -40])
  → Applied to the right-side image panel

TYPING ENGINE (useEffect on [subIndex, isDeleting, index]):
  IF subIndex === word.length+1 AND !isDeleting:
    → Wait 1500ms → setIsDeleting(true)
  IF subIndex === 0 AND isDeleting:
    → setIsDeleting(false) → advance to next word
  ELSE:
    → setTimeout(±1 char, 40ms delete / 80ms type)

RENDER:
  • Animated h1 with gradient-title class (Framer Motion fade-in)
  • Typewriter span + blinking cursor animation
  • CTA buttons → /dashboard
  • Stats row: [10k+ Engineers, 98% Placement, Instant Feedback]
  • Parallax image panel (right side, float on scroll)

🔑 KEY FUNCTIONS:
  useScroll()                  — Framer Motion scroll position tracker
  useTransform(y, in, out)     — Maps scroll position to CSS transform
  useEffect([subIndex, ...])   — Drives the typing/deleting animation loop
  motion.div / motion.span     — Animated Framer Motion wrapper elements
```

---

### `app/(main)/interview/_components/quiz.jsx` — Interactive Quiz Component

**Purpose:** Client-side quiz engine that renders questions, captures answers with immediate visual feedback, calculates scores, and saves results.

```
COMPONENT: Quiz()

STATE:
  currentQuestion  = 0      (active question index)
  answers[]        = []     (user answer per question)
  showExplanation  = false  (explanation toggle)
  isCorrect        = null   (correctness feedback — null/true/false)

HOOKS:
  useFetch(generateQuiz)    → { loading: generatingQuiz, fn, data: quizData }
  useFetch(saveQuizResult)  → { loading: savingResult,   fn, data: resultData }

────────────────────────────────────────────────────
FUNCTION: handleAnswer(answer)
  1. Update answers[] at currentQuestion index
  2. Compare answer vs quizData[i].correctAnswer
  3. IF correct → setIsCorrect(true) + toast.success("Correct Answer!")
  4. IF wrong   → setIsCorrect(false) + toast.error("Wrong Answer!")

FUNCTION: handleNext()
  1. IF more questions → advance currentQuestion
     Reset showExplanation and isCorrect
  2. IF last question → call finishQuiz()

FUNCTION: calculateScore()
  → Count correct answers in answers[]
  → RETURN (correct / total) * 100

FUNCTION: finishQuiz()
  → calculateScore()
  → saveQuizResultFn(quizData, answers, score)

FUNCTION: startNewQuiz()
  → Reset all state to initial values
  → generateQuizFn() → fetch fresh AI questions

RENDER STATES:
  Loading  → <BarLoader />
  No data  → "Start Quiz" card
  Complete → <QuizResult result={...} onStartNew={startNewQuiz} />
  Active   → Question card with RadioGroup
    • Green highlight on correct answer
    • Red highlight on wrong answer
    • "Show Explanation" toggle button

🔑 KEY FUNCTIONS:
  handleAnswer(answer)       — Instant answer validation + visual feedback
  calculateScore()           — Percentage score calculator
  finishQuiz()               — Score computation + server action trigger
  startNewQuiz()             — Full quiz state reset + new quiz fetch
  useFetch(generateQuiz)     — Async quiz generation with loading state
```

---

## 🗄️ Database Schema

```
                 ┌────────────────────────────┐
                 │           User             │
                 ├────────────────────────────┤
                 │ id           UUID (PK)     │
                 │ clerkUserId  unique        │
                 │ email        unique        │
                 │ name                       │
                 │ imageUrl                   │
                 │ industry ──────────────┐   │
                 │ bio                   │   │
                 │ experience  Int       │   │
                 │ skills      String[]  │   │
                 └──────┬────────────────┘   │
                        │                    │
          ┌─────────────┼──────────────┐     │
          │             │              │     │
 ┌────────┴──────┐  ┌───┴──────┐      │     │
 │  Assessment   │  │  Resume  │      │     │
 ├───────────────┤  ├──────────┤      │     │
 │ id    cuid    │  │ id cuid  │      │     │
 │ userId FK     │  │ userId FK│      │     │
 │ quizScore     │  │ content  │      │     │
 │ questions JSON│  │ atsScore │      │     │
 │ category      │  │ feedback │      │     │
 │ improvementTip│  └──────────┘      │     │
 └───────────────┘                    │     │
                                      │     │
 ┌────────────────┐   ┌───────────────▼──────────────────┐
 │  CoverLetter   │   │          IndustryInsight          │
 ├────────────────┤   ├──────────────────────────────────┤
 │ id    cuid     │   │ id           cuid                 │
 │ userId FK      │   │ industry     unique               │
 │ content MD     │   │ salaryRanges JSON[]               │
 │ jobDescription │   │ growthRate   Float                │
 │ companyName    │   │ demandLevel  String               │
 │ jobTitle       │   │ topSkills    String[]             │
 │ status String  │   │ marketOutlook String              │
 └────────────────┘   │ keyTrends    String[]             │
                      │ recommendedSkills String[]        │
                      │ lastUpdated  DateTime             │
                      │ nextUpdate   DateTime             │
                      └──────────────────────────────────┘
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# ─── DATABASE ────────────────────────────────────────────
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# ─── CLERK AUTH ──────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# ─── GOOGLE GEMINI AI ────────────────────────────────────
GEMINI_API_KEY=AIza...

# ─── INNGEST ─────────────────────────────────────────────
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database (local or [Neon](https://neon.tech))
- [Clerk](https://clerk.com) account
- [Google AI Studio](https://aistudio.google.com) API key
- [Inngest](https://www.inngest.com) account (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ai-career-coach.git
cd ai-career-coach

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# 4. Run database migrations
npx prisma migrate dev

# 5. Start the development server
npm run dev
```

App runs at **http://localhost:3000**

To run Inngest locally (for background job testing):

```bash
npx inngest-cli@latest dev
```

---

## 📦 Deployment

### Recommended: Vercel

```bash
npm i -g vercel
vercel --prod
```

Set all environment variables in your Vercel project dashboard under **Settings → Environment Variables**.

### Database: Neon PostgreSQL

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string into `DATABASE_URL`
3. Run `npx prisma migrate deploy`

### Inngest Cloud

Register your production webhook at:
```
https://your-app.vercel.app/api/inngest
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
  Built with ❤️ using <b>Next.js</b> · <b>Gemini AI</b> · <b>Prisma</b> · <b>Clerk</b> · <b>Inngest</b>
</p>
