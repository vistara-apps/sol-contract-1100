import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  User, 
  Building, 
  DollarSign,
  Calendar,
  FileText
} from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const ContractBuilder = ({ onBack, isWalletConnected, walletAddress }) => {
  const { createSession } = usePaymentContext();
  
  const [contractData, setContractData] = useState({
    title: '',
    creatorWallet: '',
    brandWallet: '',
    description: '',
    totalAmount: '',
    milestones: [
      { description: '', amount: '', deadline: '' }
    ],
    usageRights: '',
    terms: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);

  const addMilestone = () => {
    setContractData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { description: '', amount: '', deadline: '' }]
    }));
  };

  const removeMilestone = (index) => {
    if (contractData.milestones.length > 1) {
      setContractData(prev => ({
        ...prev,
        milestones: prev.milestones.filter((_, i) => i !== index)
      }));
    }
  };

  const updateMilestone = (index, field, value) => {
    setContractData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }));
  };

  const handleInputChange = (field, value) => {
    setContractData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return contractData.title && contractData.description;
      case 2:
        return contractData.creatorWallet && contractData.brandWallet;
      case 3:
        return contractData.totalAmount && contractData.milestones.every(m => 
          m.description && m.amount && m.deadline
        );
      case 4:
        return contractData.usageRights && contractData.terms;
      default:
        return true;
    }
  };

  const handleDeploy = async () => {
    if (!isWalletConnected) {
      toast.error('Please connect your Solana wallet first');
      return;
    }

    try {
      setIsDeploying(true);
      
      // Simulate contract deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock contract address
      const contractAddress = `Sol${Math.random().toString(36).substr(2, 9)}`;
      
      toast.success(`Contract deployed successfully! Address: ${contractAddress}`);
      
      // Handle payment for premium features
      try {
        await createSession();
        toast.success('Premium features unlocked!');
      } catch (error) {
        console.log('Payment not processed, continuing with free tier');
      }
      
      onBack();
    } catch (error) {
      toast.error('Failed to deploy contract: ' + error.message);
    } finally {
      setIsDeploying(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Contract Basics</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Contract Title *</label>
              <input
                type="text"
                value={contractData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Brand Partnership Q1 2024"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={contractData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the collaboration, deliverables, and expectations..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Participants</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-effect rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-5 w-5 text-solana-green" />
                  <h4 className="font-semibold">Creator Wallet *</h4>
                </div>
                <input
                  type="text"
                  value={contractData.creatorWallet}
                  onChange={(e) => handleInputChange('creatorWallet', e.target.value)}
                  placeholder="Creator's Solana wallet address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
                />
              </div>
              
              <div className="glass-effect rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-5 w-5 text-solana-purple" />
                  <h4 className="font-semibold">Brand Wallet *</h4>
                </div>
                <input
                  type="text"
                  value={contractData.brandWallet}
                  onChange={(e) => handleInputChange('brandWallet', e.target.value)}
                  placeholder="Brand's Solana wallet address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
                />
              </div>
            </div>
            
            {isWalletConnected && (
              <div className="glass-effect rounded-lg p-4">
                <p className="text-sm text-gray-400">
                  Connected wallet: <span className="text-solana-green font-mono">{walletAddress}</span>
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Payment Structure</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Total Contract Value (SOL) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={contractData.totalAmount}
                  onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                  placeholder="10.0"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Payment Milestones</h4>
                <button
                  onClick={addMilestone}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-solana-purple hover:bg-solana-purple/80 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-4">
                {contractData.milestones.map((milestone, index) => (
                  <div key={index} className="glass-effect rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium">Milestone {index + 1}</h5>
                      {contractData.milestones.length > 1 && (
                        <button
                          onClick={() => removeMilestone(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={milestone.description}
                        onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                        placeholder="Deliverable description"
                        className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={milestone.amount}
                        onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                        placeholder="Amount (SOL)"
                        className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
                      />
                      <input
                        type="date"
                        value={milestone.deadline}
                        onChange={(e) => updateMilestone(index, 'deadline', e.target.value)}
                        className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Terms & Rights</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Usage Rights *</label>
              <textarea
                value={contractData.usageRights}
                onChange={(e) => handleInputChange('usageRights', e.target.value)}
                placeholder="Define how the brand can use the creator's content (e.g., social media, website, advertising campaigns)..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Additional Terms *</label>
              <textarea
                value={contractData.terms}
                onChange={(e) => handleInputChange('terms', e.target.value)}
                placeholder="Additional contract terms, conditions, and legal requirements..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-solana-purple focus:outline-none"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Review & Deploy</h3>
            
            <div className="glass-effect rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-solana-purple">Contract Summary</h4>
                <p className="text-gray-300">{contractData.title}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium">Creator</h5>
                  <p className="text-sm text-gray-400 font-mono">{contractData.creatorWallet}</p>
                </div>
                <div>
                  <h5 className="font-medium">Brand</h5>
                  <p className="text-sm text-gray-400 font-mono">{contractData.brandWallet}</p>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium">Total Value</h5>
                <p className="text-lg font-semibold text-solana-green">{contractData.totalAmount} SOL</p>
              </div>
              
              <div>
                <h5 className="font-medium">Milestones</h5>
                <p className="text-gray-400">{contractData.milestones.length} payment milestones defined</p>
              </div>
            </div>

            <button
              onClick={handleDeploy}
              disabled={isDeploying || !isWalletConnected}
              className="w-full btn-primary py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeploying ? 'Deploying Contract...' : 'Deploy to Solana'}
            </button>

            {!isWalletConnected && (
              <p className="text-center text-gray-400 text-sm">
                Please connect your Solana wallet to deploy the contract
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

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

          <div className="glass-effect rounded-xl p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold gradient-text">Create Contract</h2>
                <span className="text-sm text-gray-400">Step {currentStep} of 5</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-solana-purple to-solana-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg btn-primary"
                >
                  Continue
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractBuilder;