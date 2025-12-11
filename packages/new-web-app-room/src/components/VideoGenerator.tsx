'use client';

import { useState } from 'react';

interface VideoGeneratorProps {
  projectData: {
    audioFile: File | null;
    lyrics: any[];
    character: any;
    scene: any;
  };
}

export default function VideoGenerator({ projectData }: VideoGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState('4k');
  const [style, setStyle] = useState('ultra-realistic');

  const generateVideo = async () => {
    setIsGenerating(true);
    setProgress(0);
    setVideoUrl(null);

    const steps = [
      { name: 'Analyzing audio and lyrics...', duration: 2000 },
      { name: 'Generating 3D character model...', duration: 3000 },
      { name: 'Creating environment and scenes...', duration: 3000 },
      { name: 'Syncing lip movements to vocals...', duration: 2500 },
      { name: 'Applying lighting and textures...', duration: 2500 },
      { name: 'Rendering camera movements...', duration: 2000 },
      { name: 'Processing final video in ' + quality + '...', duration: 4000 },
      { name: 'Finalizing and encoding...', duration: 2000 }
    ];

    let totalProgress = 0;
    const progressPerStep = 100 / steps.length;

    for (const step of steps) {
      setCurrentStep(step.name);
      await new Promise(resolve => setTimeout(resolve, step.duration));
      totalProgress += progressPerStep;
      setProgress(Math.min(totalProgress, 100));
    }

    // Mock video URL (in real app, this would be from AI service)
    setVideoUrl('/mock-video.mp4');
    setIsGenerating(false);
    setCurrentStep('Video generation complete!');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Generate Video</h3>

      {/* Quality Settings */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Video Quality</label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: '1080p', name: '1080p HD' },
            { id: '2k', name: '2K' },
            { id: '4k', name: '4K Ultra' },
            { id: '8k', name: '8K Cinema' }
          ].map((q) => (
            <button
              key={q.id}
              onClick={() => setQuality(q.id)}
              disabled={isGenerating}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                quality === q.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {q.name}
            </button>
          ))}
        </div>
      </div>

      {/* Style Preset */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Animation Style</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          disabled={isGenerating}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 disabled:opacity-50"
        >
          <option value="ultra-realistic">Ultra Realistic</option>
          <option value="anime-realistic">Anime Ultra Realism</option>
          <option value="afrobeat">Afrobeat Style</option>
          <option value="hip-hop">Hip-Hop Urban</option>
          <option value="gospel">Gospel Cinematic</option>
          <option value="sci-fi">Futuristic Sci-Fi</option>
          <option value="fantasy">Fantasy World</option>
          <option value="live-action">Live Action Simulation</option>
        </select>
      </div>

      {/* Project Summary */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 space-y-2">
        <div className="text-sm font-medium text-gray-300">Project Summary:</div>
        <div className="text-sm text-gray-400 space-y-1">
          <div>🎵 Audio: {projectData.audioFile ? projectData.audioFile.name : 'Not uploaded'}</div>
          <div>📝 Lyrics: {projectData.lyrics?.length || 0} lines</div>
          <div>👤 Character: Customized</div>
          <div>🎬 Scene: Configured</div>
          <div>🎨 Style: {style}</div>
          <div>📺 Quality: {quality}</div>
        </div>
      </div>

      {/* Generate Button */}
      {!isGenerating && !videoUrl && (
        <button
          onClick={generateVideo}
          disabled={!projectData.audioFile}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {projectData.audioFile ? '🎬 Generate Video' : '⚠️ Upload Audio First'}
        </button>
      )}

      {/* Progress Bar */}
      {isGenerating && (
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-center mb-4">
              <div className="text-2xl mb-2">🎬</div>
              <div className="text-lg font-semibold mb-1">{currentStep}</div>
              <div className="text-3xl font-bold text-purple-400">{Math.round(progress)}%</div>
            </div>
            
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-sm text-gray-400 text-center">
            ⏱️ Estimated time remaining: {Math.ceil((100 - progress) / 5)} seconds
          </div>
        </div>
      )}

      {/* Video Preview */}
      {videoUrl && (
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-6 border border-green-800">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-xl font-semibold text-green-400">Video Generated Successfully!</div>
            </div>

            {/* Mock Video Player */}
            <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <div className="text-gray-400">Video Preview</div>
                <div className="text-sm text-gray-500 mt-2">(In production, actual video would play here)</div>
              </div>
            </div>

            {/* Download Options */}
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                ⬇️ Download Video
              </button>
              <button className="px-4 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-medium transition-colors">
                📤 Share to Social
              </button>
            </div>

            <button
              onClick={() => {
                setVideoUrl(null);
                setProgress(0);
                setCurrentStep('');
              }}
              className="w-full mt-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              🔄 Generate New Version
            </button>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-400 bg-gray-900 rounded-lg p-4 border border-gray-800">
        <div className="font-medium mb-2">💡 Generation Info:</div>
        <ul className="space-y-1 list-disc list-inside">
          <li>Higher quality = longer processing time</li>
          <li>4K videos take approximately 5-10 minutes</li>
          <li>You can edit settings and regenerate anytime</li>
          <li>Videos are saved to your project library</li>
        </ul>
      </div>
    </div>
  );
}

