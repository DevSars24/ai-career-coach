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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24 pb-16">
      
      {/* --- ENHANCED RADIAL BACKGROUND (No Grid) --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#06b6d433,_transparent_50%),radial-gradient(circle_at_bottom,_#7c3aed33,_transparent_50%)]" />
        {/* Subtle floating orbs for depth */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ---------------- LEFT CONTENT ---------------- */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Scale Your Career with <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                  Precision AI
                </span>
              </h1>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-2xl md:text-3xl font-medium text-slate-300"
            >
              Master <span className="text-cyan-400 font-mono">
                {words[index].substring(0, subIndex)}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-1 h-8 bg-cyan-400 ml-1 translate-y-1"
                />
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed"
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
              <Button asChild size="lg" className="h-14 px-10 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all duration-300">
                <Link href="/dashboard">Launch Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg border-slate-600 text-slate-200 rounded-full hover:bg-white/10 transition-all duration-300">
                <Link href="/features">View Architecture</Link>
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
                  <div className="text-xl font-bold text-white drop-shadow-sm">{val}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-tighter">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---------------- RIGHT IMAGE (Reduced Size) ---------------- */}
          <motion.div
            style={{ y: yParallax }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex justify-center items-center"
          >
            {/* Ambient Glow */}
            <div className="absolute w-[100%] h-[100%] bg-cyan-500/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 p-2 bg-gradient-to-b from-white/10 to-transparent rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden group">
              <Image
                src="/banner.jpeg"
                width={400}
                height={250}
                alt="AI Interface"
                className="rounded-[1.5rem] transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Scanline Effect overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%]" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}