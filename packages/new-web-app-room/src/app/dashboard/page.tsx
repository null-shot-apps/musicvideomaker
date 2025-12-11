'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [projects] = useState([
    {
      id: '1',
      name: 'Summer Vibes',
      thumbnail: '🌴',
      status: 'completed',
      duration: '3:45',
      createdAt: '2 days ago',
      style: 'Afrobeat'
    },
    {
      id: '2',
      name: 'Night Drive',
      thumbnail: '🌃',
      status: 'in-progress',
      duration: '4:12',
      createdAt: '5 hours ago',
      style: 'Hip-Hop Urban'
    },
    {
      id: '3',
      name: 'Gospel Praise',
      thumbnail: '🙏',
      status: 'draft',
      duration: '5:30',
      createdAt: '1 week ago',
      style: 'Gospel Cinematic'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter(p => 
    filter === 'all' || p.status === filter
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Projects</h1>
              <p className="text-sm text-gray-400 mt-1">{projects.length} total projects</p>
            </div>
            <Link
              href="/new-project"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all"
            >
              + New Project
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'all', name: 'All Projects' },
            { id: 'completed', name: 'Completed' },
            { id: 'in-progress', name: 'In Progress' },
            { id: 'draft', name: 'Drafts' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all hover:scale-105"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center text-6xl">
                  {project.thumbnail}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors">
                      {project.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-900 text-green-300' :
                      project.status === 'in-progress' ? 'bg-blue-900 text-blue-300' :
                      'bg-gray-800 text-gray-400'
                    }`}>
                      {project.status === 'in-progress' ? 'In Progress' : 
                       project.status === 'completed' ? 'Completed' : 'Draft'}
                    </span>
                  </div>

                  <div className="text-sm text-gray-400 space-y-1">
                    <div>🎨 {project.style}</div>
                    <div>⏱️ {project.duration}</div>
                    <div>📅 {project.createdAt}</div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-800 flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                      ⋯
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold mb-2">No projects found</h2>
            <p className="text-gray-400 mb-6">Try adjusting your filters</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-purple-400">{projects.length}</div>
            <div className="text-sm text-gray-400 mt-1">Total Projects</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-green-400">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-400 mt-1">Completed</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-blue-400">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-400 mt-1">In Progress</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-pink-400">12.5</div>
            <div className="text-sm text-gray-400 mt-1">Hours Generated</div>
          </div>
        </div>
      </main>
    </div>
  );
}

