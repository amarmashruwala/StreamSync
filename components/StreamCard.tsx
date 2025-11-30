import React from 'react';
import { Stream } from '../types';
import { Link } from 'react-router-dom';

interface StreamCardProps {
  stream: Stream;
}

export const StreamCard: React.FC<StreamCardProps> = ({ stream }) => {
  return (
    <div className="flex flex-col gap-2 group">
      <div className="relative aspect-video bg-dark-card transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_0_#9146FF]">
        <Link to={`/channel/${stream.user.username}`}>
          <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            LIVE
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
            {stream.viewers.toLocaleString()} viewers
          </div>
        </Link>
      </div>
      
      <div className="flex gap-3">
        <img src={stream.user.avatar} alt={stream.user.username} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        <div className="flex flex-col min-w-0">
          <Link to={`/channel/${stream.user.username}`} className="font-bold text-sm truncate hover:text-brand transition-colors">
            {stream.title}
          </Link>
          <Link to={`/channel/${stream.user.username}`} className="text-xs text-dark-muted hover:text-dark-text transition-colors">
            {stream.user.username}
          </Link>
          <a href="#" className="text-xs text-dark-muted hover:text-brand transition-colors truncate">
            {stream.game}
          </a>
          <div className="flex flex-wrap gap-1 mt-1">
            {stream.tags.map(tag => (
              <span key={tag} className="bg-dark-hover px-1.5 py-0.5 rounded-full text-[10px] text-dark-muted hover:bg-dark-muted hover:text-dark-bg cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};