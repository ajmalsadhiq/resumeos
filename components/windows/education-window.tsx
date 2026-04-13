'use client';

const educationData = [
  {
    id: 1,
    type: "Education",
    title: "B.Tech in Computer Science & Engineering",
    institution: "Vellore Institute of Technology (VIT), Vellore",
    duration: "2022 - 2026",
    details: "Core CSE track | CGPA: 8.18",
    icon: "🎓"
  },
  {
    id: 2,
    type: "Certification",
    title: "Oracle Cloud Infrastructure Generative AI",
    institution: "Oracle",
    duration: "2024",
    details: "Covers generative AI fundamentals, large language models, and Oracle's AI services on OCI",
    icon: "📜"
  },
  {
    id: 3,
    type: "Certification",
    title: "Google Analytics Certification",
    institution: "Google",
    duration: "2024",
    details: "Proficiency in Google Analytics 4, data collection, reporting, and deriving actionable insights from web data",
    icon: "📊"
  }
];

export function EducationWindow() {
  return (
    <div className="h-full overflow-y-auto p-6 bg-white">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-black mb-8 animate-fade-in">Education & Certifications</h2>

        <div className="space-y-4">
          {educationData.map((item, index) => (
            <div
              key={item.id}
              className="group relative p-5 border border-gray-300 rounded-lg bg-gray-50 hover-lift transition-all flex gap-4"
              style={{
                animation: `slideInUp 0.6s ease-out`,
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex gap-4">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-black text-white font-semibold mb-2">
                        {item.type}
                      </span>
                      <h3 className="text-lg font-bold text-black">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm font-semibold">{item.institution}</p>
                  <p className="text-gray-600 text-xs mt-1">{item.duration}</p>
                  <p className="text-gray-700 text-sm mt-3">{item.details}</p>
                </div>
              </div>
              
              {/* Animated accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-black font-semibold mb-3">Continuous Learning</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            I&apos;m committed to staying updated with the latest technologies and industry practices. 
            I regularly participate in online courses, tech conferences, and open-source contributions to expand my expertise.
          </p>
        </div>
      </div>
    </div>
  );
}