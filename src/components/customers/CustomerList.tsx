import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Customer, Pet } from '../../types';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Heart,
  Calendar,
  DollarSign,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
  Scissors,
} from 'lucide-react';

interface CustomerListProps {
  onSelectCustomer?: (customer: Customer) => void;
  onBookForCustomer?: (customer: Customer, pet: Pet) => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({ onBookForCustomer }) => {
  const { customers, appointments, addCustomerWithPet } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(customers[0]?.id || null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Customer Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState<'small' | 'medium' | 'large' | 'giant'>('medium');
  const [weightLbs, setWeightLbs] = useState('30');
  const [coatType, setCoatType] = useState('Curly doodle coat');
  const [temperament, setTemperament] = useState('Gentle, friendly');
  const [specialNotes, setSpecialNotes] = useState('');
  const [rabiesDate, setRabiesDate] = useState('2027-04-15');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.pets.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.breed.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !petName || !breed) {
      alert('Please fill in required fields (Customer Name, Phone, Pet Name, Breed).');
      return;
    }

    const created = addCustomerWithPet(
      {
        name,
        phone,
        email: email || `${petName.toLowerCase()}@client.com`,
        notes,
        pets: [],
      },
      {
        name: petName,
        breed,
        size,
        weightLbs: Number(weightLbs) || 30,
        ageYears: 3,
        coatType,
        temperament,
        specialNotes,
        rabiesExpiryDate: rabiesDate,
        isVaccinated: true,
      }
    );

    setSelectedCustomerId(created.id);
    setIsAddModalOpen(false);
    // Reset form
    setName('');
    setPhone('');
    setEmail('');
    setPetName('');
    setBreed('');
  };

  // Get appointments for selected customer
  const customerAppointments = activeCustomer
    ? appointments.filter((a) => a.customerId === activeCustomer.id)
    : [];

  return (
    <div className="space-y-4 pb-12">
      {/* Top Search & Actions */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer, phone, or pet breed..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-neutral-50"
          />
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>New Customer & Pet</span>
        </button>
      </div>

      {/* 2-Column Split: Customer Directory & Pet Record Detail */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Directory List */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-neutral-500 uppercase px-1">
            Client Directory ({filteredCustomers.length})
          </div>

          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {filteredCustomers.map((cust) => {
              const isSelected = cust.id === activeCustomer?.id;
              return (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomerId(cust.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-sm">{cust.name}</span>
                    <span
                      className={`text-[11px] font-mono tabular-nums ${
                        isSelected ? 'text-emerald-400' : 'text-emerald-700'
                      }`}
                    >
                      ${cust.totalSpend}
                    </span>
                  </div>

                  <div className={`mt-1 flex items-center gap-2 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    <span>{cust.phone}</span>
                    <span>·</span>
                    <span>{cust.totalVisits} visits</span>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    {cust.pets.map((p) => (
                      <span
                        key={p.id}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isSelected
                            ? 'bg-neutral-800 text-neutral-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                        }`}
                      >
                        🐾 {p.name} ({p.breed})
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Customer & Pet Detailed Dossier */}
        <div className="md:col-span-2 space-y-4">
          {activeCustomer ? (
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-6">
              {/* Customer Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">{activeCustomer.name}</h2>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      {activeCustomer.phone}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      {activeCustomer.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right sm:pr-2">
                    <div className="text-xs text-neutral-400">Lifetime GMV</div>
                    <div className="text-base font-extrabold font-mono text-emerald-700 tabular-nums">
                      ${activeCustomer.totalSpend}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pets Section (Niche-specific fields) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Pet Dossier ({activeCustomer.pets.length})</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {activeCustomer.pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-extrabold text-neutral-900">
                              {pet.name}
                            </span>
                            <span className="text-xs text-neutral-600 font-medium">
                              {pet.breed}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-700">
                              {pet.size} ({pet.weightLbs} lbs)
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Coat: {pet.coatType} · Age: {pet.ageYears} yrs
                          </p>
                        </div>

                        {onBookForCustomer && (
                          <button
                            onClick={() => onBookForCustomer(activeCustomer, pet)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Book Visit</span>
                          </button>
                        )}
                      </div>

                      {/* Behavioral & Grooming Notes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-white border border-neutral-200/60">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-0.5">
                            Temperament
                          </span>
                          <span className="text-neutral-800 font-medium">{pet.temperament}</span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-neutral-200/60">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-0.5">
                            Rabies Expiration
                          </span>
                          <span className="text-emerald-700 font-bold font-mono flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            {pet.rabiesExpiryDate || 'Verified Valid'}
                          </span>
                        </div>
                      </div>

                      {pet.specialNotes && (
                        <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Grooming & Safety Alert:</span> {pet.specialNotes}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Past Visits & Appointment History */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-neutral-600" />
                  <span>Visit History</span>
                </h3>

                {customerAppointments.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic">No appointments recorded yet.</p>
                ) : (
                  <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-xl overflow-hidden bg-white">
                    {customerAppointments.map((apt) => (
                      <div key={apt.id} className="p-3 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-bold text-neutral-900">
                            {apt.serviceName} ({apt.petName})
                          </div>
                          <div className="text-neutral-500 text-[11px] mt-0.5">
                            {apt.date} at {apt.startTime} · Groomer: {apt.staffName}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-neutral-900">${apt.price}</div>
                          <div className="text-[10px] font-semibold capitalize text-emerald-700">
                            {apt.status.replace(/_/g, ' ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-xl border border-neutral-200">
              <Users className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-neutral-700">Select a customer</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">Add New Customer & Pet</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                1. Owner Information
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Owner Full Name"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider pt-2">
                2. Pet Information
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Pet Name *</label>
                  <input
                    type="text"
                    required
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Buster"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Breed *</label>
                  <input
                    type="text"
                    required
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="e.g. Bernedoodle"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Size</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs"
                  >
                    <option value="small">Small (&lt; 20 lbs)</option>
                    <option value="medium">Medium (20-50 lbs)</option>
                    <option value="large">Large (50-80 lbs)</option>
                    <option value="giant">Giant (80+ lbs)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Temperament & Quirks</label>
                <input
                  type="text"
                  value={temperament}
                  onChange={(e) => setTemperament(e.target.value)}
                  placeholder="e.g. Sensitive to nail trims, very affectionate"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Special Handling / Medical Notes</label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Needs hypoallergenic shampoo, hip dysplasia in left leg"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
                >
                  Save Customer & Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
