'use client';

import { useState } from 'react';
import { GraduationCap, Award, BarChart3, Calendar, ShieldCheck, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

const educationData = [
  {
    id: 1,
    type: "Education",
    title: "B.Tech in Computer Science & Engineering",
    institution: "Vellore Institute of Technology (VIT), Vellore",
    duration: "2022 - 2026",
    details: "Specialized in Core CSE track. Developed foundational knowledge in Data Structures & Algorithms, Database Management Systems, Compiler Design, and Machine Learning.",
    gpa: "CGPA: 8.38",
    color: "from-blue-500 to-indigo-500",
    icon: GraduationCap,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50"
  },
  {
    id: 2,
    type: "Certification",
    title: "Oracle Cloud Infrastructure Generative AI",
    institution: "Oracle",
    duration: "2024",
    details: "In-depth training on Generative AI foundations, Transformer architectures, Large Language Model (LLM) fine-tuning, RAG (Retrieval-Augmented Generation) pipelines, and deployment on OCI AI services.",
    gpa: "Credential ID: OCI-GENAI-2024",
    color: "from-amber-500 to-yellow-600",
    icon: Award,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50"
  },
  {
    id: 3,
    type: "Certification",
    title: "Google Analytics Certification",
    institution: "Google",
    duration: "2024",
    details: "Certified proficiency in Google Analytics 4 (GA4) system configuration, cross-platform tracking, user event reporting, and analytics dashboard creation for tracking web application engagement.",
    gpa: "GA4 Certified Developer",
    color: "from-emerald-500 to-teal-500",
    icon: BarChart3,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50"
  }
];

export function EducationWindow() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50/50 dark:bg-zinc-950/20">
      <div className="max-w-4xl mx-auto animate-scale-in">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Education & Certifications</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">My academic and professional learning path</p>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="relative pl-6 md:pl-8 border-l border-dashed border-gray-300 dark:border-zinc-800 ml-3 md:ml-4 space-y-8">
          {educationData.map((item, index) => {
            const isSelected = selectedCard === item.id;
            return (
              <div
                key={item.id}
                className="relative group transition-all duration-300"
                style={{
                  animation: `slideInUp 0.6s ease-out`,
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {/* Timeline node */}
                <div className={`absolute -left-[39px] md:-left-[47px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md ring-4 ring-white dark:ring-zinc-900 group-hover:scale-110 transition-transform duration-300 z-10`}>
                  <item.icon className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
                </div>

                {/* Content Card */}
                <div
                  onClick={() => setSelectedCard(isSelected ? null : item.id)}
                  className={`cursor-pointer p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden ${
                    isSelected ? 'ring-2 ring-indigo-500/50 scale-[1.01]' : 'hover:scale-[1.005]'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full border ${item.badgeColor}`}>
                        {item.type}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold">
                        <Calendar className="w-3 h-3" />
                        {item.duration}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] text-indigo-500 font-bold flex items-center gap-1.5 bg-indigo-50/50 dark:bg-indigo-950/20 px-2 py-0.5 rounded-md self-start md:self-auto">
                        <ShieldCheck className="w-3 h-3" /> Verify Credential
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-gray-905 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-xs font-bold mt-1">
                    {item.institution}
                  </p>
                  
                  <p className={`text-gray-650 dark:text-gray-400 text-xs leading-relaxed mt-3 transition-all ${
                    isSelected ? '' : 'line-clamp-2 md:line-clamp-none'
                  }`}>
                    {item.details}
                  </p>

                  <div className="flex items-center justify-between mt-4 border-t border-gray-50 dark:border-zinc-850 pt-3.5">
                    <span className="text-xs font-black text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-zinc-850 px-3 py-1 rounded-lg">
                      {item.gpa}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 flex items-center gap-1">
                      {isSelected ? "Click to collapse" : "Click to expand details"}
                    </span>
                  </div>

                  {/* Highlight bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color} rounded-r-md transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Continuous learning card */}
        <div className="mt-10 p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4.5 h-4.5 text-indigo-500" />
            <h3 className="text-sm font-bold text-gray-950 dark:text-white">Continuous Development</h3>
          </div>
          <p className="text-gray-750 dark:text-gray-350 text-xs leading-relaxed">
            Learning is an ongoing cycle. I dedicate my free hours to building side projects, reading engineering papers, 
            participating in coding bootcamps, and exploring new AI/ML tools. Check my GitHub and terminal outputs for updates 
            on active projects and experiments.
          </p>
        </div>
      </div>
    </div>
  );
}