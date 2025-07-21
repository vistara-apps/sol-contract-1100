import React, { useState } from 'react';
import { X, Wallet, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MockWalletConnect = ({ isConnected, walletAddress, onConnect, onDisconnect, onClose }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const walletOptions = [
    {
      name: 'Phantom',
      icon: '👻',
      description: 'Popular Solana wallet with DeFi support'
    },
    {
      name: 'Solflare',
      icon: '🔥',
      description: 'Multi-platform Solana wallet'
    },
    {
      name: 'Backpack',
      icon: '🎒',
      description: 'Next-gen crypto wallet'
    }
  ];

  const handleConnect = (wallet) => {
    const mockAddress = `Sol${Math.random().toString(36).substr(2, 9)}...${Math.random().toString(36).substr(2, 4)}`;
    onConnect(mockAddress);
    toast.success(`Connected to ${wallet.name}!`);
    onClose();
  };

  const handleDisconnect = () => {
    onDisconnect();
    toast.success('Wallet disconnected');
    onClose();
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success('Address copied to clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass-effect rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {isConnected ? 'Solana Wallet' : 'Connect Solana Wallet'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            <div className="glass-effect rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-solana-purple rounded-full flex items-center justify-center">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Connected Wallet</p>
                  <p className="text-sm text-gray-400">Phantom Wallet</p>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-gray-300">{walletAddress}</code>
                  <button
                    onClick={copyAddress}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Balance</span>
              <span className="text-solana-green font-semibold">12.34 SOL</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Network</span>
              <span>Solana Devnet</span>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => toast.success('Opening Solscan...')}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View on Solscan</span>
              </button>
              
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400 mb-4">
              Choose a wallet to connect to SolContract for creating and managing smart contracts.
            </p>

            {walletOptions.map((wallet, index) => (
              <button
                key={index}
                onClick={() => handleConnect(wallet)}
                className="w-full p-4 glass-effect rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{wallet.icon}</div>
                  <div>
                    <p className="font-medium">{wallet.name}</p>
                    <p className="text-sm text-gray-400">{wallet.description}</p>
                  </div>
                </div>
              </button>
            ))}

            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
              <p className="text-sm text-yellow-200">
                🚀 <strong>Demo Mode:</strong> This is a simulated Solana wallet connection for demonstration purposes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockWalletConnect;