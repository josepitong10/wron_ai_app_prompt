import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PhoneCall,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Send,
  Smartphone,
} from 'lucide-react';

export const AutomationCenter: React.FC = () => {
  const {
    automations,
    missedCalls,
    simulateMissedCall,
    simulateReminderAction,
    business,
    setViewMode,
  } = useApp();

  const [testCallerName, setTestCallerName] = useState('Brandon Lee (Potential Client)');
  const [testCallerPhone, setTestCallerPhone] = useState('(555) 492-8819');

  const handleTestCall = (e: React.FormEvent) => {
    e.preventDefault();
    simulateMissedCall(testCallerPhone, testCallerName);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-neutral-900 text-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base font-bold text-white">
                Revenue Protection & Anti-No-Show Automations
              </h2>
            </div>
            <p className="text-xs text-neutral-300 mt-1 max-w-xl">
              Solves the #1 and #3 problems for groomers: missed calls while hands are soapy, and no-shows from forgotten appointments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 font-semibold">
              Twilio SMS Engine: Online
            </span>
          </div>
        </div>
      </div>

      {/* 2 Interactive Feature Simulators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simulator 1: Missed-Call Text-Back */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Missed-Call Instant Auto-Text
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Triggered when a call goes to voicemail
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Instant Lead Save
            </span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            62% of pet owners who get voicemail call the next groomer on Google. GroomPulse texts them in &lt; 5 seconds with a direct booking link so they schedule before calling a competitor.
          </p>

          <form onSubmit={handleTestCall} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="text-[11px] font-bold text-neutral-700 uppercase">
              Simulate Inbound Missed Call
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={testCallerName}
                onChange={(e) => setTestCallerName(e.target.value)}
                placeholder="Caller Name"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs bg-white"
              />
              <input
                type="text"
                value={testCallerPhone}
                onChange={(e) => setTestCallerPhone(e.target.value)}
                placeholder="Caller Phone"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Simulate Unanswered Call & Auto-Text</span>
            </button>
          </form>

          {/* Recent Missed Call Logs */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-500 uppercase">Recent Auto-Responses</span>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {missedCalls.map((call) => (
                <div key={call.id} className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-neutral-900">
                    <span>{call.callerName || call.callerNumber}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">{call.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 italic bg-white p-2 rounded border border-neutral-100">
                    "{call.autoTextMessage}"
                  </p>
                  <div className="flex justify-between items-center pt-1 text-[10px]">
                    <span className="text-emerald-700 font-medium">Delivered via Twilio</span>
                    <button
                      onClick={() => setViewMode('customer_booking')}
                      className="text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span>Test Booking Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Simulator 2: Automated 24-hr Reminders & 1-Tap Action */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  24-Hour Automated SMS Reminders
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Interactive 1-tap confirmation reduces no-shows to &lt; 2%
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Zero-No-Show
            </span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            Customers receive a friendly SMS the day before. They can reply "C" to verify attendance or click to reschedule, updating the calendar automatically.
          </p>

          {/* Interactive Simulated Smartphone Bubble */}
          <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-neutral-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
                <span>Simulated Client iPhone (Jessica Vance)</span>
              </span>
              <span className="font-mono">Yesterday 6:00 PM</span>
            </div>

            <div className="bg-neutral-800 p-3 rounded-xl rounded-tl-none border border-neutral-700 text-xs leading-relaxed text-neutral-200">
              Hi Jessica! Charlie's Full Haircut & Spa is tomorrow at 9:00 AM with Sarah at {business.businessName}. Please tap below to confirm your spot or reschedule:
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => simulateReminderAction('msg-1', 'apt-1', 'confirmed')}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tap to Confirm Attendance</span>
              </button>
              <button
                onClick={() => simulateReminderAction('msg-1', 'apt-1', 'rescheduled')}
                className="py-2 px-3 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-200 text-xs font-medium transition-colors"
              >
                Reschedule
              </button>
            </div>
          </div>

          {/* Dispatch Log */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-500 uppercase">Recent Dispatches</span>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {automations.map((msg) => (
                <div key={msg.id} className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-neutral-900">
                    <span>{msg.recipientName} ({msg.recipientPhone})</span>
                    <span className="text-[10px] text-neutral-400">{msg.sentAt}</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">{msg.messageText}</p>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-neutral-200/50">
                    <span className="text-neutral-500 capitalize">{msg.type.replace(/_/g, ' ')}</span>
                    {msg.actionTaken ? (
                      <span className="text-emerald-700 font-bold capitalize bg-emerald-50 px-2 py-0.5 rounded">
                        Action: {msg.actionTaken}
                      </span>
                    ) : (
                      <span className="text-neutral-400">Awaiting customer response</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
