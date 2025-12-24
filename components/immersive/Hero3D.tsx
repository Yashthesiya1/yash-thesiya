"use client";

import { Float, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { heroText, fadeUp } from "../animations";

export function Hero3D() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Html position={[0, 0.5, 0]} transform center className="w-[80vw] max-w-4xl">
           <div className="flex flex-col items-center justify-center text-center select-none">
             <motion.div
               variants={heroText}
               initial="hidden"
               animate="visible"
               className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/5 px-3 py-1 text-xs font-medium text-sky-200 shadow-sm shadow-sky-500/40 backdrop-blur mb-6"
             >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                Software Engineer at Openmalo
                <span className="text-zinc-400 hidden sm:inline">· 1 yr 5 mos experience</span>
             </motion.div>

             <motion.div
               initial="hidden"
               animate="visible"
               variants={heroText}
               className="space-y-4 sm:space-y-5"
             >
               <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                 Hi, I&apos;m{" "}
                 <span className="bg-gradient-to-r from-sky-400 via-emerald-300 to-indigo-400 bg-clip-text text-transparent">
                   Yash Thesiya
                 </span>
                 .
               </h1>
               <p className="mx-auto max-w-2xl text-sm text-zinc-300/90 sm:text-lg">
                 I build modern, animated, and performant web applications with React, Next.js and
                 Node.js. From smooth frontends to reliable backends, I create intelligent, scalable solutions.
               </p>
             </motion.div>

             <motion.div
               initial="hidden"
               animate="visible"
               variants={fadeUp}
               custom={1}
               className="flex flex-wrap items-center justify-center gap-4 mt-8"
             >
               <a
                 href="#contact"
                 className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-sky-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400"
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
                 className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-sm font-medium text-emerald-300 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500/20 hover:border-emerald-500/60"
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
           </div>
        </Html>
      </Float>

      {/* Decorative Geometric Shapes */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-5, 2, -3]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#0ea5e9" wireframe />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[5, -1, -4]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#10b981" wireframe />
        </mesh>
      </Float>
      
       <Float speed={3} rotationIntensity={2} floatIntensity={0.5}>
        <mesh position={[0, -4, -2]}>
          <torusGeometry args={[0.7, 0.2, 16, 32]} />
          <meshStandardMaterial color="#6366f1" wireframe />
        </mesh>
      </Float>
    </group>
  );
}
