"use client";

import { Html, Float } from "@react-three/drei";
import { skillIconMap, skillCategories } from "@/components/skills/skillIconMap";
import { useMemo } from "react";
import * as THREE from "three";

export function Skills3D() {
  const skills = useMemo(() => {
    return Object.values(skillCategories).flat();
  }, []);

  const positions = useMemo(() => {
    return skills.map(() => ({
      x: (Math.random() - 0.5) * 12,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 4,
      rotation: (Math.random() - 0.5) * 0.5
    }));
  }, [skills]);

  return (
    <group>
      <Html position={[0, 4, 0]} center transform>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">Skills</h2>
        <p className="text-zinc-400 text-center">My technical arsenal</p>
      </Html>
      
      {skills.map((skill, i) => {
        const Icon = skillIconMap[skill]?.icon;
        const color = skillIconMap[skill]?.color;
        
        return (
           <Float key={skill} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={1}>
             <group position={[positions[i].x, positions[i].y, positions[i].z]}>
                <Html transform distanceFactor={5} style={{ opacity: 0.9 }}>
                  <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform">
                     {Icon && <Icon className={`w-8 h-8 ${color || 'text-white'}`} />}
                     <span className="text-xs text-zinc-300 mt-1 font-medium whitespace-nowrap">{skill}</span>
                  </div>
                </Html>
             </group>
           </Float>
        );
      })}
    </group>
  );
}
