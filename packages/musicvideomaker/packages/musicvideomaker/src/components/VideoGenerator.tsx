'use client';

import { useState } from 'react';

type GenerationStatus = 'idle' | 'processing' | 'completed' | 'error';

interface GenerationStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
}

export default function VideoGenerator() {
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [steps, setSteps] = useState<GenerationStep[]>([
    { id: '1', name: 'Analyzing audio and lyrics', status: 'pending', progress: 0 },
    { id: '2', name: 'Generating 3D character models', status: 'pending', progress: 0 },
    { id: '3', name: 'Creating environment and scenes', status: 'pending', progress: 0 },
    { id: '4', name: 'Syncing lip movements to vocals', status: 'pending', progress: 0 },
    { id: '5', name: 'Applying camera movements', status: 'pending', progress: 0 },
    { id: '6', name: 'Rendering video in 4K', status: 'pending', progress: 0 },
    { id: '7', name: 'Finalizing and exporting', status: 'pending', progress: 0 }
  ]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const startGeneration = () => {
    setStatus('processing');
    
    // Simulate generation process
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setSteps(prev => prev.map((step, index) => {
          if (index === currentStep) {
            return { ...step, status: 'processing', progress: 50 };
          } else if (index < currentStep) {
            return { ...step, status: 'completed', progress: 100 };
          }
          return step;
        }));

        setTimeout(() => {
          setSteps(prev => prev.map((step, index) => {
            if (index === currentStep) {
              return { ...step, status: 'completed', progress: 100 };
            }
            return step;
          }));
          currentStep++;
          
          if (currentStep >= steps.length) {
            clearInterval(interval);
            setStatus('completed');
            setVideoUrl('/demo-video.mp4'); // Placeholder
          }
        }, 2000);
      }
    }, 3000);
  };

  const downloadVideo = () => {
    // Create a download link for the video
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `music-video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      alert('Download started! Your video will be saved to your downloads folder.');
    } else {
      alert('Video not ready yet. Please wait for generation to complete.');
    }
  };

  const shareVideo = (platform: string) => {
    alert(`Sharing to ${platform}... (Demo mode)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Video Generation</h3>
        {status === 'idle' && (
          <button
            onClick={startGeneration}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition-all"
          >
            🎬 Generate Video
          </button>
        )}
      </div>

      {/* Generation Progress */}
      {status !== 'idle' && (
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step.status === 'completed' ? 'bg-green-600' :
                    step.status === 'processing' ? 'bg-purple-600 animate-pulse' :
                    'bg-slate-700'
                  }`}>
                    {step.status === 'completed' ? '✓' : index + 1}
                  </div>
                  <span className={`font-semibold ${
                    step.status === 'processing' ? 'text-purple-400' : ''
                  }`}>
                    {step.name}
                  </span>
                </div>
                <span className="text-sm text-slate-400">{step.progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    step.status === 'completed' ? 'bg-green-600' :
                    step.status === 'processing' ? 'bg-purple-600' :
                    'bg-slate-600'
                  }`}
                  style={{ width: `${step.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed State */}
      {status === 'completed' && (
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">✅</div>
              <div>
                <h4 className="font-bold text-lg">Video Generated Successfully!</h4>
                <p className="text-sm text-slate-400">Your ultra-realistic 3D music video is ready</p>
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <div className="aspect-video bg-slate-800 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-slate-400">Video Preview</p>
                <p className="text-sm text-slate-500">4K Ultra HD • 3:45 duration</p>
              </div>
            </div>
          </div>

          {/* Download & Share Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={downloadVideo}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
            >
              <span className="text-xl">⬇️</span>
              <span>Download Video</span>
            </button>
            <button
              onClick={() => shareVideo('YouTube')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">📺</span>
              <span>Share to YouTube</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => shareVideo('TikTok')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors"
            >
              TikTok
            </button>
            <button
              onClick={() => shareVideo('Instagram')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors"
            >
              Instagram
            </button>
            <button
              onClick={() => shareVideo('Twitter')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors"
            >
              Twitter
            </button>
          </div>

          {/* Video Details */}
          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Video Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Resolution</p>
                <p className="font-semibold">3840 x 2160 (4K)</p>
              </div>
              <div>
                <p className="text-slate-400">Frame Rate</p>
                <p className="font-semibold">60 FPS</p>
              </div>
              <div>
                <p className="text-slate-400">Duration</p>
                <p className="font-semibold">3:45</p>
              </div>
              <div>
                <p className="text-slate-400">File Size</p>
                <p className="font-semibold">487 MB</p>
              </div>
            </div>
          </div>

          {/* Download Format Options */}
          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-3">Download Options</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={downloadVideo}
                className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors text-left"
              >
                <div className="font-semibold">4K Ultra HD</div>
                <div className="text-xs text-slate-400">3840x2160 • 487 MB</div>
              </button>
              <button
                onClick={downloadVideo}
                className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors text-left"
              >
                <div className="font-semibold">1080p Full HD</div>
                <div className="text-xs text-slate-400">1920x1080 • 156 MB</div>
              </button>
              <button
                onClick={downloadVideo}
                className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors text-left"
              >
                <div className="font-semibold">720p HD</div>
                <div className="text-xs text-slate-400">1280x720 • 89 MB</div>
              </button>
              <button
                onClick={downloadVideo}
                className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors text-left"
              >
                <div className="font-semibold">Mobile Optimized</div>
                <div className="text-xs text-slate-400">720x1280 • 67 MB</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      {status === 'idle' && (
        <div className="p-4 bg-slate-800 rounded-lg">
          <h4 className="font-semibold mb-2">Generation Settings</h4>
          <div className="text-sm text-slate-400 space-y-1">
            <p>• Resolution: 4K (3840 x 2160)</p>
            <p>• Frame Rate: 60 FPS</p>
            <p>• Rendering Engine: Ultra-Realistic 3D</p>
            <p>• Estimated Time: 5-10 minutes</p>
            <p>• AI Models: Character Gen, Lip Sync, Scene Builder</p>
          </div>
        </div>
      )}
    </div>
  );
}

