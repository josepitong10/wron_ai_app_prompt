import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';

export const SalonSettings: React.FC = () => {
  const { business, resetDemoData, showToast } = useApp();

  const [businessName, setBusinessName] = useState(business.businessName);
  const [phone, setPhone] = useState(business.phone);
  const [email, setEmail] = useState(business.email);
  const [address, setAddress] = useState(business.address);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings Updated', 'Salon profile saved successfully.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Salon Settings & Integrations</h2>
        <p className="text-xs text-neutral-500 mt-1">
          Manage your business profile, payment payouts, SMS number, and platform plan.
        </p>
      </div>

      {/* Subscription & Pricing Tier Info */}
      <div className="p-5 rounded-2xl bg-neutral-900 text-white shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Current SaaS Subscription
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-700">
            Pro Plan (${business.monthlySubscriptionPrice}/mo)
          </span>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          Includes unlimited calendar staff lanes, 24/7 missed-call auto-texting, automated SMS reminders, customer CRM, and a low <strong className="text-emerald-400 font-mono">{business.platformFeePercentage}% SaaS platform take-rate</strong> on processed transactions.
        </p>
      </div>

      {/* Salon Profile Form */}
      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-neutral-600" />
          <span>Business Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Salon Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Public Business Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Physical Location
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold"
          >
            Save Profile
          </button>
        </div>
      </form>

      {/* Connected Integrations Status */}
      <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-neutral-900">
          Connected Backend Integrations
        </h3>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="font-bold text-neutral-900 block">Stripe Connect Payouts</span>
                <span className="text-[11px] text-neutral-500">
                  Direct bank payout account enabled · 0.8% platform fee automatically routed to SaaS
                </span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Connected
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <span className="font-bold text-neutral-900 block">Twilio Programmable SMS</span>
                <span className="text-[11px] text-neutral-500">
                  Dedicated local number provisioned for 24h reminders & missed-call texts
                </span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Connected
            </span>
          </div>
        </div>
      </div>

      {/* Reset Demo Data */}
      <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-rose-900 block">Reset Demo State</span>
          <span className="text-[11px] text-rose-700">
            Restore sample appointments, clients, invoices, and missed calls
          </span>
        </div>
        <button
          onClick={resetDemoData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-rose-300 text-rose-800 text-xs font-semibold hover:bg-rose-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>
    </div>
  );
};
