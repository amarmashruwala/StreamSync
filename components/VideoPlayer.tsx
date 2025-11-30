import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Cast } from 'lucide-react';

interface VideoPlayerProps {
  poster: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ poster }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  return (
    <div 
      className="relative w-full aspect-video bg-black group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Mock Video Content */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* In a real scenario, this would be <div id="ovenplayer" /> */}
        <img src={poster} alt="Stream Poster" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
        
        {/* Simulate "Live" indicator burned into player */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded animate-pulse">
          LIVE
        </div>
      </div>

      {/* Controls Overlay */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-200 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-brand transition-colors">
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>
            
            <div className="flex items-center gap-2 group/volume relative">
              <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-brand transition-colors">
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300">
                <input type="range" className="w-20 h-1 bg-white/50 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-white text-sm font-medium">
               <span className="bg-red-600 px-1.5 rounded text-xs font-bold">LIVE</span>
               <span>02:14:50</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="text-white hover:text-brand transition-colors" title="Quality: 1080p60 (Source)">
               <Settings className="w-5 h-5" />
             </button>
             <button className="text-white hover:text-brand transition-colors">
               <Cast className="w-5 h-5" />
             </button>
             <button className="text-white hover:text-brand transition-colors">
               <Maximize className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};