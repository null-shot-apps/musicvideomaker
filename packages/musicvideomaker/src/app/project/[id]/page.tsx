'use client';

import { useState } from 'react';
import Link from 'next/link';
import AudioWaveform from '@/components/AudioWaveform';
import LyricsEditor from '@/components/LyricsEditor';
import CharacterCustomizer from '@/components/CharacterCustomizer';
import SceneSelector from '@/components/SceneSelector';
import StylePresets from '@/components/StylePresets';
import VideoGenerator from '@/components/VideoGenerator';

type Tab = 'audio' | 'lyrics' | 'character' | 'scene' | 'style' | 'generate';

export default function ProjectEditor() {
  const [activeTab, setActiveTab] = useState<Tab>('audio');
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'audio', label: 'Audio', icon: '🎵' },
    { id: 'lyrics', label: 'Lyrics', icon: '📝' },
    { id: 'character', label: 'Character', icon: '👤' },
    { id: 'scene', label: 'Scene', icon: '🎬' },
    { id: 'style', label: 'Style', icon: '🎨' },
    { id: 'generate', label: 'Generate', icon: '⚡' }
  ];

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                ← Back
              </Link>
              <div>
                <h1 className="text-xl font-bold">My Music Video Project</h1>
                <p className="text-sm text-slate-400">Last saved: Just now</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors">
              💾 Save Project
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-slate-800 bg-slate-950/30 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800">
          {/* Audio Tab */}
          {activeTab === 'audio' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Upload Audio</h2>
                <p className="text-slate-400">Upload your music track to get started</p>
              </div>

              {!audioFile ? (
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <div className="text-6xl mb-4">🎵</div>
                    <h3 className="text-xl font-bold mb-2">Upload Audio File</h3>
                    <p className="text-slate-400 mb-4">
                      Drag and drop or click to browse
                    </p>
                    <div className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors">
                      Choose File
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                      Supports MP3, WAV, M4A, FLAC
                    </p>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🎵</div>
                      <div>
                        <p className="font-semibold">{audioFile.name}</p>
                        <p className="text-sm text-slate-400">
                          {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAudioFile(null)}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  <AudioWaveform audioFile={audioFile} />

                  <button
                    onClick={() => setActiveTab('lyrics')}
                    className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors"
                  >
                    Continue to Lyrics →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Lyrics Tab */}
          {activeTab === 'lyrics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Add Lyrics</h2>
                <p className="text-slate-400">Enter your song lyrics and sync them to the audio</p>
              </div>

              <LyricsEditor />

              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('audio')}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition-colors"
                >
                  ← Back to Audio
                </button>
                <button
                  onClick={() => setActiveTab('character')}
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors"
                >
                  Continue to Character →
                </button>
              </div>
            </div>
          )}

          {/* Character Tab */}
          {activeTab === 'character' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Customize Character</h2>
                <p className="text-slate-400">Design your 3D character appearance</p>
              </div>

              <CharacterCustomizer />

              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('lyrics')}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition-colors"
                >
                  ← Back to Lyrics
                </button>
                <button
                  onClick={() => setActiveTab('scene')}
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors"
                >
                  Continue to Scene →
                </button>
              </div>
            </div>
          )}

          {/* Scene Tab */}
          {activeTab === 'scene' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Configure Scene</h2>
                <p className="text-slate-400">Choose environment, lighting, and camera angles</p>
              </div>

              <SceneSelector />

              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('character')}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition-colors"
                >
                  ← Back to Character
                </button>
                <button
                  onClick={() => setActiveTab('style')}
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors"
                >
                  Continue to Style →
                </button>
              </div>
            </div>
          )}

          {/* Style Tab */}
          {activeTab === 'style' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Choose Style</h2>
                <p className="text-slate-400">Select a visual style preset for your video</p>
              </div>

              <StylePresets />

              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('scene')}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition-colors"
                >
                  ← Back to Scene
                </button>
                <button
                  onClick={() => setActiveTab('generate')}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition-all"
                >
                  Generate Video ⚡
                </button>
              </div>
            </div>
          )}

          {/* Generate Tab */}
          {activeTab === 'generate' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Generate Video</h2>
                <p className="text-slate-400">Create your ultra-realistic 3D music video</p>
              </div>

              <VideoGenerator />

              <button
                onClick={() => setActiveTab('style')}
                className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition-colors"
              >
                ← Back to Style
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

