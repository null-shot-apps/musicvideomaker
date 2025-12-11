'use client';

import { useEffect, useRef, useState } from 'react';

interface AudioWaveformProps {
  audioFile: File | null;
  onAnalysisComplete?: (data: { bpm: number; duration: number; peaks: number[] }) => void;
}

export default function AudioWaveform({ audioFile, onAnalysisComplete }: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioData, setAudioData] = useState<{ bpm: number; duration: number } | null>(null);

  useEffect(() => {
    if (!audioFile || !canvasRef.current) return;

    const analyzeAudio = async () => {
      setIsAnalyzing(true);
      const audioContext = new AudioContext();
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Get audio data
      const rawData = audioBuffer.getChannelData(0);
      const samples = 500;
      const blockSize = Math.floor(rawData.length / samples);
      const filteredData = [];

      for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(rawData[blockStart + j]);
        }
        filteredData.push(sum / blockSize);
      }

      // Normalize data
      const multiplier = Math.max(...filteredData) ** -1;
      const normalizedData = filteredData.map(n => n * multiplier);

      // Draw waveform
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / samples;

      ctx.clearRect(0, 0, width, height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#a855f7');
      gradient.addColorStop(0.5, '#ec4899');
      gradient.addColorStop(1, '#f97316');

      normalizedData.forEach((value, index) => {
        const barHeight = value * height * 0.8;
        const x = barWidth * index;
        const y = (height - barHeight) / 2;

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 1, barHeight);
      });

      // Simple BPM estimation (mock for now)
      const bpm = Math.floor(Math.random() * 60) + 100; // 100-160 BPM
      const duration = audioBuffer.duration;

      setAudioData({ bpm, duration });
      setIsAnalyzing(false);

      if (onAnalysisComplete) {
        onAnalysisComplete({ bpm, duration, peaks: normalizedData });
      }
    };

    analyzeAudio();
  }, [audioFile, onAnalysisComplete]);

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <canvas
          ref={canvasRef}
          width={800}
          height={150}
          className="w-full h-32 rounded"
        />
      </div>

      {isAnalyzing && (
        <div className="text-center text-gray-400">
          <div className="animate-pulse">Analyzing audio...</div>
        </div>
      )}

      {audioData && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400">Detected BPM</div>
            <div className="text-2xl font-bold text-purple-400">{audioData.bpm}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400">Duration</div>
            <div className="text-2xl font-bold text-pink-400">
              {Math.floor(audioData.duration / 60)}:{String(Math.floor(audioData.duration % 60)).padStart(2, '0')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

