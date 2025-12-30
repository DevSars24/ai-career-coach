"use client";

import React, { useState } from "react";
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

export default function Header() {
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);

  return (
    // Changed bg-black/80 to bg-black and removed backdrop-blur
    <header className="fixed top-0 w-full border-b border-white/10 bg-black z-[100]">
      <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="z-[110]">
          <Image
            src="/logo.png"
            width={150}
            height={40}
            alt="Sarsai"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-3">
          <ClerkSignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <StarsIcon className="w-4 h-4 mr-2" />
                  Growth Tools
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              {/* Changed bg-gray-900 to bg-black */}
              <DropdownMenuContent align="end" className="w-56 bg-black border border-white/10 text-white shadow-2xl">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2 cursor-pointer focus:bg-white/10">
                    <FileText className="w-4 h-4" /> Resume Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ai-cover-letter" className="flex items-center gap-2 cursor-pointer focus:bg-white/10">
                    <PenBox className="w-4 h-4" /> Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2 cursor-pointer focus:bg-white/10">
                    <GraduationCap className="w-4 h-4" /> Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserButton afterSignOutUrl="/" />
          </ClerkSignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <button
          className="md:hidden p-2 text-white z-[110]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop - Solid Black but slightly transparent for depth */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[101] md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Menu Content - Solid Black */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-80 bg-black z-[102] p-8 flex flex-col shadow-2xl md:hidden border-l border-white/10"
            >
              <div className="flex flex-col space-y-6 mt-16">
                <ClerkSignedIn>
                  <div className="pb-4 border-b border-white/10 flex items-center gap-3">
                    <UserButton showName />
                  </div>
                  
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-white py-2 hover:text-cyan-400 transition-colors">
                    <LayoutDashboard className="w-6 h-6" /> Dashboard
                  </Link>
                  <Link href="/resume" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-white py-2 hover:text-cyan-400 transition-colors">
                    <FileText className="w-6 h-6" /> Resume Builder
                  </Link>
                  <Link href="/ai-cover-letter" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-white py-2 hover:text-cyan-400 transition-colors">
                    <PenBox className="w-6 h-6" /> Cover Letter
                  </Link>
                  <Link href="/interview" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-white py-2 hover:text-cyan-400 transition-colors">
                    <GraduationCap className="w-6 h-6" /> Interview Prep
                  </Link>
                  <Link href="/settings/profile" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-white py-2 hover:text-cyan-400 transition-colors">
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
                    <Button className="w-full py-6 text-lg bg-cyan-600 hover:bg-cyan-700 transition-colors">Sign In</Button>
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