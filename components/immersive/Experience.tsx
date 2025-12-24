"use client";

import { ScrollControls, Scroll, Float } from "@react-three/drei";
import { StarField } from "./StarField";
import { Hero3D } from "./Hero3D";
import { Skills3D } from "./Skills3D";
import { Projects3DDisplay } from "./Projects3DDisplay";
import { Contact3D } from "./Contact3D";

export default function Experience() {
  return (
    <>
      <color attach="background" args={["#050816"]} />
      
      {/* Ambient and Directional Light */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      {/* Starfield Background */}
      <StarField />
      
      <ScrollControls pages={4} damping={0.3}>
        {/* Scrollable Content */}
        <Scroll>
          {/* Page 1: Hero */}
          <Hero3D />
          
          {/* Page 2: Skills */}
          <group position={[0, -10, 0]}>
             <Skills3D />
          </group>

          {/* Page 3: Projects */}
          <group position={[0, -20, 0]}>
            <Projects3DDisplay />
          </group>
          
          {/* Page 4: Contact/Education */}
          <group position={[0, -30, 0]}>
            <Contact3D />
          </group>
        </Scroll>
      </ScrollControls>
    </>
  );
}
