import React from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment, AppointmentStatus } from '../../types';
import {
  Calendar,
  Clock,
  User,
  Heart,
  Scissors,
  X,
  CreditCard,
  Send,
  Phone,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface AppointmentDetailModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onCreateInvoice: (appointmentId: string) => void;
}

export const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onCreateInvoice,
}) => {
  const {
    updateAppointmentStatus,
    assignStaffToAppointment,
    sendReadyForPickupSMS,
    staff,
    invoices,
    setOwnerTab,
  } = useApp();

  if (!isOpen || !appointment) return null;

  const invoice = invoices.find((i) => i.id === appointment.invoiceId);

  const statuses: { id: AppointmentStatus; label: string }[] = [
    { id: 'pending', label: 'Pending Check-In' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'in_tub', label: 'In Hydrobath' },
    { id: 'grooming', label: 'On Table Styling' },
    { id: 'ready_for_pickup', label: 'Ready for Pickup' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-neutral-900">{appointment.petName}</h2>
              <span className="text-xs text-neutral-500 font-medium">({appointment.petBreed})</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                {appointment.petSize}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Client: {appointment.customerName} · {appointment.customerPhone}
            </p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grooming Service & Schedule Details */}
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
          <div className="flex justify-between items-center font-bold text-neutral-900">
            <span>{appointment.serviceName}</span>
            <span className="font-mono text-sm">${appointment.price}</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-600">
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {appointment.date} at {appointment.startTime} ({appointment.durationMinutes} min)
            </span>
          </div>

          {appointment.notes && (
            <div className="pt-2 border-t border-neutral-200/80 text-neutral-700">
              <strong className="text-neutral-900">Owner Notes:</strong> {appointment.notes}
            </div>
          )}
        </div>

        {/* Advance Appointment Stage */}
        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">
            Advance Grooming Stage
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {statuses.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => updateAppointmentStatus(appointment.id, st.id)}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                  appointment.status === st.id
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Assigned Groomer */}
        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
            Assigned Groomer
          </label>
          <select
            value={appointment.staffId}
            onChange={(e) => assignStaffToAppointment(appointment.id, e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-medium bg-white"
          >
            {staff.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.role})
              </option>
            ))}
          </select>
        </div>

        {/* Billing & Action Bar */}
        <div className="border-t border-neutral-100 pt-4 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => sendReadyForPickupSMS(appointment.id)}
            className="flex-1 py-2.5 px-3 rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-emerald-600" />
            <span>Text "Ready for Pickup"</span>
          </button>

          {!appointment.invoiceId ? (
            <button
              onClick={() => {
                onClose();
                onCreateInvoice(appointment.id);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-300" />
              <span>Create Invoice (${appointment.price})</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                setOwnerTab('invoices');
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Invoice #{appointment.invoiceId}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
