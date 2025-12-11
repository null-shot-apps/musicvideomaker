'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [projects] = useState([
    {
      id: '1',
      title: 'Summer Vibes',
      status: 'completed',
      thumbnail: '/placeholder.jpg',
      duration: '3:45',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Night Drive',
      status: 'processing',
      thumbnail: '/placeholder.jpg',
      duration: '4:20',
      createdAt: '2024-01-14'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            3D Music Video Generator
          </h1>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-white/80 hover:text-white transition">
              Settings
            </button>
            <button className="px-4 py-2 text-white/80 hover:text-white transition">
              Profile
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Create New Project Button */}
        <div className="mb-12">
          <Link
            href="/create"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Video
          </Link>
        </div>

        {/* Projects Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Your Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all group"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'Processing'}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{project.duration}</span>
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                      View
                    </button>
                    <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition text-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition text-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

