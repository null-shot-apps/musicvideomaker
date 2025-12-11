'use client';

import { useState } from 'react';

interface CharacterSettings {
  gender: 'male' | 'female' | 'non-binary';
  ethnicity: string;
  age: string;
  bodyType: string;
  hairStyle: string;
  hairColor: string;
  outfit: string;
  accessories: string[];
}

interface CharacterCustomizerProps {
  onSettingsChange?: (settings: CharacterSettings) => void;
}

export default function CharacterCustomizer({ onSettingsChange }: CharacterCustomizerProps) {
  const [settings, setSettings] = useState<CharacterSettings>({
    gender: 'male',
    ethnicity: 'african',
    age: 'young-adult',
    bodyType: 'athletic',
    hairStyle: 'dreadlocks',
    hairColor: 'black',
    outfit: 'streetwear',
    accessories: []
  });

  const updateSetting = <K extends keyof CharacterSettings>(
    key: K,
    value: CharacterSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const toggleAccessory = (accessory: string) => {
    const newAccessories = settings.accessories.includes(accessory)
      ? settings.accessories.filter(a => a !== accessory)
      : [...settings.accessories, accessory];
    updateSetting('accessories', newAccessories);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Character Customization</h3>

      {/* Gender */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Gender</label>
        <div className="grid grid-cols-3 gap-2">
          {(['male', 'female', 'non-binary'] as const).map((gender) => (
            <button
              key={gender}
              onClick={() => updateSetting('gender', gender)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                settings.gender === gender
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {gender === 'non-binary' ? 'Non-Binary' : gender.charAt(0).toUpperCase() + gender.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Ethnicity */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Ethnicity</label>
        <select
          value={settings.ethnicity}
          onChange={(e) => updateSetting('ethnicity', e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
        >
          <option value="african">African</option>
          <option value="asian">Asian</option>
          <option value="caucasian">Caucasian</option>
          <option value="hispanic">Hispanic</option>
          <option value="middle-eastern">Middle Eastern</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      {/* Age */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Age Range</label>
        <select
          value={settings.age}
          onChange={(e) => updateSetting('age', e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
        >
          <option value="teen">Teen (13-19)</option>
          <option value="young-adult">Young Adult (20-30)</option>
          <option value="adult">Adult (31-50)</option>
          <option value="senior">Senior (50+)</option>
        </select>
      </div>

      {/* Body Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Body Type</label>
        <div className="grid grid-cols-4 gap-2">
          {['slim', 'athletic', 'average', 'muscular'].map((type) => (
            <button
              key={type}
              onClick={() => updateSetting('bodyType', type)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                settings.bodyType === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Hair Style */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Hair Style</label>
        <select
          value={settings.hairStyle}
          onChange={(e) => updateSetting('hairStyle', e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
        >
          <option value="dreadlocks">Dreadlocks</option>
          <option value="afro">Afro</option>
          <option value="braids">Braids</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
          <option value="bald">Bald</option>
          <option value="fade">Fade</option>
          <option value="curly">Curly</option>
        </select>
      </div>

      {/* Hair Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Hair Color</label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { name: 'Black', color: '#000000' },
            { name: 'Brown', color: '#4a2511' },
            { name: 'Blonde', color: '#f4d03f' },
            { name: 'Red', color: '#c0392b' },
            { name: 'White', color: '#ecf0f1' },
            { name: 'Blue', color: '#3498db' },
            { name: 'Purple', color: '#9b59b6' },
            { name: 'Pink', color: '#e91e63' }
          ].map((color) => (
            <button
              key={color.name}
              onClick={() => updateSetting('hairColor', color.name.toLowerCase())}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border-2 ${
                settings.hairColor === color.name.toLowerCase()
                  ? 'border-purple-500'
                  : 'border-gray-700'
              }`}
              style={{ backgroundColor: color.color }}
            >
              <span className={color.name === 'Black' || color.name === 'Brown' || color.name === 'Red' ? 'text-white' : 'text-black'}>
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Outfit */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Outfit Style</label>
        <select
          value={settings.outfit}
          onChange={(e) => updateSetting('outfit', e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
        >
          <option value="streetwear">Streetwear</option>
          <option value="formal">Formal Suit</option>
          <option value="casual">Casual</option>
          <option value="traditional">Traditional African</option>
          <option value="futuristic">Futuristic</option>
          <option value="fantasy">Fantasy</option>
          <option value="athletic">Athletic</option>
          <option value="punk">Punk</option>
        </select>
      </div>

      {/* Accessories */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Accessories</label>
        <div className="grid grid-cols-3 gap-2">
          {['sunglasses', 'jewelry', 'hat', 'watch', 'tattoos', 'piercings'].map((accessory) => (
            <button
              key={accessory}
              onClick={() => toggleAccessory(accessory)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                settings.accessories.includes(accessory)
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {accessory.charAt(0).toUpperCase() + accessory.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Info */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <div className="text-sm text-gray-400 mb-2">Character Preview:</div>
        <div className="text-sm space-y-1">
          <div>👤 {settings.gender} • {settings.ethnicity} • {settings.age}</div>
          <div>💪 {settings.bodyType} build</div>
          <div>💇 {settings.hairStyle} ({settings.hairColor})</div>
          <div>👔 {settings.outfit}</div>
          {settings.accessories.length > 0 && (
            <div>✨ {settings.accessories.join(', ')}</div>
          )}
        </div>
      </div>
    </div>
  );
}

