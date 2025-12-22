"use client";

import { motion } from "framer-motion";
import { heroText, fadeUp } from "./animations";

export default function Hero() {
  return (
    <section className="space-y-6 lg:space-y-7">
      <motion.div
        variants={heroText}
        initial="hidden"
        animate="visible"
        className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/5 px-3 py-1 text-xs font-medium text-sky-200 shadow-sm shadow-sky-500/40 backdrop-blur"
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
        Software Engineer at Openmalo
        <span className="text-zinc-400">· 1 yr 5 mos experience</span>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroText}
        className="space-y-4 sm:space-y-5"
      >
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-sky-400 via-emerald-300 to-indigo-400 bg-clip-text text-transparent">
            Yash Thesiya
          </span>
          .
        </h1>
        <p className="max-w-xl text-sm text-zinc-300/90 sm:text-base">
          I build modern, animated, and performant web applications with React, Next.js and
          Node.js, Nest.js– from smooth frontends to reliable backends. I have worked on SaaS projects where I implemented Gen AI and other cutting-edge technologies to create intelligent, scalable solutions.
        </p>
        <p className="max-w-xl text-sm text-zinc-400 sm:text-[0.95rem]">
          Right now I&apos;m working at{" "}
          <span className="font-semibold text-zinc-100">Openmalo</span>, shipping production
          features, collaborating with teams, and turning real product problems into clean,
          maintainable code.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
        className="flex flex-wrap gap-3"
      >
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-sky-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400"
        >
          <span>Let&apos;s work together</span>
          <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ✦
          </span>
          <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-sky-300/40 via-emerald-200/40 to-indigo-300/40 opacity-0 blur-2xl transition group-hover:opacity-100" />
        </a>
        <a
          href="/resume.pdf"
          download
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-300 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500/20 hover:border-emerald-500/60"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Download Resume</span>
          <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-emerald-300/20 via-sky-200/20 to-indigo-300/20 opacity-0 blur-2xl transition group-hover:opacity-100" />
        </a>
      </motion.div>
    </section>
  );
}

