'use client';

import { MapPin, Calendar, Briefcase, Code2, Github, User } from 'lucide-react';

export function PortfolioWindow() {
  return (
    <div className="h-full overflow-y-auto bg-gray-50/50 dark:bg-zinc-950/20 p-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 animate-scale-in">
        
        {/* Left Side: Profile Card */}
        <div className="w-full md:w-80 flex-shrink-0 flex flex-col items-center p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm text-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur opacity-75 group-hover:opacity-100 transition duration-300 animate-spin-slow" />
            <img
              src="https://github.com/ajmalsadhiq.png"
              alt="Ajmal Sadhiq"
              className="relative w-32 h-32 rounded-full border-4 border-white dark:border-zinc-900 object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder-user.jpg";
              }}
            />
          </div>
          
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-4">Ajmal Sadhiq</h2>
          <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mt-1">Full-Stack Developer</p>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mt-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Work
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-xs mt-4 leading-relaxed">
            Passionate about building scalable web applications and solving complex problems with modern technologies.
          </p>

          <div className="w-full border-t border-gray-100 dark:border-zinc-800 my-4" />

          {/* Social buttons */}
          <div className="flex gap-3 justify-center w-full">
            <a
              href="https://github.com/ajmalsadhiq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-gray-800 dark:text-gray-200 transition-all hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:ajmalsadhiq7@gmail.com"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-gray-800 dark:text-gray-200 transition-all hover:scale-110"
            >
              <User className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Side: Profile Overview (No tabs) */}
        <div className="flex-1 flex flex-col p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-905 dark:text-white">Profile Overview</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Key professional details and background</p>
          </div>

          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-100 dark:border-zinc-855 bg-gray-50/50 dark:bg-zinc-950/20 hover:scale-[1.02] transition-all">
                <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Location</span>
                </div>
                <p className="text-gray-900 dark:text-white font-bold text-sm">VIT Vellore / India</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 dark:border-zinc-855 bg-gray-50/50 dark:bg-zinc-950/20 hover:scale-[1.02] transition-all">
                <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                  <Briefcase className="w-4 h-4 text-purple-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Experience</span>
                </div>
                <p className="text-gray-900 dark:text-white font-bold text-sm">Full-Stack Development</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 dark:border-zinc-855 bg-gray-50/50 dark:bg-zinc-950/20 hover:scale-[1.02] transition-all">
                <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                  <Code2 className="w-4 h-4 text-pink-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Focus Areas</span>
                </div>
                <p className="text-gray-950 dark:text-white font-bold text-sm">Web Apps & AI Pipelines</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 dark:border-zinc-855 bg-gray-50/50 dark:bg-zinc-950/20 hover:scale-[1.02] transition-all">
                <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Coding Since</span>
                </div>
                <p className="text-gray-900 dark:text-white font-bold text-sm">2021 (5 Years)</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 dark:border-zinc-855 bg-gray-50/50 dark:bg-zinc-950/20">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2.5">Bio Summary</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                I am a full-stack engineer and CSE student specialized in Next.js development, React systems, and AI workflows. 
                I focus on creating fluid interactive experiences that bridge complex backends with high-fidelity frontends. 
                Outside of building products, I enjoy researching Large Language Models, optimizing pipeline latencies, and playing with webcam computer vision wrappers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
