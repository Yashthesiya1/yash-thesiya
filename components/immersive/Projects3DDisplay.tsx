"use client";

import { Html } from "@react-three/drei";
import { ProjectCard, projects } from "@/components/Projects3D";
import { useState } from "react";
import * as THREE from "three";

export function Projects3DDisplay() {
   const [activeProject, setActiveProject] = useState<number | null>(null);

   return (
    <group>
      <Html position={[0, 4, 0]} center transform>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">Projects</h2>
        <p className="text-zinc-400 text-center">Selected works</p>
      </Html>

      {projects.map((project, idx) => {
        // Position them side by side
        const xPos = (idx - (projects.length - 1) / 2) * 6;
        
        return (
          <group key={project.id} position={[xPos, 0, 0]}>
             <ProjectCard 
                project={project} 
                position={[0, 0, 0]} 
                index={idx}
                onClick={() => {
                   // Logic to handle click, maybe open a modal via Html overlay
                   // For now just console log or we can use a global state to show details
                   console.log("Clicked", project.title);
                }} 
             />
             {/* Add a 'View Details' HTML button below */}
             <Html position={[0, -2.5, 0]} transform center>
               <a 
                 href={project.live} 
                 target="_blank"
                 className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm backdrop-blur transition-all"
               >
                 View Live
               </a>
             </Html>
          </group>
        );
      })}
    </group>
   );
}
