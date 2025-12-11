'use client';

import { useState } from 'react';

interface Scene {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const scenes: Scene[] = [
  { id: 'studio', name: 'Recording Studio', description: 'Professional music studio with equipment', icon: '🎙️' },
  { id: 'urban', name: 'Urban Street', description: 'City streets with graffiti and buildings', icon: '🏙️' },
  { id: 'club', name: 'Night Club', description: 'Vibrant club with lights and crowd', icon: '🎉' },
  { id: 'beach', name: 'Beach Sunset', description: 'Tropical beach at golden hour', icon: '🏖️' },
  { id: 'forest', name: 'Forest', description: 'Mystical forest with nature', icon: '🌲' },
  { id: 'desert', name: 'Desert', description: 'Vast desert landscape', icon: '🏜️' },
  { id: 'rooftop', name: 'City Rooftop', description: 'Rooftop with city skyline view', icon: '🌆' },
  { id: 'space', name: 'Outer Space', description: 'Futuristic space environment', icon: '🚀' },
  { id: 'mansion', name: 'Luxury Mansion', description: 'High-end mansion interior', icon: '🏰' },
  { id: 'concert', name: 'Concert Stage', description: 'Large concert stage with lights', icon: '🎤' },
  { id: 'african-village', name: 'African Village', description: 'Traditional African setting', icon: '🛖' },
  { id: 'futuristic-city', name: 'Futuristic City', description: 'Cyberpunk neon city', icon: '🌃' }
];

const cameraAngles = [
  { id: 'close-up', name: 'Close-Up', icon: '👤' },
  { id: 'medium', name: 'Medium Shot', icon: '🎬' },
  { id: 'wide', name: 'Wide Shot', icon: '📷' },
  { id: 'drone', name: 'Drone View', icon: '🚁' },
  { id: 'low-angle', name: 'Low Angle', icon: '⬆️' },
  { id: 'high-angle', name: 'High Angle', icon: '⬇️' },
  { id: 'tracking', name: 'Tracking Shot', icon: '🎥' },
  { id: 'slow-motion', name: 'Slow Motion', icon: '⏱️' }
];

const lightingMoods = [
  { id: 'golden-hour', name: 'Golden Hour', color: '#FFA500' },
  { id: 'blue-hour', name: 'Blue Hour', color: '#4169E1' },
  { id: 'neon', name: 'Neon Lights', color: '#FF00FF' },
  { id: 'dramatic', name: 'Dramatic', color: '#8B0000' },
  { id: 'natural', name: 'Natural', color: '#FFFFFF' },
  { id: 'moody', name: 'Moody', color: '#2F4F4F' }
];

export default function SceneSelector() {
  const [selectedScene, setSelectedScene] = useState('studio');
  const [selectedAngles, setSelectedAngles] = useState<string[]>(['close-up', 'medium']);
  const [selectedLighting, setSelectedLighting] = useState('golden-hour');
  const [timeOfDay, setTimeOfDay] = useState('day');

  const toggleAngle = (angleId: string) => {
    if (selectedAngles.includes(angleId)) {
      setSelectedAngles(selectedAngles.filter(a => a !== angleId));
    } else {
      setSelectedAngles([...selectedAngles, angleId]);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Scene & Environment</h3>

      {/* Scene Selection */}
      <div>
        <label className="block text-sm font-semibold mb-3">Environment</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {scenes.map(scene => (
            <button
              key={scene.id}
              onClick={() => setSelectedScene(scene.id)}
              className={`p-4 rounded-lg text-left transition-all ${
                selectedScene === scene.id
                  ? 'bg-purple-600 ring-2 ring-purple-400'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <div className="text-3xl mb-2">{scene.icon}</div>
              <div className="font-semibold text-sm">{scene.name}</div>
              <div className="text-xs text-slate-400 mt-1">{scene.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time of Day */}
      <div>
        <label className="block text-sm font-semibold mb-2">Time of Day</label>
        <div className="grid grid-cols-4 gap-2">
          {['dawn', 'day', 'dusk', 'night'].map(time => (
            <button
              key={time}
              onClick={() => setTimeOfDay(time)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                timeOfDay === time
                  ? 'bg-purple-600'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Lighting Mood */}
      <div>
        <label className="block text-sm font-semibold mb-2">Lighting Mood</label>
        <div className="grid grid-cols-3 gap-2">
          {lightingMoods.map(mood => (
            <button
              key={mood.id}
              onClick={() => setSelectedLighting(mood.id)}
              className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                selectedLighting === mood.id
                  ? 'border-purple-500 bg-slate-800'
                  : 'border-slate-700 bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: mood.color }}
                />
                <span className="text-sm">{mood.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Camera Angles */}
      <div>
        <label className="block text-sm font-semibold mb-2">Camera Angles (Select Multiple)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {cameraAngles.map(angle => (
            <button
              key={angle.id}
              onClick={() => toggleAngle(angle.id)}
              className={`px-3 py-3 rounded-lg font-semibold transition-colors ${
                selectedAngles.includes(angle.id)
                  ? 'bg-purple-600'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <div className="text-xl mb-1">{angle.icon}</div>
              <div className="text-xs">{angle.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Scene Summary */}
      <div className="p-4 bg-slate-800 rounded-lg">
        <h4 className="font-semibold mb-2">Scene Configuration</h4>
        <div className="text-sm text-slate-400 space-y-1">
          <p>• Environment: {scenes.find(s => s.id === selectedScene)?.name}</p>
          <p>• Time: {timeOfDay}</p>
          <p>• Lighting: {lightingMoods.find(l => l.id === selectedLighting)?.name}</p>
          <p>• Camera angles: {selectedAngles.length} selected</p>
        </div>
      </div>
    </div>
  );
}

