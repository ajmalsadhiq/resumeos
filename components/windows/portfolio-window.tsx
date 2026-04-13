'use client';

export function PortfolioWindow() {
  return (
    <div className="h-full overflow-y-auto p-6 bg-white">
      <div className="max-w-4xl animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Ajmal Sadhiq</h1>
          <p className="text-lg text-gray-700">Full-Stack Developer</p>
          <p className="text-sm text-gray-600 mt-4">
            Passionate about building scalable web applications and solving complex problems with modern technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 hover-lift">
            <h3 className="text-black font-semibold mb-2">Location</h3>
            <p className="text-gray-700">India</p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 hover-lift">
            <h3 className="text-black font-semibold mb-2">Experience</h3>
            <p className="text-gray-700">Full-Stack Development</p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 hover-lift">
            <h3 className="text-black font-semibold mb-2">Focus</h3>
            <p className="text-gray-700">Web & Mobile Apps</p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 hover-lift">
            <h3 className="text-black font-semibold mb-2">Passion</h3>
            <p className="text-gray-700">Innovation & Learning</p>
          </div>
        </div>

        <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-black font-semibold mb-3">About</h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            I&apos;m a passionate full-stack developer with expertise in building modern web applications. 
            I specialize in creating user-friendly interfaces with robust backends, focusing on performance 
            and scalability. I&apos;m constantly learning new technologies and best practices to deliver exceptional results.
          </p>
        </div>
      </div>
    </div>
  );
}
