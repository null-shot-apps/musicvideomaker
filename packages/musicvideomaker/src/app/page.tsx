'use client';

import { useState } from 'react';
import Link from 'next/link';

const styles = [
  { name: 'Afrobeat', color: 'from-orange-500 to-red-600' },
  { name: 'Hip-Hop', color: 'from-purple-500 to-pink-600' },
  { name: 'Gospel', color: 'from-yellow-400 to-orange-500' },
  { name: 'Anime', color: 'from-blue-500 to-cyan-400' },
  { name: 'Sci-Fi', color: 'from-indigo-600 to-purple-700' },
  { name: 'Fantasy', color: 'from-green-500 to-emerald-600' },
];

const features = [
  { icon: '🎵', title: 'AI Audio Analysis', desc: 'Detects emotion, rhythm, and mood from your music' },
  { icon: '🎭', title: 'Ultra-Realistic 3D', desc: 'Photorealistic characters, environments, and lighting' },
  { icon: '🎬', title: 'Cinematic Shots', desc: 'Drone sweeps, slow-mo, close-ups, action sequences' },
  { icon: '💋', title: 'Perfect Lip-Sync', desc: 'Natural facial expressions synced to vocals' },
  { icon: '🎨', title: 'Full Customization', desc: 'Characters, outfits, scenes, camera angles' },
  { icon: '⚡', title: '4K+ Export', desc: 'Studio-quality videos ready for YouTube & TikTok' },
];

export default function Landing() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,255,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Ultra-Realistic 3D
            <br />
            Music Video Generator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your lyrics and audio into cinematic, studio-quality 3D animated music videos powered by AI
          </p>
          
          {/* Demo Video Placeholder */}
          <div className="relative w-full max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30">
            <div className="aspect-video bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-400">Watch Demo Video</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:scale-105 transition-transform shadow-lg text-center"
            >
              🚀 Start Creating Now
            </Link>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-full bg-slate-800 hover:bg-slate-700 font-semibold transition-colors"
              >
                {submitted ? '✓' : 'Waitlist'}
              </button>
            </form>
          </div>
          <p className="text-sm text-gray-500">Try the platform now or join the waitlist for updates</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Everything You Need to Create
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Music Videos
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Presets */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Choose Your Style
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {styles.map((style, i) => (
              <div
                key={i}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold group-hover:scale-110 transition-transform">
                    {style.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-gradient-to-b from-purple-950/20 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Perfect For
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8">
              <div className="text-5xl mb-4">🎤</div>
              <h3 className="text-2xl font-bold mb-3">Artists</h3>
              <p className="text-gray-400">Create stunning visuals for your music without expensive studios</p>
            </div>
            <div className="p-8">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3">Content Creators</h3>
              <p className="text-gray-400">Stand out on YouTube, TikTok, and Instagram with cinematic videos</p>
            </div>
            <div className="p-8">
              <div className="text-5xl mb-4">🎼</div>
              <h3 className="text-2xl font-bold mb-3">Music Labels</h3>
              <p className="text-gray-400">Produce high-quality music videos at scale for your roster</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Create Magic?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join the waitlist and be among the first to turn your music into cinematic 3D experiences
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              {submitted ? '✓ Joined!' : 'Get Early Access'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>© 2024 Ultra-Realistic 3D Music Video Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}



