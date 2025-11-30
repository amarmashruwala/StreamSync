import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative bg-dark-bg scroll-smooth">
          {children}
        </main>
      </div>

      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
           <div className="bg-dark-card w-full max-w-md rounded-lg shadow-2xl border border-dark-muted/20 flex flex-col overflow-hidden relative">
              <button onClick={closeAuthModal} className="absolute top-4 right-4 text-dark-muted hover:text-white">
                 <X className="w-6 h-6" />
              </button>
              
              <div className="p-8 pb-4 text-center">
                 <h2 className="text-2xl font-bold mb-2">{isLoginView ? 'Log In' : 'Join StreamSync'}</h2>
                 <p className="text-sm text-dark-muted">
                   {isLoginView ? 'Welcome back! Ready to stream?' : 'Create an account to start watching and chatting.'}
                 </p>
              </div>

              <div className="p-8 pt-2 space-y-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-dark-muted">Username</label>
                    <input type="text" className="w-full bg-black/30 border border-dark-muted/30 rounded px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-dark-muted">Password</label>
                    <input type="password" className="w-full bg-black/30 border border-dark-muted/30 rounded px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                 </div>

                 {!isLoginView && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-dark-muted">Email</label>
                      <input type="email" className="w-full bg-black/30 border border-dark-muted/30 rounded px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                    </div>
                 )}

                 <Button className="w-full mt-4" onClick={login}>
                    {isLoginView ? 'Log In' : 'Sign Up'}
                 </Button>

                 <div className="text-center text-xs text-dark-muted mt-4">
                    {isLoginView ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLoginView(!isLoginView)} className="text-brand hover:underline ml-1 font-bold">
                       {isLoginView ? 'Sign up' : 'Log in'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};