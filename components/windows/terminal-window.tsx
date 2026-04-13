'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'

interface Line {
  type: 'command' | 'output'
  html: string
}

interface TerminalProps {
  onBackgroundChange: (color: string) => void
}

const INFO = {
  name: 'Ajmal Sadhiq',
  role: 'B.Tech CSE @ VIT Vellore',
  cgpa: '8.18',
  email: 'ajmalsadhiq7@gmail.com',
  github: 'github.com/ajmalsadhiq',
  linkedin: 'linkedin.com/in/ajmal-sadhiq-puthanpura-ebrahim-012ab0291',
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '<span class="text-yellow-400 font-bold">Available commands:</span>',
    '  <span class="text-green-400">whoami</span>         — about me',
    '  <span class="text-green-400">skills</span>         — tech stack',
    '  <span class="text-green-400">education</span>      — academic background',
    '  <span class="text-green-400">certifications</span> — my certifications',
    '  <span class="text-green-400">contact</span>        — get in touch',
    '  <span class="text-green-400">fetch</span>          — system info',
    '  <span class="text-green-400">clear</span>          — clear terminal',
  ],
  whoami: () => [
    `<span class="text-cyan-400">Name    </span>  ${INFO.name}`,
    `<span class="text-cyan-400">Role    </span>  ${INFO.role}`,
    `<span class="text-cyan-400">CGPA    </span>  ${INFO.cgpa}`,
    `<span class="text-cyan-400">Based in</span>  Vellore, Tamil Nadu, India`,
  ],
  skills: () => [
    '<span class="text-cyan-400">Languages </span>  JavaScript, TypeScript, Python, Java',
    '<span class="text-cyan-400">Frontend  </span>  React, Next.js, Tailwind CSS',
    '<span class="text-cyan-400">Backend   </span>  Node.js, Express, REST APIs',
    '<span class="text-cyan-400">Cloud     </span>  Oracle Cloud (OCI), Google Cloud',
    '<span class="text-cyan-400">Tools     </span>  Git, VS Code, Figma',
  ],
  education: () => [
    '<span class="text-yellow-400 font-bold">B.Tech — Computer Science & Engineering</span>',
    '  Vellore Institute of Technology (VIT)',
    `  2022 — 2026  |  CGPA: <span class="text-green-400">${INFO.cgpa}</span>`,
  ],
  certifications: () => [
    '<span class="text-yellow-400 font-bold">Certifications:</span>',
    '  <span class="text-green-400">[1]</span> Oracle Cloud Infrastructure — Generative AI',
    '       Issued by Oracle',
    '  <span class="text-green-400">[2]</span> Google Analytics Certification',
    '       Issued by Google',
  ],
  contact: () => [
    `<span class="text-cyan-400">Email   </span>  ${INFO.email}`,
    `<span class="text-cyan-400">GitHub  </span>  ${INFO.github}`,
    `<span class="text-cyan-400">LinkedIn</span>  ${INFO.linkedin}`,
  ],
  fetch: () => [
    '<span class="text-purple-400">     _    _ __  __    _    _     </span>   <span class="text-cyan-400">ajmal</span>@portfolio',
    '<span class="text-purple-400">    / \\  | |  \\/  |  / \\  | |    </span>   ──────────────────',
    `<span class="text-purple-400">   / _ \\ | | |\\/| | / _ \\ | |    </span>   <span class="text-cyan-400">Role  </span> ${INFO.role}`,
    `<span class="text-purple-400">  / ___ \\| | |  | |/ ___ \\| |___ </span>   <span class="text-cyan-400">CGPA  </span> ${INFO.cgpa}`,
    '<span class="text-purple-400"> /_/   \\_\\_|_|  |_/_/   \\_\\_____| </span>   <span class="text-cyan-400">Stack </span> React · Next.js · Node',
    '<span class="text-purple-400">                                  </span>   <span class="text-cyan-400">Certs </span> Oracle GenAI · Google Analytics',
    `<span class="text-purple-400">                                  </span>   <span class="text-cyan-400">Email </span> ${INFO.email}`,
  ],
}

export function TerminalWindow({ onBackgroundChange }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', html: 'ajmal-terminal v1.0.0' },
    { type: 'output', html: 'Type <span class="text-green-400">"help"</span> for available commands.' },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const push = (...newLines: Line[]) =>
    setLines(prev => [...prev, ...newLines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    push({ type: 'command', html: '$ ' + raw })
    if (!cmd) return
    setCmdHistory(h => [raw, ...h])
    setHistIdx(-1)

    if (cmd === 'clear') { setLines([]); return }

    const handler = COMMANDS[cmd]
    if (handler) {
      push({ type: 'output', html: '&nbsp;' })
      handler().forEach(html => push({ type: 'output', html }))
      push({ type: 'output', html: '&nbsp;' })
    } else {
      push({ type: 'output', html: `<span class="text-red-400">command not found: ${cmd}</span>  — type <span class="text-green-400">help</span>` })
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      if (next < 0) { setHistIdx(-1); setInput('') }
      else { setHistIdx(next); setInput(cmdHistory[next]) }
    }
  }

  return (
    <div
      className="h-full flex flex-col bg-[#0f1117] font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1d2e] border-b border-[#2a2d3e] shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[#8b8fa8] text-xs">ajmal@portfolio: ~</span>
      </div>

      {/* Output + Input together in one scrollable area */}
      <div className="flex-1 overflow-y-auto p-4">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed whitespace-pre-wrap break-all ${line.type === 'command' ? 'text-white' : 'text-[#a8abbe]'}`}
            dangerouslySetInnerHTML={{ __html: line.html }}
          />
        ))}

        {/* Input line flows right after output */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[#7c6af7] whitespace-nowrap">
            <span className="text-[#4fc3f7]">ajmal</span>@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white caret-[#7c6af7]"
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  )
}