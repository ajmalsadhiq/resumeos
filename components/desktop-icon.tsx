'use client'

import { type LucideIcon } from 'lucide-react'

interface DesktopIconProps {
  label: string
  icon: LucideIcon
  onClick: () => void
}

export function DesktopIcon({ label, icon: Icon, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 w-20 group cursor-pointer"
    >
      <div className="w-14 h-14 bg-white backdrop-blur-sm rounded-lg border border-gray-300 flex items-center justify-center group-hover:border-black transition-all duration-300 shadow-lg group-hover:shadow-gray-800/30 hover-scale active:scale-95">
        <Icon className="w-7 h-7 text-black group-hover:text-gray-700 transition-colors" />
      </div>
      <span className="text-xs text-center text-black font-medium leading-tight px-2 py-1 bg-white rounded-md border border-gray-300 group-hover:bg-gray-100 group-hover:border-black transition-all">
        {label}
      </span>
    </button>
  )
}
