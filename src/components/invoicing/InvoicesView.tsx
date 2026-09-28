import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice } from '../../types';
import {
  DollarSign,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Plus,
  Receipt,
  Sparkles,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

interface InvoicesViewProps {
  onOpenCreateInvoice?: () => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = () => {
  const { invoices, payInvoice, business, showToast } = useApp();
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all');
  const [activePaymentInvoice, setActivePaymentInvoice] = useState<Invoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');
  const [tipRate, setTipRate] = useState<number>(20);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredInvoices = invoices.filter((i) => {
    if (filter === 'unpaid') return i.status === 'unpaid';
    if (filter === 'paid') return i.status === 'paid';
    return true;
  });

  const totalCollected = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.total, 0);

  const totalUnpaid = invoices
    .filter((i) => i.status === 'unpaid')
    .reduce((sum, i) => sum + i.total, 0);

  const totalPlatformFees = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + (i.platformFeeAmount || 0), 0);

  const handlePay = () => {
    if (!activePaymentInvoice) return;
    setIsProcessing(true);

    setTimeout(() => {
      payInvoice(activePaymentInvoice.id, paymentMethod);
      setIsProcessing(false);
      setActivePaymentInvoice(null);
    }, 1200);
  };

  const handleSendReminderSMS = (inv: Invoice) => {
    showToast(
      'Payment Link Texted',
      `Sent instant 1-tap card checkout link to ${inv.customerPhone}`,
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Platform Fee & Monetization Banner (Explaining SaaS take rate clearly) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 text-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                Vertical SaaS Monetization Engine
              </h3>
            </div>
            <p className="text-xs text-neutral-300 mt-1 max-w-xl">
              GroomPulse charges ${business.monthlySubscriptionPrice}/month base subscription + a{' '}
              <strong className="text-emerald-400 font-mono">{business.platformFeePercentage}% SaaS take fee</strong> on processed client card transactions via Stripe Connect.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-neutral-800/80 px-4 py-2.5 rounded-xl border border-neutral-700 font-mono tabular-nums shrink-0">
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase">Platform Fees Accrued</span>
              <span className="text-base font-bold text-emerald-400">${totalPlatformFees.toFixed(2)}</span>
            </div>
            <div className="h-7 w-px bg-neutral-700" />
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase">Total GMV</span>
              <span className="text-base font-bold text-white">${totalCollected.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs">
          <div className="text-xs font-medium text-neutral-500 mb-1">Paid Invoices</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
            ${totalCollected.toFixed(2)}
          </div>
          <div className="text-xs text-emerald-700 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Funds transferred to salon account</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs">
          <div className="text-xs font-medium text-neutral-500 mb-1">Outstanding / Unpaid</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-600">
            ${totalUnpaid.toFixed(2)}
          </div>
          <div className="text-xs text-amber-700 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{invoices.filter((i) => i.status === 'unpaid').length} awaiting collection</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs">
          <div className="text-xs font-medium text-neutral-500 mb-1">Average Ticket</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
            ${(invoices.length > 0 ? (totalCollected + totalUnpaid) / invoices.length : 0).toFixed(2)}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Includes grooming add-ons & tips
          </div>
        </div>
      </div>

      {/* Invoices List Header & Filters */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs font-medium">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filter === 'all' ? 'bg-white text-neutral-900 shadow-xs font-bold' : 'text-neutral-600'
            }`}
          >
            All ({invoices.length})
          </button>
          <button
            onClick={() => setFilter('unpaid')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filter === 'unpaid' ? 'bg-white text-neutral-900 shadow-xs font-bold' : 'text-neutral-600'
            }`}
          >
            Unpaid ({invoices.filter((i) => i.status === 'unpaid').length})
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filter === 'paid' ? 'bg-white text-neutral-900 shadow-xs font-bold' : 'text-neutral-600'
            }`}
          >
            Paid ({invoices.filter((i) => i.status === 'paid').length})
          </button>
        </div>

        <div className="text-xs text-neutral-500">
          Showing {filteredInvoices.length} invoices
        </div>
      </div>

      {/* Invoice Table / Cards */}
      <div className="space-y-3">
        {filteredInvoices.map((inv) => (
          <div
            key={inv.id}
            className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200/90 shadow-xs hover:border-neutral-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-neutral-500 uppercase">
                  #{inv.id}
                </span>
                <span className="text-base font-bold text-neutral-900">{inv.customerName}</span>
                <span className="text-xs text-neutral-500 font-medium">({inv.petName})</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    inv.status === 'paid'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {inv.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                <span>Issued: {inv.issuedDate}</span>
                <span>·</span>
                {inv.paidDate ? (
                  <span className="text-emerald-700">Paid: {inv.paidDate}</span>
                ) : (
                  <span className="text-amber-700">Due on completion</span>
                )}
                {inv.platformFeeAmount > 0 && (
                  <>
                    <span>·</span>
                    <span className="font-mono text-[11px] text-neutral-500">
                      SaaS Fee: ${inv.platformFeeAmount.toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <div className="mt-2 text-xs text-neutral-600">
                {inv.items.map((it) => (
                  <span key={it.id} className="inline-block mr-2">
                    {it.description} (${it.unitPrice})
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="text-right">
                <div className="text-lg font-mono font-bold text-neutral-900 tabular-nums">
                  ${inv.total.toFixed(2)}
                </div>
                {inv.tip > 0 && (
                  <div className="text-[11px] font-mono text-emerald-600">
                    Includes ${inv.tip} tip
                  </div>
                )}
              </div>

              {inv.status === 'unpaid' ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSendReminderSMS(inv)}
                    className="p-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold"
                    title="Send SMS Payment Link"
                  >
                    <Send className="w-4 h-4 text-neutral-600" />
                  </button>
                  <button
                    onClick={() => setActivePaymentInvoice(inv)}
                    className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 active:scale-[0.98]"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                    <span>Collect Payment</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold px-3 py-1.5 rounded-lg bg-emerald-50">
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Receipt Sent</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Collect Payment / Virtual Terminal Modal */}
      {activePaymentInvoice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Collect Payment</h3>
                <p className="text-xs text-neutral-500 font-mono">Invoice #{activePaymentInvoice.id}</p>
              </div>
              <button
                onClick={() => setActivePaymentInvoice(null)}
                className="text-neutral-400 hover:text-neutral-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Invoice Line Item Breakdown */}
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
              <div className="flex justify-between font-bold text-neutral-900">
                <span>{activePaymentInvoice.petName}</span>
                <span className="font-mono">${activePaymentInvoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Sales Tax (9.8%)</span>
                <span className="font-mono">${activePaymentInvoice.tax.toFixed(2)}</span>
              </div>
              {activePaymentInvoice.tip > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Groomer Tip</span>
                  <span className="font-mono">${activePaymentInvoice.tip.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-500 text-[10px] pt-1 border-t border-neutral-200 font-mono">
                <span>Platform take ({business.platformFeePercentage}%):</span>
                <span>${activePaymentInvoice.platformFeeAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-base text-neutral-900 pt-1 border-t border-neutral-200">
                <span>Total Due</span>
                <span className="font-mono">${activePaymentInvoice.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1.5">
                Payment Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card / Stripe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-700'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>In-Person Cash</span>
                </button>
              </div>
            </div>

            {/* Security footnote */}
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulating Stripe Connect embedded checkout flow</span>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
            >
              {isProcessing
                ? 'Processing Transaction...'
                : `Process $${activePaymentInvoice.total.toFixed(2)} & Send Receipt`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
