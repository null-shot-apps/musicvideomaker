'use client';

import { useState } from 'react';

interface SceneSettings {
  environment: string;
  timeOfDay: string;
  weather: string;
  lighting: string;
  cameraAngles: string[];
}

interface SceneSelectorProps {
  onSettingsChange?: (settings: SceneSettings) => void;
}

export default function SceneSelector({ onSettingsChange }: SceneSelectorProps) {
  const [settings, setSettings] = useState<SceneSettings>({
    environment: 'urban-street',
    timeOfDay: 'night',
    weather: 'clear',
    lighting: 'neon',
    cameraAngles: ['close-up', 'wide-shot']
  });

  const updateSetting = <K extends keyof SceneSettings>(
    key: K,
    value: SceneSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const toggleCameraAngle = (angle: string) => {
    const newAngles = settings.cameraAngles.includes(angle)
      ? settings.cameraAngles.filter(a => a !== angle)
      : [...settings.cameraAngles, angle];
    updateSetting('cameraAngles', newAngles);
  };

  const environments = [
    { id: 'urban-street', name: 'Urban Street', icon: '🏙️' },
    { id: 'studio', name: 'Studio', icon: '🎬' },
    { id: 'club', name: 'Night Club', icon: '🎉' },
    { id: 'beach', name: 'Beach', icon: '🏖️' },
    { id: 'forest', name: 'Forest', icon: '🌲' },
    { id: 'desert', name: 'Desert', icon: '🏜️' },
    { id: 'rooftop', name: 'Rooftop', icon: '🌆' },
    { id: 'space', name: 'Space', icon: '🚀' },
    { id: 'fantasy', name: 'Fantasy World', icon: '🏰' },
    { id: 'cyberpunk', name: 'Cyberpunk City', icon: '🌃' },
    { id: 'mansion', name: 'Luxury Mansion', icon: '🏛️' },
    { id: 'concert', name: 'Concert Stage', icon: '🎤' }
  ];

  const cameraAngles = [
    { id: 'close-up', name: 'Close-Up', icon: '👤' },
    { id: 'wide-shot', name: 'Wide Shot', icon: '📐' },
    { id: 'drone', name: 'Drone View', icon: '🚁' },
    { id: 'low-angle', name: 'Low Angle', icon: '⬆️' },
    { id: 'high-angle', name: 'High Angle', icon: '⬇️' },
    { id: 'tracking', name: 'Tracking Shot', icon: '🎥' },
    { id: 'slow-motion', name: 'Slow Motion', icon: '⏱️' },
    { id: 'pov', name: 'POV', icon: '👁️' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Scene & Environment</h3>

      {/* Environment Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Environment</label>
        <div className="grid grid-cols-3 gap-3">
          {environments.map((env) => (
            <button
              key={env.id}
              onClick={() => updateSetting('environment', env.id)}
              className={`p-4 rounded-lg font-medium transition-all ${
                settings.environment === env.id
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="text-2xl mb-1">{env.icon}</div>
              <div className="text-sm">{env.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time of Day */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Time of Day</label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'dawn', name: 'Dawn', icon: '🌅' },
            { id: 'day', name: 'Day', icon: '☀️' },
            { id: 'dusk', name: 'Dusk', icon: '🌇' },
            { id: 'night', name: 'Night', icon: '🌙' }
          ].map((time) => (
            <button
              key={time.id}
              onClick={() => updateSetting('timeOfDay', time.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                settings.timeOfDay === time.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {time.icon} {time.name}
            </button>
          ))}
        </div>
      </div>

      {/* Weather */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Weather</label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'clear', name: 'Clear', icon: '☀️' },
            { id: 'rain', name: 'Rain', icon: '🌧️' },
            { id: 'fog', name: 'Fog', icon: '🌫️' },
            { id: 'snow', name: 'Snow', icon: '❄️' }
          ].map((weather) => (
            <button
              key={weather.id}
              onClick={() => updateSetting('weather', weather.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                settings.weather === weather.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {weather.icon} {weather.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lighting Style */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Lighting Style</label>
        <select
          value={settings.lighting}
          onChange={(e) => updateSetting('lighting', e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
        >
          <option value="natural">Natural Light</option>
          <option value="neon">Neon Lights</option>
          <option value="dramatic">Dramatic Shadows</option>
          <option value="soft">Soft Diffused</option>
          <option value="colorful">Colorful Party</option>
          <option value="cinematic">Cinematic</option>
          <option value="moody">Moody Dark</option>
          <option value="bright">Bright Studio</option>
        </select>
      </div>

      {/* Camera Angles */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Camera Angles (Select Multiple)</label>
        <div className="grid grid-cols-4 gap-2">
          {cameraAngles.map((angle) => (
            <button
              key={angle.id}
              onClick={() => toggleCameraAngle(angle.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                settings.cameraAngles.includes(angle.id)
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div>{angle.icon}</div>
              <div className="text-xs mt-1">{angle.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Scene Preview */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <div className="text-sm text-gray-400 mb-2">Scene Configuration:</div>
        <div className="text-sm space-y-1">
          <div>📍 {environments.find(e => e.id === settings.environment)?.name}</div>
          <div>🕐 {settings.timeOfDay} • {settings.weather} weather</div>
          <div>💡 {settings.lighting} lighting</div>
          <div>🎥 {settings.cameraAngles.length} camera angles selected</div>
        </div>
      </div>
    </div>
  );
}

