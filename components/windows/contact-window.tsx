'use client';

import { useState } from 'react';

const contacts = [
  { label: "GitHub", value: "ajmalsadhiq", href: "https://github.com/ajmalsadhiq", icon: "🔗" },
  { label: "LinkedIn", value: "ajmalsadhiq", href: "https://www.linkedin.com/in/ajmal-sadhiq-puthanpura-ebrahim-012ab0291/", icon: "💼" },
  { label: "Email", value: "ajmalsadhiq7@gmail.com", href: "mailto:ajmalsadhiq7@gmail.com", icon: "✉️" },
  { label: "Portfolio", value: "ajmalsadhiq.dev", href: "https://drive.google.com/file/d/12kmW5mqKKpr76Fw75xWg65jDZ7c6opHs/view?usp=sharing", icon: "🌐" }
];

export function ContactWindow() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-white">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-black mb-8 animate-fade-in">Get in Touch</h2>

        {/* Contact Links */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect with me</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-gray-300 rounded-lg bg-gray-50 hover-lift transition-all flex items-center gap-3 group"
              >
                <span className="text-2xl">{contact.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-600 text-xs">{contact.label}</p>
                  <p className="text-black font-semibold group-hover:text-gray-700">{contact.value}</p>
                </div>
                <span className="text-gray-400 group-hover:text-black">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send a Message</h3>
          
          {submitted ? (
            <div className="p-4 rounded-lg bg-green-50 border border-green-300 text-green-700 text-center animate-scale-in">
              ✓ Message received! I&apos;ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg hover:bg-gray-900 transition-all hover:scale-105 active:scale-95"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
