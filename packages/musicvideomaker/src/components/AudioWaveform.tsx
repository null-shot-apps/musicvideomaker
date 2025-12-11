'use client';

import { useEffect, useRef, useState } from 'react';

interface AudioWaveformProps {
  audioFile: File | null;
}

export default function AudioWaveform({ audioFile }: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!audioFile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create audio element
    const audio = new Audio(URL.createObjectURL(audioFile));
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    // Create audio context for visualization
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = 'rgb(15, 23, 42)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(168, 85, 247)';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audio.pause();
      audioContext.close();
    };
  }, [audioFile]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!audioFile) {
    return (
      <div className="w-full h-48 bg-slate-900 rounded-lg flex items-center justify-center">
        <p className="text-slate-400">Upload audio to see waveform</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="w-full h-48 bg-slate-900 rounded-lg"
      />
      
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlayPause}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        
        <div className="flex-1">
          <div className="text-sm text-slate-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}



