'use client'

import { useState } from 'react'
import { DesktopIcon } from './desktop-icon'
import { Window } from './window'
import { HomeWindow } from './windows/home-window'
import { DocumentationWindow } from './windows/documentation-window'
import { PricingWindow } from './windows/pricing-window'
import { RoadmapWindow } from './windows/roadmap-window'
import { UpdateWindow } from './windows/update-window'
import { TerminalWindow } from './windows/terminal-window'
import { PortfolioWindow } from './windows/portfolio-window'
import { ProjectsWindow } from './windows/projects-window'
import { SkillsWindow } from './windows/skills-window'
import { EducationWindow } from './windows/education-window'
import { ContactWindow } from './windows/contact-window'
import { FileText, Package, Calculator, Video, HelpCircle, LogIn, Briefcase, Trash2, RefreshCw, Terminal, User, Code2, Award, Mail, Rocket, Search, X } from 'lucide-react'
import { GithubWindow } from './windows/github-window'
interface OpenWindow {
  id: string
  title: string
  component: React.ReactNode
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  isMinimized: boolean
}

export function Desktop() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([])
  const [nextZIndex, setNextZIndex] = useState(10)
  const [backgroundColor, setBackgroundColor] = useState('#d4c4a8')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const bgColorMap: Record<string, string> = {
    beige: '#d4c4a8',
    blue: '#3b82f6',
    red: '#ef4444'
  }

  const handleBackgroundChange = (color: string) => {
    setBackgroundColor(bgColorMap[color] || '#d4c4a8')
  }

  const leftIcons = [
    { id: 'portfolio', label: 'About Me', icon: User, component: <PortfolioWindow /> },
    { id: 'projects', label: 'Projects', icon: Code2, component: <ProjectsWindow /> },
    { id: 'skills', label: 'Skills', icon: Award, component: <SkillsWindow /> },
    { id: 'education', label: 'Education', icon: FileText, component: <EducationWindow /> },
    { id: 'contact', label: 'Contact', icon: Mail, component: <ContactWindow /> },
  ]

  const rightIcons = [
    { id: 'github', label: 'GitHub', icon: Rocket, component: <GithubWindow /> },    { id: 'terminal', label: 'Terminal', icon: Terminal, component: <TerminalWindow onBackgroundChange={handleBackgroundChange} /> },   { id: 'update', label: 'Update OS', icon: RefreshCw, component: <UpdateWindow /> },
    { id: 'trash', label: 'Trash', icon: Trash2, component: <div className="p-6 bg-white"><h2 className="text-2xl font-bold text-black mb-4">Trash</h2><p className="text-gray-700 mb-6">Recycle bin for deleted files and data. Currently empty.</p><div className="flex flex-col items-center justify-center p-8 border border-gray-300 rounded-lg bg-gray-50"><Trash2 className="w-16 h-16 text-gray-400 mb-4" /><p className="text-gray-600 text-center">No items in trash</p></div></div> },
  ]

  const openWindow = (id: string, title: string, component: React.ReactNode) => {
    const existingWindow = openWindows.find(w => w.id === id)
    if (existingWindow) {
      setOpenWindows(prev => prev.map(w => 
        w.id === id 
          ? { ...w, zIndex: nextZIndex, isMinimized: false }
          : w
      ))
      setNextZIndex(prev => prev + 1)
      return
    }

    const newWindow: OpenWindow = {
      id,
      title,
      component,
      x: 100 + openWindows.length * 30,
      y: 60 + openWindows.length * 30,
      width: 800,
      height: 600,
      zIndex: nextZIndex,
      isMinimized: false,
    }
    setOpenWindows(prev => [...prev, newWindow])
    setNextZIndex(prev => prev + 1)
  }

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ))
  }

  const maximizeWindow = (id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, x: 0, y: 32, width: window.innerWidth, height: window.innerHeight - 80, zIndex: nextZIndex }
        : w
    ))
    setNextZIndex(prev => prev + 1)
  }

  const bringToFront = (id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ))
    setNextZIndex(prev => prev + 1)
  }

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, x, y } : w
    ))
  }

  const updateWindowSize = (id: string, width: number, height: number) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, width, height } : w
    ))
  }

  return (
    <>
      {/* Desktop Background */}
      <div className="fixed inset-0 overflow-hidden transition-colors duration-500" style={{
        backgroundColor: '#0f172a',
        backgroundImage: 'url(/wallpaper.jpg)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Top Menu Bar */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-white border-b border-gray-200 flex items-center px-4 gap-4 text-sm font-medium text-black z-50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="font-bold text-black">Ajmal Sadhiq</div>
          </div>
          <div className="flex gap-3 ml-auto">
            <button className="hover:text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors">About</button>
            <button className="hover:text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors">Projects</button>
            <button className="hover:text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors">Skills</button>
            <button className="hover:text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors">Contact</button>
          </div>
        </div>

        {/* Left Desktop Icons */}
        <div className="absolute left-4 top-12 flex flex-col gap-4 z-0">
          {leftIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              icon={icon.icon}
              onClick={() => openWindow(icon.id, icon.label, icon.component)}
            />
          ))}
        </div>

        {/* Right Desktop Icons */}
        <div className="absolute right-4 top-12 flex flex-col gap-4 z-0">
          {rightIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              icon={icon.icon}
              onClick={() => openWindow(icon.id, icon.label, icon.component)}
            />
          ))}
        </div>

        {/* Open Windows */}
        {openWindows.map((window) => (
          !window.isMinimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              x={window.x}
              y={window.y}
              width={window.width}
              height={window.height}
              zIndex={window.zIndex}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onFocus={() => bringToFront(window.id)}
              onPositionChange={(x, y) => updateWindowPosition(window.id, x, y)}
              onSizeChange={(width, height) => updateWindowSize(window.id, width, height)}
            >
              {window.component}
            </Window>
          )
        ))}

        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 flex items-center px-4 gap-3 z-40 backdrop-blur-sm">
          {/* Search Bar */}
          <div className="flex-1 max-w-xs relative">
            {showSearch ? (
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 px-2 py-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-500"
                />
                <button
                  onClick={() => {
                    setShowSearch(false)
                    setSearchQuery('')
                  }}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm text-gray-600 hover:text-black"
              >
                <Search className="w-4 h-4" />
                <span className="text-xs">Search</span>
              </button>
            )}
          </div>

          {/* Open Windows Buttons */}
          <div className="flex items-center gap-1">
            {openWindows.map((window) => (
              <button
                key={window.id}
                onClick={() => {
                  if (window.isMinimized) {
                    setOpenWindows(prev => prev.map(w => 
                      w.id === window.id 
                        ? { ...w, isMinimized: false, zIndex: nextZIndex }
                        : w
                    ))
                    setNextZIndex(prev => prev + 1)
                  } else {
                    bringToFront(window.id)
                  }
                }}
                className={`px-4 py-2 rounded text-sm font-medium transition-all relative ${
                  window.isMinimized 
                    ? 'bg-gray-200 text-gray-600 border-b-4 border-gray-600' 
                    : 'bg-gray-100 text-black'
                } hover:bg-gray-200 hover:text-black`}
              >
                {window.title}
                {window.isMinimized && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 rounded-b-sm"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
