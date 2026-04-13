'use client';

const skillCategories = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript/TypeScript", level: 95 },
      { name: "Python", level: 85 },
      { name: "SQL", level: 90 },
      { name: "HTML/CSS", level: 95 }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Three.js", level: 80 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js/Express", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 85 }
    ]
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git/GitHub", level: 95 },
      { name: "Docker", level: 80 },
      { name: "AWS", level: 80 },
      { name: "Firebase", level: 85 }
    ]
  }
];

export function SkillsWindow() {
  return (
    <div className="h-full overflow-y-auto p-6 bg-white">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-black mb-8 animate-fade-in">Skills & Expertise</h2>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.category}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 hover-glow">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 text-sm">{skill.name}</span>
                      <span className="text-black text-sm font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden border border-gray-400">
                      <div
                        className="h-full bg-black rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-gray-500/50"
                        style={{
                          width: `${skill.level}%`,
                          animation: `slideInLeft 0.8s ease-out`,
                          animationDelay: `${categoryIndex * 0.2 + skillIndex * 0.1}s`,
                          animationFillMode: 'both'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 border border-gray-300 rounded-lg bg-gray-50 hover-lift">
          <h3 className="text-black font-semibold mb-2">Additional Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["RESTful APIs", "GraphQL", "Websockets", "OAuth", "JWT", "Responsive Design", "UI/UX", "Testing", "Agile", "CI/CD"].map((skill) => (
              <span key={skill} className="px-3 py-1 text-xs bg-gray-200 text-gray-800 rounded-full hover-scale cursor-default border border-gray-400">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
