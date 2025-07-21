import React from 'react';
import { FileContract, Github, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileContract className="h-6 w-6 text-solana-purple" />
              <span className="text-lg font-bold gradient-text">SolContract</span>
            </div>
            <p className="text-gray-400 text-sm">
              Smart contracts for B2B creator collabs, simplified. Built on Solana for fast, 
              secure, and cost-effective transactions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contract Builder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-solana-purple transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-solana-purple transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-solana-purple transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            
            <div className="mt-4 p-4 glass-effect rounded-lg">
              <h5 className="font-medium mb-2">Pricing</h5>
              <p className="text-sm text-gray-400 mb-2">Free tier available</p>
              <p className="text-sm">
                <span className="text-solana-green font-semibold">$29/month</span>
                <br />
                <span className="text-xs text-gray-400">Unlimited contracts</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex items-center justify-between text-sm text-gray-400">
          <p>&copy; 2024 SolContract. Built on Solana.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;