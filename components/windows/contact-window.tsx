'use client';

import { useState } from 'react';
import { Mail, Send, Github, Linkedin, FileText, CheckCircle2, ArrowRight, Star } from 'lucide-react';

const contactChannels = [
  { id: 'email', label: "Direct Email", value: "ajmalsadhiq7@gmail.com", href: "mailto:ajmalsadhiq7@gmail.com", icon: Mail, desc: "Send an email inquiry directly", badge: "Primary" },
  { id: 'linkedin', label: "LinkedIn", value: "ajmalsadhiq", href: "https://www.linkedin.com/in/ajmal-sadhiq-puthanpura-ebrahim-012ab0291/", icon: Linkedin, desc: "Connect professionally on LinkedIn", badge: "Inbox" },
  { id: 'github', label: "GitHub", value: "ajmalsadhiq", href: "https://github.com/ajmalsadhiq", icon: Github, desc: "Check repos and code contributions", badge: "Social" },
  { id: 'resume', label: "Google Drive CV", value: "ajmalsadhiq.pdf", href: "https://drive.google.com/file/d/12kmW5mqKKpr76Fw75xWg65jDZ7c6opHs/view?usp=sharing", icon: FileText, desc: "View or download standard resume", badge: "Files" }
];

export function ContactWindow() {
  const [formData, setFormData] = useState({
    fromEmail: '',
    subject: '',
    message: ''
  });
  const [activeChannel, setActiveChannel] = useState('email');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate macOS Mail sending process
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        setFormData({ fromEmail: '', subject: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm animate-scale-in">
      
      {/* Left Pane: Mailbox folders / channels */}
      <div className="w-full md:w-80 flex-shrink-0 border-r border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/10 flex flex-col">
        <div className="p-5 border-b border-gray-200 dark:border-zinc-800">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-500" />
            Inboxes
          </h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Select connection channel</p>
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
          {contactChannels.map((channel) => {
            const isSelected = activeChannel === channel.id;
            return (
              <button
                key={channel.id}
                onClick={() => {
                  setActiveChannel(channel.id);
                  if (channel.id !== 'email') {
                    window.open(channel.href, '_blank');
                  }
                }}
                className={`w-full p-3.5 rounded-xl text-left transition-all flex items-start gap-3 relative group ${
                  isSelected
                    ? 'bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40 text-blue-900 dark:text-blue-400 shadow-sm'
                    : 'bg-transparent border border-transparent hover:bg-gray-100 dark:hover:bg-zinc-850/50 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isSelected 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-200/60 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-300/60 dark:group-hover:bg-zinc-700 transition-colors'
                }`}>
                  <channel.icon className="w-4.5 h-4.5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold truncate">{channel.label}</span>
                    <span className={`px-1.5 py-0.5 text-[8px] font-black rounded-md ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200/80 text-gray-600 dark:bg-zinc-800 dark:text-gray-400'
                    }`}>
                      {channel.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate font-semibold">{channel.value}</p>
                  <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">{channel.desc}</p>
                </div>

                {/* Left accent indicator */}
                {isSelected && (
                  <div className="absolute left-1 top-3.5 bottom-3.5 w-1 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Composition Draft Editor */}
      <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900 overflow-y-auto">
        <div className="p-5 border-b border-gray-200 dark:border-zinc-800 bg-gray-50/30 dark:bg-zinc-950/5 flex justify-between items-center">
          <div>
            <h3 className="text-base font-extrabold text-gray-905 dark:text-white">New Message</h3>
            <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Drafting to Ajmal Sadhiq</p>
          </div>
          <Star className="w-4.5 h-4.5 text-yellow-500 fill-yellow-500 animate-pulse" />
        </div>

        <div className="flex-1 p-6">
          {sentSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center text-emerald-500 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Message Sent!</h3>
                <p className="text-xs text-gray-650 dark:text-gray-400 mt-1 leading-relaxed">
                  Your draft has been composed and sent. Ajmal will respond to your inquiry via your email address shortly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              
              {/* Recipient Field (To) */}
              <div className="flex items-center gap-3 border-b border-gray-100 dark:border-zinc-850 pb-2.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-12 flex-shrink-0">To:</span>
                <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                  Ajmal Sadhiq &lt;ajmalsadhiq7@gmail.com&gt;
                </span>
              </div>

              {/* Sender Email Field (From) */}
              <div className="flex items-center gap-3 border-b border-gray-100 dark:border-zinc-850 pb-1.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-12 flex-shrink-0">From:</span>
                <input
                  type="email"
                  name="fromEmail"
                  value={formData.fromEmail}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 dark:text-gray-250 placeholder-gray-500 font-semibold"
                />
              </div>

              {/* Subject Field */}
              <div className="flex items-center gap-3 border-b border-gray-100 dark:border-zinc-850 pb-1.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-12 flex-shrink-0">Subject:</span>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Inquiry / Professional Collaboration"
                  className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 dark:text-gray-250 placeholder-gray-500 font-semibold"
                />
              </div>

              {/* Message Content Area */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message:</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your email proposal here..."
                  rows={6}
                  className="w-full bg-transparent border-none outline-none text-xs text-gray-800 dark:text-gray-250 placeholder-gray-500 resize-none font-medium leading-relaxed mt-1"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-zinc-850 pt-4 mt-6">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">
                  {isSending ? "Routing message..." : "Draft ready to send"}
                </span>
                
                <button
                  type="submit"
                  disabled={isSending}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-pulse' : ''}`} />
                  {isSending ? "Sending..." : "Send Draft"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
