import React from 'react';
import { useApp } from '../context/AppContext';
import { Smartphone, Monitor, PhoneCall, Sparkles, Calendar, BookOpen, User } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    devicePreview,
    setDevicePreview,
    simulateMissedCall,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setViewMode('owner_app')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-emerald-700 transition-colors">
              GP
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-neutral-900 group-hover:text-emerald-700 transition-colors block leading-tight">
                GroomPulse
              </span>
              <span className="text-[11px] text-neutral-500 font-medium block">
                Vertical SaaS for Pet Care
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Primary View Switcher Navigation */}
        <nav className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg">
          <button
            onClick={() => setViewMode('owner_app')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              viewMode === 'owner_app'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Owner & Staff App</span>
          </button>

          <button
            onClick={() => setViewMode('customer_booking')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              viewMode === 'customer_booking'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Customer Booking Portal</span>
          </button>

          <button
            onClick={() => setViewMode('spec_doc')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              viewMode === 'spec_doc'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Product Blueprint & Spec</span>
            <span className="sm:hidden">Spec</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Device toggle & Interactive Simulator trigger) */}
        <div className="flex items-center gap-2 shrink-0">
          {viewMode !== 'spec_doc' && (
            <button
              onClick={() => setDevicePreview(devicePreview === 'mobile' ? 'responsive' : 'mobile')}
              title={devicePreview === 'mobile' ? 'Switch to fluid responsive view' : 'Simulate mobile phone viewport'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              {devicePreview === 'mobile' ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="hidden md:inline">Fluid View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden md:inline">Phone Frame (390px)</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => simulateMissedCall()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors shadow-xs active:scale-[0.98]"
            title="Simulate incoming customer call when groomer is busy -> triggers instant auto-text"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden lg:inline">Simulate Missed Call</span>
            <span className="lg:hidden">Missed Call</span>
          </button>
        </div>
      </div>
    </header>
  );
};
