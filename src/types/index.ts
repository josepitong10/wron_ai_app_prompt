export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'in_tub'
  | 'grooming'
  | 'ready_for_pickup'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type InvoiceStatus = 'unpaid' | 'paid' | 'overdue' | 'refunded';

export type PetSize = 'small' | 'medium' | 'large' | 'giant';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  size: PetSize;
  weightLbs: number;
  ageYears: number;
  coatType: string;
  temperament: string;
  specialNotes?: string;
  rabiesExpiryDate?: string;
  isVaccinated: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  notes?: string;
  pets: Pet[];
  createdAt: string;
  totalVisits: number;
  totalSpend: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  phone: string;
  active: boolean;
  servicesOffered: string[];
}

export interface GroomingService {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  basePrice: number;
  category: 'grooming' | 'bath' | 'add_on';
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  petId: string;
  petName: string;
  petBreed: string;
  petSize: PetSize;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  reminderSent: boolean;
  confirmationReceived: boolean;
  invoiceId?: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  appointmentId?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  petName: string;
  items: InvoiceItem[];
  subtotal: number;
  tip: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: 'card' | 'cash' | 'apple_pay';
  platformFeeRate: number; // e.g. 0.008 for 0.8%
  platformFeeAmount: number; // Calculated fee taken by SaaS
  stripePaymentIntentId?: string;
}

export interface AutomationMessage {
  id: string;
  type: 'missed_call_sms' | 'appointment_reminder' | 'booking_confirmation' | 'pickup_ready';
  recipientPhone: string;
  recipientName: string;
  appointmentId?: string;
  sentAt: string;
  messageText: string;
  actionTaken?: 'confirmed' | 'rescheduled' | 'booked_via_link';
  status: 'delivered' | 'responded' | 'sent';
}

export interface MissedCallLog {
  id: string;
  callerNumber: string;
  callerName?: string;
  timestamp: string;
  autoTextSent: boolean;
  autoTextMessage: string;
  convertedToBooking: boolean;
  bookingId?: string;
}

export interface BusinessProfile {
  businessName: string;
  niche: string;
  phone: string;
  email: string;
  address: string;
  bookingSlug: string;
  platformFeePercentage: number;
  cancellationHours: number;
  monthlySubscriptionTier: 'starter' | 'pro' | 'scale';
  monthlySubscriptionPrice: number;
  stripeConnected: boolean;
  twilioConnected: boolean;
}
