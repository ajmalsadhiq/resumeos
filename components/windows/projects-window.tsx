'use client';

const projects = [
  {
    id: 1,
    name: "Planora",
    description: "3D Floor Plan SaaS platform for interior design and real estate visualization",
    tech: ["React", "Three.js", "TypeScript", "MongoDB", "Node.js"],
    color: "from-blue-600 to-cyan-600",
    github: "https://github.com/ajmalsadhiq/planora",
    image: "/projects/planora.jpg",
    deployed: "https://planora-pi.vercel.app/"
  },
  {
    id: 2,
    name: "MeetFlow",
    description: "Video conferencing and collaboration platform with real-time features",
    tech: ["Next.js", "WebRTC", "TypeScript", "PostgreSQL", "Stripe"],
    color: "from-purple-600 to-pink-600",
    github: "https://github.com/ajmalsadhiq/meetflow",
    image: "/projects/meetflow.jpg",
    deployed: "https://meet-flow-swart.vercel.app/"
  },
  {
    id: 3,
    name: "Auto Vault",
    description: "Comprehensive car marketplace with advanced search and analytics",
    tech: ["React", "Express", "MongoDB", "Redux", "AWS"],
    color: "from-orange-600 to-red-600",
    github: "https://github.com/ajmalsadhiq/auto-vault",
    image: "/projects/auto-vault.jpg",
    deployed: "https://expo.dev/accounts/ajmalsadhiq/projects/AutoVault/builds/cf284123-e797-44fb-b7f1-9ef08ccbc141"
  },
  {
    id: 4,
    name: "Hate Speech Detector",
    description: "ML-powered hate speech detection and content moderation system",
    tech: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
    color: "from-green-600 to-emerald-600",
    github: "https://github.com/ajmalsadhiq/hatespeech",
    image: "/projects/hate-speech-detector.jpg",
    deployed: "https://github.com/ajmalsadhiq/hatespeech"
  },
  {
    id: 5,
    name: "Budget Tracker v2.0",
    description: "Personal finance management app with smart analytics and budgeting tools",
    tech: ["React", "Firebase", "Tailwind CSS", "Chart.js", "Material-UI"],
    color: "from-yellow-600 to-orange-600",
    github: "https://github.com/ajmalsadhiq/budget-tracker-v2.0",
    image: "/projects/budget-tracker.jpg",
    deployed: "https://benevolent-naiad-d653e2.netlify.app/"
  }
];

export function ProjectsWindow() {
  return (
    <div className="h-full overflow-y-auto p-6 bg-white">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-black mb-6 animate-fade-in">Featured Projects</h2>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group border border-gray-300 rounded-lg bg-gray-50 hover-lift transition-all overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <a
                href={project.deployed}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden h-48 bg-gray-200"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Visit Live Site
                  </span>
                </div>
              </a>

              {/* Project Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                      {project.name}
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-800 border border-gray-400 hover-scale cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-black text-white text-sm font-semibold rounded hover:shadow-lg hover:bg-gray-900 transition-all hover:scale-105 text-center"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.deployed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gray-300 text-black text-sm font-semibold rounded hover:shadow-lg hover:bg-gray-400 transition-all hover:scale-105 text-center"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
