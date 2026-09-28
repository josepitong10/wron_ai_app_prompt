import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment, AppointmentStatus } from '../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  User,
  Filter,
  CheckCircle2,
  AlertCircle,
  Scissors,
} from 'lucide-react';

interface CalendarViewProps {
  onOpenNewAppointment: () => void;
  onSelectAppointment: (apt: Appointment) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  onOpenNewAppointment,
  onSelectAppointment,
}) => {
  const { appointments, staff, updateAppointmentStatus } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-09-28');
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  // Time grid slots (8:00 AM to 5:00 PM)
  const timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  // Filtered appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesDate = apt.date === selectedDate;
    const matchesStaff = selectedStaffFilter === 'all' || apt.staffId === selectedStaffFilter;
    return matchesDate && matchesStaff;
  });

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'in_tub':
        return 'bg-blue-50 border-blue-300 text-blue-900 border-l-4 border-l-blue-600';
      case 'grooming':
        return 'bg-purple-50 border-purple-300 text-purple-900 border-l-4 border-l-purple-600';
      case 'ready_for_pickup':
        return 'bg-emerald-50 border-emerald-300 text-emerald-900 border-l-4 border-l-emerald-600';
      case 'completed':
        return 'bg-neutral-100 border-neutral-300 text-neutral-600 border-l-4 border-l-neutral-400';
      case 'confirmed':
        return 'bg-teal-50 border-teal-300 text-teal-900 border-l-4 border-l-teal-600';
      default:
        return 'bg-amber-50 border-amber-300 text-amber-900 border-l-4 border-l-amber-500';
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Calendar Controls Bar */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Date Selector & Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-neutral-200 p-0.5 bg-neutral-50">
            <button
              onClick={() => setSelectedDate('2026-09-27')}
              className="p-1.5 hover:bg-white rounded-md text-neutral-600 transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-3 text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>{selectedDate === '2026-09-28' ? 'Today (Mon, Sep 28)' : selectedDate}</span>
            </div>
            <button
              onClick={() => setSelectedDate('2026-09-29')}
              className="p-1.5 hover:bg-white rounded-md text-neutral-600 transition-colors"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day / Week View Segmented Control */}
          <div className="flex items-center p-0.5 bg-neutral-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'day' ? 'bg-white shadow-xs text-neutral-900 font-semibold' : 'text-neutral-500'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'week' ? 'bg-white shadow-xs text-neutral-900 font-semibold' : 'text-neutral-500'
              }`}
            >
              Week
            </button>
          </div>
        </div>

        {/* Staff Filter & New Appointment Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Groomer:</span>
          </div>
          <select
            value={selectedStaffFilter}
            onChange={(e) => setSelectedStaffFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">All Groomers ({staff.length})</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.role.split(' ')[0]})
              </option>
            ))}
          </select>

          <button
            onClick={onOpenNewAppointment}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs active:scale-[0.98] transition-transform ml-auto sm:ml-0"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Staff Columns Header for Day View */}
      {viewMode === 'day' && selectedStaffFilter === 'all' ? (
        <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs overflow-hidden">
          {/* Header row with Groomers */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-b border-neutral-200 bg-neutral-50/80">
            <div className="p-3 text-xs font-bold text-neutral-500 uppercase tracking-wider hidden md:block border-r border-neutral-200">
              Time
            </div>
            {staff.map((s) => (
              <div key={s.id} className="p-3 border-r border-neutral-200 last:border-r-0">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${s.avatarColor}`} />
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">{s.name}</span>
                    <span className="text-[10px] text-neutral-500 block truncate">{s.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Time Rows */}
          <div className="divide-y divide-neutral-100">
            {timeSlots.map((time) => {
              const hourInt = parseInt(time.split(':')[0], 10);

              return (
                <div key={time} className="grid grid-cols-1 md:grid-cols-4 min-h-[90px]">
                  {/* Time label */}
                  <div className="p-2.5 md:border-r border-neutral-200 bg-neutral-50/40 text-xs font-mono font-semibold text-neutral-500 flex md:flex-col justify-between md:justify-start items-center md:items-start">
                    <span>{time}</span>
                    <span className="text-[10px] text-neutral-400 font-normal">
                      {hourInt < 12 ? 'AM' : 'PM'}
                    </span>
                  </div>

                  {/* Staff Slot Columns */}
                  {staff.map((s) => {
                    const aptsInSlot = appointments.filter(
                      (a) =>
                        a.date === selectedDate &&
                        a.staffId === s.id &&
                        a.startTime.startsWith(time.split(':')[0])
                    );

                    return (
                      <div
                        key={s.id}
                        className="p-1.5 md:border-r border-neutral-200 last:border-r-0 space-y-1.5 bg-neutral-50/10 min-h-[70px]"
                      >
                        {aptsInSlot.map((apt) => (
                          <div
                            key={apt.id}
                            onClick={() => onSelectAppointment(apt)}
                            className={`p-2.5 rounded-lg border shadow-xs text-xs cursor-pointer hover:shadow-md transition-all ${getStatusColor(
                              apt.status
                            )}`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span>{apt.petName}</span>
                              <span className="font-mono tabular-nums text-[11px]">${apt.price}</span>
                            </div>
                            <div className="text-[11px] opacity-90 truncate">{apt.serviceName}</div>
                            <div className="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-black/10">
                              <span className="truncate">{apt.customerName}</span>
                              <span className="font-medium capitalize">{apt.status.replace(/_/g, ' ')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Single List / Filtered View (Mobile friendly single column) */
        <div className="space-y-3">
          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-neutral-200">
              <CalendarIcon className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-neutral-700">No appointments scheduled</p>
              <p className="text-xs text-neutral-500 mt-1">
                There are no bookings for the selected date and groomer filter.
              </p>
              <button
                onClick={onOpenNewAppointment}
                className="mt-4 px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold"
              >
                Create Appointment
              </button>
            </div>
          ) : (
            filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                onClick={() => onSelectAppointment(apt)}
                className={`p-4 rounded-xl border shadow-xs cursor-pointer hover:shadow-md transition-all ${getStatusColor(
                  apt.status
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold">{apt.petName}</span>
                      <span className="text-xs font-medium opacity-80">({apt.petBreed})</span>
                    </div>
                    <div className="text-xs font-semibold mt-0.5">{apt.serviceName}</div>
                    <div className="text-xs opacity-90 mt-1">
                      Client: {apt.customerName} · {apt.customerPhone}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-mono font-bold tabular-nums">${apt.price}</div>
                    <div className="text-xs font-mono font-medium flex items-center gap-1 justify-end mt-1">
                      <Clock className="w-3 h-3" />
                      {apt.startTime} ({apt.durationMinutes}m)
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider mt-1 text-emerald-800">
                      Groomer: {apt.staffName}
                    </div>
                  </div>
                </div>

                {apt.notes && (
                  <div className="mt-2.5 p-2 rounded bg-white/70 text-xs text-neutral-700 border border-black/5">
                    <span className="font-semibold">Note:</span> {apt.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
