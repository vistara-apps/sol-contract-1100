import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Notification from '../components/Notification';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Calendar,
  AlertCircle,
  ExternalLink,
  Copy,
  Rocket
} from 'lucide-react';

const ContractDetails = () => {
  const { id } = useParams();
  const { contracts, deployContract, completeContract } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState('');
  const [notification, setNotification] = useState(null);

  const contract = contracts.find(c => c.contractId === id);

  if (!contract) {
    return <Navigate to="/dashboard" replace />;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'status-draft';
      case 'deployed': return 'status-deployed';
      case 'completed': return 'status-completed';
      case 'disputed': return 'status-disputed';
      default: return 'status-draft';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'deployed': return Rocket;
      case 'disputed': return AlertCircle;
      default: return Clock;
    }
  };

  const handleDeploy = async () => {
    setLoading(true);
    try {
      await deployContract(contract.contractId);
      setNotification({
        type: 'success',
        message: 'Contract deployed successfully to Solana blockchain!'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to deploy contract. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    completeContract(contract.contractId);
    setNotification({
      type: 'success',
      message: 'Contract marked as completed!'
    });
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(label);
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const completedMilestones = contract.paymentMilestones.filter(m => m.completed).length;
  const progressPercentage = (completedMilestones / contract.paymentMilestones.length) * 100;

  const StatusIcon = getStatusIcon(contract.status);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{contract.terms.title}</h1>
              <span className={`status-badge ${getStatusColor(contract.status)} flex items-center gap-1`}>
                <StatusIcon className="w-3 h-3" />
                {contract.status}
              </span>
            </div>
            <p className="text-white/80">Contract ID: {contract.contractId}</p>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-3">
            {contract.status === 'draft' && (
              <button
                onClick={handleDeploy}
                disabled={loading}
                className="btn-primary"
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    Deploy Contract
                  </>
                )}
              </button>
            )}
            
            {contract.status === 'deployed' && (
              <button onClick={handleComplete} className="btn-primary">
                <CheckCircle className="w-4 h-4" />
                Mark Complete
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contract Overview */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Contract Overview</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{contract.terms.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Deliverables</h3>
                <ul className="space-y-2">
                  {contract.terms.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Milestones */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Payment Milestones</h2>
              <span className="text-sm text-gray-500">
                {completedMilestones} of {contract.paymentMilestones.length} completed
              </span>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              {contract.paymentMilestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    milestone.completed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {milestone.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      <span className={`font-medium ${milestone.completed ? 'text-green-900' : 'text-gray-900'}`}>
                        {milestone.milestone}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${milestone.completed ? 'text-green-900' : 'text-gray-900'}`}>
                        {milestone.amount.toLocaleString()} {contract.terms.currency}
                      </p>
                      {milestone.completed && (
                        <p className="text-xs text-green-600">Paid</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            
            {contract.status === 'draft' ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No transactions yet. Deploy the contract to start tracking payments.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-green-900">Contract Deployed</p>
                      <p className="text-sm text-green-600">Smart contract created on Solana</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">
                      {new Date(contract.createdAt).toLocaleString()}
                    </p>
                    <button className="text-xs text-green-600 hover:text-green-800 flex items-center">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View on Solana Explorer
                    </button>
                  </div>
                </div>
                
                {contract.paymentMilestones
                  .filter(m => m.completed)
                  .map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-blue-900">Payment Received</p>
                          <p className="text-sm text-blue-600">{milestone.milestone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-900">
                          +{milestone.amount.toLocaleString()} {contract.terms.currency}
                        </p>
                        <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Transaction
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contract Info */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Contract Information</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contract.terms.totalAmount.toLocaleString()} {contract.terms.currency}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Created Date</p>
                <div className="flex items-center text-gray-900">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(contract.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Creator Wallet</p>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm font-mono text-gray-700 truncate">
                    {contract.creatorWallet.slice(0, 8)}...{contract.creatorWallet.slice(-8)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(contract.creatorWallet, 'creator')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copiedAddress === 'creator' && (
                  <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Brand Wallet</p>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm font-mono text-gray-700 truncate">
                    {contract.brandWallet.slice(0, 8)}...{contract.brandWallet.slice(-8)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(contract.brandWallet, 'brand')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copiedAddress === 'brand' && (
                  <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full btn-secondary justify-center">
                <ExternalLink className="w-4 h-4" />
                View on Solana Explorer
              </button>
              
              <button className="w-full btn-secondary justify-center">
                <Copy className="w-4 h-4" />
                Share Contract Link
              </button>
              
              {contract.status === 'deployed' && (
                <button className="w-full bg-red-50 text-red-600 border-2 border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Report Dispute
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;