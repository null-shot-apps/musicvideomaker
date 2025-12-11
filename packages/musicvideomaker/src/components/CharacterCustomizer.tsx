'use client';

import { useState } from 'react';

interface CharacterSettings {
  gender: string;
  ethnicity: string;
  age: string;
  bodyType: string;
  hairStyle: string;
  hairColor: string;
  outfit: string;
  accessories: string[];
}

export default function CharacterCustomizer() {
  const [character, setCharacter] = useState<CharacterSettings>({
    gender: 'male',
    ethnicity: 'african',
    age: 'young-adult',
    bodyType: 'athletic',
    hairStyle: 'dreadlocks',
    hairColor: 'black',
    outfit: 'streetwear',
    accessories: []
  });

  const updateCharacter = (key: keyof CharacterSettings, value: any) => {
    setCharacter({ ...character, [key]: value });
  };

  const toggleAccessory = (accessory: string) => {
    const accessories = character.accessories.includes(accessory)
      ? character.accessories.filter(a => a !== accessory)
      : [...character.accessories, accessory];
    updateCharacter('accessories', accessories);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Character Customization</h3>

      {/* Gender */}
      <div>
        <label className="block text-sm font-semibold mb-2">Gender</label>
        <div className="grid grid-cols-3 gap-2">
          {['male', 'female', 'non-binary'].map(option => (
            <button
              key={option}
              onClick={() => updateCharacter('gender', option)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                character.gender === option
                  ? 'bg-purple-600'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Ethnicity */}
      <div>
        <label className="block text-sm font-semibold mb-2">Ethnicity</label>
        <select
          value={character.ethnicity}
          onChange={(e) => updateCharacter('ethnicity', e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none"
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
      <div>
        <label className="block text-sm font-semibold mb-2">Age Range</label>
        <div className="grid grid-cols-4 gap-2">
          {['teen', 'young-adult', 'adult', 'mature'].map(option => (
            <button
              key={option}
              onClick={() => updateCharacter('age', option)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                character.age === option
                  ? 'bg-purple-600'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {option.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div>
        <label className="block text-sm font-semibold mb-2">Body Type</label>
        <div className="grid grid-cols-4 gap-2">
          {['slim', 'athletic', 'average', 'muscular'].map(option => (
            <button
              key={option}
              onClick={() => updateCharacter('bodyType', option)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                character.bodyType === option
                  ? 'bg-purple-600'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Hair Style */}
      <div>
        <label className="block text-sm font-semibold mb-2">Hair Style</label>
        <select
          value={character.hairStyle}
          onChange={(e) => updateCharacter('hairStyle', e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none"
        >
          <option value="dreadlocks">Dreadlocks</option>
          <option value="afro">Afro</option>
          <option value="braids">Braids</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
          <option value="bald">Bald</option>
          <option value="fade">Fade</option>
          <option value="cornrows">Cornrows</option>
        </select>
      </div>

      {/* Hair Color */}
      <div>
        <label className="block text-sm font-semibold mb-2">Hair Color</label>
        <div className="grid grid-cols-5 gap-2">
          {[
            { name: 'black', color: '#000000' },
            { name: 'brown', color: '#4A2511' },
            { name: 'blonde', color: '#F5D76E' },
            { name: 'red', color: '#8B2500' },
            { name: 'white', color: '#FFFFFF' }
          ].map(option => (
            <button
              key={option.name}
              onClick={() => updateCharacter('hairColor', option.name)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold capitalize transition-colors border-2 ${
                character.hairColor === option.name
                  ? 'border-purple-500'
                  : 'border-slate-700'
              }`}
              style={{ backgroundColor: option.color }}
            >
              <span className={option.name === 'white' || option.name === 'blonde' ? 'text-black' : 'text-white'}>
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Outfit */}
      <div>
        <label className="block text-sm font-semibold mb-2">Outfit Style</label>
        <select
          value={character.outfit}
          onChange={(e) => updateCharacter('outfit', e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none"
        >
          <option value="streetwear">Streetwear</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="traditional">Traditional African</option>
          <option value="futuristic">Futuristic</option>
          <option value="athletic">Athletic</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      {/* Accessories */}
      <div>
        <label className="block text-sm font-semibold mb-2">Accessories</label>
        <div className="grid grid-cols-3 gap-2">
          {['sunglasses', 'jewelry', 'hat', 'watch', 'chains', 'earrings'].map(accessory => (
            <button
              key={accessory}
              onClick={() => toggleAccessory(accessory)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                character.accessories.includes(accessory)
                  ? 'bg-purple-600'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {accessory}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 bg-slate-800 rounded-lg">
        <h4 className="font-semibold mb-2">Character Preview</h4>
        <div className="text-sm text-slate-400 space-y-1">
          <p>• {character.gender} character</p>
          <p>• {character.ethnicity} ethnicity</p>
          <p>• {character.age.replace('-', ' ')} age</p>
          <p>• {character.bodyType} build</p>
          <p>• {character.hairColor} {character.hairStyle}</p>
          <p>• {character.outfit} outfit</p>
          {character.accessories.length > 0 && (
            <p>• Accessories: {character.accessories.join(', ')}</p>
          )}
        </div>
      </div>
    </div>
  );
}

