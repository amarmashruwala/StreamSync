import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer';
import { Chat } from '../components/Chat';
import { MOCK_STREAMS } from '../constants';
import { Button } from '../components/Button';
import { Share2, MoreVertical, Heart, Star, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Channel: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const stream = MOCK_STREAMS.find(s => s.user.username === username) || MOCK_STREAMS[0];
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuth();
  
  const [showSubModal, setShowSubModal] = useState(false);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Main Content (Player + Info) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="bg-black w-full shadow-lg">
           {/* Player Container */}
           <div className="aspect-video w-full max-h-[calc(100vh-160px)] mx-auto">
             <VideoPlayer poster={stream.thumbnail} />
           </div>
        </div>

        {/* Stream Info Bar */}
        <div className="p-4 border-b border-dark-card/50">
           <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 min-w-0">
                 <div className="relative">
                    <img src={stream.user.avatar} className="w-16 h-16 rounded-full ring-2 ring-brand ring-offset-2 ring-offset-dark-bg" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-1.5 rounded uppercase">Live</div>
                 </div>
                 <div className="flex flex-col min-w-0">
                    <h1 className="text-lg font-bold truncate">{stream.title}</h1>
                    <div className="flex items-center gap-2 text-dark-muted text-sm">
                       <span className="text-brand font-medium hover:underline cursor-pointer">{stream.user.username}</span>
                       <span>•</span>
                       <span className="text-brand-light hover:underline cursor-pointer">{stream.game}</span>
                       <span>•</span>
                       <div className="flex gap-1">
                          {stream.tags.map(tag => (
                             <span key={tag} className="bg-dark-hover px-1.5 rounded-full text-xs text-dark-muted">{tag}</span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                 <Button 
                   variant={isFollowing ? 'secondary' : 'primary'} 
                   className="flex items-center gap-2"
                   onClick={() => setIsFollowing(!isFollowing)}
                 >
                    <Heart className={`w-4 h-4 ${isFollowing ? 'fill-brand text-brand' : ''}`} />
                    {isFollowing ? 'Following' : 'Follow'}
                 </Button>
                 <Button variant="secondary" className="flex items-center gap-2" onClick={() => setShowSubModal(true)}>
                    <Star className="w-4 h-4 text-white" />
                    Subscribe
                 </Button>
                 <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="px-2"><Share2 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="px-2"><AlertTriangle className="w-4 h-4" /></Button>
                 </div>
              </div>
           </div>
        </div>

        {/* About Panel Mock */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
           <div className="lg:col-span-2 space-y-4">
               <div className="bg-dark-card p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">About {stream.user.username}</h3>
                  <p className="text-dark-muted text-sm leading-relaxed">
                     Hey! I'm a full stack developer who loves React, TypeScript, and open source. 
                     Join me as we build cool stuff together. Schedule is mostly random but usually evenings EST.
                     <br/><br/>
                     PC Specs:<br/>
                     CPU: Ryzen 9 5950X<br/>
                     GPU: RTX 3080<br/>
                     RAM: 64GB
                  </p>
               </div>
           </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <Chat />

      {/* Subscription Modal */}
      {showSubModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-card w-full max-w-md rounded-lg shadow-2xl border border-brand/50 overflow-hidden">
             <div className="bg-brand p-4 text-white flex justify-between items-center">
                <h2 className="font-bold text-lg">Subscribe to {stream.user.username}</h2>
                <button onClick={() => setShowSubModal(false)} className="hover:bg-white/20 p-1 rounded">✕</button>
             </div>
             <div className="p-6 space-y-4">
                <div className="text-center mb-6">
                   <p className="text-dark-muted mb-2">Support the stream and get exclusive perks!</p>
                   <div className="flex justify-center gap-2 text-sm font-semibold">
                      <span className="bg-brand/20 text-brand-light px-2 py-1 rounded">Ad-free viewing</span>
                      <span className="bg-brand/20 text-brand-light px-2 py-1 rounded">Custom emotes</span>
                      <span className="bg-brand/20 text-brand-light px-2 py-1 rounded">Chat badge</span>
                   </div>
                </div>
                
                <div className="space-y-3">
                   <button className="w-full flex justify-between items-center p-4 border border-brand rounded-md bg-brand/10 hover:bg-brand/20 transition-colors">
                      <span className="font-bold">Tier 1</span>
                      <span className="font-mono">$4.99 / mo</span>
                   </button>
                   <button className="w-full flex justify-between items-center p-4 border border-dark-muted/20 rounded-md hover:bg-dark-hover transition-colors opacity-75">
                      <span className="font-bold">Tier 2</span>
                      <span className="font-mono">$9.99 / mo</span>
                   </button>
                   <button className="w-full flex justify-between items-center p-4 border border-dark-muted/20 rounded-md hover:bg-dark-hover transition-colors opacity-75">
                      <span className="font-bold">Tier 3</span>
                      <span className="font-mono">$24.99 / mo</span>
                   </button>
                </div>
                
                <p className="text-xs text-dark-muted text-center pt-2">
                   Cancel anytime. Secure payment via Stripe.
                </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};