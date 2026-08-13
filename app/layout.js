import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://ai-career-coach.vercel.app"),
  title: {
    default: "Sensai - AI Career Coach & Professional Resume Builder",
    template: "%s | Sensai AI Career Coach",
  },
  description:
    "Accelerate your career with Sensai AI. Get personalized career coaching, AI-driven resume updates, tailored cover letters, and real-time interview preparation.",
  keywords: [
    "AI Career Coach",
    "Resume Builder AI",
    "Interview Preparation AI",
    "Cover Letter Generator",
    "Career Path Insights",
    "Tech Career AI",
  ],
  authors: [{ name: "Saurabh Singh Rajput" }],
  creator: "Saurabh Singh Rajput",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-career-coach.vercel.app",
    title: "Sensai - AI Career Coach & Professional Resume Builder",
    description:
      "Accelerate your career with AI guidance, automated resume optimization, custom cover letters, and interview coaching.",
    siteName: "Sensai AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sensai - AI Career Coach & Professional Resume Builder",
    description:
      "Accelerate your career with AI guidance, automated resume optimization, custom cover letters, and interview coaching.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with 💗 by Saurabh singh rajput</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
