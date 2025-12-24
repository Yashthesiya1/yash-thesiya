"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";

export default function Scene() {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="h-screen w-full"
      >
        <Suspense fallback={null}>
           <Experience />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
