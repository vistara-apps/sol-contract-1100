import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ContactRound, Home, Plus, BarChart3, Wallet, LogOut } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { connected, walletAddress, connectWallet, disconnectWallet } = useAppContext();
  const [connecting, setConnecting] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleWalletAction = async () => {
    if (connected) {
      disconnectWallet();
    } else {
      setConnecting(true);
      try {
        await connectWallet();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      } finally {
        setConnecting(false);
      }
    }
  };

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ContactRound className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">SolContract</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/builder"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/builder') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Create Contract</span>
            </Link>
            
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center">
            <button
              onClick={handleWalletAction}
              disabled={connecting}
              className={`wallet-btn ${connected ? 'connected' : ''}`}
            >
              {connecting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Connecting...
                </>
              ) : connected ? (
                <>
                  <Wallet className="w-4 h-4" />
                  {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                  <LogOut className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden pb-4">
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/builder"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/builder') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </Link>
            
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
