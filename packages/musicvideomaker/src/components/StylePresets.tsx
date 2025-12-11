'use client';

import { useState } from 'react';

interface StylePreset {
  id: string;
  name: string;
  description: string;
  gradient: string;
  features: string[];
}

const presets: StylePreset[] = [
  {
    id: 'afrobeat',
    name: 'Afrobeat',
    description: 'Vibrant African culture with traditional and modern fusion',
    gradient: 'from-orange-500 to-red-600',
    features: ['African patterns', 'Vibrant colors', 'Cultural elements', 'Dance movements']
  },
  {
    id: 'hiphop',
    name: 'Hip-Hop',
    description: 'Urban street style with gritty realism',
    gradient: 'from-gray-700 to-gray-900',
    features: ['Urban environments', 'Street fashion', 'Graffiti art', 'Dynamic camera']
  },
  {
    id: 'gospel',
    name: 'Gospel',
    description: 'Spiritual and uplifting with heavenly aesthetics',
    gradient: 'from-blue-400 to-purple-600',
    features: ['Heavenly lighting', 'Choir scenes', 'Spiritual atmosphere', 'Warm tones']
  },
  {
    id: 'anime',
    name: 'Anime Ultra-Realism',
    description: 'Anime-inspired with photorealistic rendering',
    gradient: 'from-pink-500 to-purple-600',
    features: ['Anime aesthetics', 'Exaggerated expressions', 'Vibrant colors', 'Dynamic poses']
  },
  {
    id: 'scifi',
    name: 'Futuristic Sci-Fi',
    description: 'Cyberpunk and futuristic technology',
    gradient: 'from-cyan-500 to-blue-700',
    features: ['Neon lights', 'Holographic effects', 'Tech elements', 'Futuristic city']
  },
  {
    id: 'fantasy',
    name: 'Fantasy World',
    description: 'Magical and mystical environments',
    gradient: 'from-purple-600 to-indigo-800',
    features: ['Magical effects', 'Fantasy creatures', 'Mystical lighting', 'Epic landscapes']
  },
  {
    id: 'liveaction',
    name: 'Live Action Simulation',
    description: 'Hyper-realistic like real filmed footage',
    gradient: 'from-amber-600 to-orange-700',
    features: ['Photorealistic', 'Natural lighting', 'Real-world physics', 'Film grain']
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'High-end fashion and opulent settings',
    gradient: 'from-yellow-500 to-amber-600',
    features: ['Luxury brands', 'High fashion', 'Expensive cars', 'Mansion settings']
  }
];

export default function StylePresets() {
  const [selectedPreset, setSelectedPreset] = useState('afrobeat');

  const selected = presets.find(p => p.id === selectedPreset);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Style Presets</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {presets.map(preset => (
          <button
            key={preset.id}
            onClick={() => setSelectedPreset(preset.id)}
            className={`p-6 rounded-lg text-left transition-all ${
              selectedPreset === preset.id
                ? 'ring-2 ring-purple-400 scale-105'
                : 'hover:scale-102'
            }`}
          >
            <div className={`bg-gradient-to-r ${preset.gradient} p-4 rounded-lg mb-3`}>
              <h4 className="font-bold text-lg text-white">{preset.name}</h4>
            </div>
            <p className="text-sm text-slate-400 mb-3">{preset.description}</p>
            <div className="flex flex-wrap gap-2">
              {preset.features.map(feature => (
                <span
                  key={feature}
                  className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300"
                >
                  {feature}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Preset Details */}
      {selected && (
        <div className="p-6 bg-slate-800 rounded-lg">
          <h4 className="font-semibold mb-3">Selected Style: {selected.name}</h4>
          <p className="text-sm text-slate-400 mb-4">{selected.description}</p>
          <div className="space-y-2">
            <p className="text-sm font-semibold">This style includes:</p>
            <ul className="text-sm text-slate-400 space-y-1">
              {selected.features.map(feature => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

