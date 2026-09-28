import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Appointment,
  AppointmentStatus,
  BusinessProfile,
  Customer,
  GroomingService,
  Invoice,
  MissedCallLog,
  StaffMember,
  AutomationMessage,
  Pet,
} from '../types';
import {
  initialAppointments,
  initialBusinessProfile,
  initialCustomers,
  initialInvoices,
  initialMissedCalls,
  initialServices,
  initialStaff,
  initialAutomations,
} from '../data/mockData';
import confetti from 'canvas-confetti';

export type AppViewMode = 'owner_app' | 'customer_booking' | 'spec_doc';
export type OwnerTab = 'dashboard' | 'calendar' | 'customers' | 'invoices' | 'automations' | 'settings';
export type DevicePreviewMode = 'mobile' | 'responsive';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  ownerTab: OwnerTab;
  setOwnerTab: (tab: OwnerTab) => void;
  devicePreview: DevicePreviewMode;
  setDevicePreview: (mode: DevicePreviewMode) => void;
  business: BusinessProfile;
  staff: StaffMember[];
  services: GroomingService[];
  customers: Customer[];
  appointments: Appointment[];
  invoices: Invoice[];
  missedCalls: MissedCallLog[];
  automations: AutomationMessage[];
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  // Actions
  addAppointment: (newApt: Omit<Appointment, 'id' | 'createdAt' | 'reminderSent' | 'confirmationReceived'>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  assignStaffToAppointment: (appointmentId: string, staffId: string) => void;
  createInvoiceFromAppointment: (appointmentId: string, tipAmount?: number) => Invoice;
  payInvoice: (invoiceId: string, method: 'card' | 'cash' | 'apple_pay') => void;
  simulateMissedCall: (callerNumber?: string, callerName?: string) => void;
  simulateReminderAction: (messageId: string, appointmentId: string, action: 'confirmed' | 'rescheduled') => void;
  sendReadyForPickupSMS: (appointmentId: string) => void;
  addCustomerWithPet: (customerData: Omit<Customer, 'id' | 'createdAt' | 'totalVisits' | 'totalSpend'>, petData: Omit<Pet, 'id'>) => Customer;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<AppViewMode>('owner_app');
  const [ownerTab, setOwnerTab] = useState<OwnerTab>('dashboard');
  const [devicePreview, setDevicePreview] = useState<DevicePreviewMode>('responsive');

  const [business, setBusiness] = useState<BusinessProfile>(() => {
    const saved = localStorage.getItem('gp_business');
    return saved ? JSON.parse(saved) : initialBusinessProfile;
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('gp_staff');
    return saved ? JSON.parse(saved) : initialStaff;
  });

  const [services] = useState<GroomingService[]>(initialServices);

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('gp_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('gp_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('gp_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [missedCalls, setMissedCalls] = useState<MissedCallLog[]>(() => {
    const saved = localStorage.getItem('gp_missed_calls');
    return saved ? JSON.parse(saved) : initialMissedCalls;
  });

  const [automations, setAutomations] = useState<AutomationMessage[]>(() => {
    const saved = localStorage.getItem('gp_automations');
    return saved ? JSON.parse(saved) : initialAutomations;
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('gp_business', JSON.stringify(business));
  }, [business]);

  useEffect(() => {
    localStorage.setItem('gp_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('gp_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('gp_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('gp_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('gp_missed_calls', JSON.stringify(missedCalls));
  }, [missedCalls]);

  useEffect(() => {
    localStorage.setItem('gp_automations', JSON.stringify(automations));
  }, [automations]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAppointment = (
    newAptData: Omit<Appointment, 'id' | 'createdAt' | 'reminderSent' | 'confirmationReceived'>
  ): Appointment => {
    const newId = 'apt-' + Date.now();
    const created: Appointment = {
      ...newAptData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      reminderSent: true,
      confirmationReceived: false,
    };

    setAppointments((prev) => [created, ...prev]);

    // Also record automation SMS confirmation sent to customer
    const autoMsg: AutomationMessage = {
      id: 'msg-' + Date.now(),
      type: 'booking_confirmation',
      recipientPhone: newAptData.customerPhone,
      recipientName: newAptData.customerName,
      appointmentId: newId,
      sentAt: 'Just now',
      messageText: `Confirmed! ${newAptData.petName}'s ${newAptData.serviceName} is scheduled for ${newAptData.date} at ${newAptData.startTime} at ${business.businessName}. Reply C to confirm or manage here: https://pawsandbubbles.app/manage/${newId}`,
      status: 'delivered',
    };
    setAutomations((prev) => [autoMsg, ...prev]);

    // Update customer visit count
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === newAptData.customerId
          ? { ...c, totalVisits: c.totalVisits + 1 }
          : c
      )
    );

    showToast(
      'Appointment Booked',
      `${newAptData.petName} scheduled for ${newAptData.date} at ${newAptData.startTime}. SMS confirmation dispatched.`,
      'success'
    );

    return created;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );

    const apt = appointments.find((a) => a.id === id);
    if (!apt) return;

    if (status === 'ready_for_pickup') {
      sendReadyForPickupSMS(id);
    } else {
      showToast(
        'Status Updated',
        `${apt.petName} is now marked as "${status.replace(/_/g, ' ')}".`,
        'info'
      );
    }
  };

  const assignStaffToAppointment = (appointmentId: string, staffId: string) => {
    const targetStaff = staff.find((s) => s.id === staffId);
    if (!targetStaff) return;

    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, staffId: targetStaff.id, staffName: targetStaff.name }
          : apt
      )
    );

    showToast('Staff Reassigned', `Assigned to ${targetStaff.name}`, 'info');
  };

  const sendReadyForPickupSMS = (appointmentId: string) => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) return;

    const autoMsg: AutomationMessage = {
      id: 'msg-' + Date.now(),
      type: 'pickup_ready',
      recipientPhone: apt.customerPhone,
      recipientName: apt.customerName,
      appointmentId: apt.id,
      sentAt: 'Just now',
      messageText: `🐾 Good news ${apt.customerName.split(' ')[0]}! ${apt.petName} is all finished, smelling incredible, and ready for pickup at ${business.businessName}!`,
      status: 'delivered',
    };

    setAutomations((prev) => [autoMsg, ...prev]);

    showToast(
      'Pickup SMS Sent',
      `Auto-texted ${apt.customerName} that ${apt.petName} is ready!`,
      'success'
    );
  };

  const createInvoiceFromAppointment = (appointmentId: string, tipAmount: number = 15): Invoice => {
    const apt = appointments.find((a) => a.id === appointmentId);
    if (!apt) throw new Error('Appointment not found');

    const tax = Number((apt.price * 0.098).toFixed(2));
    const subtotal = apt.price;
    const total = subtotal + tipAmount + tax;
    const platformFeeRate = business.platformFeePercentage / 100;
    const platformFeeAmount = Number((total * platformFeeRate).toFixed(2));

    const newInvoice: Invoice = {
      id: 'inv-' + (100 + invoices.length + 1),
      appointmentId: apt.id,
      customerId: apt.customerId,
      customerName: apt.customerName,
      customerEmail: apt.customerEmail,
      customerPhone: apt.customerPhone,
      petName: `${apt.petName} (${apt.petBreed})`,
      items: [
        {
          id: 'item-1',
          description: apt.serviceName,
          quantity: 1,
          unitPrice: apt.price,
          total: apt.price,
        },
      ],
      subtotal,
      tip: tipAmount,
      tax,
      total,
      status: 'unpaid',
      issuedDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      platformFeeRate,
      platformFeeAmount,
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, invoiceId: newInvoice.id } : a))
    );

    showToast(
      'Invoice Created',
      `Invoice #${newInvoice.id} generated for $${total.toFixed(2)} (Platform fee: $${platformFeeAmount.toFixed(2)})`,
      'success'
    );

    return newInvoice;
  };

  const payInvoice = (invoiceId: string, method: 'card' | 'cash' | 'apple_pay') => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'paid',
            paidDate: new Date().toISOString().split('T')[0],
            paymentMethod: method,
            stripePaymentIntentId: 'pi_' + Math.random().toString(36).substring(2, 12),
          };
        }
        return inv;
      })
    );

    const inv = invoices.find((i) => i.id === invoiceId);
    if (inv) {
      // Update customer total spend
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === inv.customerId
            ? { ...c, totalSpend: c.totalSpend + inv.total }
            : c
        )
      );

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // fallback
      }

      showToast(
        'Payment Collected!',
        `Received $${inv.total.toFixed(2)} via ${method.replace('_', ' ')}. Platform fee accrued: $${inv.platformFeeAmount.toFixed(2)}`,
        'success'
      );
    }
  };

  const simulateMissedCall = (callerNumber = '(555) 399-4402', callerName = 'Emma Watson') => {
    const callId = 'mc-' + Date.now();
    const autoText = `Hi! Sorry we missed your call at ${business.businessName}—our hands are soapy with pups right now! 🐾 You can pick a time and book in 60 seconds online here: https://pawsandbubbles.app/book?ref=missed-call`;

    const newLog: MissedCallLog = {
      id: callId,
      callerNumber,
      callerName,
      timestamp: 'Just now',
      autoTextSent: true,
      autoTextMessage: autoText,
      convertedToBooking: false,
    };

    setMissedCalls((prev) => [newLog, ...prev]);

    // Also add to automations list
    setAutomations((prev) => [
      {
        id: 'msg-mc-' + Date.now(),
        type: 'missed_call_sms',
        recipientPhone: callerNumber,
        recipientName: callerName,
        sentAt: 'Just now',
        messageText: autoText,
        status: 'delivered',
      },
      ...prev,
    ]);

    showToast(
      'Missed Call Detected & Auto-Text Dispatched!',
      `Auto-SMS with booking link sent to ${callerName} (${callerNumber}) in < 3 seconds.`,
      'success'
    );
  };

  const simulateReminderAction = (
    messageId: string,
    appointmentId: string,
    action: 'confirmed' | 'rescheduled'
  ) => {
    setAutomations((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, actionTaken: action, status: 'responded' } : m
      )
    );

    if (action === 'confirmed') {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? { ...apt, status: 'confirmed', confirmationReceived: true }
            : apt
        )
      );
      showToast('1-Tap Confirmation', 'Client verified attendance via SMS link! Calendar updated.', 'success');
    } else {
      showToast('Client Requested Reschedule', 'Notification dispatched to calendar to select new time slot.', 'info');
    }
  };

  const addCustomerWithPet = (
    customerData: Omit<Customer, 'id' | 'createdAt' | 'totalVisits' | 'totalSpend'>,
    petData: Omit<Pet, 'id'>
  ): Customer => {
    const custId = 'cust-' + Date.now();
    const petId = 'pet-' + Date.now();

    const createdPet: Pet = {
      ...petData,
      id: petId,
    };

    const createdCust: Customer = {
      ...customerData,
      id: custId,
      createdAt: new Date().toISOString().split('T')[0],
      totalVisits: 0,
      totalSpend: 0,
      pets: [createdPet],
    };

    setCustomers((prev) => [createdCust, ...prev]);
    showToast('Customer Added', `Registered ${customerData.name} and ${petData.name} (${petData.breed})`, 'success');

    return createdCust;
  };

  const resetDemoData = () => {
    setBusiness(initialBusinessProfile);
    setStaff(initialStaff);
    setCustomers(initialCustomers);
    setAppointments(initialAppointments);
    setInvoices(initialInvoices);
    setMissedCalls(initialMissedCalls);
    setAutomations(initialAutomations);
    localStorage.clear();
    showToast('Demo Reset', 'Reset to initial salon data state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        ownerTab,
        setOwnerTab,
        devicePreview,
        setDevicePreview,
        business,
        staff,
        services,
        customers,
        appointments,
        invoices,
        missedCalls,
        automations,
        toasts,
        dismissToast,
        showToast,
        addAppointment,
        updateAppointmentStatus,
        assignStaffToAppointment,
        createInvoiceFromAppointment,
        payInvoice,
        simulateMissedCall,
        simulateReminderAction,
        sendReadyForPickupSMS,
        addCustomerWithPet,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
