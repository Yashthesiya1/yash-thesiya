"use client";

import { Html, Float } from "@react-three/drei";
import { SiGithub, SiLinkedin, SiMaildotru } from "react-icons/si";

export function Contact3D() {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
         <Html transform center>
           <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-black/40 border border-zinc-800 backdrop-blur-xl">
              <h2 className="text-4xl font-bold text-white">Let's Connect</h2>
              <p className="text-zinc-400 text-center max-w-md">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="flex gap-4">
                 <a href="https://github.com" target="_blank" className="p-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                    <SiGithub className="w-6 h-6" />
                 </a>
                 <a href="https://linkedin.com" target="_blank" className="p-3 rounded-full bg-[#0077b5] text-white hover:bg-[#006396] transition-colors">
                    <SiLinkedin className="w-6 h-6" />
                 </a>
                 <a href="mailto:email@example.com" className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">
                    <SiMaildotru className="w-6 h-6" />
                 </a>
              </div>
              
              <a 
                href="mailto:email@example.com"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Say Hello
              </a>
           </div>
         </Html>
      </Float>
    </group>
  );
}
