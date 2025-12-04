"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  Settings as SettingsIcon,
} from "lucide-react";

import Link from "next/link";
import { useClerk, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

export default function Header() {
  const { signOut } = useClerk();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50">
      <nav className="container mx-auto px-4 h-20 md:h-24 lg:h-28 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <Image
            src="/logo.png"
            width={700}
            height={200}
            alt="Sarsai"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </Link>

        {/* NAV RIGHT SECTION */}
        <div className="flex items-center space-x-3">

          <SignedIn>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="hidden md:flex items-center gap-2">
                  <StarsIcon className="w-4 h-4" />
                  Growth Tools
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">

                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Resume Builder
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/ai-cover-letter" className="flex items-center gap-2">
                    <PenBox className="w-4 h-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserButton />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48" align="end">

                <DropdownMenuItem asChild>
                  <Link href="/settings/profile" className="flex gap-2">
                    <SettingsIcon className="w-4 h-4" /> Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex gap-2">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-500 cursor-pointer"
                  onClick={() => signOut({ redirectUrl: "/" })}
                >
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

          </SignedIn>

          {/* SIGN IN BUTTON */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

        </div>
      </nav>
    </header>
  );
}
