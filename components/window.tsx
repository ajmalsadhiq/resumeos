'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Minus, Maximize2 } from 'lucide-react'

interface WindowProps {
  id: string
  title: string
  children: React.ReactNode
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  isActive?: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onPositionChange: (x: number, y: number) => void
  onSizeChange: (width: number, height: number) => void
}

export function Window({
  title,
  children,
  x,
  y,
  width,
  height,
  zIndex,
  isActive = false,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Get viewport dimensions and menu bar height (32px for 8 * 4 h-8)
        const menuBarHeight = 32
        const taskbarHeight = 72 // dock area
        const maxY = window.innerHeight - taskbarHeight - 50 // Leave some space above dock
        
        let newX = e.clientX - dragStart.x
        let newY = e.clientY - dragStart.y
        
        // Constrain X (keep some part of window visible)
        newX = Math.max(-width + 50, newX)
        newX = Math.min(window.innerWidth - 50, newX)
        
        // Constrain Y (keep title bar below menu bar and above taskbar)
        newY = Math.max(menuBarHeight, newY)
        newY = Math.min(maxY, newY)
        
        onPositionChange(newX, newY)
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y
        const newWidth = Math.max(400, resizeStart.width + deltaX)
        const newHeight = Math.max(300, resizeStart.height + deltaY)
        onSizeChange(newWidth, newHeight)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart, onPositionChange, onSizeChange])

  const handleMouseDownTitle = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - x,
      y: e.clientY - y,
    })
    onFocus()
  }

  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width,
      height,
    })
  }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-lg border overflow-hidden flex flex-col animate-scale-in transition-colors transition-shadow transition-opacity duration-200 ${
        isActive 
          ? 'border-gray-300 shadow-2xl ring-1 ring-black/5' 
          : 'border-gray-200/80 shadow-lg opacity-98'
      }`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex,
        boxShadow: isActive 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(0, 0, 0, 0.12)'
          : '0 10px 30px -10px rgba(0, 0, 0, 0.15)'
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between cursor-move select-none transition-all relative ${
          isActive ? 'bg-gray-50/95' : 'bg-gray-100/70'
        }`}
        onMouseDown={handleMouseDownTitle}
      >
        {/* macOS Buttons on Left */}
        <div className="flex items-center gap-1.5 z-10">
          <button
            onClick={onClose}
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center active:scale-90 transition-all group/btn"
            aria-label="Close"
          >
            <X className="w-2 h-2 text-[#4c0002] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={onMinimize}
            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center active:scale-90 transition-all group/btn"
            aria-label="Minimize"
          >
            <Minus className="w-2 h-2 text-[#5c3e00] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={onMaximize}
            className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1a9c2b] flex items-center justify-center active:scale-90 transition-all group/btn"
            aria-label="Maximize"
          >
            <Maximize2 className="w-2 h-2 text-[#006400] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Centered Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`text-xs font-bold transition-colors ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
            {title}
          </span>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-16"></div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>

      {/* Draggable Top Border */}
      <div
        className="absolute top-0 left-0 right-0 h-1 cursor-move hover:bg-gray-300/30 transition-colors"
        onMouseDown={handleMouseDownTitle}
      />

      {/* Draggable Left Border */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1 cursor-move hover:bg-gray-300/30 transition-colors"
        onMouseDown={handleMouseDownTitle}
      />

      {/* Draggable Right Border */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1 cursor-move hover:bg-gray-300/30 transition-colors"
        onMouseDown={handleMouseDownTitle}
      />

      {/* Draggable Bottom Border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 cursor-move hover:bg-gray-300/30 transition-colors"
        onMouseDown={handleMouseDownTitle}
      />

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize group"
        onMouseDown={handleMouseDownResize}
      >
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gray-400 group-hover:border-black transition-colors"></div>
      </div>
    </div>
  )
}
