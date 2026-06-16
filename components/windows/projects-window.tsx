'use client';

import { useState } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  color: string;
  github: string;
  image: string;
  deployed: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Planora",
    description: "AI Floor Plan to 3D Visualizer that transforms flat 2D floor plans into realistic, depth-aware 3D architectural renders",
    tech: ["React", "Vite", "Puter.js AI", "jsPDF", "Tailwind CSS"],
    color: "from-blue-600 to-cyan-600",
    github: "https://github.com/ajmalsadhiq/Planora",
    image: "/projects/planora.jpg",
    deployed: "https://planora-pi.vercel.app/"
  },
  {
    id: 2,
    name: "MeetFlow",
    description: "Real-time remote collaboration platform built with WebRTC, low-latency video streaming, and guest scheduling features",
    tech: ["Next.js", "Stream SDK", "Clerk Auth", "TypeScript", "Tailwind CSS"],
    color: "from-purple-600 to-pink-600",
    github: "https://github.com/ajmalsadhiq/MeetFlow",
    image: "/projects/meetflow.jpg",
    deployed: "https://meet-flow-psi.vercel.app/"
  },
  {
    id: 3,
    name: "Auto Vault",
    description: "Location-aware mobile application for browsing, buying, and listing second-hand vehicles with localized searches",
    tech: ["React Native", "Expo", "Appwrite", "TypeScript", "NativeWind"],
    color: "from-orange-600 to-red-600",
    github: "https://github.com/ajmalsadhiq/Auto-Vault",
    image: "/projects/auto-vault.jpg",
    deployed: "https://expo.dev/accounts/ajmalsadhiq/projects/AutoVault/builds/cf284123-e797-44fb-b7f1-9ef08ccbc141"
  },
  {
    id: 4,
    name: "Hate Speech Detection System",
    description: "An end-to-end NLP system for real-time automatic classification of text into hate speech, offensive, and neutral categories",
    tech: ["Next.js", "FastAPI", "PyTorch", "Transformers", "PostgreSQL", "Docker"],
    color: "from-green-600 to-emerald-600",
    github: "https://github.com/ajmalsadhiq/hatespeech-detection-nlp",
    image: "/projects/hate-speech-detector.jpg",
    deployed: "https://hatespeech-six.vercel.app"
  },
  {
    id: 5,
    name: "Budget Tracker v2.0",
    description: "Financial monitoring web application with onboarding configurations, transaction controls, and Google Authentication",
    tech: ["Next.js", "Supabase", "Recharts", "TypeScript", "Tailwind CSS"],
    color: "from-yellow-600 to-orange-600",
    github: "https://github.com/ajmalsadhiq/budget-tracker-v2.0",
    image: "/projects/budget-tracker.jpg",
    deployed: "https://benevolent-naiad-d653e2.netlify.app/"
  },
  {
    id: 6,
    name: "RAG Chatbot Suite",
    description: "Retrieval-Augmented Generation pipeline built to process complex structured HR/IT business policies using semantic indexing",
    tech: ["n8n", "Gemini API", "Qdrant Vector DB", "Python", "Docker"],
    color: "from-teal-600 to-blue-600",
    github: "https://github.com/ajmalsadhiq/RAG-Chatbot-with-n8n-Gemini-Qdrant",
    image: "/projects/rag-chatbot.png",
    deployed: "https://github.com/ajmalsadhiq/RAG-Chatbot-with-n8n-Gemini-Qdrant"
  },
  {
    id: 7,
    name: "MSSPF Portal",
    description: "Government-grade, multi-portal administrative system representing the Military & Security Services Pension Fund with bi-directional layouts",
    tech: ["Angular 21", "TypeScript", "Tailwind CSS", "RxJS"],
    color: "from-emerald-700 to-yellow-800",
    github: "https://github.com/ajmalsadhiq/mssf-portal",
    image: "/projects/msspf.png",
    deployed: "https://mssf-portal.vercel.app/"
  },
  {
    id: 8,
    name: "Hand Gesture Mouse",
    description: "Computer vision utility that maps real-time webcam hand coordinates to mouse cursor, system volume, and screen controls",
    tech: ["Python", "MediaPipe", "OpenCV", "PyAutoGUI"],
    color: "from-indigo-600 to-green-600",
    github: "https://github.com/ajmalsadhiq/handgesture-control-mouse",
    image: "/projects/handgesture.png",
    deployed: "https://github.com/ajmalsadhiq/handgesture-control-mouse"
  },
  {
    id: 9,
    name: "Energy Wastage Detector",
    description: "ML-powered anomaly detector that tracks appliance power consumption and flags issues using Isolation Forest models",
    tech: ["Python", "Isolation Forest", "Flask", "Pandas", "Scikit-Learn"],
    color: "from-yellow-500 to-amber-700",
    github: "https://github.com/ajmalsadhiq/energy_wastage_detector",
    image: "/projects/energy-wastage.png",
    deployed: "https://github.com/ajmalsadhiq/energy_wastage_detector"
  },
  {
    id: 10,
    name: "Ajmal.fm (Spotify Player)",
    description: "A client-only, Spotify-inspired web music player that lists skills, experience, and projects as tracks",
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    color: "from-green-500 to-zinc-900",
    github: "https://github.com/ajmalsadhiq/resume-player",
    image: "/projects/resume-player.png",
    deployed: "https://resume-player.vercel.app/"
  }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgSrc, setImgSrc] = useState(project.image);

  return (
    <div
      className="group border border-gray-300 rounded-lg bg-gray-50 hover-lift transition-all overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Project Image */}
      <a
        href={project.deployed}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden h-48 bg-gray-200"
      >
        <img
          src={imgSrc}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.onerror = null;
            setImgSrc('/placeholder.jpg');
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Visit Live Site
          </span>
        </div>
      </a>

      {/* Project Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={`text-xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
              {project.name}
            </h3>
            <p className="text-gray-700 text-sm mt-1">{project.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-800 border border-gray-400 hover-scale cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-black text-white text-sm font-semibold rounded hover:shadow-lg hover:bg-gray-900 transition-all hover:scale-105 text-center"
          >
            GitHub
          </a>
          <a
            href={project.deployed}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gray-300 text-black text-sm font-semibold rounded hover:shadow-lg hover:bg-gray-400 transition-all hover:scale-105 text-center"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProjectsWindow() {
  return (
    <div className="h-full overflow-y-auto p-6 bg-white">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-black mb-6 animate-fade-in">Featured Projects</h2>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
