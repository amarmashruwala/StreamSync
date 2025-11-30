import React from 'react';
import { MOCK_STREAMS, CATEGORIES } from '../constants';
import { StreamCard } from '../components/StreamCard';
import { VideoPlayer } from '../components/VideoPlayer';

export const Home: React.FC = () => {
  const featuredStream = MOCK_STREAMS[0];

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      {/* Hero Carousel Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] h-auto lg:h-[400px] gap-0 bg-dark-card border border-black overflow-hidden relative group">
        <div className="h-[250px] lg:h-full relative">
           <VideoPlayer poster={featuredStream.thumbnail} />
        </div>
        <div className="p-4 flex flex-col justify-between bg-dark-card relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src={featuredStream.user.avatar} className="w-10 h-10 rounded-full" />
              <div>
                 <div className="text-brand text-sm font-semibold">{featuredStream.user.username}</div>
                 <div className="text-brand-light text-xs">Playing {featuredStream.game}</div>
              </div>
            </div>
            <p className="text-sm text-dark-text line-clamp-3 mb-4">{featuredStream.title}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {featuredStream.tags.map(tag => (
                <span key={tag} className="bg-dark-hover px-2 py-1 text-xs rounded-full text-dark-muted">{tag}</span>
              ))}
            </div>
          </div>
          <div className="text-xs text-dark-muted">
             Typically streams for 4 hours
          </div>
        </div>
      </div>

      {/* Categories */}
      <section>
         <h2 className="text-lg font-bold mb-4 text-brand-light">Categories we think you'll like</h2>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => (
               <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden mb-2 bg-dark-hover relative transform transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                     <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors"></div>
                  </div>
                  <h3 className="font-semibold text-sm truncate group-hover:text-brand">{cat.name}</h3>
                  <p className="text-xs text-dark-muted">128K viewers</p>
               </div>
            ))}
         </div>
      </section>

      {/* Live Channels */}
      <section>
        <h2 className="text-lg font-bold mb-4">Live Channels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_STREAMS.map(stream => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
          {/* Duplicate for grid density */}
          {MOCK_STREAMS.map(stream => (
            <StreamCard key={`${stream.id}-copy`} stream={{...stream, id: `${stream.id}-copy`}} />
          ))}
        </div>
      </section>
    </div>
  );
};