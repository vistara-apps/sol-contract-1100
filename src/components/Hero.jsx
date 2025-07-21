import React from 'react';
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';

const Hero = ({ onCreateContract }) => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="hero-gradient absolute inset-0" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Smart contracts for{' '}
            <span className="gradient-text">B2B creator collabs</span>,{' '}
            simplified.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            SolContract simplifies the creation and execution of smart contracts for 
            B2B brand-creator collaborations, ensuring trust, transparency, and 
            efficient payments on Solana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button 
              onClick={onCreateContract}
              className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2"
            >
              <span>Create Contract</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border border-white/20 hover:border-white/40 transition-colors">
              View Demo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="glass-effect rounded-xl p-6 card-hover">
              <Shield className="h-8 w-8 text-solana-green mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Secure & Trustless</h3>
              <p className="text-sm text-gray-400">Built on Solana blockchain for maximum security</p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 card-hover">
              <Zap className="h-8 w-8 text-solana-green mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-400">Low fees and instant transactions</p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 card-hover">
              <TrendingUp className="h-8 w-8 text-solana-green mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Automated Payments</h3>
              <p className="text-sm text-gray-400">Milestone-based automatic releases</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;