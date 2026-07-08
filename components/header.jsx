"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  Settings as SettingsIcon,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { useClerk, SignedIn, SignedOut, SignInButton, UserButton, SignedIn as ClerkSignedIn } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function Header() {
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-md z-[100] transition-colors duration-300">
      <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="z-[110]">
          {mounted && theme === "dark" ? (
            <Image
              src="/logo.png"
              width={150}
              height={40}
              alt="Sarsai"
              className="h-8 md:h-10 w-auto object-contain invert"
            />
          ) : (
            <Image
              src="/logo.png"
              width={150}
              height={40}
              alt="Sarsai"
              className="h-8 md:h-10 w-auto object-contain"
            />
          )}
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-3">
          <ClerkSignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:bg-accent transition-colors">
                  <StarsIcon className="w-4 h-4 mr-2" />
                  Growth Tools
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border border-border text-card-foreground shadow-2xl">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2 cursor-pointer focus:bg-accent focus:text-accent-foreground">
                    <FileText className="w-4 h-4" /> Resume Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ai-cover-letter" className="flex items-center gap-2 cursor-pointer focus:bg-accent focus:text-accent-foreground">
                    <PenBox className="w-4 h-4" /> Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2 cursor-pointer focus:bg-accent focus:text-accent-foreground">
                    <GraduationCap className="w-4 h-4" /> Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserButton afterSignOutUrl="/" />
          </ClerkSignedIn>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:bg-accent border border-neutral-200 dark:border-neutral-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          )}

          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-800 transition-colors">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <div className="flex items-center space-x-2 md:hidden z-[110]">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:bg-accent border border-neutral-200 dark:border-neutral-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          )}
          <button
            className="p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[101] md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-80 bg-background z-[102] p-8 flex flex-col shadow-2xl md:hidden border-l border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex flex-col space-y-6 mt-16">
                <ClerkSignedIn>
                  <div className="pb-4 border-b border-border flex items-center gap-3">
                    <UserButton showName />
                  </div>
                  
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-foreground py-2 hover:opacity-80 transition-opacity">
                    <LayoutDashboard className="w-6 h-6" /> Dashboard
                  </Link>
                  <Link href="/resume" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-foreground py-2 hover:opacity-80 transition-opacity">
                    <FileText className="w-6 h-6" /> Resume Builder
                  </Link>
                  <Link href="/ai-cover-letter" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-foreground py-2 hover:opacity-80 transition-opacity">
                    <PenBox className="w-6 h-6" /> Cover Letter
                  </Link>
                  <Link href="/interview" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-foreground py-2 hover:opacity-80 transition-opacity">
                    <GraduationCap className="w-6 h-6" /> Interview Prep
                  </Link>
                  <Link href="/settings/profile" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-foreground py-2 hover:opacity-80 transition-opacity">
                    <SettingsIcon className="w-6 h-6" /> Settings
                  </Link>

                  <Button 
                    variant="destructive" 
                    className="mt-8 w-full py-6 text-lg bg-red-600 hover:bg-red-700 transition-colors"
                    onClick={() => { signOut(); setOpen(false); }}
                  >
                    Logout
                  </Button>
                </ClerkSignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="w-full py-6 text-lg bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-800 transition-colors">
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}