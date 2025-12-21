"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Sphere, Torus } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub, SiVercel } from "react-icons/si";
import * as THREE from "three";

const projects = [
  {
    id: 1,
    title: "Creativeshizzle",
    description: "An AI-powered content creation platform that helps businesses generate branded content. Features include website scraping via Firecrawl, AI-powered brand overview generation using GPT-4.1 or Claude Sonnet 4, calendar-based content scheduling, long-form article generation (2000+ words), real-time Canvas chat interface with markdown and code support, Monday.com integration, Stripe payments, and comprehensive admin management.",
    role: "Full-stack Developer",
    tech: ["Next.js", "Shadcn", "Nest.js", "Supabase", "LangChain", "Stripe", "Docker"],
    github: "#",
    live: "#",
    color: "#0ea5e9",
    icon: "✨",
  },
  {
    id: 2,
    title: "XyReg",
    description: "An end-to-end Medical Device Regulatory Management Platform supporting medical technology companies from concept to post-market surveillance. Manages regulatory submissions across major global markets, ensures ISO 13485 QMS compliance, integrates ISO 14971 risk management, and provides full product lifecycle management with AI-powered features.",
    role: "Full-stack Developer",
    tech: ["React", "Radix UI", "Express.js", "Supabase", "Stripe", "Vertex AI"],
    github: "#",
    live: "#",
    color: "#10b981",
    icon: "🏥",
  },
];

// Animated Orb Ring around cards
function OrbRing({ position, color, index }: { position: [number, number, number]; color: string; index: number }) {
  const ringRef = useRef<THREE.Group>(null);
  const orbCount = 8;

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.2;
    }
  });

  return (
    <group ref={ringRef} position={position}>
      {Array.from({ length: orbCount }, (_, i) => {
        const angle = (i / orbCount) * Math.PI * 2;
        const x = Math.cos(angle) * 1.8;
        const y = Math.sin(angle) * 1.8;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
      
      {/* Torus ring */}
      <Torus args={[1.8, 0.02, 8, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </Torus>
    </group>
  );
}

// Floating geometric shapes
function FloatingShape({ position, color, index }: { position: [number, number, number]; color: string; index: number }) {
  const shapeRef = useRef<THREE.Mesh>(null);
  const shapeType = index % 3;

  useFrame((state) => {
    if (shapeRef.current) {
      shapeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3;
      shapeRef.current.rotation.x = state.clock.elapsedTime * 0.3 + index;
      shapeRef.current.rotation.y = state.clock.elapsedTime * 0.4 + index;
      shapeRef.current.rotation.z = state.clock.elapsedTime * 0.2 + index;
    }
  });

  return (
    <mesh ref={shapeRef} position={position}>
      {shapeType === 0 && <octahedronGeometry args={[0.15, 0]} />}
      {shapeType === 1 && <tetrahedronGeometry args={[0.15, 0]} />}
      {shapeType === 2 && <icosahedronGeometry args={[0.12, 0]} />}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// Enhanced 3D Project Card
function ProjectCard({ 
  project, 
  position, 
  index,
  onClick 
}: { 
  project: typeof projects[0]; 
  position: [number, number, number]; 
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (cardRef.current) {
      // Floating animation
      cardRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.2;
      
      // Gentle rotation
      if (!hovered) {
        cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15 + index) * 0.2;
        cardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1 + index) * 0.05;
      }
      
      // Hover effect
      if (hovered) {
        cardRef.current.rotation.y += 0.02;
        cardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        cardRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        cardRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }

    // Pulsing glow
    if (glowRef.current && hovered) {
      const intensity = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
      (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <group ref={cardRef} position={position}>
      {/* Orb Ring around card */}
      <OrbRing position={[0, 0, 0]} color={project.color} index={index} />

      {/* Main Card with rounded edges effect */}
      <group>
        {/* Card frame */}
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[2.8, 3.8, 0.2]} />
          <meshStandardMaterial
            color={hovered ? project.color : "#1e293b"}
            metalness={0.95}
            roughness={0.05}
            emissive={hovered ? project.color : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>

        {/* Inner card surface */}
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[2.7, 3.7, 0.05]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Glow effect */}
        <mesh ref={glowRef} position={[0, 0, -0.15]}>
          <boxGeometry args={[3.2, 4.2, 0.1]} />
          <meshStandardMaterial
            color={project.color}
            transparent
            opacity={hovered ? 0.4 : 0}
            emissive={project.color}
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Icon/Emoji representation */}
      <Text
        position={[0, 1.5, 0.15]}
        fontSize={0.6}
        anchorX="center"
        anchorY="middle"
      >
        {project.icon}
      </Text>

      {/* Title Text */}
      <Text
        position={[0, 0.8, 0.15]}
        fontSize={0.22}
        color={hovered ? project.color : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.4}
      >
        {project.title}
      </Text>   

      {/* Role Badge */}
      <mesh position={[0, 0.2, 0.15]}>
        <boxGeometry args={[1.5, 0.3, 0.05]} />
        <meshStandardMaterial
          color={hovered ? project.color : "#334155"}
          emissive={hovered ? project.color : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      <Text
        position={[0, 0.2, 0.16]}
        fontSize={0.1}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {project.role}
      </Text>

      {/* Animated Tech Stack Pills */}
      {project.tech.slice(0, 5).map((tech, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 1.5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius - 1.2;
        
        return (
          <group key={tech} position={[x, y, 0.15]}>
            <mesh>
              <boxGeometry args={[0.5, 0.2, 0.05]} />
              <meshStandardMaterial
                color={hovered ? project.color : "#475569"}
                emissive={hovered ? project.color : "#000000"}
                emissiveIntensity={hovered ? 0.4 : 0}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.08}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.45}
            >
              {tech}
            </Text>
          </group>
        );
      })}

      {/* Floating shapes around card */}
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 2.2;
        return (
          <FloatingShape
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              -0.5
            ]}
            color={project.color}
            index={index * 4 + i}
          />
        );
      })}
    </group>
  );
}

// Enhanced Particles with trails
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 150;

  const positions = useRef<Float32Array>(
    new Float32Array(
      Array.from({ length: particleCount * 3 }, () => (Math.random() - 0.5) * 30)
    )
  );

  const colors = useRef<Float32Array>(
    new Float32Array(
      Array.from({ length: particleCount * 3 }, (_, i) => {
        const color = i % 2 === 0 ? new THREE.Color("#0ea5e9") : new THREE.Color("#10b981");
        return [color.r, color.g, color.b];
      }).flat()
    )
  );

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.15;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        vertexColors 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Energy beams connecting cards
function EnergyBeam({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const beamRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (beamRef.current) {
      const material = beamRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const midPoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 + 1,
    (start[2] + end[2]) / 2,
  ];

  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) +
    Math.pow(end[1] - start[1], 2) +
    Math.pow(end[2] - start[2], 2)
  );

  return (
    <mesh ref={beamRef} position={midPoint}>
      <boxGeometry args={[0.05, distance, 0.05]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

// Main Scene
function Scene({ onProjectClick }: { onProjectClick: (project: typeof projects[0]) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-6, 4, -6]} intensity={0.8} color="#0ea5e9" />
      <pointLight position={[6, 4, -6]} intensity={0.8} color="#10b981" />
      <spotLight position={[0, 12, 0]} angle={0.4} penumbra={1} intensity={0.6} castShadow />
      <pointLight position={[0, 0, 5]} intensity={0.4} color="#ffffff" />

      {/* Project Cards */}
      {projects.map((project, idx) => (
        <ProjectCard
          key={project.id}
          project={project}
          position={[idx === 0 ? -3 : 3, 0, 0]}
          index={idx}
          onClick={() => onProjectClick(project)}
        />
      ))}

      {/* Energy beam connecting cards */}
      <EnergyBeam 
        start={[-3, 0, 0]} 
        end={[3, 0, 0]} 
        color="#6366f1" 
      />

      {/* Particles */}
      <Particles />

      {/* Enhanced ground with grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.4} 
          roughness={0.6}
          emissive="#000000"
        />
      </mesh>

      {/* Grid lines on ground */}
      <gridHelper args={[25, 25, "#1a1a1a", "#0f0f0f"]} position={[0, -3.99, 0]} />
    </>
  );
}

// Detail Panel Component (keeping the same)
function ProjectDetail({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: typeof projects[0] | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateY: 15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateY: -15 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full rounded-2xl border border-zinc-700/60 bg-zinc-900/95 p-8 backdrop-blur-xl max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: `0 0 40px ${project.color}40`,
            }}
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{project.icon}</span>
                    <h2 className="text-4xl font-bold text-white">{project.title}</h2>
                  </div>
                  <span 
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      borderColor: `${project.color}40`,
                    }}
                  >
                    {project.role}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-white transition-colors text-3xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800"
                >
                  ×
                </button>
              </div>

              <p className="text-zinc-300 leading-relaxed text-base">{project.description}</p>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/40 hover:border-zinc-600/60 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800/60 text-zinc-300 hover:text-white hover:bg-zinc-700/60 transition-colors"
                >
                  <SiGithub className="h-5 w-5" />
                  <span>View Code</span>
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-colors"
                  style={{
                    backgroundColor: `${project.color}20`,
                    color: project.color,
                    borderColor: `${project.color}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${project.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${project.color}20`;
                  }}
                >
                  <SiVercel className="h-5 w-5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects3D() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="space-y-12"
      >
        <div className="text-center space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white sm:text-6xl bg-gradient-to-r from-sky-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent"
          >
            PROJECTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-400 text-lg"
          >
            Explore my work in immersive 3D • Click cards to dive deeper
          </motion.p>
        </div>

        <div className="relative w-full h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border border-zinc-700/60 bg-zinc-900/20 backdrop-blur">
          <Canvas shadows camera={{ position: [0, 2, 9], fov: 50 }}>
            <PerspectiveCamera makeDefault />
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={7}
              maxDistance={15}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate
              autoRotateSpeed={0.3}
            />
            <Scene onProjectClick={handleProjectClick} />
          </Canvas>

          {/* Enhanced instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-6 py-3 rounded-xl border border-zinc-700/60 shadow-lg">
            <p className="text-sm text-zinc-300 flex items-center gap-2">
              <span className="text-xl animate-pulse">✨</span>
              <span>Click cards • Drag to orbit • Scroll to zoom • Auto-rotating</span>
            </p>
          </div>
        </div>
      </motion.div>

      <ProjectDetail
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setTimeout(() => setSelectedProject(null), 300);
        }}
      />
    </>
  );
}
