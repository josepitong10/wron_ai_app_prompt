import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PetSize, Appointment } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Heart,
  Scissors,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CustomerBookingPortal: React.FC = () => {
  const { business, services, staff, addAppointment, setViewMode } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('Goldendoodle');
  const [petSize, setPetSize] = useState<PetSize>('medium');
  const [petWeight, setPetWeight] = useState('32');
  const [temperament, setTemperament] = useState('Friendly, slightly nervous for dryer');
  const [isVaccinated, setIsVaccinated] = useState(true);

  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || 'srv-1');
  const [selectedStaffId, setSelectedStaffId] = useState<string>('any');

  const [selectedDate, setSelectedDate] = useState('2026-09-29');
  const [selectedTime, setSelectedTime] = useState('10:00');

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [completedBooking, setCompletedBooking] = useState<Appointment | null>(null);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const assignedStaff =
    selectedStaffId === 'any'
      ? staff[0]
      : staff.find((s) => s.id === selectedStaffId) || staff[0];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName || !ownerName || !ownerPhone) {
      alert('Please fill in your pet name, your name, and phone number.');
      return;
    }

    const newApt = addAppointment({
      customerId: 'cust-online-' + Date.now(),
      customerName: ownerName,
      customerPhone: ownerPhone,
      customerEmail: ownerEmail || `${petName.toLowerCase()}@client.com`,
      petId: 'pet-online-' + Date.now(),
      petName,
      petBreed,
      petSize,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      staffId: assignedStaff.id,
      staffName: assignedStaff.name,
      date: selectedDate,
      startTime: selectedTime,
      durationMinutes: selectedService.durationMinutes,
      price: selectedService.basePrice,
      status: 'pending',
      notes: specialInstructions || temperament,
    });

    setCompletedBooking(newApt);
    setStep(5);

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  };

  const timeOptions = ['09:00', '10:30', '11:45', '13:15', '14:30', '16:00'];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Brand & Trust Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Frictionless Booking · No Account Required</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Book Grooming at {business.businessName}
        </h1>
        <p className="text-sm text-neutral-600 mt-1.5 max-w-md mx-auto">
          {business.address} · {business.phone}
        </p>
      </div>

      {/* Progress Dots */}
      {step < 5 && (
        <div className="mb-6 flex items-center justify-between text-xs font-semibold text-neutral-500 border-b border-neutral-200 pb-3">
          <span className={step === 1 ? 'text-emerald-700 font-bold' : ''}>
            1. Pet Profile
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className={step === 2 ? 'text-emerald-700 font-bold' : ''}>
            2. Service
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className={step === 3 ? 'text-emerald-700 font-bold' : ''}>
            3. Date & Time
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className={step === 4 ? 'text-emerald-700 font-bold' : ''}>
            4. Details
          </span>
        </div>
      )}

      {/* Step 1: Pet Profile */}
      {step === 1 && (
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold text-neutral-900">Tell us about your pup</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                Pet Name *
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="e.g. Milo"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                Dog Breed *
              </label>
              <input
                type="text"
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
                placeholder="e.g. Goldendoodle, Frenchie, Poodle"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">
              Pet Size Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'small', label: 'Small', desc: '< 22 lbs' },
                  { id: 'medium', label: 'Medium', desc: '22-50 lbs' },
                  { id: 'large', label: 'Large', desc: '51-85 lbs' },
                  { id: 'giant', label: 'Giant', desc: '85+ lbs' },
                ] as const
              ).map((sz) => (
                <button
                  type="button"
                  key={sz.id}
                  onClick={() => setPetSize(sz.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    petSize === sz.id
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="block text-xs font-bold text-neutral-900">{sz.label}</span>
                  <span className="block text-[11px] text-neutral-500">{sz.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Temperament & Quirks
            </label>
            <input
              type="text"
              value={temperament}
              onChange={(e) => setTemperament(e.target.value)}
              placeholder="e.g. Loves belly rubs, scared of nail clippers"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="vax"
              checked={isVaccinated}
              onChange={(e) => setIsVaccinated(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
            />
            <label htmlFor="vax" className="text-xs font-medium text-neutral-700 cursor-pointer">
              Up-to-date on Rabies and core vaccinations
            </label>
          </div>

          <button
            type="button"
            disabled={!petName}
            onClick={() => setStep(2)}
            className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all flex items-center justify-center gap-2 ${
              petName ? 'bg-neutral-900 hover:bg-neutral-800' : 'bg-neutral-300 cursor-not-allowed'
            }`}
          >
            <span>Continue to Select Service</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Select Service & Add-ons */}
      {step === 2 && (
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-neutral-900">Choose Service for {petName}</h2>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-neutral-500 hover:text-neutral-800 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          <div className="space-y-3">
            {services.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedServiceId === srv.id
                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <span className="text-sm font-bold text-neutral-900 block">{srv.name}</span>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{srv.description}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-500 mt-2">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {srv.durationMinutes} minutes
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-extrabold text-neutral-900 font-mono tabular-nums block">
                      ${srv.basePrice}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">base price</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Choose Date & Groomer</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 3: Date, Time & Groomer */}
      {step === 3 && (
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-neutral-900">Select Date & Time</h2>
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-neutral-500 hover:text-neutral-800 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          {/* Groomer selection */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">
              Preferred Groomer
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setSelectedStaffId('any')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedStaffId === 'any'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <span className="block text-xs font-bold text-neutral-900">Any Available</span>
                <span className="block text-[10px] text-neutral-500">Fastest opening</span>
              </button>

              {staff.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSelectedStaffId(s.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedStaffId === s.id
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="block text-xs font-bold text-neutral-900 truncate">{s.name.split(' ')[0]}</span>
                  <span className="block text-[10px] text-neutral-500 truncate">{s.role.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">
              Date
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                { date: '2026-09-28', label: 'Today', day: 'Mon 28' },
                { date: '2026-09-29', label: 'Tomorrow', day: 'Tue 29' },
                { date: '2026-09-30', label: 'Wed', day: 'Wed 30' },
                { date: '2026-10-01', label: 'Thu', day: 'Thu 1' },
                { date: '2026-10-02', label: 'Fri', day: 'Fri 2' },
              ].map((d) => (
                <button
                  type="button"
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedDate === d.date
                      ? 'border-emerald-600 bg-emerald-600 text-white font-bold'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                  }`}
                >
                  <span className="block text-[10px] opacity-80">{d.label}</span>
                  <span className="block text-xs font-bold">{d.day}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">
              Available Arrival Slots
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeOptions.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 rounded-xl border text-center text-xs font-mono font-bold transition-all ${
                    selectedTime === time
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(4)}
            className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Review & Enter Contact</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 4: Contact Info & Confirm */}
      {step === 4 && (
        <form onSubmit={handleCompleteBooking} className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-neutral-900">Your Contact Details</h2>
            </div>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-xs text-neutral-500 hover:text-neutral-800 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          {/* Appointment Summary Strip */}
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
            <div className="flex justify-between font-bold text-neutral-900">
              <span>{petName} · {selectedService.name}</span>
              <span className="font-mono">${selectedService.basePrice}</span>
            </div>
            <div className="text-neutral-500 flex items-center gap-3">
              <span>{selectedDate} at {selectedTime}</span>
              <span>·</span>
              <span>Groomer: {assignedStaff.name}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Owner Full Name *
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="e.g. Taylor Smith"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                Mobile Phone (for SMS updates) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="taylor@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Special Grooming Instructions or Coat Requests
            </label>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Please leave tail fluffy, trim nails as short as safe"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-bold block">✓ Instant Confirmation & Automated Reminders</span>
            <p className="text-[11px] text-emerald-800 leading-normal">
              You will receive an instant SMS confirmation and a 24-hour reminder with 1-tap reschedule. No prepayment required!
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md active:scale-[0.98]"
          >
            Confirm Booking for {petName}
          </button>
        </form>
      )}

      {/* Step 5: Confirmation Success Screen */}
      {step === 5 && completedBooking && (
        <div className="p-8 rounded-2xl bg-white border border-neutral-200/90 shadow-sm text-center space-y-5">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-neutral-900">
              You're All Booked! 🐾
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              {completedBooking.petName} is booked for {completedBooking.serviceName}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-left space-y-2 text-xs max-w-md mx-auto">
            <div className="flex justify-between font-bold text-neutral-900 border-b border-neutral-200 pb-2">
              <span>Appointment ID:</span>
              <span className="font-mono">{completedBooking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Date & Time:</span>
              <span className="font-semibold text-neutral-800">{completedBooking.date} at {completedBooking.startTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Assigned Groomer:</span>
              <span className="font-semibold text-neutral-800">{completedBooking.staffName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Base Price:</span>
              <span className="font-mono font-bold text-neutral-900">${completedBooking.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">SMS Notifications to:</span>
              <span className="font-mono text-neutral-700">{completedBooking.customerPhone}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 text-left flex items-start gap-2.5 max-w-md mx-auto">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Simulated SMS Sent:</strong> An automated confirmation SMS has been dispatched to {completedBooking.customerPhone}. Check the <em>Owner & Staff App</em> to view this appointment on the live calendar!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
            <button
              onClick={() => setViewMode('owner_app')}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors"
            >
              Switch to Salon Staff Calendar
            </button>
            <button
              onClick={() => {
                setStep(1);
                setPetName('');
                setOwnerName('');
                setCompletedBooking(null);
              }}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-xs hover:bg-neutral-50 transition-colors"
            >
              Book Another Pup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
