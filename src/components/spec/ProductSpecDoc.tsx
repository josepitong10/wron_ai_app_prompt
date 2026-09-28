import React from 'react';
import {
  FileText,
  AlertTriangle,
  Layers,
  Database,
  Smartphone,
  Calendar,
  HelpCircle,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';

export const ProductSpecDoc: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Title Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <FileText className="w-3.5 h-3.5 text-emerald-600" />
          <span>Product Architecture Document & Execution Plan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
          GroomPulse: Vertical SaaS Architecture & MVP Blueprint
        </h1>
        <p className="text-sm text-neutral-600 mt-2 max-w-2xl leading-relaxed">
          The unified scheduling, client CRM, automated reminder, and billing engine built specifically for independent pet groomers and mobile grooming vans (1-10 staff).
        </p>
      </div>

      {/* Clarifying Questions Callout */}
      <section className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-700" />
          <h2 className="text-base font-bold text-amber-950">
            3 Strategic Clarifying Questions for Ongoing Scale
          </h2>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          While we have built and booted the fully functioning MVP right now, these 3 architectural decisions will shape Weeks 3–6 of your production rollout:
        </p>
        <ol className="list-decimal list-inside text-xs text-amber-900 space-y-2 font-medium">
          <li>
            <strong>Mobile Groomer Route Optimization:</strong> Do any of your target shops run mobile grooming vans? If yes, should we integrate Google Maps Platform route clustering in Phase 2 to minimize travel drive times between houses?
          </li>
          <li>
            <strong>Payment Capture Model:</strong> Should card details be held on file at booking time (card pre-authorization/deposit with Stripe SetupIntents) to enforce a $25 no-show/late cancellation fee, or do you prefer zero-prepayment for maximum booking conversion?
          </li>
          <li>
            <strong>Phone System Architecture:</strong> For missed-call text-back, will groomers forward their existing business phone number via conditional call forwarding (`*71` / `*68`) to our Twilio virtual number, or port their main phone number to our platform?
          </li>
        </ol>
      </section>

      {/* Section 1: One-Page Product Summary & 3 Biggest Risks */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-neutral-900">
            1. One-Page Product Summary & The 3 Biggest Risks
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-4 text-xs leading-relaxed text-neutral-700">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1">Executive Summary</h3>
            <p>
              GroomPulse is an all-in-one vertical SaaS solution tailored for pet grooming salons and mobile groomers (1–10 employees). Small pet business owners are non-technical, operate with wet hands on phones/tablets, and lose thousands of dollars annually to:
              (1) no-shows, (2) missed inbound calls while grooming, (3) delayed payments and cash leakages, and (4) scattered paper records of pet behavioral quirks and vaccinations.
              GroomPulse delivers frictionless client booking (no account required), 24/7 automated missed-call SMS text-back with direct scheduling links, interactive 1-tap reminders, and embedded payment collection with a 0.8% SaaS platform take-rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="font-bold text-neutral-900 block mb-1">Target Customer</span>
              <p className="text-neutral-600">
                1–10 employee pet grooming shops and mobile groomers using paper notebooks or generic Calendly/Square apps.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="font-bold text-neutral-900 block mb-1">Pricing Model</span>
              <p className="text-neutral-600">
                $79–$129/mo recurring subscription + 0.8% SaaS platform fee on all processed card payments.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="font-bold text-neutral-900 block mb-1">Core Value Proposition</span>
              <p className="text-neutral-600">
                Reduces no-shows by 85%, recovers 3–5 lost call leads weekly, cuts check-in time to under 15 seconds.
              </p>
            </div>
          </div>

          {/* 3 Biggest Risks */}
          <div className="pt-3 border-t border-neutral-100">
            <h3 className="text-sm font-bold text-neutral-900 mb-2 flex items-center gap-1.5 text-rose-700">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>The 3 Biggest Risks & Mitigations</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                <strong className="text-rose-950 font-bold block mb-0.5">
                  Risk 1: Groomer Onboarding Friction & Abandonment
                </strong>
                <p className="text-neutral-700">
                  <em>The Threat:</em> Groomers are not tech-savvy. If setup takes longer than 15 minutes or requires configuring complex calendar rules, they default back to paper books.<br />
                  <em>Mitigation:</em> 4-step rapid onboarding wizard pre-populated with standard pet grooming packages (Full Haircut, Bath & Brush, De-Shed), standard breed size weights, and pre-written SMS templates.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                <strong className="text-rose-950 font-bold block mb-0.5">
                  Risk 2: SMS Spam/A2P 10DLC Regulations & Carrier Filtering
                </strong>
                <p className="text-neutral-700">
                  <em>The Threat:</em> US telecom carriers block automated texts from unregistered numbers or spam-flagged booking links.<br />
                  <em>Mitigation:</em> Automated Twilio Brand & Campaign A2P 10DLC registration bundled into onboarding; use custom branded subdomains and clean transactional templates.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                <strong className="text-rose-950 font-bold block mb-0.5">
                  Risk 3: Variable Job Duration & Pet Coat Surprises
                </strong>
                <p className="text-neutral-700">
                  <em>The Threat:</em> A matted Goldendoodle takes 2.5 hours instead of 75 minutes, wrecking the day's schedule.<br />
                  <em>Mitigation:</em> Pet size & breed-based duration multipliers during online booking; prominent "Matted Coat / Flea Bath" quick upcharge toggles on the tablet invoice screen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Prioritized Feature Matrix (MVP vs Later) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-neutral-900">
            2. Prioritized Feature Matrix: MVP vs. Phase 2
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
              <span className="font-extrabold text-sm text-emerald-950">
                MVP Scope (Weeks 1–4) — High Priority
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Built & Working
              </span>
            </div>
            <ul className="text-xs text-neutral-700 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No-Account Online Booking:</strong> Customers choose pet, breed, service, groomer, and time slot without sign-in friction.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Groomer Day/Week Calendar:</strong> Multi-staff lanes, rapid appointment drag-free stage advancement (In Tub, Table Groom, Ready for Pickup).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Pet CRM Dossier:</strong> Pet breed, weight, temperament alerts ("needs muzzle for nails"), rabies expiry, and visit history.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Missed-Call Instant Text-Back:</strong> Auto-sends SMS with booking link within 5 seconds of an unanswered call.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Automated 24h SMS Reminders:</strong> Interactive 1-tap confirm or reschedule actions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Invoicing & Stripe Connect Payouts:</strong> 1-click invoice creation with tip selection and 0.8% SaaS take-rate fee accounting.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <span className="font-extrabold text-sm text-neutral-900">
                Phase 2 & Scale (Weeks 5+) — Later
              </span>
              <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                Post-Validation
              </span>
            </div>
            <ul className="text-xs text-neutral-600 space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span><strong>Mobile Grooming GPS Route Optimization:</strong> Cluster appointments geographically to save van gas and drive time.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span><strong>Card-on-File No-Show Protection:</strong> Pre-authorize card at booking; charge $25 fee automatically if client ghosts.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span><strong>Automated Re-booking Reminders:</strong> "Charlie is due for a trim! It's been 6 weeks since his last bath."</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span><strong>Staff Commission Payroll:</strong> Calculate groomer tip splits and 45/55% revenue commission automatically.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span><strong>Before & After Grooming Photo Gallery:</strong> Text cute portrait photos to owners upon pickup for Google Reviews.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Database Schema & Core User Flows */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-neutral-900">
            3. Relational Database Schema & Core User Flows
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 text-neutral-200 font-mono text-xs overflow-x-auto shadow-xs space-y-4">
          <div className="text-emerald-400 font-bold">
            -- PostgreSQL Relational Schema for GroomPulse
          </div>

          <pre className="text-[11px] leading-relaxed text-neutral-300">
{`CREATE TABLE salons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  booking_slug VARCHAR(64) UNIQUE NOT NULL,
  stripe_account_id VARCHAR(128),
  platform_fee_percent NUMERIC(4, 2) DEFAULT 0.80,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  name VARCHAR(128) NOT NULL,
  role VARCHAR(64) NOT NULL,
  color_code VARCHAR(16) DEFAULT '#10B981',
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  name VARCHAR(128) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(128),
  notes TEXT,
  total_spend NUMERIC(10, 2) DEFAULT 0.00
);

CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  name VARCHAR(64) NOT NULL,
  breed VARCHAR(128) NOT NULL,
  size VARCHAR(16) CHECK (size IN ('small', 'medium', 'large', 'giant')),
  weight_lbs NUMERIC(5, 1),
  coat_type VARCHAR(128),
  temperament TEXT,
  special_handling_notes TEXT,
  rabies_expiry_date DATE,
  is_vaccinated BOOLEAN DEFAULT TRUE
);

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  pet_id UUID REFERENCES pets(id),
  staff_id UUID REFERENCES staff(id),
  service_name VARCHAR(128) NOT NULL,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  duration_minutes INT DEFAULT 60,
  price NUMERIC(10, 2) NOT NULL,
  status VARCHAR(32) CHECK (status IN ('pending', 'confirmed', 'in_tub', 'grooming', 'ready_for_pickup', 'completed', 'cancelled')),
  notes TEXT
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES salons(id),
  appointment_id UUID REFERENCES appointments(id),
  customer_id UUID REFERENCES customers(id),
  subtotal NUMERIC(10, 2) NOT NULL,
  tip NUMERIC(10, 2) DEFAULT 0.00,
  tax NUMERIC(10, 2) DEFAULT 0.00,
  total NUMERIC(10, 2) NOT NULL,
  platform_fee NUMERIC(10, 2) NOT NULL, -- e.g. 0.8% SaaS fee
  status VARCHAR(16) CHECK (status IN ('unpaid', 'paid', 'refunded')),
  stripe_payment_intent_id VARCHAR(128),
  paid_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE missed_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES salons(id),
  caller_number VARCHAR(32) NOT NULL,
  auto_text_sent BOOLEAN DEFAULT TRUE,
  converted_to_booking BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
          </pre>
        </div>

        {/* User Flows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs space-y-2">
            <strong className="text-sm font-bold text-neutral-900 block">
              Core Flow A: Zero-Friction Customer Booking
            </strong>
            <p className="text-neutral-600">
              1. Customer opens <code>groompulse.app/[shop-name]</code> (from Instagram, Google Maps, or auto-text).<br />
              2. Inputs pet name, breed & weight (auto-selects duration).<br />
              3. Selects service & optional groomer.<br />
              4. Picks available time slot & enters phone number.<br />
              5. Instant SMS confirmation dispatched with 1-tap reschedule link.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs space-y-2">
            <strong className="text-sm font-bold text-neutral-900 block">
              Core Flow B: Missed-Call Lead Recovery
            </strong>
            <p className="text-neutral-600">
              1. Pet owner calls salon; groomer cannot answer due to blow dryer noise.<br />
              2. Call disconnects or hits voicemail.<br />
              3. GroomPulse webhook receives Twilio <code>CallStatus=no-answer</code>.<br />
              4. Server dispatches SMS in &lt; 5s: <em>"Hands soapy with pups right now! Book here in 60s: [link]"</em>.<br />
              5. Owner clicks link and completes booking.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Screen-by-Screen UI Outline (Mobile-First) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-neutral-900">
            4. Screen-by-Screen UI Outline (Mobile & Tablet First)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-900 text-sm block">1. Today's Queue (Home)</span>
            <p className="text-neutral-600">
              Thumb-friendly list of today's dogs with 1-tap stage advancement: <em>"Start Bath" → "Table Groom" → "Ready & Text Owner" → "Create Invoice"</em>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-900 text-sm block">2. Multi-Groomer Calendar</span>
            <p className="text-neutral-600">
              Side-by-side groomer column view for iPad/tablet or single-day scroll on mobile. Quick slot availability indicators.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-900 text-sm block">3. Pet & Owner Dossier</span>
            <p className="text-neutral-600">
              Quick search by pet name or phone number. Shows rabies expiration badge, temperament notes, past haircut styles, and total GMV.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-900 text-sm block">4. Invoicing & Terminal</span>
            <p className="text-neutral-600">
              1-tap invoice generated from appointment. Embedded card payment, Apple Pay, tip buttons (15%, 20%, 25%), and digital SMS receipt.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-900 text-sm block">5. Automation Center</span>
            <p className="text-neutral-600">
              Live feed of auto-texts sent for missed calls, 24h confirmations, and ready-for-pickup alerts with response metrics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-900 text-sm block">6. Client Booking Portal</span>
            <p className="text-neutral-600">
              Public frictionless mobile web page. No password or registration wall. 60-second completion with instant calendar sync.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Step-by-Step 4-6 Week Build Plan */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-neutral-900">
            5. Step-by-Step 4-6 Week Execution Roadmap
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">
              W1
            </div>
            <div>
              <strong className="text-sm font-bold text-neutral-900 block">
                Week 1: Core Booking Flow & Calendar Dispatch
              </strong>
              <p className="text-neutral-600 mt-0.5">
                Build the client self-booking portal, multi-staff day/week calendar, and customer/pet data models with pet breed & weight multipliers. (Completed in this MVP!)
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">
              W2
            </div>
            <div>
              <strong className="text-sm font-bold text-neutral-900 block">
                Week 2: Missed-Call Webhook & SMS Notification Engine
              </strong>
              <p className="text-neutral-600 mt-0.5">
                Integrate Twilio Voice webhook for unanswered calls, instant auto-SMS dispatch, 24-hour reminder cron jobs, and 1-tap confirm/reschedule action handlers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">
              W3
            </div>
            <div>
              <strong className="text-sm font-bold text-neutral-900 block">
                Week 3: Invoicing, Stripe Connect & 0.8% SaaS Fee Split
              </strong>
              <p className="text-neutral-600 mt-0.5">
                Stripe Connect standard onboarding for salon owners, digital invoice creation, tip handling, Apple Pay / Card payments, and platform fee transfers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">
              W4
            </div>
            <div>
              <strong className="text-sm font-bold text-neutral-900 block">
                Week 4: 15-Minute Onboarding Flow & Mobile PWA Polish
              </strong>
              <p className="text-neutral-600 mt-0.5">
                Package the mobile-first UI with 48px touch targets, offline safety, service pricing defaults, and QR code generation for counter check-in.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 font-bold flex items-center justify-center shrink-0">
              W5-6
            </div>
            <div>
              <strong className="text-sm font-bold text-neutral-900 block">
                Weeks 5–6: Pilot Testing with 3 Beta Groomers & Launch
              </strong>
              <p className="text-neutral-600 mt-0.5">
                Shadow 3 local dog grooming shops, observe check-in friction, tune SMS template copy for 95%+ confirmation rate, and launch $89/month self-serve subscription.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
