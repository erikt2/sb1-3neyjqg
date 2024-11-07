import React from 'react';
import { Check, CreditCard } from 'lucide-react';

interface PricingTier {
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: 0,
    features: [
      'Up to 50 transactions per month',
      'Basic financial reports',
      'Email support',
      'Single user account'
    ]
  },
  {
    name: 'Pro',
    price: 9.99,
    features: [
      'Unlimited transactions',
      'Advanced financial analytics',
      'Priority email support',
      'Up to 3 user accounts',
      'Custom categories',
      'Data export'
    ],
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: 29.99,
    features: [
      'Everything in Pro',
      'Unlimited user accounts',
      '24/7 phone support',
      'Custom reporting',
      'API access',
      'Dedicated account manager'
    ]
  }
];

function PricingSection() {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-medium text-white">Subscription Plan</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-gray-800 rounded-xl p-6 border ${
                tier.isPopular ? 'border-blue-500' : 'border-gray-700'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">${tier.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-400 shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  tier.isPopular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                {tier.price === 0 ? 'Get Started' : 'Upgrade Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingSection;