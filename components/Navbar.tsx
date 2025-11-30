import React from 'react';
import { Search, Bell, User as UserIcon, LogOut, Video, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="h-14 bg-dark-card border-b border-black flex items-center px-4 justify-between sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <Video className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden md:block">StreamSync</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-dark-muted">
          <Link to="/" className="hover:text-brand-light transition-colors">Browse</Link>
          <a href="#" className="hover:text-brand-light transition-colors">Following</a>
          <a href="#" className="hover:text-brand-light transition-colors">Music</a>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-black/20 border border-dark-muted/20 rounded-md py-1.5 pl-3 pr-10 text-dark-text focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light transition-all"
          />
          <button className="absolute right-0 top-0 h-full px-2 text-dark-muted hover:bg-dark-hover rounded-r-md">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-1 bg-dark-hover px-2 py-1 rounded-full text-xs font-semibold text-yellow-400 cursor-pointer hover:bg-dark-card border border-transparent hover:border-yellow-400/30 transition-all">
              <Coins className="w-3 h-3" />
              <span>1,200</span>
            </div>
            
            <button className="text-dark-text hover:bg-dark-hover p-1.5 rounded-md relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-dark-card"></span>
            </button>
            
            <div className="relative group">
              <button className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-brand transition-all">
                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-dark-card border border-dark-muted/20 rounded-md shadow-xl py-1 hidden group-hover:block">
                <div className="px-4 py-2 border-b border-dark-muted/10">
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-xs text-dark-muted">Online</p>
                </div>
                <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-dark-hover text-dark-muted hover:text-white">
                  Creator Dashboard
                </Link>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-dark-hover text-dark-muted hover:text-white">
                  Wallet
                </a>
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm hover:bg-dark-hover text-dark-muted hover:text-white flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Button variant="secondary" size="sm" onClick={openAuthModal}>Log In</Button>
            <Button variant="primary" size="sm" onClick={openAuthModal}>Sign Up</Button>
          </>
        )}
        
        <button className="sm:hidden p-2">
          <UserIcon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};