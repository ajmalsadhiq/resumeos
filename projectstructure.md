# Ajmal's Resume OS - Complete Project Structure Documentation

## Project Overview
This is an OS-themed portfolio/resume website built with Next.js 16, React 19, and Tailwind CSS. It simulates a desktop OS interface with draggable windows, minimizable apps, and a taskbar with search functionality.

---

## 🗂️ ROOT LEVEL FILES

### `package.json`
- **Dependencies**: Next.js 16.0.3, React 19.2.0, Tailwind CSS 4.1.9
- **UI Library**: shadcn/ui components (Radix UI primitives)
- **Icons**: Lucide React (for all icons)
- **Forms**: React Hook Form + Zod for validation
- **Charts**: Recharts for data visualization
- **Animations**: Tailwind CSS animations + tailwindcss-animate
- **Dev**: TypeScript, ESLint, Autoprefixer

### `tsconfig.json`
- TypeScript configuration for strict type checking
- Path aliases: `@/*` points to project root

### `next.config.mjs`
- Next.js 16 configuration file
- Handles build and runtime settings

### `postcss.config.mjs`
- PostCSS configuration for Tailwind CSS processing

### `tailwind.config.js`
- Tailwind CSS v4 configuration
- Custom animation definitions added for portfolio

### `components.json`
- shadcn/ui configuration file
- Specifies component library path and settings

---

## 📂 `/app` - Next.js App Router

### `app/layout.tsx`
- **Root layout component** for the entire application
- Sets up HTML structure, head metadata
- Integrates theme provider and analytics
- Wraps all pages with global providers

### `app/page.tsx`
- **Main home page** (entry point)
- Client component that renders the `<Desktop />` component
- Very simple: just imports and displays Desktop

### `app/globals.css`
- **Global styles** for the entire application
- Contains:
  - Tailwind CSS imports
  - Custom CSS variables and theme tokens
  - Animation keyframes (fadeIn, slideInUp, slideInLeft, scale-in, pulse-glow, float)
  - Utility classes for animations (.animate-fade-in, .animate-slide-in-up, .hover-scale, .hover-glow, .hover-lift, etc.)
  - Grid patterns and base styles

---

## 🖥️ `/components` - React Components

### Core Components

#### `desktop.tsx`
- **Main OS interface component**
- **Manages state for**:
  - `openWindows[]` - Array of currently open windows
  - `nextZIndex` - Z-index counter for window layering
  - `searchQuery`, `showSearch` - Search bar state
  - Desktop background color
- **Imports**: All window components and desktop icon component
- **Desktop Icons Structure**:
  - **Left side**: Portfolio windows (About Me, Projects, Skills, Education, Contact)
  - **Right side**: System apps (GitHub, Terminal, Update OS, Trash)
- **Key Functions**:
  - `openWindow(id, title, component)` - Opens a new window or brings existing to front
  - `closeWindow(id)` - Removes window from open array
  - `minimizeWindow(id)` - Sets window isMinimized to true
  - `maximizeWindow(id)` - Expands window to fullscreen
  - `bringToFront(id)` - Brings window to top by updating zIndex
  - `updateWindowPosition(x, y)` - Updates window coordinates (used during drag)
  - `updateWindowSize(width, height)` - Updates window dimensions (used during resize)
- **Renders**:
  - Background with wallpaper image (`/wallpaper.jpg`)
  - Top menu bar (white with black text, shows app name and navigation)
  - Left desktop icons in a vertical column
  - Right desktop icons in a vertical column
  - Open windows (rendered with dragging/resizing capabilities)
  - Bottom taskbar with:
    - Search bar (toggleable)
    - Open window buttons with grey underline for minimized apps
    - Padding between menu and taskbar (48px height)

#### `desktop-icon.tsx`
- **Individual desktop icon component**
- **Props**:
  - `label: string` - Text label below icon
  - `icon: LucideIcon` - Icon component from lucide-react
  - `onClick: () => void` - Click handler to open window
- **Styling**:
  - White background with black icon
  - Grey border that darkens on hover
  - Hover animations (scale-up effect with hover-scale class)
  - When clicked, calls parent's onClick to open corresponding window

#### `window.tsx`
- **Generic draggable/resizable window component**
- **Props**:
  - Window position (x, y) and size (width, height)
  - Z-index for layering
  - Title string
  - Children components (window content)
  - Callbacks for: onClose, onMinimize, onMaximize, onPositionChange, onSizeChange, onFocus
- **Features**:
  - Title bar is draggable (light grey background)
  - All 4 borders are draggable (subtle hover effect on borders)
  - Yellow/Green/Red traffic light buttons (minimize/maximize/close)
  - Window constrained to viewport:
    - Can't move above top menu bar (32px)
    - Can't move below taskbar (48px from bottom)
    - Minimum visible area on sides
  - Resize handle in bottom-right corner (cursor: se-resize)
  - Shadow and border styling (grey borders, white background)
  - Smooth animations when opening (animate-scale-in)

#### `theme-provider.tsx`
- Provides Next.js theme context for dark/light mode
- Wraps application for theme switching capability

---

## 🪟 `/components/windows` - Window Content Components

### Main Portfolio Windows

#### `portfolio-window.tsx` (About Me)
- **Displays**: 
  - Name: "Ajmal Sadhiq"
  - Title: "Full-Stack Developer"
  - Grid with 4 info cards (Location, Experience, Focus, Passion)
  - About section with biographical text
- **Styling**: White background, black headings, grey cards
- **Animations**: Fade-in on load

#### `projects-window.tsx` (Projects)
- **Displays all 5 projects with**:
  - Project thumbnail image (generated, clickable to deployed site)
  - Project name with gradient text
  - Description
  - Tech stack badges (grey background, black text)
  - Two buttons: GitHub (black) and Live Demo (grey)
- **Project data includes**:
  - Planora (3D Floor Plan SaaS)
  - MeetFlow (Video Conferencing)
  - Auto Vault (Car Marketplace)
  - Hate Speech Detector (ML Model)
  - Budget Tracker v2.0 (Finance App)
- **Animations**: Image zoom on hover (scale-110), overlay text appears on hover
- **Links**: Each project links to deployed website + GitHub repository

#### `skills-window.tsx` (Skills)
- **Displays organized skills** in categories:
  - Languages (Python, JavaScript, TypeScript, C++, SQL)
  - Frontend (React, Next.js, Tailwind CSS, etc.)
  - Backend (Node.js, Express, Django, FastAPI, etc.)
  - Tools & DevOps (Git, Docker, CI/CD, AWS, etc.)
- **Each skill has**:
  - Name and proficiency percentage (0-100%)
  - Animated black progress bar that fills on load
  - Hover effect with shadow
- **Additional skills section**: RESTful APIs, GraphQL, OAuth, JWT, etc.
- **Animations**: Staggered slide-in-left for bars, bars fill from left to right

#### `education-window.tsx` (Education)
- **Timeline-style display** of education and certifications:
  - Icon (emoji) for each entry
  - Type badge (education/certification)
  - Institution/Organization name
  - Duration dates
  - Details/description
- **Styling**: Grey background cards with left accent line on hover
- **Animations**: Staggered slide-up animations for each entry

#### `contact-window.tsx` (Contact)
- **Contact information**:
  - GitHub link (icon + link)
  - LinkedIn link
  - Email link
  - Portfolio link
- **Contact form** with:
  - Name input field
  - Email input field
  - Message textarea
  - Submit button
  - Success message on form submission
- **Styling**: White inputs with grey backgrounds, black focus borders
- **Form state**: Tracks form data and shows success message after submission

### System Windows (Less Important)

#### `home-window.tsx`
- Placeholder home/welcome screen

#### `documentation-window.tsx`
- Placeholder documentation screen

#### `pricing-window.tsx`
- Placeholder pricing information

#### `roadmap-window.tsx`
- Placeholder roadmap/planning screen

#### `terminal-window.tsx`
- Simulated terminal interface with system information

#### `update-window.tsx`
- Placeholder for OS update information

---

## 🎨 `/components/ui` - shadcn/ui Components
These are pre-built Radix UI + Tailwind components provided by shadcn/ui. They include:
- Basic: Button, Card, Input, Label, etc.
- Complex: Dialog, Dropdown-Menu, Sheet, Sidebar, etc.
- Forms: Form, Textarea, Checkbox, Radio-Group, etc.
- Data Display: Table, Progress, Tabs, etc.
- Utilities: Toast, Tooltip, Popover, etc.

**None of these are currently used in the portfolio.** They're available if needed for future enhancements.

---

## 🪝 `/hooks` - Custom React Hooks

### `use-toast.ts`
- **Purpose**: Toast notification system using Sonner library
- Provides `toast` function to show notifications

### `use-mobile.ts`
- **Purpose**: Detect mobile viewport
- Returns boolean: `isMobile` to detect screen size

---

## 🛠️ `/lib` - Utility Functions

### `utils.ts`
- **`cn()` function**: Merges Tailwind CSS classes intelligently
- Uses `clsx` and `tailwind-merge` to handle class conflicts
- Used throughout components for conditional styling

---

## 📁 `/public` - Static Assets

### Images
- **Wallpaper**: `/wallpaper.jpg` - Grey calm wallpaper with "Welcome to My Resume OS System" text
- **Project images**: 
  - `/projects/planora.jpg`
  - `/projects/meetflow.jpg`
  - `/projects/auto-vault.jpg`
  - `/projects/hate-speech-detector.jpg`
  - `/projects/budget-tracker.jpg`
- **Icons/Placeholders**: Various favicon and placeholder images

---

## 🎯 Data Flow & Architecture

### State Management (Desktop.tsx)
```
Desktop Component
├── openWindows[] (OpenWindow interface)
│   ├── id, title, component
│   ├── x, y (position)
│   ├── width, height (size)
│   ├── zIndex (layering)
│   └── isMinimized (visibility)
├── nextZIndex (window layering counter)
├── searchQuery (search bar input)
└── showSearch (search bar visibility)
```

### Window Lifecycle
1. **Desktop Icon Click** → `openWindow()` called
2. **Check if window already open**:
   - If yes: Bring to front, unminimize
   - If no: Create new OpenWindow object, add to state
3. **Window renders** with position, size, component content
4. **User interactions**:
   - Drag title bar or borders → `updateWindowPosition()` → State updates
   - Resize from corner → `updateWindowSize()` → State updates
   - Click minimize button → `minimizeWindow()` → Shows underline in taskbar
   - Click maximize button → `maximizeWindow()` → Fullscreen
   - Click close button → `closeWindow()` → Removes from openWindows[]
5. **Taskbar shows** all open windows with underline for minimized ones

### Animation System
All animations are CSS-based in `globals.css`:
- **Entrance animations**: fadeIn, slideInUp, slideInLeft, scale-in (used on component load)
- **Hover animations**: hover-scale, hover-glow, hover-lift (used on interactive elements)
- **Special animations**: pulse-glow, float (used for accent effects)

---

## 🎨 Color Scheme

### Primary Colors
- **Black**: `#000000` - Primary text and dark elements
- **White**: `#FFFFFF` - Backgrounds and light elements
- **Grey scale**: Grays for borders, accents, and secondary elements

### Key Color Assignments
- **Windows**: White background, grey header, grey borders
- **Icons**: Black on white background
- **Buttons**: Black background with white text (primary), Grey for secondary
- **Progress bars**: Black fill
- **Hover effects**: Grey backgrounds, shadow effects

---

## 🔄 Component Relationships

```
app/page.tsx
└── Desktop (components/desktop.tsx)
    ├── DesktopIcon (components/desktop-icon.tsx) × 10
    │   └── When clicked → opens corresponding window
    │
    ├── Window (components/window.tsx) × n (per open window)
    │   ├── PortfolioWindow
    │   ├── ProjectsWindow
    │   ├── SkillsWindow
    │   ├── EducationWindow
    │   ├── ContactWindow
    │   ├── GitHub App
    │   ├── Terminal
    │   ├── Update OS
    │   └── Trash
    │
    ├── Menu Bar (inline HTML)
    ├── Taskbar (inline HTML with search)
    └── Desktop Background (wallpaper image)
```

---

## 📋 Key Features

### 1. Window Management
- Draggable by title bar or any border
- Resizable from bottom-right corner
- Constrained to viewport (can't go off-screen)
- Z-index layering (click to bring to front)
- Minimize/Maximize/Close functionality

### 2. Taskbar Features
- Search bar (toggleable)
- Shows all open windows
- Minimized apps have grey underline
- Click to restore minimized window

### 3. Portfolio Content
- About Me: Personal intro
- Projects: 5 projects with images, tech stacks, GitHub links, deployed website links
- Skills: Organized by category with animated progress bars
- Education: Timeline with certifications
- Contact: Direct links and contact form

### 4. System Apps
- GitHub: Link to GitHub profile
- Terminal: Shows system info
- Update OS: Version management
- Trash: Empty recycle bin

### 5. Animations
- Window entrance: Scale + fade
- Icon hover: Scale up with border glow
- Progress bars: Left-to-right fill with stagger
- Project images: Zoom on hover with overlay text
- Form inputs: Focus border color change

---

## 🚀 How to Extend/Modify

### Add a New Desktop Icon
1. Create new window component in `/components/windows/`
2. Import it in `desktop.tsx`
3. Add to `leftIcons` or `rightIcons` array in `desktop.tsx`

### Modify Window Content
- Edit corresponding file in `/components/windows/`
- Update styling with Tailwind classes
- Keep component props consistent (accept children/content)

### Change Colors
- Update color values in individual window components
- Modify CSS in `globals.css` for animations
- Update desktop icon and window styling in respective files

### Add New Skills/Projects
- Edit arrays in corresponding window components
- Projects: `components/windows/projects-window.tsx`
- Skills: `components/windows/skills-window.tsx`
- Education: `components/windows/education-window.tsx`

---

## 🔧 Technical Stack Summary

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Components | shadcn/ui |
| Forms | React Hook Form + Zod |
| Data Viz | Recharts |
| Notifications | Sonner |
| Package Manager | pnpm |

---

## 📝 Notes for Claude AI

### Key Concepts to Remember
1. This is an OS-themed portfolio - treat window management and desktop paradigms as core
2. All animations are CSS-based, no external animation libraries
3. Desktop.tsx is the state manager - all window logic flows through it
4. Window component is generic - any React component can be window content
5. Colors are strictly black/white/grey - maintain this minimalist aesthetic
6. Progress bars, images, and forms all have hover animations

### When Making Changes
- Always preserve the window management system
- Keep animations CSS-based for performance
- Maintain the black/white/grey color scheme
- Test drag/resize functionality after window changes
- Ensure all new components fit within the window container
- Update component props consistently across similar windows

### Files That Reference Each Other
- `desktop.tsx` → imports all window components
- `desktop.tsx` → uses `desktop-icon.tsx` and `window.tsx`
- `window.tsx` → generic wrapper for all window content
- `globals.css` → provides animations used everywhere
- All window components → standalone, self-contained content

---

Generated for AI context learning. This document describes the complete architecture and relationships of all files in the Ajmal's Resume OS portfolio project.
