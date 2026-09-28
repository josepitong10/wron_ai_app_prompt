/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp, OwnerTab } from './context/AppContext';
import { Header } from './components/Header';
import { OwnerDashboard } from './components/dashboard/OwnerDashboard';
import { CalendarView } from './components/calendar/CalendarView';
import { CustomerList } from './components/customers/CustomerList';
import { InvoicesView } from './components/invoicing/InvoicesView';
import { AutomationCenter } from './components/automation/AutomationCenter';
import { SalonSettings } from './components/settings/SalonSettings';
import { CustomerBookingPortal } from './components/booking/CustomerBookingPortal';
import { ProductSpecDoc } from './components/spec/ProductSpecDoc';
import { NewAppointmentModal } from './components/calendar/NewAppointmentModal';
import { AppointmentDetailModal } from './components/calendar/AppointmentDetailModal';
import { CreateInvoiceModal } from './components/invoicing/CreateInvoiceModal';
import { Appointment, Customer, Pet } from './types';
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Users,
  CreditCard,
  Zap,
  Settings,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  PhoneCall,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    viewMode,
    ownerTab,
    setOwnerTab,
    devicePreview,
    setDevicePreview,
    toasts,
    dismissToast,
    invoices,
    appointments,
    business,
  } = useApp();

  // Modals state
  const [isNewAptModalOpen, setIsNewAptModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [invoiceAppointmentId, setInvoiceAppointmentId] = useState<string | null>(null);
  const [bookingPrefill, setBookingPrefill] = useState<{ custId?: string; petId?: string }>({});

  const unpaidCount = invoices.filter((i) => i.status === 'unpaid').length;

  const handleOpenNewAppointment = (customerId?: string, petId?: string) => {
    setBookingPrefill({ custId: customerId, petId });
    setIsNewAptModalOpen(true);
  };

  const handleOpenInvoiceModal = (appointmentId: string) => {
    setInvoiceAppointmentId(appointmentId);
  };

  const navItems: { id: OwnerTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'customers', label: 'Pets & Clients', icon: Users },
    { id: 'invoices', label: 'Invoices', icon: CreditCard, badge: unpaidCount > 0 ? unpaidCount : undefined },
    { id: 'automations', label: 'Automations', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Render Owner Sub-Views
  const renderOwnerView = () => {
    switch (ownerTab) {
      case 'dashboard':
        return (
          <OwnerDashboard
            onOpenNewAppointment={() => handleOpenNewAppointment()}
            onOpenInvoiceModal={handleOpenInvoiceModal}
            onViewAppointmentDetails={(apt) => setSelectedAppointment(apt)}
          />
        );
      case 'calendar':
        return (
          <CalendarView
            onOpenNewAppointment={() => handleOpenNewAppointment()}
            onSelectAppointment={(apt) => setSelectedAppointment(apt)}
          />
        );
      case 'customers':
        return (
          <CustomerList
            onBookForCustomer={(cust, pet) => handleOpenNewAppointment(cust.id, pet.id)}
          />
        );
      case 'invoices':
        return <InvoicesView onOpenCreateInvoice={() => setIsNewAptModalOpen(true)} />;
      case 'automations':
        return <AutomationCenter />;
      case 'settings':
        return <SalonSettings />;
      default:
        return null;
    }
  };

  // Content wrapper for mobile frame simulation vs responsive
  const contentBody = (
    <>
      {viewMode === 'owner_app' && (
        <div className="space-y-4">
          {/* Desktop/Tablet Horizontal Secondary Nav Bar */}
          <div className="hidden md:flex items-center gap-1.5 p-1 bg-white rounded-xl border border-neutral-200/80 shadow-xs mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = ownerTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setOwnerTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-neutral-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active View Content */}
          {renderOwnerView()}

          {/* Mobile Bottom Navigation Bar (44px touch targets, 15% sticky height compliance) */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-lg px-2 py-1.5">
            <div className="grid grid-cols-5 gap-1">
              {navItems.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = ownerTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setOwnerTab(item.id)}
                    className={`flex flex-col items-center justify-center min-h-[44px] py-1 rounded-lg text-[10px] font-medium transition-colors ${
                      isActive ? 'text-emerald-700 font-bold' : 'text-neutral-500'
                    }`}
                  >
                    <div className="relative">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-neutral-400'}`} />
                      {item.badge !== undefined && (
                        <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </div>
                    <span className="mt-0.5 truncate max-w-[60px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'customer_booking' && <CustomerBookingPortal />}

      {viewMode === 'spec_doc' && <ProductSpecDoc />}
    </>
  );

  return (
    <div className="min-h-screen bg-neutral-100/60 text-neutral-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {devicePreview === 'mobile' && viewMode !== 'spec_doc' ? (
          /* Simulated iPhone Mobile Frame (390px) */
          <div className="flex flex-col items-center justify-center py-2">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-neutral-600 bg-white px-3 py-1 rounded-full border border-neutral-200 shadow-xs">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulated Smartphone Viewport (390px)</span>
              <button
                onClick={() => setDevicePreview('responsive')}
                className="text-emerald-700 hover:underline ml-2"
              >
                Expand to Fullscreen
              </button>
            </div>

            <div className="w-[390px] h-[844px] bg-neutral-50 rounded-[44px] border-[10px] border-neutral-900 shadow-2xl overflow-hidden flex flex-col relative">
              {/* Dynamic Island / Speaker notch */}
              <div className="h-7 bg-neutral-900 w-full flex items-center justify-center shrink-0">
                <div className="w-24 h-4 bg-black rounded-full" />
              </div>

              {/* Scrollable phone content */}
              <div className="flex-1 overflow-y-auto px-4 py-3 pb-20">
                {contentBody}
              </div>
            </div>
          </div>
        ) : (
          contentBody
        )}
      </main>

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-16 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl shadow-lg border text-xs flex items-start gap-2.5 transition-all transform animate-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-neutral-900 text-white border-neutral-800'
                : toast.type === 'warning'
                ? 'bg-amber-900 text-amber-50 border-amber-800'
                : 'bg-neutral-800 text-white border-neutral-700'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 min-w-0">
              <span className="font-bold block">{toast.title}</span>
              <p className="text-neutral-300 text-[11px] mt-0.5 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-neutral-400 hover:text-white p-0.5 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Modals */}
      <NewAppointmentModal
        isOpen={isNewAptModalOpen}
        onClose={() => setIsNewAptModalOpen(false)}
        defaultCustomerId={bookingPrefill.custId}
        defaultPetId={bookingPrefill.petId}
      />

      <AppointmentDetailModal
        appointment={selectedAppointment}
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onCreateInvoice={handleOpenInvoiceModal}
      />

      <CreateInvoiceModal
        appointmentId={invoiceAppointmentId}
        isOpen={!!invoiceAppointmentId}
        onClose={() => setInvoiceAppointmentId(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
