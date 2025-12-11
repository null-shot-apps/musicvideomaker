'use client';

import { useState } from 'react';

interface LyricsLine {
  id: string;
  text: string;
  timestamp: number;
}

interface LyricsEditorProps {
  onLyricsChange?: (lyrics: LyricsLine[]) => void;
}

export default function LyricsEditor({ onLyricsChange }: LyricsEditorProps) {
  const [lyrics, setLyrics] = useState<LyricsLine[]>([
    { id: '1', text: '', timestamp: 0 }
  ]);
  const [autoSync, setAutoSync] = useState(false);

  const addLine = () => {
    const newLine: LyricsLine = {
      id: Date.now().toString(),
      text: '',
      timestamp: lyrics.length > 0 ? lyrics[lyrics.length - 1].timestamp + 2 : 0
    };
    const newLyrics = [...lyrics, newLine];
    setLyrics(newLyrics);
    onLyricsChange?.(newLyrics);
  };

  const updateLine = (id: string, text: string) => {
    const newLyrics = lyrics.map(line =>
      line.id === id ? { ...line, text } : line
    );
    setLyrics(newLyrics);
    onLyricsChange?.(newLyrics);
  };

  const updateTimestamp = (id: string, timestamp: number) => {
    const newLyrics = lyrics.map(line =>
      line.id === id ? { ...line, timestamp } : line
    );
    setLyrics(newLyrics);
    onLyricsChange?.(newLyrics);
  };

  const removeLine = (id: string) => {
    const newLyrics = lyrics.filter(line => line.id !== id);
    setLyrics(newLyrics);
    onLyricsChange?.(newLyrics);
  };

  const autoSyncLyrics = () => {
    // Mock auto-sync - in real app, this would use audio analysis
    const avgLineTime = 3; // 3 seconds per line
    const newLyrics = lyrics.map((line, index) => ({
      ...line,
      timestamp: index * avgLineTime
    }));
    setLyrics(newLyrics);
    onLyricsChange?.(newLyrics);
    setAutoSync(true);
    setTimeout(() => setAutoSync(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Lyrics & Timing</h3>
        <div className="flex gap-2">
          <button
            onClick={autoSyncLyrics}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
          >
            {autoSync ? '✓ Synced!' : '🎵 Auto-Sync to Beat'}
          </button>
          <button
            onClick={addLine}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            + Add Line
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {lyrics.map((line, index) => (
          <div key={line.id} className="flex items-center gap-3 bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="text-gray-500 font-mono text-sm w-8">{index + 1}</div>
            
            <input
              type="number"
              value={line.timestamp}
              onChange={(e) => updateTimestamp(line.id, parseFloat(e.target.value))}
              className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm"
              step="0.1"
              placeholder="0.0s"
            />

            <input
              type="text"
              value={line.text}
              onChange={(e) => updateLine(line.id, e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
              placeholder="Enter lyrics line..."
            />

            {lyrics.length > 1 && (
              <button
                onClick={() => removeLine(line.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-400">
        💡 Tip: Use Auto-Sync to automatically time lyrics to the beat, or manually adjust timestamps
      </div>
    </div>
  );
}

