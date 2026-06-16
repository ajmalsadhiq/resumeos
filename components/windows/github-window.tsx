'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Users, BookOpen, Star, GitFork, Sparkles, FolderGit2 } from 'lucide-react';

const fallbackRepos = [
  { name: "Planora", description: "AI Floor Plan to 3D Visualizer that transforms 2D plans into depth-aware 3D architectural renders", language: "TypeScript", stargazers_count: 12, forks_count: 2, html_url: "https://github.com/ajmalsadhiq/Planora" },
  { name: "MeetFlow", description: "Real-time remote collaboration platform built with WebRTC, low-latency video streaming", language: "TypeScript", stargazers_count: 8, forks_count: 1, html_url: "https://github.com/ajmalsadhiq/MeetFlow" },
  { name: "Auto-Vault", description: "Location-aware mobile application for browsing, buying, and listing second-hand vehicles", language: "TypeScript", stargazers_count: 5, forks_count: 0, html_url: "https://github.com/ajmalsadhiq/Auto-Vault" },
  { name: "hatespeech-detection-nlp", description: "An end-to-end NLP system for real-time automatic classification of text into hate speech", language: "Python", stargazers_count: 6, forks_count: 2, html_url: "https://github.com/ajmalsadhiq/hatespeech-detection-nlp" }
];

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Python: "bg-sky-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Angular: "bg-red-500"
};

export function GithubWindow() {
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://api.github.com/users/ajmalsadhiq').then(r => r.json()),
      fetch('https://api.github.com/users/ajmalsadhiq/repos?sort=updated&per_page=6').then(r => r.json())
    ])
      .then(([profileData, reposData]) => {
        if (profileData && profileData.login) setProfile(profileData);
        if (Array.isArray(reposData)) {
          // Filter out user-profile description repos or empty names
          const filtered = reposData.filter(r => r.name !== 'ajmalsadhiq' && !r.fork).slice(0, 4);
          setRepos(filtered.length > 0 ? filtered : fallbackRepos);
        } else {
          setRepos(fallbackRepos);
        }
        setLoading(false);
      })
      .catch(() => {
        setRepos(fallbackRepos);
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-[#0d1117] text-gray-300 p-6">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-400 text-sm animate-pulse flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 animate-spin" />
            Connecting to GitHub API...
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 animate-scale-in">
          
          {/* Left Panel: Profile Info */}
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col items-center lg:items-start p-5 bg-[#161b22] border border-[#30363d] rounded-2xl text-center lg:text-left h-fit">
            <div className="relative group cursor-pointer" onClick={() => window.open('https://github.com/ajmalsadhiq', '_blank')}>
              <img
                src={profile?.avatar_url || 'https://github.com/ajmalsadhiq.png'}
                alt="Ajmal Sadhiq"
                className="w-28 h-28 lg:w-36 lg:h-36 rounded-full border-2 border-[#30363d] group-hover:border-blue-500 transition-all duration-300 object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mt-4">{profile?.name || 'Ajmal Sadhiq'}</h2>
            <p className="text-gray-400 text-sm">@{profile?.login || 'ajmalsadhiq'}</p>
            
            {profile?.bio && (
              <p className="text-gray-350 text-xs mt-3 leading-relaxed border-b border-[#30363d] pb-4 w-full">
                {profile.bio}
              </p>
            )}

            {/* Profile stats */}
            <div className="flex justify-around lg:justify-between w-full mt-4 border-b border-[#30363d] pb-4">
              <div className="flex flex-col items-center lg:items-start gap-0.5">
                <span className="text-white font-bold text-sm">{profile?.public_repos ?? '12'}</span>
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Repos</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-0.5">
                <span className="text-white font-bold text-sm">{profile?.followers ?? '—'}</span>
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Followers</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-0.5">
                <span className="text-white font-bold text-sm">{profile?.following ?? '—'}</span>
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Following</span>
              </div>
            </div>

            <button
              onClick={() => window.open('https://github.com/ajmalsadhiq', '_blank')}
              className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-bold rounded-xl border border-[#30363d] transition-all active:scale-[0.98]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Profile on GitHub
            </button>
          </div>

          {/* Right Panel: Top Repositories */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3.5">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Active Repositories
              </h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sorted by activity</span>
            </div>

            {/* Repos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <div
                  key={repo.name}
                  onClick={() => window.open(repo.html_url, '_blank')}
                  className="p-5 bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-black/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FolderGit2 className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <h4 className="text-sm font-bold text-blue-400 group-hover:underline truncate max-w-[200px]">
                        {repo.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 mb-4">
                      {repo.description || "No description provided for this repository."}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto border-t border-[#30363d] pt-3 text-[10px] font-bold text-gray-500">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${languageColors[repo.language] || 'bg-gray-400'}`} />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{repo.forks_count ?? 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mock Contribution Grid */}
            <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-bold text-white">Contribution History</h4>
              </div>
              {/* Green block pattern */}
              <div className="flex flex-wrap gap-1 w-full justify-start select-none">
                {Array.from({ length: 98 }).map((_, idx) => {
                  const greenLevel = idx % 9 === 0 ? "bg-[#39d353]" : idx % 5 === 0 ? "bg-[#26a641]" : idx % 3 === 0 ? "bg-[#0e4429]" : "bg-[#161b22] border border-[#30363d]";
                  return (
                    <div key={idx} className={`w-2.5 h-2.5 rounded-sm ${greenLevel}`} />
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-3 text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#161b22] border border-[#30363d]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}