import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Activity, Users, DollarSign, Clock, Radio, Copy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MOCK_ANALYTICS = [
  { time: '10:00', viewers: 1200 },
  { time: '10:10', viewers: 1350 },
  { time: '10:20', viewers: 1280 },
  { time: '10:30', viewers: 1500 },
  { time: '10:40', viewers: 1800 },
  { time: '10:50', viewers: 1750 },
  { time: '11:00', viewers: 2100 },
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user || !user.isStreamer) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] text-dark-muted">
        <h2 className="text-xl font-bold mb-2">Restricted Area</h2>
        <p>You must be logged in as a streamer to view this page.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
           <h1 className="text-2xl font-bold">Creator Dashboard</h1>
           <p className="text-dark-muted">Manage your stream and view analytics</p>
        </div>
        <div className="flex gap-3">
           <Button variant="secondary">Edit Stream Info</Button>
           <Button variant="danger" className="flex items-center gap-2 animate-pulse">
              <Radio className="w-4 h-4" /> Go Live
           </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dark-card p-4 rounded-lg border border-dark-muted/10">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-dark-muted text-xs uppercase font-bold">Avg. Viewers</p>
                 <h3 className="text-2xl font-bold mt-1">1,542</h3>
              </div>
              <Users className="text-brand w-5 h-5" />
           </div>
           <p className="text-green-500 text-xs mt-2">▲ 12% vs last stream</p>
        </div>
        
        <div className="bg-dark-card p-4 rounded-lg border border-dark-muted/10">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-dark-muted text-xs uppercase font-bold">Revenue (Est.)</p>
                 <h3 className="text-2xl font-bold mt-1">$420.50</h3>
              </div>
              <DollarSign className="text-brand w-5 h-5" />
           </div>
           <p className="text-green-500 text-xs mt-2">▲ 5% vs last stream</p>
        </div>

        <div className="bg-dark-card p-4 rounded-lg border border-dark-muted/10">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-dark-muted text-xs uppercase font-bold">New Followers</p>
                 <h3 className="text-2xl font-bold mt-1">+128</h3>
              </div>
              <Activity className="text-brand w-5 h-5" />
           </div>
        </div>

        <div className="bg-dark-card p-4 rounded-lg border border-dark-muted/10">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-dark-muted text-xs uppercase font-bold">Time Streamed</p>
                 <h3 className="text-2xl font-bold mt-1">2h 14m</h3>
              </div>
              <Clock className="text-brand w-5 h-5" />
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Analytics Chart */}
         <div className="lg:col-span-2 bg-dark-card p-6 rounded-lg border border-dark-muted/10 h-[400px]">
            <h3 className="font-bold mb-4">Live Viewers</h3>
            <ResponsiveContainer width="100%" height="90%">
               <LineChart data={MOCK_ANALYTICS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#18181b', borderColor: '#333' }}
                     itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="viewers" stroke="#9146FF" strokeWidth={3} dot={false} />
               </LineChart>
            </ResponsiveContainer>
         </div>

         {/* Stream Configuration */}
         <div className="space-y-6">
            <div className="bg-dark-card p-6 rounded-lg border border-dark-muted/10">
               <h3 className="font-bold mb-4">Stream Settings (OvenMediaEngine)</h3>
               
               <div className="space-y-4">
                  <div>
                     <label className="block text-xs font-bold text-dark-muted uppercase mb-1">Ingest Server</label>
                     <div className="flex gap-2">
                        <input type="text" readOnly value="rtmp://ingest.streamsync.app/app" className="flex-1 bg-black/30 border border-dark-muted/20 rounded px-3 py-2 text-sm text-dark-muted" />
                        <Button variant="secondary" size="sm" className="px-2"><Copy className="w-4 h-4" /></Button>
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-dark-muted uppercase mb-1">Stream Key</label>
                     <div className="flex gap-2">
                        <input type="password" readOnly value="live_534253425_SecretKeyXYZ" className="flex-1 bg-black/30 border border-dark-muted/20 rounded px-3 py-2 text-sm text-dark-muted" />
                        <Button variant="secondary" size="sm" className="px-2"><Copy className="w-4 h-4" /></Button>
                     </div>
                     <p className="text-[10px] text-dark-muted mt-1">Never share your stream key with anyone.</p>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-dark-muted uppercase mb-1">Latency Mode</label>
                     <select className="w-full bg-black/30 border border-dark-muted/20 rounded px-3 py-2 text-sm focus:border-brand focus:outline-none">
                        <option>Low Latency (LL-HLS) - Recommended</option>
                        <option>Ultra Low Latency (WebRTC)</option>
                        <option>Normal Latency</option>
                     </select>
                  </div>
               </div>
            </div>

            <div className="bg-dark-card p-6 rounded-lg border border-dark-muted/10">
               <h3 className="font-bold mb-4">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" size="sm">Run Ad (60s)</Button>
                  <Button variant="secondary" size="sm">Clip That</Button>
                  <Button variant="secondary" size="sm">Clear Chat</Button>
                  <Button variant="secondary" size="sm">Emote Only</Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};