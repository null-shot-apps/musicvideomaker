'use client';

import { useState } from 'react';
import Link from 'next/link';
import AudioWaveform from '@/components/AudioWaveform';
import LyricsEditor from '@/components/LyricsEditor';
import CharacterCustomizer from '@/components/CharacterCustomizer';
import SceneSelector from '@/components/SceneSelector';
import VideoGenerator from '@/components/VideoGenerator';

export default function ProjectEditor() {
  const [activeTab, setActiveTab] = useState('audio');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [lyrics, setLyrics] = useState<any[]>([]);
  const [character, setCharacter] = useState<any>(null);
  const [scene, setScene] = useState<any>(null);
  const [projectName, setProjectName] = useState('Untitled Project');
  const [isEditingName, setIsEditingName] = useState(false);

  const tabs = [
    { id: 'audio', name: 'Audio & Lyrics', icon: '🎵' },
    { id: 'character', name: 'Character', icon: '👤' },
    { id: 'scene', name: 'Scene & Camera', icon: '🎬' },
    { id: 'generate', name: 'Generate', icon: '✨' }
  ];

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back
              </Link>
              
              {isEditingName ? (
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  className="text-xl font-bold bg-gray-800 px-3 py-1 rounded border border-gray-700 focus:outline-none focus:border-purple-500"
                  autoFocus
                />
              ) : (
                <h1
                  onClick={() => setIsEditingName(true)}
                  className="text-xl font-bold cursor-pointer hover:text-purple-400 transition-colors"
                >
                  {projectName}
                </h1>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                💾 Save
              </button>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                👁️ Preview
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-gray-800 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-purple-500 bg-gray-900/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/30'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Audio & Lyrics Tab */}
        {activeTab === 'audio' && (
          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Audio Upload</h2>
              
              {!audioFile ? (
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <div className="text-6xl mb-4">🎵</div>
                    <div className="text-xl font-semibold mb-2">Upload Your Audio</div>
                    <div className="text-gray-400">
                      Drag and drop or click to browse
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Supports MP3, WAV, M4A (Max 50MB)
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🎵</div>
                      <div>
                        <div className="font-medium">{audioFile.name}</div>
                        <div className="text-sm text-gray-400">
                          {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setAudioFile(null)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  <AudioWaveform audioFile={audioFile} />
                </div>
              )}
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <LyricsEditor onLyricsChange={setLyrics} />
            </div>
          </div>
        )}

        {/* Character Tab */}
        {activeTab === 'character' && (
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <CharacterCustomizer onSettingsChange={setCharacter} />
          </div>
        )}

        {/* Scene Tab */}
        {activeTab === 'scene' && (
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <SceneSelector onSettingsChange={setScene} />
          </div>
        )}

        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <VideoGenerator
              projectData={{
                audioFile,
                lyrics,
                character,
                scene
              }}
            />
          </div>
        )}
      </main>

      {/* Progress Indicator */}
      <div className="fixed bottom-6 right-6 bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-xl">
        <div className="text-sm font-medium mb-2">Project Progress</div>
        <div className="space-y-2 text-sm">
          <div className={audioFile ? 'text-green-400' : 'text-gray-500'}>
            {audioFile ? '✓' : '○'} Audio uploaded
          </div>
          <div className={lyrics.length > 0 ? 'text-green-400' : 'text-gray-500'}>
            {lyrics.length > 0 ? '✓' : '○'} Lyrics added
          </div>
          <div className={character ? 'text-green-400' : 'text-gray-500'}>
            {character ? '✓' : '○'} Character customized
          </div>
          <div className={scene ? 'text-green-400' : 'text-gray-500'}>
            {scene ? '✓' : '○'} Scene configured
          </div>
        </div>
      </div>
    </div>
  );
}

