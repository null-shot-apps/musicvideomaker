'use client';

import { useState } from 'react';

interface LyricLine {
  id: string;
  text: string;
  timestamp: number;
}

export default function LyricsEditor() {
  const [lyrics, setLyrics] = useState<LyricLine[]>([
    { id: '1', text: '', timestamp: 0 }
  ]);

  const addLine = () => {
    const newLine: LyricLine = {
      id: Date.now().toString(),
      text: '',
      timestamp: 0
    };
    setLyrics([...lyrics, newLine]);
  };

  const updateLine = (id: string, text: string) => {
    setLyrics(lyrics.map(line => 
      line.id === id ? { ...line, text } : line
    ));
  };

  const updateTimestamp = (id: string, timestamp: number) => {
    setLyrics(lyrics.map(line => 
      line.id === id ? { ...line, timestamp } : line
    ));
  };

  const deleteLine = (id: string) => {
    if (lyrics.length > 1) {
      setLyrics(lyrics.filter(line => line.id !== id));
    }
  };

  const autoSync = () => {
    // Placeholder for auto-sync functionality
    alert('Auto-sync will analyze audio and automatically timestamp lyrics');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Lyrics Editor</h3>
        <div className="flex gap-2">
          <button
            onClick={autoSync}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors"
          >
            🎵 Auto-Sync
          </button>
          <button
            onClick={addLine}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold transition-colors"
          >
            + Add Line
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {lyrics.map((line, index) => (
          <div key={line.id} className="flex gap-2 items-start">
            <div className="w-20">
              <input
                type="number"
                value={line.timestamp}
                onChange={(e) => updateTimestamp(line.id, parseFloat(e.target.value))}
                placeholder="0.00"
                step="0.1"
                className="w-full px-2 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
              />
              <div className="text-xs text-slate-500 mt-1">seconds</div>
            </div>
            
            <textarea
              value={line.text}
              onChange={(e) => updateLine(line.id, e.target.value)}
              placeholder={`Line ${index + 1}`}
              rows={2}
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded resize-none focus:border-purple-500 focus:outline-none"
            />
            
            <button
              onClick={() => deleteLine(line.id)}
              className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors"
              disabled={lyrics.length === 1}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-800 rounded-lg">
        <h4 className="font-semibold mb-2">Tips:</h4>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>• Use Auto-Sync to automatically timestamp lyrics to audio</li>
          <li>• Manually adjust timestamps for precise control</li>
          <li>• Press Enter to add a new line while typing</li>
        </ul>
      </div>
    </div>
  );
}

