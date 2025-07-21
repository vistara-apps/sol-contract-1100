import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Plus, ExternalLink, Calendar, DollarSign, User, Building } from 'lucide-react';

const Dashboard = () => {
  const { connected, contracts, user } = useAppContext();

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'status-draft';
      case 'deployed': return 'status-deployed';
      case 'completed': return 'status-completed';
      case 'disputed': return 'status-disputed';
      default: return 'status-draft';
    }
  };

  const getTotalEarnings = () => {
    return contracts
      .filter(contract => contract.status === 'completed')
      .reduce((total, contract) => total + contract.terms.totalAmount, 0);
  };

  const getActiveContracts = () => {
    return contracts.filter(contract => 
      contract.status === 'deployed' || contract.status === 'draft'
    ).length;
  };

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-600 mb-4">Please connect your Solana wallet to view your dashboard.</p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Demo Contracts</h3>
            <p className="text-gray-600 mb-4">Here's what your dashboard would look like:</p>
            <div className="space-y-4">
              <div className="contract-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">Social Media Campaign</h4>
                    <p className="text-sm text-gray-600">Brand Partnership Q1</p>
                  </div>
                  <span className="status-badge status-deployed">Deployed</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>5,000 USDC</span>
                  <span>2 milestones</span>
                </div>
              </div>
              <div className="contract-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">Product Review Video</h4>
                    <p className="text-sm text-gray-600">Tech Product Launch</p>
                  </div>
                  <span className="status-badge status-completed">Completed</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>3,000 SOL</span>
                  <span>1 milestone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/80">
            Welcome back, {user?.companyName || 'Creator'}
          </p>
        </div>
        
        <Link to="/builder" className="btn-primary mt-4 md:mt-0">
          <Plus className="w-4 h-4" />
          Create New Contract
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">
                {getTotalEarnings().toLocaleString()} USDC
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Contracts</p>
              <p className="text-2xl font-bold text-gray-900">{getActiveContracts()}</p>
            </div>
            <Building className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Contracts</p>
              <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
            </div>
            <User className="w-10 h-10 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Contracts List */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Contracts</h2>
          <select className="form-select w-auto">
            <option value="all">All Contracts</option>
            <option value="draft">Draft</option>
            <option value="deployed">Deployed</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {contracts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No contracts yet</p>
            <Link to="/builder" className="btn-primary">
              Create Your First Contract
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.contractId} className="contract-card">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{contract.terms.title}</h3>
                      <span className={`status-badge ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {contract.terms.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {contract.terms.totalAmount.toLocaleString()} {contract.terms.currency}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(contract.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {contract.terms.deliverables.length} deliverables
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Link
                      to={`/contract/${contract.contractId}`}
                      className="btn-secondary"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Payment Progress */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Payment Progress</span>
                    <span className="text-sm text-gray-500">
                      {contract.paymentMilestones.filter(m => m.completed).length} / {contract.paymentMilestones.length} milestones
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(contract.paymentMilestones.filter(m => m.completed).length / contract.paymentMilestones.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;