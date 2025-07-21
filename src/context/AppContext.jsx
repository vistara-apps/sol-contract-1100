import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [user, setUser] = useState(null);

  // Simulate wallet connection
  const connectWallet = async () => {
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock wallet address
      const mockAddress = 'H7fJEsWJLy8mCXkqr6Q9PmXzVg3fWdDqgxJKLNxzXfQj';
      setWalletAddress(mockAddress);
      setConnected(true);
      
      // Set user data
      setUser({
        walletAddress: mockAddress,
        email: 'creator@example.com',
        companyName: 'Creative Studios',
        role: 'creator'
      });

      // Load mock contracts
      loadMockContracts(mockAddress);
      
      return mockAddress;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress(null);
    setUser(null);
    setContracts([]);
  };

  const loadMockContracts = (userAddress) => {
    const mockContracts = [
      {
        contractId: 'sol_001',
        creatorWallet: userAddress,
        brandWallet: '5FHwkrdxntdK24hgQU8qgBjn35Y1zwhz1GZwCkP2UJnM',
        terms: {
          title: 'Social Media Campaign',
          description: 'Create 10 Instagram posts for new product launch',
          deliverables: ['10 Instagram posts', 'Story highlights', 'Reel video'],
          totalAmount: 5000,
          currency: 'USDC'
        },
        status: 'deployed',
        paymentMilestones: [
          { milestone: 'Initial payment', amount: 2500, completed: true },
          { milestone: 'Final delivery', amount: 2500, completed: false }
        ],
        createdAt: new Date().toISOString()
      },
      {
        contractId: 'sol_002',
        creatorWallet: userAddress,
        brandWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
        terms: {
          title: 'Product Review Video',
          description: 'Create comprehensive review video for tech product',
          deliverables: ['YouTube video (10+ min)', 'Short-form clips', 'Blog article'],
          totalAmount: 3000,
          currency: 'SOL'
        },
        status: 'completed',
        paymentMilestones: [
          { milestone: 'Video completion', amount: 3000, completed: true }
        ],
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    
    setContracts(mockContracts);
  };

  const createContract = (contractData) => {
    if (!connected) {
      throw new Error('Please connect your wallet first');
    }

    const newContract = {
      contractId: `sol_${Date.now()}`,
      creatorWallet: walletAddress,
      brandWallet: contractData.brandWallet,
      terms: contractData.terms,
      status: 'draft',
      paymentMilestones: contractData.paymentMilestones,
      createdAt: new Date().toISOString()
    };
    
    setContracts(prev => [...prev, newContract]);
    return newContract;
  };

  const deployContract = async (contractId) => {
    // Simulate deployment to blockchain
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setContracts(prev => 
      prev.map(contract => 
        contract.contractId === contractId 
          ? { ...contract, status: 'deployed' }
          : contract
      )
    );
  };

  const completeContract = (contractId) => {
    setContracts(prev => 
      prev.map(contract => 
        contract.contractId === contractId 
          ? { 
              ...contract, 
              status: 'completed',
              paymentMilestones: contract.paymentMilestones.map(m => ({ ...m, completed: true }))
            }
          : contract
      )
    );
  };

  const value = {
    user,
    contracts,
    createContract,
    deployContract,
    completeContract,
    connected,
    walletAddress,
    connectWallet,
    disconnectWallet
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};