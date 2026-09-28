import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PetSize } from '../../types';
import { Calendar, Clock, User, Heart, Scissors, X } from 'lucide-react';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCustomerId?: string;
  defaultPetId?: string;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultCustomerId,
  defaultPetId,
}) => {
  const { customers, staff, services, addAppointment, addCustomerWithPet } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    defaultCustomerId || customers[0]?.id || 'new'
  );
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  // Existing customer selection
  const selectedCust = customers.find((c) => c.id === selectedCustomerId);
  const [selectedPetId, setSelectedPetId] = useState<string>(
    defaultPetId || selectedCust?.pets[0]?.id || ''
  );

  // New Customer fields
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newPetName, setNewPetName] = useState('');
  const [newPetBreed, setNewPetBreed] = useState('Poodle Mix');
  const [newPetSize, setNewPetSize] = useState<PetSize>('medium');

  // Appointment parameters
  const [serviceId, setServiceId] = useState(services[0]?.id || 'srv-1');
  const [staffId, setStaffId] = useState(staff[0]?.id || 'staff-1');
  const [date, setDate] = useState('2026-09-28');
  const [startTime, setStartTime] = useState('11:00');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === serviceId) || services[0];
  const selectedStaffMember = staff.find((s) => s.id === staffId) || staff[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let targetCustId = selectedCustomerId;
    let targetCustName = selectedCust?.name || '';
    let targetCustPhone = selectedCust?.phone || '';
    let targetCustEmail = selectedCust?.email || '';
    let targetPetId = selectedPetId;
    let targetPetName = '';
    let targetPetBreed = '';
    let targetPetSize: PetSize = 'medium';

    if (isNewCustomer || !selectedCust) {
      if (!newCustName || !newCustPhone || !newPetName) {
        alert('Please fill in customer and pet names');
        return;
      }
      const createdCust = addCustomerWithPet(
        {
          name: newCustName,
          phone: newCustPhone,
          email: newCustEmail || `${newPetName.toLowerCase()}@client.com`,
          pets: [],
        },
        {
          name: newPetName,
          breed: newPetBreed,
          size: newPetSize,
          weightLbs: 30,
          ageYears: 2,
          coatType: 'Standard coat',
          temperament: 'Friendly',
          isVaccinated: true,
        }
      );
      targetCustId = createdCust.id;
      targetCustName = createdCust.name;
      targetCustPhone = createdCust.phone;
      targetCustEmail = createdCust.email;
      targetPetId = createdCust.pets[0].id;
      targetPetName = createdCust.pets[0].name;
      targetPetBreed = createdCust.pets[0].breed;
      targetPetSize = createdCust.pets[0].size;
    } else {
      const pet = selectedCust.pets.find((p) => p.id === selectedPetId) || selectedCust.pets[0];
      targetPetName = pet?.name || 'Pet';
      targetPetBreed = pet?.breed || 'Mixed';
      targetPetSize = pet?.size || 'medium';
    }

    addAppointment({
      customerId: targetCustId,
      customerName: targetCustName,
      customerPhone: targetCustPhone,
      customerEmail: targetCustEmail,
      petId: targetPetId,
      petName: targetPetName,
      petBreed: targetPetBreed,
      petSize: targetPetSize,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      staffId: selectedStaffMember.id,
      staffName: selectedStaffMember.name,
      date,
      startTime,
      durationMinutes: selectedService.durationMinutes,
      price: selectedService.basePrice,
      status: 'confirmed',
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-neutral-900">New Grooming Appointment</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Toggle Existing vs New Customer */}
          <div className="flex items-center justify-between bg-neutral-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setIsNewCustomer(false)}
              className={`flex-1 py-1.5 rounded-md font-semibold text-xs transition-all ${
                !isNewCustomer ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
              }`}
            >
              Existing Customer
            </button>
            <button
              type="button"
              onClick={() => setIsNewCustomer(true)}
              className={`flex-1 py-1.5 rounded-md font-semibold text-xs transition-all ${
                isNewCustomer ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
              }`}
            >
              + Quick New Customer
            </button>
          </div>

          {!isNewCustomer ? (
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Select Customer</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => {
                    setSelectedCustomerId(e.target.value);
                    const c = customers.find((cust) => cust.id === e.target.value);
                    if (c && c.pets[0]) setSelectedPetId(c.pets[0].id);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone}) - {c.pets.map((p) => p.name).join(', ')}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCust && (
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Select Pet</label>
                  <select
                    value={selectedPetId}
                    onChange={(e) => setSelectedPetId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    {selectedCust.pets.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - {p.breed} ({p.size})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Pet Name *</label>
                  <input
                    type="text"
                    required
                    value={newPetName}
                    onChange={(e) => setNewPetName(e.target.value)}
                    placeholder="e.g. Bella"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Breed *</label>
                  <input
                    type="text"
                    required
                    value={newPetBreed}
                    onChange={(e) => setNewPetBreed(e.target.value)}
                    placeholder="e.g. Labradoodle"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Size</label>
                  <select
                    value={newPetSize}
                    onChange={(e) => setNewPetSize(e.target.value as PetSize)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="small">Small (&lt;20 lbs)</option>
                    <option value="medium">Med (20-50 lbs)</option>
                    <option value="large">Large (50-80 lbs)</option>
                    <option value="giant">Giant (80+ lbs)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Service & Staff Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Service</label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (${s.basePrice})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Assigned Groomer</label>
              <select
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
              >
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.role.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Start Time</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white font-mono"
              >
                {['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '16:00'].map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">Special Cut / Handling Instructions</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Teddy bear cut, scissor legs, sensitive ears"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300"
            />
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] flex justify-between items-center">
            <span>Base Service Price:</span>
            <span className="font-mono font-bold text-sm text-neutral-900">${selectedService.basePrice}</span>
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
              className="px-5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold"
            >
              Schedule & Send SMS Confirmation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
