import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Clock, CheckCircle, AlertTriangle, DollarSign, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Dashboard = ({ onBack, isWalletConnected, walletAddress }) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setContracts([
        {
          id: 'SOL123abc',
          title: 'Brand Partnership Q1 2024',
          brand: 'TechCorp',
          creator: 'John Creator',
          totalAmount: 15.5,
          status: 'active',
          progress: 2,
          totalMilestones: 4,
          nextPayment: 3.75,
          nextDeadline: '2024-02-15',
          created_at: '2024-01-10'
        },
        {
          id: 'SOL456def',
          title: 'Social Media Campaign',
          brand: 'FashionBrand',
          creator: 'Jane Influencer',
          totalAmount: 8.2,
          status: 'completed',
          progress: 3,
          totalMilestones: 3,
          nextPayment: 0,
          nextDeadline: null,
          created_at: '2024-01-05'
        },
        {
          id: 'SOL789ghi',
          title: 'Product Review Series',
          brand: 'GadgetCo',
          creator: 'Tech Reviewer',
          totalAmount: 12.0,
          status: 'pending',
          progress: 0,
          totalMilestones: 5,
          nextPayment: 2.4,
          nextDeadline: '2024-02-20',
          created_at: '2024-01-15'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-solana-green';
      case 'completed': return 'text-blue-400';
      case 'pending': return 'text-yellow-400';
      case 'disputed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return Clock;
      case 'completed': return CheckCircle;
      case 'pending': return AlertTriangle;
      case 'disputed': return AlertTriangle;
      default: return FileText;
    }
  };

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </button>
            </div>

            <div className="glass-effect rounded-xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-gray-400 mb-6">
                Please connect your Solana wallet to view your contract dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Dashboard</h1>
            <p className="text-gray-400">
              Connected: <span className="text-solana-green font-mono">{walletAddress}</span>
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <FileText className="h-5 w-5 text-solana-purple" />
                <span className="text-sm text-gray-400">Total Contracts</span>
              </div>
              <div className="text-2xl font-bold">{contracts.length}</div>
            </div>

            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign className="h-5 w-5 text-solana-green" />
                <span className="text-sm text-gray-400">Total Value</span>
              </div>
              <div className="text-2xl font-bold">
                {contracts.reduce((sum, contract) => sum + contract.totalAmount, 0).toFixed(1)} SOL
              </div>
            </div>

            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-gray-400">Active Contracts</span>
              </div>
              <div className="text-2xl font-bold">
                {contracts.filter(c => c.status === 'active').length}
              </div>
            </div>

            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-400">Completed</span>
              </div>
              <div className="text-2xl font-bold">
                {contracts.filter(c => c.status === 'completed').length}
              </div>
            </div>
          </div>

          {/* Contracts List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Contracts</h2>
            
            {loading ? (
              <div className="glass-effect rounded-xl p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-solana-purple border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-400">Loading contracts...</p>
              </div>
            ) : contracts.length === 0 ? (
              <div className="glass-effect rounded-xl p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No contracts found</h3>
                <p className="text-gray-400">Create your first contract to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contracts.map((contract) => {
                  const StatusIcon = getStatusIcon(contract.status);
                  return (
                    <div key={contract.id} className="glass-effect rounded-xl p-6 card-hover">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{contract.title}</h3>
                          <p className="text-gray-400 text-sm">Contract ID: {contract.id}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <StatusIcon className={`h-5 w-5 ${getStatusColor(contract.status)}`} />
                          <span className={`capitalize ${getStatusColor(contract.status)}`}>
                            {contract.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-400">Brand</span>
                          <p className="font-medium">{contract.brand}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">Creator</span>
                          <p className="font-medium">{contract.creator}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">Total Value</span>
                          <p className="font-medium text-solana-green">{contract.totalAmount} SOL</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">Progress</span>
                          <p className="font-medium">{contract.progress}/{contract.totalMilestones} milestones</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-solana-purple to-solana-green h-2 rounded-full"
                            style={{ width: `${(contract.progress / contract.totalMilestones) * 100}%` }}
                          />
                        </div>
                      </div>

                      {contract.nextPayment > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-solana-green" />
                            <span>Next payment: <strong>{contract.nextPayment} SOL</strong></span>
                          </div>
                          {contract.nextDeadline && (
                            <div className="flex items-center space-x-2 text-gray-400">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {new Date(contract.nextDeadline).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;