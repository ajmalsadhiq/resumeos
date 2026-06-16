'use client';

import { useState } from 'react';
import { Award, Code2, Globe, Database, Terminal, Settings, Sparkles } from 'lucide-react';

const skillCategories = [
  {
    category: "Languages",
    icon: Globe,
    colorClass: "from-orange-500 to-amber-500",
    skills: [
      { name: "JavaScript / TypeScript", level: 95 },
      { name: "Python", level: 85 },
      { name: "SQL (PostgreSQL / MySQL)", level: 90 },
      { name: "HTML5 / CSS3", level: 95 }
    ]
  },
  {
    category: "Frontend",
    icon: Code2,
    colorClass: "from-blue-500 via-indigo-500 to-purple-600",
    skills: [
      { name: "React.js / Virtual DOM", level: 95 },
      { name: "Next.js (App Router / Turbopack)", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Three.js / WebGL", level: 80 }
    ]
  },
  {
    category: "Backend",
    icon: Database,
    colorClass: "from-emerald-500 to-teal-600",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "FastAPI / Python backends", level: 85 },
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 85 }
    ]
  },
  {
    category: "Tools & DevOps",
    icon: Settings,
    colorClass: "from-pink-500 to-rose-600",
    skills: [
      { name: "Git / GitHub Versioning", level: 95 },
      { name: "Docker Containerization", level: 80 },
      { name: "AWS Cloud Services", level: 80 },
      { name: "Firebase (Auth / FireStore)", level: 85 }
    ]
  }
];

export function SkillsWindow() {
  const [activeTab, setActiveTab] = useState<string>('All');

  const filteredCategories = activeTab === 'All'
    ? skillCategories
    : skillCategories.filter(cat => cat.category === activeTab);

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50/50 dark:bg-zinc-950/20">
      <div className="max-w-4xl mx-auto animate-scale-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Skills & Expertise</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">My technical stack and proficiency levels</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-gray-100 dark:bg-zinc-850 rounded-xl self-start mb-8 max-w-max">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'All'
                ? 'bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            All Tech Stack
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(cat.category)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === cat.category
                  ? 'bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.category}
            </button>
          ))}
        </div>

        {/* Categories List */}
        <div className="space-y-8">
          {filteredCategories.map((category, catIdx) => (
            <div
              key={category.category}
              className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.colorClass} flex items-center justify-center text-white shadow-sm`}>
                  <category.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-905 dark:text-white">
                  {category.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-gray-700 dark:text-gray-300 text-xs font-bold">{skill.name}</span>
                      <span className="text-gray-950 dark:text-gray-200 text-xs font-black">{skill.level}%</span>
                    </div>
                    {/* Glowing progress track */}
                    <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden border border-gray-200/50 dark:border-zinc-800 relative group-hover:border-gray-350 dark:group-hover:border-zinc-700 transition-colors">
                      <div
                        className={`h-full bg-gradient-to-r ${category.colorClass} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: `${skill.level}%`,
                          animation: `slideInLeft 0.8s ease-out`,
                          animationDelay: `${catIdx * 0.15 + skillIdx * 0.08}s`,
                          animationFillMode: 'both'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tech Skills tags */}
        <div className="mt-8 p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4.5 h-4.5 text-blue-500" />
            <h3 className="text-sm font-bold text-gray-950 dark:text-white">General & Additional Expertise</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "RESTful APIs", "GraphQL Clienting", "Websockets / HMR", "OAuth 2.0 Auth", 
              "JWT Tokens", "Responsive UI Design", "Clerk Authentication", "UI/UX Prototyping", 
              "Jest Testing", "Agile SCRUM workflow", "Vercel Deployments", "Supabase DB Hosting"
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-[10px] font-bold bg-gray-100 hover:bg-gray-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-full hover-scale cursor-default border border-gray-200/60 dark:border-zinc-850 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
