import React from 'react';
import { Heart, Video } from 'lucide-react';
import { MOCK_STREAMS } from '../constants';
import { Link } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-16 md:w-60 bg-dark-card border-r border-black h-[calc(100vh-3.5rem)] overflow-y-auto flex-shrink-0 sticky top-14 hidden sm:block">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <h2 className="font-semibold text-xs md:text-sm uppercase text-dark-muted hidden md:block">Recommended Channels</h2>
          <Video className="w-5 h-5 md:hidden mx-auto" />
        </div>
        
        <div className="space-y-1">
          {MOCK_STREAMS.map((stream) => (
            <Link key={stream.id} to={`/channel/${stream.user.username}`} className="flex items-center gap-3 p-2 hover:bg-dark-hover rounded-md group transition-colors">
              <div className="relative flex-shrink-0">
                <img src={stream.user.avatar} alt={stream.user.username} className="w-8 h-8 rounded-full object-cover" />
                {stream.isLive && (
                  <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded-sm border border-dark-card md:hidden">LIVE</span>
                )}
              </div>
              <div className="hidden md:block flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm truncate">{stream.user.username}</p>
                </div>
                <p className="text-xs text-dark-muted truncate">{stream.game}</p>
              </div>
              <div className="hidden md:flex items-center gap-1 text-xs text-dark-muted">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>{(stream.viewers / 1000).toFixed(1)}k</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

       <div className="p-3 border-t border-dark-muted/10">
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <h2 className="font-semibold text-xs md:text-sm uppercase text-dark-muted hidden md:block">Followed Channels</h2>
          <Heart className="w-5 h-5 md:hidden mx-auto" />
        </div>
        {/* Mock followed list same as recommended for demo */}
         <div className="space-y-1">
          {MOCK_STREAMS.slice(0, 2).map((stream) => (
            <Link key={`followed-${stream.id}`} to={`/channel/${stream.user.username}`} className="flex items-center gap-3 p-2 hover:bg-dark-hover rounded-md group transition-colors">
              <div className="relative flex-shrink-0">
                <img src={stream.user.avatar} alt={stream.user.username} className="w-8 h-8 rounded-full object-cover grayscale opacity-70" />
              </div>
              <div className="hidden md:block flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm truncate text-dark-muted">{stream.user.username}</p>
                </div>
                <p className="text-xs text-dark-muted truncate">Offline</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};