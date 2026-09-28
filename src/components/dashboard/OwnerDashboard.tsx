import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment, AppointmentStatus } from '../../types';
import {
  Calendar,
  Clock,
  DollarSign,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Plus,
  Send,
  CreditCard,
  UserCheck,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Scissors,
  Check,
} from 'lucide-react';

interface OwnerDashboardProps {
  onOpenNewAppointment: () => void;
  onOpenInvoiceModal: (appointmentId: string) => void;
  onViewAppointmentDetails: (apt: Appointment) => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  onOpenNewAppointment,
  onOpenInvoiceModal,
  onViewAppointmentDetails,
}) => {
  const {
    business,
    appointments,
    invoices,
    missedCalls,
    updateAppointmentStatus,
    simulateMissedCall,
    setViewMode,
    setOwnerTab,
  } = useApp();

  const [setupDismissed, setSetupDismissed] = useState(false);

  // Filter today's appointments (default demo date: 2026-09-28)
  const todayStr = '2026-09-28';
  const todayAppointments = appointments.filter((a) => a.date === todayStr);

  // Unpaid invoices
  const unpaidInvoices = invoices.filter((i) => i.status === 'unpaid');
  const unpaidTotal = unpaidInvoices.reduce((acc, i) => acc + i.total, 0);

  // Monthly revenue stats
  const totalPaidRevenue = invoices
    .filter((i) => i.status === 'paid')
    .reduce((acc, i) => acc + i.total, 0);
  const totalPlatformFees = invoices
    .filter((i) => i.status === 'paid')
    .reduce((acc, i) => acc + (i.platformFeeAmount || 0), 0);

  // Status badge styling helper
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'in_tub':
        return { label: 'In Hydrobath', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'grooming':
        return { label: 'On Table Styling', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'ready_for_pickup':
        return { label: 'Ready for Pickup', color: 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold' };
      case 'completed':
        return { label: 'Completed', color: 'bg-neutral-100 text-neutral-600 border-neutral-200' };
      case 'confirmed':
        return { label: 'Confirmed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default:
        return { label: 'Pending Check-in', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 15-Minute Rapid Onboarding Card (Non-technical owner reassurance) */}
      {!setupDismissed && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/80 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  15-Minute Fast-Track Salon Setup
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Designed for non-technical salon owners. Set your hours, connect card payouts, and share your link.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSetupDismissed(true)}
              className="text-xs text-neutral-400 hover:text-neutral-700 px-2 py-1 rounded"
            >
              Dismiss
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
            <div className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-neutral-800 block truncate">1. Salon Profile</span>
                <span className="text-[10px] text-emerald-600">Active</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-neutral-800 block truncate">2. 5 Services Added</span>
                <span className="text-[10px] text-emerald-600">Configured</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-neutral-800 block truncate">3. Stripe Connect</span>
                <span className="text-[10px] text-emerald-600">Payouts Ready</span>
              </div>
            </div>

            <div
              onClick={() => setViewMode('customer_booking')}
              className="p-2.5 rounded-xl bg-emerald-600 text-white flex items-center justify-between cursor-pointer hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <div className="min-w-0">
                <span className="text-[11px] font-bold block truncate">4. Test Live Portal</span>
                <span className="text-[10px] text-emerald-100">Open client page</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </div>
          </div>
        </div>
      )}

      {/* KPI Stat Cards (Tabular figures, clean unboxed typography) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Today's Appointments */}
        <div
          onClick={() => setOwnerTab('calendar')}
          className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-medium">Today's Schedule</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-neutral-900">
              {todayAppointments.length}
            </span>
            <span className="text-xs text-neutral-500">dogs booked</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% reminder confirmed</span>
          </div>
        </div>

        {/* Metric 2: Unpaid Invoices */}
        <div
          onClick={() => setOwnerTab('invoices')}
          className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-medium">Unpaid Invoices</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-neutral-900">
              ${unpaidTotal.toFixed(0)}
            </span>
            <span className="text-xs text-neutral-500">({unpaidInvoices.length} pending)</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-amber-700 font-medium">
            <span>1-tap collect via SMS/Card</span>
          </div>
        </div>

        {/* Metric 3: Monthly Revenue & Platform Take */}
        <div
          onClick={() => setOwnerTab('invoices')}
          className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-medium">Processed Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-neutral-900">
              ${totalPaidRevenue.toFixed(0)}
            </span>
            <span className="text-xs text-neutral-500">this month</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500 font-mono tabular-nums">
            <span>SaaS take (0.8%):</span>
            <span className="font-semibold text-emerald-700">${totalPlatformFees.toFixed(2)}</span>
          </div>
        </div>

        {/* Metric 4: Missed-Call Recovery */}
        <div
          onClick={() => setOwnerTab('automations')}
          className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-medium">Missed-Call Leads</span>
            <PhoneCall className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-neutral-900">
              {missedCalls.length}
            </span>
            <span className="text-xs text-neutral-500">auto-texted</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-blue-700 font-medium">
            <span>50% converted to booking</span>
          </div>
        </div>
      </div>

      {/* Quick Action Bar (Mobile-first Thumb-friendly triggers) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={onOpenNewAppointment}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold whitespace-nowrap shadow-sm active:scale-[0.98] transition-transform"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>New Appointment</span>
        </button>

        <button
          onClick={() => simulateMissedCall()}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50 text-xs font-semibold whitespace-nowrap shadow-xs"
        >
          <PhoneCall className="w-4 h-4 text-amber-500" />
          <span>Simulate Customer Missed Call</span>
        </button>

        <button
          onClick={() => setViewMode('customer_booking')}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50 text-xs font-semibold whitespace-nowrap shadow-xs"
        >
          <ExternalLink className="w-4 h-4 text-emerald-600" />
          <span>Open Online Booking Link</span>
        </button>
      </div>

      {/* Main Content Layout: Today's Appointments & Automation Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Operational Board */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                Today's Grooming Queue
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Monday, September 28 · Tap status to advance through grooming stages
              </p>
            </div>
            <button
              onClick={() => setOwnerTab('calendar')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Full Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Appointments List */}
          <div className="space-y-3">
            {todayAppointments.map((apt) => {
              const badge = getStatusBadge(apt.status);
              const invoice = invoices.find((i) => i.id === apt.invoiceId);

              return (
                <div
                  key={apt.id}
                  className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs hover:border-neutral-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Pet & Owner info */}
                    <div
                      className="cursor-pointer min-w-0"
                      onClick={() => onViewAppointmentDetails(apt)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-neutral-900">
                          {apt.petName}
                        </span>
                        <span className="text-xs text-neutral-500 font-medium">
                          ({apt.petBreed})
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                        <span className="font-mono tabular-nums font-semibold text-neutral-700 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          {apt.startTime} ({apt.durationMinutes}m)
                        </span>
                        <span>·</span>
                        <span>{apt.customerName}</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-medium">Groomer: {apt.staffName.split(' ')[0]}</span>
                      </div>

                      <p className="text-xs text-neutral-600 mt-1.5 line-clamp-1">
                        <span className="font-medium text-neutral-800">{apt.serviceName}:</span>{' '}
                        {apt.notes || 'No special handling instructions'}
                      </p>
                    </div>

                    {/* Quick Stage Actions for Groomers */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      {apt.status === 'confirmed' || apt.status === 'pending' ? (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'in_tub')}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                        >
                          Start Bath
                        </button>
                      ) : apt.status === 'in_tub' ? (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'grooming')}
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors"
                        >
                          Table Groom
                        </button>
                      ) : apt.status === 'grooming' ? (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'ready_for_pickup')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Ready & Text Owner</span>
                        </button>
                      ) : apt.status === 'ready_for_pickup' ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Text Sent
                          </span>
                          {!apt.invoiceId ? (
                            <button
                              onClick={() => onOpenInvoiceModal(apt.id)}
                              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                            >
                              <CreditCard className="w-3 h-3 text-amber-300" />
                              <span>Create Invoice</span>
                            </button>
                          ) : invoice?.status === 'paid' ? (
                            <span className="text-xs font-bold text-emerald-700 font-mono">
                              Paid ${invoice.total.toFixed(2)}
                            </span>
                          ) : (
                            <button
                              onClick={() => setOwnerTab('invoices')}
                              className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-semibold"
                            >
                              Invoice Pending
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-neutral-500 font-medium">Completed</span>
                      )}

                      <button
                        onClick={() => onViewAppointmentDetails(apt)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
                        title="View details & notes"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Missed-Call Recovery & Recent Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900">
              Missed-Call Auto-Texts
            </h3>
            <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              Active 24/7
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs space-y-3">
            <p className="text-xs text-neutral-600">
              When a client calls while groomers are washing or drying, our system texts back in seconds with your booking link.
            </p>

            <div className="space-y-2.5 pt-1">
              {missedCalls.slice(0, 3).map((call) => (
                <div
                  key={call.id}
                  className="p-3 rounded-lg bg-neutral-50 border border-neutral-200/70 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-900">
                      {call.callerName || call.callerNumber}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {call.timestamp}
                    </span>
                  </div>
                  <p className="text-neutral-600 text-[11px] italic bg-white p-2 rounded border border-neutral-200/50">
                    "{call.autoTextMessage}"
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Auto-SMS Delivered
                    </span>
                    {call.convertedToBooking ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                        Converted to Appt 🎉
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-400">
                        Link clicked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => simulateMissedCall()}
              className="w-full py-2 px-3 rounded-lg border border-dashed border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Test Live Call Simulator</span>
            </button>
          </div>

          {/* Quick Shop Details */}
          <div className="p-4 rounded-xl bg-neutral-900 text-white shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                Public Booking Link
              </span>
              <span className="text-[10px] font-mono text-emerald-400">No Login Required</span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-800 text-xs font-mono text-neutral-300 break-all select-all border border-neutral-700 flex items-center justify-between">
              <span>https://groompulse.app/{business.bookingSlug}</span>
            </div>
            <button
              onClick={() => setViewMode('customer_booking')}
              className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold text-xs transition-colors"
            >
              Preview What Clients See
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
