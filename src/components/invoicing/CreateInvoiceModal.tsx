import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, DollarSign, X, Sparkles, Check } from 'lucide-react';

interface CreateInvoiceModalProps {
  appointmentId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  appointmentId,
  isOpen,
  onClose,
}) => {
  const { appointments, createInvoiceFromAppointment, setOwnerTab, business } = useApp();
  const [tipAmount, setTipAmount] = useState<number>(15);

  if (!isOpen || !appointmentId) return null;

  const apt = appointments.find((a) => a.id === appointmentId);
  if (!apt) return null;

  const tax = Number((apt.price * 0.098).toFixed(2));
  const subtotal = apt.price;
  const total = subtotal + tipAmount + tax;
  const platformFee = Number((total * (business.platformFeePercentage / 100)).toFixed(2));

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createInvoiceFromAppointment(apt.id, tipAmount);
    onClose();
    setOwnerTab('invoices');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Generate Invoice</h3>
            <p className="text-xs text-neutral-500">
              For {apt.petName} ({apt.customerName})
            </p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          {/* Service Line Item */}
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="flex justify-between font-bold text-neutral-900">
              <span>{apt.serviceName}</span>
              <span className="font-mono">${apt.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Sales Tax (9.8%)</span>
              <span className="font-mono">${tax.toFixed(2)}</span>
            </div>
          </div>

          {/* Tip Selection */}
          <div>
            <label className="block font-bold text-neutral-700 uppercase mb-1.5">
              Groomer Gratuity / Tip
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 25].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTipAmount(amt)}
                  className={`py-2 px-2.5 rounded-lg border font-mono font-bold text-center transition-all ${
                    tipAmount === amt
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600/20'
                      : 'border-neutral-200 bg-white text-neutral-700'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Fee & Take Rate Transparency */}
          <div className="p-3 rounded-xl bg-neutral-900 text-white space-y-2">
            <div className="flex justify-between font-mono text-sm font-bold">
              <span>Customer Total:</span>
              <span className="text-emerald-400 font-extrabold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
              <span>Platform Take ({business.platformFeePercentage}%):</span>
              <span className="font-mono text-amber-300 font-semibold">${platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>Salon Net Payout:</span>
              <span className="font-mono text-white font-semibold">
                ${(total - platformFee).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-neutral-300 font-semibold text-neutral-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              Issue Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
