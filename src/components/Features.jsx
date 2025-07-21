import React from 'react';
import { 
  FileText, 
  Coins, 
  Shield, 
  Users, 
  Clock, 
  BarChart3 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Contract Builder",
      description: "User-friendly interface to define contract terms, deliverables, milestones, and payment amounts.",
      highlight: "Simplifies contract creation"
    },
    {
      icon: Coins,
      title: "Solana Integration",
      description: "Generates and deploys smart contracts directly to the Solana blockchain with low fees.",
      highlight: "Instant microtransactions"
    },
    {
      icon: Clock,
      title: "Payment Automation",
      description: "Automatically triggers payments based on milestone completion, verified via on-chain data.",
      highlight: "Timely & transparent"
    },
    {
      icon: Shield,
      title: "Dispute Resolution",
      description: "Transparent dispute resolution process with on-chain evidence and community voting.",
      highlight: "Fair & transparent"
    },
    {
      icon: Users,
      title: "Multi-Party Support",
      description: "Support for complex collaborations between brands, creators, and other stakeholders.",
      highlight: "Scale collaborations"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track contract performance, payment history, and collaboration metrics in real-time.",
      highlight: "Data-driven insights"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need for{' '}
            <span className="gradient-text">creator collaborations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From contract creation to payment automation, we've got your B2B creator partnerships covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-effect rounded-xl p-8 card-hover">
              <feature.icon className="h-12 w-12 text-solana-purple mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="text-sm text-solana-green font-medium">
                {feature.highlight}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-effect rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Join the Future of Creator Economy
            </h3>
            <p className="text-gray-300 mb-6">
              Be part of the revolution that's making B2B creator collaborations more secure, 
              transparent, and efficient than ever before.
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-solana-green">$0.01</div>
                <div className="text-sm text-gray-400">Avg. transaction fee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-solana-green">~400ms</div>
                <div className="text-sm text-gray-400">Block time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-solana-green">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;