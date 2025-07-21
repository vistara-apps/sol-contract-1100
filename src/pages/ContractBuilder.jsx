import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Notification from '../components/Notification';
import { Plus, Trash2, DollarSign } from 'lucide-react';

const ContractBuilder = () => {
  const navigate = useNavigate();
  const { connected, createContract } = useAppContext();

  const [formData, setFormData] = useState({
    brandWallet: '',
    title: '',
    description: '',
    deliverables: [''],
    totalAmount: '',
    currency: 'USDC',
    paymentMilestones: [
      { milestone: 'Initial payment', amount: '', completed: false }
    ]
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDeliverableChange = (index, value) => {
    const newDeliverables = [...formData.deliverables];
    newDeliverables[index] = value;
    setFormData(prev => ({ ...prev, deliverables: newDeliverables }));
  };

  const addDeliverable = () => {
    setFormData(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, '']
    }));
  };

  const removeDeliverable = (index) => {
    if (formData.deliverables.length > 1) {
      const newDeliverables = formData.deliverables.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, deliverables: newDeliverables }));
    }
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...formData.paymentMilestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setFormData(prev => ({ ...prev, paymentMilestones: newMilestones }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      paymentMilestones: [
        ...prev.paymentMilestones,
        { milestone: '', amount: '', completed: false }
      ]
    }));
  };

  const removeMilestone = (index) => {
    if (formData.paymentMilestones.length > 1) {
      const newMilestones = formData.paymentMilestones.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, paymentMilestones: newMilestones }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.brandWallet.trim()) {
      newErrors.brandWallet = 'Brand wallet address is required';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Contract title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.totalAmount || parseFloat(formData.totalAmount) <= 0) {
      newErrors.totalAmount = 'Valid total amount is required';
    }

    const validDeliverables = formData.deliverables.filter(d => d.trim());
    if (validDeliverables.length === 0) {
      newErrors.deliverables = 'At least one deliverable is required';
    }

    const validMilestones = formData.paymentMilestones.filter(m => m.milestone.trim() && m.amount);
    if (validMilestones.length === 0) {
      newErrors.milestones = 'At least one payment milestone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!connected) {
      setNotification({
        type: 'error',
        message: 'Please connect your wallet first'
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const contractData = {
        brandWallet: formData.brandWallet,
        terms: {
          title: formData.title,
          description: formData.description,
          deliverables: formData.deliverables.filter(d => d.trim()),
          totalAmount: parseFloat(formData.totalAmount),
          currency: formData.currency
        },
        paymentMilestones: formData.paymentMilestones.filter(m => m.milestone.trim() && m.amount)
          .map(m => ({ ...m, amount: parseFloat(m.amount) }))
      };

      const newContract = createContract(contractData);
      
      setNotification({
        type: 'success',
        message: 'Contract created successfully!'
      });

      setTimeout(() => {
        navigate(`/contract/${newContract.contractId}`);
      }, 1500);
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message
      });
    }
  };

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-600">Please connect your Solana wallet to create contracts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="card">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Smart Contract</h1>
          <p className="text-gray-600">Define your collaboration terms and payment milestones</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Contract Details</h2>
            
            <div className="form-group">
              <label className="form-label">Brand Wallet Address *</label>
              <input
                type="text"
                className="form-input"
                value={formData.brandWallet}
                onChange={(e) => handleInputChange('brandWallet', e.target.value)}
                placeholder="Enter brand's Solana wallet address"
              />
              {errors.brandWallet && (
                <p className="text-red-500 text-sm mt-1">{errors.brandWallet}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Contract Title *</label>
              <input
                type="text"
                className="form-input"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Social Media Campaign Q1 2024"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className="form-textarea"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the collaboration, goals, and expectations..."
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Deliverables</h2>
            
            {formData.deliverables.map((deliverable, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  className="form-input flex-1"
                  value={deliverable}
                  onChange={(e) => handleDeliverableChange(index, e.target.value)}
                  placeholder={`Deliverable ${index + 1}`}
                />
                {formData.deliverables.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDeliverable(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addDeliverable}
              className="btn-secondary"
            >
              <Plus className="w-4 h-4" />
              Add Deliverable
            </button>
            
            {errors.deliverables && (
              <p className="text-red-500 text-sm">{errors.deliverables}</p>
            )}
          </div>

          {/* Payment Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Payment Terms</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Total Amount *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-input"
                  value={formData.totalAmount}
                  onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                  placeholder="0.00"
                />
                {errors.totalAmount && (
                  <p className="text-red-500 text-sm mt-1">{errors.totalAmount}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Currency</label>
                <select
                  className="form-select"
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                >
                  <option value="USDC">USDC</option>
                  <option value="SOL">SOL</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Milestones */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Payment Milestones</h2>
            
            {formData.paymentMilestones.map((milestone, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="form-group mb-0">
                    <label className="form-label">Milestone Description</label>
                    <input
                      type="text"
                      className="form-input"
                      value={milestone.milestone}
                      onChange={(e) => handleMilestoneChange(index, 'milestone', e.target.value)}
                      placeholder="e.g., Content approval, Final delivery"
                    />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Amount ({formData.currency})</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-input"
                      value={milestone.amount}
                      onChange={(e) => handleMilestoneChange(index, 'amount', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                {formData.paymentMilestones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMilestone(index)}
                    className="text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4 inline mr-1" />
                    Remove Milestone
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addMilestone}
              className="btn-secondary"
            >
              <Plus className="w-4 h-4" />
              Add Milestone
            </button>
            
            {errors.milestones && (
              <p className="text-red-500 text-sm">{errors.milestones}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <DollarSign className="w-4 h-4" />
              Create Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractBuilder;