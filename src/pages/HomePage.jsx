import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Shield, Zap, Users, ArrowRight, Check } from 'lucide-react';

const HomePage = () => {
  const { connected } = useAppContext();

  const features = [
    {
      icon: Shield,
      title: 'Secure Escrow',
      description: 'Smart contracts hold funds safely until milestones are completed'
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Automated payments on Solana with minimal transaction fees'
    },
    {
      icon: Users,
      title: 'Trust & Transparency',
      description: 'All contract terms and payments are recorded on-chain'
    }
  ];

  const benefits = [
    'No more payment delays or disputes',
    'Transparent milestone tracking',
    'Low-cost Solana transactions',
    'Automated contract execution',
    'Built-in dispute resolution'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Smart Contracts for
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mt-2">
              B2B Creator Collabs
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            SolContract simplifies the creation and execution of smart contracts for brand-creator 
            collaborations, ensuring trust, transparency, and efficient payments on Solana.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {connected ? (
              <Link to="/builder" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Create Your First Contract
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <div className="btn-primary text-lg px-8 py-4 opacity-75 cursor-not-allowed w-full sm:w-auto">
                Connect Wallet to Start
              </div>
            )}
            <Link to="/dashboard" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose SolContract?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Built specifically for the creator economy with Solana's speed and efficiency
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card text-center hover:transform hover:scale-105 transition-transform duration-200">
                <Icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Streamline Your Creator Partnerships
            </h2>
            <p className="text-lg text-white/80 mb-6">
              Stop worrying about payment delays, unclear deliverables, or dispute resolution. 
              SolContract automates the entire collaboration process with blockchain security.
            </p>
            
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-white/90">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="card">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
              <p className="text-gray-600 mb-4">
                Connect your Solana wallet and create your first smart contract in minutes.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                    1
                  </div>
                  <span>Connect your Solana wallet</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                    2
                  </div>
                  <span>Define contract terms and milestones</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                    3
                  </div>
                  <span>Deploy and fund your smart contract</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <h2 className="text-3xl font-bold mb-4">Start Building Trust Today</h2>
          <p className="text-lg mb-6 opacity-90">
            Join the future of creator-brand collaborations with transparent, automated smart contracts.
          </p>
          {connected ? (
            <Link to="/builder" className="inline-flex items-center bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Create Contract Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          ) : (
            <p className="text-white/80">Connect your wallet to get started</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
