import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import NavigationProgress from "@/components/NavigationProgress";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yash Thesiya · Software Engineer",
  description:
    "Animated portfolio of Yash Thesiya, Software Engineer at Openmalo. Specializing in modern web applications with React, Next.js, TypeScript, and Node.js.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Yash Thesiya",
    "Openmalo",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Nest.js",
    "Tailwind CSS",
    "Framer Motion",
    "Three.js",
    "React Three Fiber",
    "3D Web Design",
    "Creative Portfolio",
    "AI Integration",
    "SaaS Development",
    "Supabase",
    "PostgreSQL",
    "AWS",
    "Vercel",
  ],
  authors: [{ name: "Yash Thesiya" }],
  creator: "Yash Thesiya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yash-thesiya-2rni.vercel.app/",
    title: "Yash Thesiya · Software Engineer",
    description: "Building modern, animated, and performant web applications.",
    siteName: "Yash Thesiya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Thesiya · Software Engineer",
    description: "Building modern, animated, and performant web applications.",
    creator: "@yashthesiya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <NavigationProgress />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
