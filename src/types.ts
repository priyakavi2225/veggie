export type ServiceTypeId = 'one-time' | 'recipe-based' | 'daily-subscription' | 'bulk-event';

export type CutStyle = 
  | 'Diced (Fine)'
  | 'Diced (Medium)'
  | 'Julienne (Thin Sticks)'
  | 'Cubed (Large)'
  | 'Sliced (Thin)'
  | 'Sliced (Thick)'
  | 'Fine Chopped'
  | 'Shredded'
  | 'Whole Peeled';

export interface VegetableItem {
  id: string;
  name: string;
  category: 'Root Veggies' | 'Leafy Greens' | 'Gourds & Squash' | 'Nightshades & Pods' | 'Fruits & Citrus' | 'Aromatics & Herbs';
  image: string;
  pricePerKg: number;
  availableCutStyles: CutStyle[];
  typicalPeelPercentage: number; // e.g. 15 = 15% peel waste
}

export interface SelectedVeggie {
  vegId: string;
  name: string;
  weightGrams: number; // e.g. 500g, 1000g
  cutStyle: CutStyle;
  specialInstructions?: string;
  image?: string;
  pricePerKg?: number;
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  prepTimeMins: number;
  servings: number;
  image: string;
  description: string;
  vegetables: {
    vegId: string;
    vegName: string;
    weightGramsPer4Servings: number;
    recommendedCutStyle: CutStyle;
  }[];
}

export interface PrepProfessional {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  jobsCompleted: number;
  distanceKm: number;
  etaMins: number;
  baseRatePerHour: number;
  hygieneBadges: string[];
  phone: string;
  specialties: string[];
}

export type SupplyType = 'BYO' | 'WE_SUPPLY';

export interface Address {
  id: string;
  title: string;
  fullAddress: string;
  lat: number;
  lng: number;
  isDefault?: boolean;
}

export type BookingStatus = 
  | 'DRAFT'
  | 'CONFIRMED'
  | 'PRO_EN_ROUTE'
  | 'PRO_ARRIVED'
  | 'CUTTING_IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface WasteReceipt {
  initialWeightKg: number;
  peelWasteKg: number;
  usableWeightKg: number;
  kitchenEfficiencyScore: number; // e.g. 88%
  timeTakenMinutes: number;
  beforePhotoUrl: string;
  afterPhotoUrl: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  serviceType: ServiceTypeId;
  recipeName?: string;
  servings?: number;
  veggies: SelectedVeggie[];
  supplyType: SupplyType;
  address: Address;
  date: string;
  timeSlot: string;
  professional?: PrepProfessional;
  tipAmount: number;
  promoDiscount: number;
  taxAmount: number;
  supplyCost: number;
  cuttingFee: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Wallet' | 'Cash';
  status: BookingStatus;
  createdAt: string;
  liveTimerSecondsElapsed?: number;
  wasteReceipt?: WasteReceipt;
  reviewGiven?: {
    rating: number;
    tags: string[];
    comment: string;
    photoUrl?: string;
  };
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  frequency: 'Daily' | 'Alternate Day' | 'Weekly';
  pricePerMonth: number;
  pricePerSession: number;
  benefits: string[];
  recommendedFor: string;
}

export interface ActiveSubscription {
  id: string;
  planId: string;
  planTitle: string;
  frequency: string;
  startDate: string;
  nextRenewalDate: string;
  status: 'ACTIVE' | 'PAUSED';
  pausedUntil?: string;
  preferredTimeSlot: string;
  defaultVeggieListSummary: string;
}

export interface BulkEventQuote {
  guestCount: number;
  functionType: 'Wedding' | 'Corporate Catering' | 'Family Function' | 'Restaurant Back-of-House';
  eventDate: string;
  estimatedVegKg: number;
  requiredPros: number;
  estimatedCost: number;
  customRequirements: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  savedAddresses: Address[];
  dietaryNotes: string;
  allergyNotes: string;
  notificationsEnabled: boolean;
  preferredPayment: string;
}

export interface ProDashboardState {
  isOnline: boolean;
  activeJob?: Booking;
  todaysEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  pendingPayouts: number;
  completedPayouts: number;
  hygieneBadges: string[];
  trainingModules: { id: string; title: string; completed: boolean; score?: string }[];
}

export interface VendorInventoryItem {
  id: string;
  vegName: string;
  category: string;
  currentStockKg: number;
  pricePerKg: number;
  vendorName: string;
  supplyStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
}
