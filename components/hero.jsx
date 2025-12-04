"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const words = [
  "Interviews",
  "Career Growth",
  "Resume Building",
  "Cover Letters",
  "Skill Development",
];

const HeroSection = () => {
  const imageRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");

  // Smooth Typing Animation
  useEffect(() => {
    let i = 0;
    const word = words[index];
    setDisplayedWord("");

    const typeInterval = setInterval(() => {
      setDisplayedWord(word.slice(0, i + 1));
      i++;
      if (i === word.length) clearInterval(typeInterval);
    }, 100);

    const changeWord = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(changeWord);
    };
  }, [index]);

  // Parallax scroll effect
  useEffect(() => {
    const el = imageRef.current;
    const onScroll = () => {
      const scrolled = window.scrollY;
      el.style.transform = `translateY(${scrolled * 0.1}px)`;
    };
  
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return (
    <section className="w-full pt-36 md:pt-48 pb-16 relative overflow-hidden">
      <div className="space-y-8 text-center animate-fadeIn">
        {/* TITLE */}
        <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl gradient-title leading-tight">
          Your Personalized AI Career Coach
        </h1>

        {/* TYPING EFFECT */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground h-10">
          Master{" "}
          <span className="text-white font-bold animate-blink">
            {displayedWord}
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto max-w-[650px] text-muted-foreground md:text-xl">
          Get expert-level career insights, smart interview preparation, and
          AI-powered guidance to accelerate your professional growth.
        </p>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 shadow-md hover:scale-105 transition">
              Start Now
            </Button>
          </Link>

        </div>

        {/* IMAGE */}
        <div className="hero-image-wrapper mt-10 flex justify-center">
          <div
            ref={imageRef}
            className="transition-all duration-500 ease-out"
          >
            <Image
              src="/banner.jpeg"
              width={700}
              height={100}
              alt="Dashboard Preview"
              className="rounded-xl shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* BACKGROUND EFFECT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
