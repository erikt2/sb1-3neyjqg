import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PricingSection from '../components/PricingSection';

function Billing() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              to="/settings" 
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Back to settings"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Billing & Plans
              </h1>
              <p className="text-gray-400 mt-1">Manage your subscription and billing details</p>
            </div>
          </div>

          <div className="space-y-8">
            <PricingSection />
            
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-medium text-white">Billing History</h2>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <p className="text-gray-400">No billing history available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;