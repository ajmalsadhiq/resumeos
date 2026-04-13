'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Users, BookOpen, Star } from 'lucide-react'

export function GithubWindow() {
  const [hovered, setHovered] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/ajmalsadhiq')
      .then(r => r.json())
      .then(data => { setProfile(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="h-full overflow-y-auto bg-[#0d1117] flex flex-col items-center justify-center p-8 gap-6">

      {loading ? (
        <div className="text-gray-400 text-sm animate-pulse">Loading profile...</div>
      ) : (
        <>
          {/* Avatar with hover effect */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => window.open('https://github.com/ajmalsadhiq', '_blank')}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${hovered ? 'ring-4 ring-blue-500 ring-offset-4 ring-offset-[#0d1117] scale-105' : ''}`} />
            <img
              src={profile?.avatar_url || 'https://github.com/ajmalsadhiq.png'}
              alt="Ajmal Sadhiq"
              className={`w-36 h-36 rounded-full border-4 border-[#30363d] transition-all duration-300 ${hovered ? 'scale-105 border-blue-500' : ''}`}
            />
            {hovered && (
              <div className="absolute inset-0 rounded-full bg-blue-500/20 flex items-center justify-center">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          {/* Name & bio */}
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold">{profile?.name || 'Ajmal Sadhiq'}</h2>
            <p className="text-gray-400 text-sm mt-1">@{profile?.login || 'ajmalsadhiq'}</p>
            {profile?.bio && <p className="text-gray-300 text-sm mt-3 max-w-sm">{profile.bio}</p>}
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-1">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <span className="text-white font-bold text-lg">{profile?.public_repos ?? '—'}</span>
              <span className="text-gray-500 text-xs">Repos</span>
            </div>
            <div className="w-px bg-[#30363d]" />
            <div className="flex flex-col items-center gap-1">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-white font-bold text-lg">{profile?.followers ?? '—'}</span>
              <span className="text-gray-500 text-xs">Followers</span>
            </div>
            <div className="w-px bg-[#30363d]" />
            <div className="flex flex-col items-center gap-1">
              <Star className="w-5 h-5 text-gray-400" />
              <span className="text-white font-bold text-lg">{profile?.following ?? '—'}</span>
              <span className="text-gray-500 text-xs">Following</span>
            </div>
          </div>

          {/* Visit button */}
          <button
            onClick={() => window.open('https://github.com/ajmalsadhiq', '_blank')}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            Visit GitHub Profile
          </button>
        </>
      )}
    </div>
  )
}