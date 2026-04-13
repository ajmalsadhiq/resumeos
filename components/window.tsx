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
        const taskbarHeight = 48 // h-12
        const maxY = window.innerHeight - taskbarHeight - 50 // Leave some space above taskbar
        
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
      className="absolute bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-scale-in"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 40px rgba(0, 0, 0, 0.08)'
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between cursor-move select-none hover:bg-gray-50 transition-all"
        onMouseDown={handleMouseDownTitle}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-black">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMinimize}
            className="w-5 h-5 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center transition-all hover:shadow-lg hover:shadow-yellow-500/50 active:scale-90"
            aria-label="Minimize"
          >
            <Minus className="w-3 h-3 text-slate-900" />
          </button>
          <button
            onClick={onMaximize}
            className="w-5 h-5 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition-all hover:shadow-lg hover:shadow-green-500/50 active:scale-90"
            aria-label="Maximize"
          >
            <Maximize2 className="w-3 h-3 text-slate-900" />
          </button>
          <button
            onClick={onClose}
            className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center transition-all hover:shadow-lg hover:shadow-red-500/50 active:scale-90"
            aria-label="Close"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
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
