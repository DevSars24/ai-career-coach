"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  "Industry Interviews",
  "Strategic Growth",
  "Elite Resumes",
  "Winning Letters",
  "Future Skills",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- PARALLAX EFFECT ---
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, -40]);

  // --- ADVANCED TYPING ENGINE ---
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500); // Pause at end
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-16 transition-colors duration-300">
      
      {/* --- MINIMALIST DOT GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 dot-grid opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ---------------- LEFT CONTENT ---------------- */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground">
                Scale Your Career with <br />
                <span className="gradient-title drop-shadow-sm">
                  Precision AI
                </span>
              </h1>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-2xl md:text-3xl font-medium text-neutral-600 dark:text-neutral-400"
            >
              Master{" "}
              <span className="text-black dark:text-white font-mono font-bold">
                {words[index].substring(0, subIndex)}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-1 h-8 bg-black dark:bg-white ml-1 translate-y-1"
                />
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              The intelligent career co-pilot that optimizes your professional presence, 
              automates your applications, and prepares you for high-stakes roles.
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="h-14 px-10 text-lg bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100 rounded-full border border-neutral-200 dark:border-neutral-800 transition-all duration-300 shadow-md">
                <Link href="/dashboard">Launch Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg border-neutral-300 dark:border-neutral-700 text-foreground rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 bg-transparent">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </motion.div>

            {/* STATS */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-4"
            >
              {[
                ["10k+", "Engineers"],
                ["98%", "Placement"],
                ["Instant", "Feedback"],
              ].map(([val, label]) => (
                <div key={label} className="text-left">
                  <div className="text-xl font-bold text-foreground drop-shadow-sm">{val}</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---------------- RIGHT IMAGE ---------------- */}
          <motion.div
            style={{ y: yParallax }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative z-10 p-2 bg-neutral-100 dark:bg-neutral-900 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden group">
              <Image
                src="/banner.jpeg"
                width={400}
                height={250}
                alt="AI Interface"
                className="rounded-[1.5rem] transition-transform duration-700 group-hover:scale-105 border border-neutral-200 dark:border-neutral-800"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}