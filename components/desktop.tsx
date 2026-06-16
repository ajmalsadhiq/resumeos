'use client'

import { useState, useCallback } from 'react'
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
  const [showWallpaperMenu, setShowWallpaperMenu] = useState(false)
  const [currentWallpaper, setCurrentWallpaper] = useState('/wallpapers/sequoia.jpg')

  const wallpapers = [
    { name: 'macOS Sequoia', url: '/wallpapers/sequoia.jpg' },
    { name: 'macOS Sonoma', url: '/wallpapers/sonoma.jpg' },
    { name: 'macOS Ventura', url: '/wallpapers/ventura.jpg' },
    { name: 'macOS Monterey', url: '/wallpapers/monterey.jpg' }
  ]


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

  const handleAppClick = (appId: string, label: string, component: React.ReactNode) => {
    const existingWindow = openWindows.find(w => w.id === appId)
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setOpenWindows(prev => prev.map(w =>
          w.id === appId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
        ))
        setNextZIndex(prev => prev + 1)
      } else {
        const nonMinimizedWindows = openWindows.filter(w => !w.isMinimized)
        const isFocused = nonMinimizedWindows.every(w => w.id === appId || w.zIndex < existingWindow.zIndex)
        if (isFocused) {
          minimizeWindow(appId)
        } else {
          bringToFront(appId)
        }
      }
    } else {
      openWindow(appId, label, component)
    }
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

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, x, y } : w
    ))
  }, [])

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, width, height } : w
    ))
  }, [])

  const filteredLeftIcons = leftIcons.filter(icon =>
    icon.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredRightIcons = rightIcons.filter(icon =>
    icon.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const allIcons = [...leftIcons, ...rightIcons]
  const pinnedAppIds = ['portfolio', 'projects', 'skills', 'education', 'contact', 'terminal', 'github']
  const dockPinnedApps = allIcons.filter(app => pinnedAppIds.includes(app.id))
  const dockOtherApps = allIcons.filter(app => !pinnedAppIds.includes(app.id) && app.id !== 'trash')
  const trashApp = allIcons.find(app => app.id === 'trash')

  return (
    <>
      {/* Desktop Background */}
      <div className="fixed inset-0 overflow-hidden transition-all duration-500" style={{
        backgroundColor: '#0f172a',
        backgroundImage: `url(${currentWallpaper})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Top Menu Bar */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-white/70 dark:bg-black/30 border-b border-white/20 dark:border-white/10 flex items-center px-4 gap-4 text-xs font-bold text-gray-800 dark:text-gray-200 z-50 backdrop-blur-md select-none shadow-sm">
          <div className="flex items-center gap-2">
            <div className="font-bold text-black dark:text-white">Ajmal Sadhiq</div>
          </div>
          <div className="flex gap-3 ml-auto relative">
            <button className="hover:text-gray-900 hover:bg-black/5 dark:hover:bg-white/10 px-2.5 py-1 rounded transition-colors" onClick={() => openWindow('portfolio', 'About Me', <PortfolioWindow />)}>About</button>
            <button className="hover:text-gray-900 hover:bg-black/5 dark:hover:bg-white/10 px-2.5 py-1 rounded transition-colors" onClick={() => openWindow('projects', 'Projects', <ProjectsWindow />)}>Projects</button>
            <button className="hover:text-gray-900 hover:bg-black/5 dark:hover:bg-white/10 px-2.5 py-1 rounded transition-colors" onClick={() => openWindow('skills', 'Skills', <SkillsWindow />)}>Skills</button>
            <button className="hover:text-gray-900 hover:bg-black/5 dark:hover:bg-white/10 px-2.5 py-1 rounded transition-colors" onClick={() => openWindow('contact', 'Contact', <ContactWindow />)}>Contact</button>
            <button className="hover:text-gray-900 hover:bg-black/5 dark:hover:bg-white/10 px-2.5 py-1 rounded transition-colors flex items-center gap-1" onClick={() => setShowWallpaperMenu(!showWallpaperMenu)}>
              <span>Wallpapers</span>
            </button>
            
            {showWallpaperMenu && (
              <div className="absolute right-0 top-8 w-48 bg-white/90 dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-800 rounded-xl p-2 shadow-xl backdrop-blur-xl z-50 flex flex-col gap-1 animate-scale-in">
                <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 px-2 py-1 border-b border-gray-100 dark:border-zinc-800 uppercase tracking-wider">Select Wallpaper</div>
                {wallpapers.map((wp) => (
                  <button
                    key={wp.name}
                    onClick={() => {
                      setCurrentWallpaper(wp.url)
                      setShowWallpaperMenu(false)
                    }}
                    className={`text-left w-full px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      currentWallpaper === wp.url
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{wp.name}</span>
                    {currentWallpaper === wp.url && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Left Desktop Icons */}
        <div className="absolute left-4 top-12 flex flex-col gap-4 z-0">
          {filteredLeftIcons.map((icon) => (
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
          {filteredRightIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              icon={icon.icon}
              onClick={() => openWindow(icon.id, icon.label, icon.component)}
            />
          ))}
        </div>

        {/* Open Windows */}
        {openWindows.map((window) => {
          const nonMinimized = openWindows.filter(w => !w.isMinimized)
          const isActive = nonMinimized.every(w => w.id === window.id || w.zIndex < window.zIndex)
          return (
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
                isActive={isActive}
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
          )
        })}

        {/* macOS Style Dock */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-16 bg-white/70 dark:bg-[#1e1e2e]/60 border border-gray-200/50 dark:border-white/10 rounded-2xl px-4 flex items-center gap-2.5 z-45 shadow-2xl backdrop-blur-xl transition-all duration-300">
          {/* Pinned Apps */}
          {dockPinnedApps.map((app) => {
            const isOpen = openWindows.some(w => w.id === app.id)
            return (
              <div key={app.id} className="relative group/tooltip flex flex-col items-center">
                {/* Tooltip */}
                <div className="absolute -top-10 scale-0 group-hover/tooltip:scale-100 transition-all duration-150 bg-black/85 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-50">
                  {app.label}
                </div>
                
                {/* Icon Button */}
                <button
                  onClick={() => handleAppClick(app.id, app.label, app.component)}
                  className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 hover:scale-120 hover:-translate-y-1.5 transition-all duration-200"
                >
                  <app.icon className="w-5.5 h-5.5 text-gray-800 dark:text-gray-100" />
                </button>
                
                {/* Active Indicator */}
                {isOpen && (
                  <div className="absolute bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full"></div>
                )}
              </div>
            )
          })}

          {/* Divider if other apps are open */}
          {dockOtherApps.some(app => openWindows.some(w => w.id === app.id)) && (
            <div className="w-px h-8 bg-black/15 dark:bg-white/10 mx-1"></div>
          )}

          {/* Open Unpinned Apps */}
          {dockOtherApps.map((app) => {
            const isOpen = openWindows.some(w => w.id === app.id)
            if (!isOpen) return null
            return (
              <div key={app.id} className="relative group/tooltip flex flex-col items-center">
                {/* Tooltip */}
                <div className="absolute -top-10 scale-0 group-hover/tooltip:scale-100 transition-all duration-150 bg-black/85 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-50">
                  {app.label}
                </div>
                
                {/* Icon Button */}
                <button
                  onClick={() => handleAppClick(app.id, app.label, app.component)}
                  className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 hover:scale-120 hover:-translate-y-1.5 transition-all duration-200"
                >
                  <app.icon className="w-5.5 h-5.5 text-gray-800 dark:text-gray-100" />
                </button>
                
                {/* Active Indicator */}
                <div className="absolute bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full"></div>
              </div>
            )
          })}

          {/* Divider for trash/search */}
          <div className="w-px h-8 bg-black/15 dark:bg-white/10 mx-1"></div>

          {/* Trash App */}
          {trashApp && (
            <div className="relative group/tooltip flex flex-col items-center">
              <div className="absolute -top-10 scale-0 group-hover/tooltip:scale-100 transition-all duration-150 bg-black/85 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-50">
                {trashApp.label}
              </div>
              <button
                onClick={() => handleAppClick(trashApp.id, trashApp.label, trashApp.component)}
                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 hover:scale-120 hover:-translate-y-1.5 transition-all duration-200"
              >
                <trashApp.icon className="w-5.5 h-5.5 text-gray-800 dark:text-gray-100" />
              </button>
              {openWindows.some(w => w.id === trashApp.id) && (
                <div className="absolute bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full"></div>
              )}
            </div>
          )}

          {/* Search App Icon or Input */}
          <div className="relative flex items-center">
            {showSearch ? (
              <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-xl px-2 py-0.5 transition-all duration-300">
                <Search className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-24 bg-transparent border-none outline-none text-xs text-gray-800 dark:text-gray-100 placeholder-gray-500"
                />
                <button
                  onClick={() => {
                    setShowSearch(false)
                    setSearchQuery('')
                  }}
                  className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="relative group/tooltip flex flex-col items-center">
                <div className="absolute -top-10 scale-0 group-hover/tooltip:scale-100 transition-all duration-150 bg-black/85 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-50">
                  Search
                </div>
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 hover:scale-120 hover:-translate-y-1.5 transition-all duration-200"
                >
                  <Search className="w-5.5 h-5.5 text-gray-800 dark:text-gray-100" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
