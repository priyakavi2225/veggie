import { VegetableItem, Recipe, PrepProfessional, SubscriptionPlan, Address, Booking, ActiveSubscription, UserProfile, VendorInventoryItem } from '../types';

export const INITIAL_VEGETABLES: VegetableItem[] = [
  {
    id: 'veg-1',
    name: 'Red Onions',
    category: 'Root Veggies',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 45,
    typicalPeelPercentage: 12,
    availableCutStyles: ['Diced (Fine)', 'Diced (Medium)', 'Sliced (Thin)', 'Sliced (Thick)', 'Fine Chopped', 'Whole Peeled']
  },
  {
    id: 'veg-2',
    name: 'Roma Tomatoes',
    category: 'Nightshades & Pods',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 50,
    typicalPeelPercentage: 5,
    availableCutStyles: ['Diced (Medium)', 'Cubed (Large)', 'Sliced (Thin)', 'Fine Chopped']
  },
  {
    id: 'veg-3',
    name: 'Fresh Carrots',
    category: 'Root Veggies',
    image: 'https://images.unsplash.com/photo-1598170845058-12ef4a45753b?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 60,
    typicalPeelPercentage: 15,
    availableCutStyles: ['Julienne (Thin Sticks)', 'Diced (Fine)', 'Cubed (Large)', 'Sliced (Thin)', 'Shredded']
  },
  {
    id: 'veg-4',
    name: 'Green Bell Peppers (Capsicum)',
    category: 'Nightshades & Pods',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 70,
    typicalPeelPercentage: 10,
    availableCutStyles: ['Diced (Medium)', 'Julienne (Thin Sticks)', 'Cubed (Large)', 'Sliced (Thin)']
  },
  {
    id: 'veg-5',
    name: 'Russet Potatoes',
    category: 'Root Veggies',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 35,
    typicalPeelPercentage: 18,
    availableCutStyles: ['Cubed (Large)', 'Diced (Medium)', 'Julienne (Thin Sticks)', 'Sliced (Thick)', 'Whole Peeled']
  },
  {
    id: 'veg-6',
    name: 'French Beans',
    category: 'Nightshades & Pods',
    image: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 80,
    typicalPeelPercentage: 8,
    availableCutStyles: ['Fine Chopped', 'Sliced (Thin)', 'Julienne (Thin Sticks)']
  },
  {
    id: 'veg-7',
    name: 'Cauliflower Florets',
    category: 'Gourds & Squash',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 65,
    typicalPeelPercentage: 22,
    availableCutStyles: ['Cubed (Large)', 'Fine Chopped', 'Shredded']
  },
  {
    id: 'veg-8',
    name: 'Cabbage',
    category: 'Leafy Greens',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 40,
    typicalPeelPercentage: 10,
    availableCutStyles: ['Shredded', 'Fine Chopped', 'Cubed (Large)']
  },
  {
    id: 'veg-9',
    name: 'Fresh Spinach (Palak)',
    category: 'Leafy Greens',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 55,
    typicalPeelPercentage: 12,
    availableCutStyles: ['Fine Chopped', 'Shredded']
  },
  {
    id: 'veg-10',
    name: 'Ginger & Garlic Duo',
    category: 'Aromatics & Herbs',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 180,
    typicalPeelPercentage: 20,
    availableCutStyles: ['Fine Chopped', 'Julienne (Thin Sticks)', 'Whole Peeled']
  },
  {
    id: 'veg-11',
    name: 'Fresh Pineapple',
    category: 'Fruits & Citrus',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 90,
    typicalPeelPercentage: 35,
    availableCutStyles: ['Cubed (Large)', 'Sliced (Thin)', 'Diced (Medium)']
  },
  {
    id: 'veg-12',
    name: 'Sweet Papaya',
    category: 'Fruits & Citrus',
    image: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 75,
    typicalPeelPercentage: 25,
    availableCutStyles: ['Cubed (Large)', 'Diced (Medium)', 'Sliced (Thick)']
  },
  {
    id: 'veg-13',
    name: 'Watermelon',
    category: 'Fruits & Citrus',
    image: 'https://images.unsplash.com/photo-1587049352847-81a56d773cae?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 40,
    typicalPeelPercentage: 40,
    availableCutStyles: ['Cubed (Large)', 'Sliced (Thick)']
  },
  {
    id: 'veg-14',
    name: 'Bottle Gourd (Lauki)',
    category: 'Gourds & Squash',
    image: 'https://images.unsplash.com/photo-1628773822503-930a8585e5b3?w=500&auto=format&fit=crop&q=80',
    pricePerKg: 45,
    typicalPeelPercentage: 18,
    availableCutStyles: ['Cubed (Large)', 'Diced (Medium)', 'Whole Peeled']
  }
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    name: 'South Indian Sambar Veggie Mix',
    cuisine: 'South Indian',
    prepTimeMins: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80',
    description: 'Perfect pre-cut vegetable medley for traditional aromatic sambar stew.',
    vegetables: [
      { vegId: 'veg-1', vegName: 'Red Onions', weightGramsPer4Servings: 250, recommendedCutStyle: 'Cubed (Large)' },
      { vegId: 'veg-2', vegName: 'Roma Tomatoes', weightGramsPer4Servings: 300, recommendedCutStyle: 'Cubed (Large)' },
      { vegId: 'veg-3', vegName: 'Fresh Carrots', weightGramsPer4Servings: 200, recommendedCutStyle: 'Sliced (Thick)' },
      { vegId: 'veg-14', vegName: 'Bottle Gourd (Lauki)', weightGramsPer4Servings: 300, recommendedCutStyle: 'Cubed (Large)' }
    ]
  },
  {
    id: 'rec-2',
    name: 'Street Style Hakka Noodles Prep',
    cuisine: 'Indo-Chinese',
    prepTimeMins: 20,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80',
    description: 'Precision julienne and shredded vegetable basket for quick stir-fry noodles.',
    vegetables: [
      { vegId: 'veg-3', vegName: 'Fresh Carrots', weightGramsPer4Servings: 200, recommendedCutStyle: 'Julienne (Thin Sticks)' },
      { vegId: 'veg-4', vegName: 'Green Bell Peppers', weightGramsPer4Servings: 200, recommendedCutStyle: 'Julienne (Thin Sticks)' },
      { vegId: 'veg-8', vegName: 'Cabbage', weightGramsPer4Servings: 300, recommendedCutStyle: 'Shredded' },
      { vegId: 'veg-1', vegName: 'Red Onions', weightGramsPer4Servings: 150, recommendedCutStyle: 'Sliced (Thin)' }
    ]
  },
  {
    id: 'rec-3',
    name: 'Mumbai Special Pav Bhaji Base',
    cuisine: 'Street Food',
    prepTimeMins: 25,
    servings: 6,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80',
    description: 'Super-finely diced and chopped potatoes, cauliflower, peas & peppers for instant mashing.',
    vegetables: [
      { vegId: 'veg-5', vegName: 'Russet Potatoes', weightGramsPer4Servings: 500, recommendedCutStyle: 'Cubed (Large)' },
      { vegId: 'veg-7', vegName: 'Cauliflower Florets', weightGramsPer4Servings: 400, recommendedCutStyle: 'Fine Chopped' },
      { vegId: 'veg-4', vegName: 'Green Bell Peppers', weightGramsPer4Servings: 250, recommendedCutStyle: 'Diced (Fine)' },
      { vegId: 'veg-2', vegName: 'Roma Tomatoes', weightGramsPer4Servings: 400, recommendedCutStyle: 'Fine Chopped' }
    ]
  },
  {
    id: 'rec-4',
    name: 'Thai Green Curry Veggie Assembly',
    cuisine: 'Asian Fusion',
    prepTimeMins: 18,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format&fit=crop&q=80',
    description: 'Elegantly sliced carrots, bell peppers, french beans, and aromatics.',
    vegetables: [
      { vegId: 'veg-3', vegName: 'Fresh Carrots', weightGramsPer4Servings: 200, recommendedCutStyle: 'Sliced (Thin)' },
      { vegId: 'veg-4', vegName: 'Green Bell Peppers', weightGramsPer4Servings: 200, recommendedCutStyle: 'Cubed (Large)' },
      { vegId: 'veg-6', vegName: 'French Beans', weightGramsPer4Servings: 150, recommendedCutStyle: 'Sliced (Thin)' },
      { vegId: 'veg-10', vegName: 'Ginger & Garlic Duo', weightGramsPer4Servings: 50, recommendedCutStyle: 'Fine Chopped' }
    ]
  },
  {
    id: 'rec-5',
    name: 'Tropical Fruit Salad Platter',
    cuisine: 'Healthy Desserts',
    prepTimeMins: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=500&auto=format&fit=crop&q=80',
    description: 'Chilled, seedless, bite-sized fruit cuts hygienically packed and ready to serve.',
    vegetables: [
      { vegId: 'veg-11', vegName: 'Fresh Pineapple', weightGramsPer4Servings: 400, recommendedCutStyle: 'Cubed (Large)' },
      { vegId: 'veg-12', vegName: 'Sweet Papaya', weightGramsPer4Servings: 400, recommendedCutStyle: 'Cubed (Large)' },
      { vegId: 'veg-13', vegName: 'Watermelon', weightGramsPer4Servings: 600, recommendedCutStyle: 'Cubed (Large)' }
    ]
  }
];

export const INITIAL_PROFESSIONALS: PrepProfessional[] = [
  {
    id: 'pro-1',
    name: 'Ramesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 4.95,
    reviewsCount: 342,
    jobsCompleted: 620,
    distanceKm: 1.4,
    etaMins: 18,
    baseRatePerHour: 199,
    hygieneBadges: ['Gloves Verified', 'Sanitized Board Certified', 'Master Knife Specialist', 'N95 Mask Trained'],
    phone: '+91 98765 43210',
    specialties: ['Fine Julienne', 'Fruit Platter Design', 'Fast Dicing']
  },
  {
    id: 'pro-2',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 4.91,
    reviewsCount: 288,
    jobsCompleted: 450,
    distanceKm: 2.1,
    etaMins: 24,
    baseRatePerHour: 199,
    hygieneBadges: ['Gloves Verified', 'Sanitized Board Certified', 'Hygiene Top Rank'],
    phone: '+91 98123 76543',
    specialties: ['Curry Base Prep', 'Zero-Waste Peeling', 'Bulks & Events']
  },
  {
    id: 'pro-3',
    name: 'Anil Verma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 4.88,
    reviewsCount: 195,
    jobsCompleted: 310,
    distanceKm: 3.2,
    etaMins: 30,
    baseRatePerHour: 179,
    hygieneBadges: ['Gloves Verified', 'Background Checked', 'Knife Precision'],
    phone: '+91 99887 66554',
    specialties: ['Indo-Chinese Shredding', 'Salad Carving']
  },
  {
    id: 'pro-4',
    name: 'Sunita Patel',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    rating: 4.97,
    reviewsCount: 412,
    jobsCompleted: 830,
    distanceKm: 1.8,
    etaMins: 20,
    baseRatePerHour: 220,
    hygieneBadges: ['Gloves Verified', 'Sanitized Board Certified', '5-Star Hygiene Master', 'Background Checked'],
    phone: '+91 97654 32109',
    specialties: ['Bulk Event Cutting', 'Speed Chopping', 'Kitchen Sanitation']
  }
];

export const INITIAL_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-1',
    title: 'Daily Fresh Kitchen Partner',
    frequency: 'Daily',
    pricePerMonth: 2999,
    pricePerSession: 99,
    benefits: [
      '30 Prep sessions per month',
      'Free Partner Vegetables Supply Option',
      'Dedicated Professional assigned',
      'Instant Pause & Skip feature anytime',
      'Zero cancellation charges'
    ],
    recommendedFor: 'Busy families cooking daily meals fresh'
  },
  {
    id: 'plan-2',
    title: 'Alternate Days Smart Cooking',
    frequency: 'Alternate Day',
    pricePerMonth: 1799,
    pricePerSession: 119,
    benefits: [
      '15 Prep sessions per month',
      'Covers 2-day meal batch prep',
      'Flexible time slot lock',
      'Free waste weight tracking'
    ],
    recommendedFor: 'Working couples meal-prepping 3x weekly'
  },
  {
    id: 'plan-3',
    title: 'Weekly Weekend Feast Prep',
    frequency: 'Weekly',
    pricePerMonth: 799,
    pricePerSession: 149,
    benefits: [
      '4 Intensive bulk prep sessions',
      'Includes large fruit platter prep',
      'Priority scheduling for weekends',
      'Sanitized prep kit included'
    ],
    recommendedFor: 'Weekend party hosts & large weekly cooks'
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    title: 'Home',
    fullAddress: 'Flat 402, Green Valley Apartments, Indiranagar, Bengaluru, 560038',
    lat: 12.9716,
    lng: 77.6412,
    isDefault: true
  },
  {
    id: 'addr-2',
    title: 'Office',
    fullAddress: 'Tower B, 7th Floor, Tech Park, Koramangala, Bengaluru, 560095',
    lat: 12.9352,
    lng: 77.6245
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    bookingNumber: 'VH-9821',
    serviceType: 'recipe-based',
    recipeName: 'South Indian Sambar Veggie Mix',
    servings: 4,
    veggies: [
      { vegId: 'veg-1', name: 'Red Onions', weightGrams: 500, cutStyle: 'Diced (Medium)' },
      { vegId: 'veg-2', name: 'Roma Tomatoes', weightGrams: 500, cutStyle: 'Cubed (Large)' },
      { vegId: 'veg-3', name: 'Fresh Carrots', weightGrams: 300, cutStyle: 'Sliced (Thick)' }
    ],
    supplyType: 'WE_SUPPLY',
    address: INITIAL_ADDRESSES[0],
    date: 'Today',
    timeSlot: '08:30 AM - 09:30 AM',
    professional: INITIAL_PROFESSIONALS[0],
    tipAmount: 30,
    promoDiscount: 50,
    taxAmount: 18,
    supplyCost: 110,
    cuttingFee: 149,
    totalAmount: 257,
    paymentMethod: 'UPI',
    status: 'PRO_EN_ROUTE',
    createdAt: '2026-07-28T08:00:00.000Z',
    liveTimerSecondsElapsed: 420
  },
  {
    id: 'book-100',
    bookingNumber: 'VH-9742',
    serviceType: 'one-time',
    veggies: [
      { vegId: 'veg-1', name: 'Red Onions', weightGrams: 1000, cutStyle: 'Fine Chopped' },
      { vegId: 'veg-5', name: 'Russet Potatoes', weightGrams: 1500, cutStyle: 'Cubed (Large)' },
      { vegId: 'veg-11', name: 'Fresh Pineapple', weightGrams: 1200, cutStyle: 'Cubed (Large)' }
    ],
    supplyType: 'BYO',
    address: INITIAL_ADDRESSES[0],
    date: 'Yesterday',
    timeSlot: '05:00 PM - 06:00 PM',
    professional: INITIAL_PROFESSIONALS[1],
    tipAmount: 20,
    promoDiscount: 0,
    taxAmount: 15,
    supplyCost: 0,
    cuttingFee: 199,
    totalAmount: 234,
    paymentMethod: 'UPI',
    status: 'COMPLETED',
    createdAt: '2026-07-27T16:30:00.000Z',
    wasteReceipt: {
      initialWeightKg: 3.7,
      peelWasteKg: 0.65,
      usableWeightKg: 3.05,
      kitchenEfficiencyScore: 82,
      timeTakenMinutes: 38,
      beforePhotoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
      afterPhotoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80'
    },
    reviewGiven: {
      rating: 5,
      tags: ['Spotless Neatness', 'On Time Arrival', 'Hygienic Gloves', 'Great Behavior'],
      comment: 'Priya was incredibly quick and left the kitchen workstation cleaner than before!'
    }
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Sunita Mehra',
  phone: '+91 98450 11223',
  email: 'sunita.mehra@example.com',
  savedAddresses: INITIAL_ADDRESSES,
  dietaryNotes: 'Strict Vegetarian - No Garlic in Jain dishes',
  allergyNotes: 'Slight sensitivity to chili dust',
  notificationsEnabled: true,
  preferredPayment: 'GPay / UPI'
};

export const INITIAL_ACTIVE_SUBSCRIPTION: ActiveSubscription = {
  id: 'sub-881',
  planId: 'plan-1',
  planTitle: 'Daily Fresh Kitchen Partner',
  frequency: 'Daily',
  startDate: '2026-07-01',
  nextRenewalDate: '2026-08-01',
  status: 'ACTIVE',
  preferredTimeSlot: '07:30 AM - 08:30 AM',
  defaultVeggieListSummary: '1kg Onions (Diced), 500g Tomatoes (Cubed), 500g Carrots (Julienne)'
};

export const INITIAL_VENDOR_INVENTORY: VendorInventoryItem[] = [
  { id: 'v-1', vegName: 'Red Onions', category: 'Root Veggies', currentStockKg: 120, pricePerKg: 38, vendorName: 'GreenFarm Organic Hub', supplyStatus: 'In Stock' },
  { id: 'v-2', vegName: 'Roma Tomatoes', category: 'Nightshades', currentStockKg: 85, pricePerKg: 42, vendorName: 'Fresh Harvest Mart', supplyStatus: 'In Stock' },
  { id: 'v-3', vegName: 'Fresh Carrots', category: 'Root Veggies', currentStockKg: 60, pricePerKg: 50, vendorName: 'GreenFarm Organic Hub', supplyStatus: 'In Stock' },
  { id: 'v-4', vegName: 'Cauliflower', category: 'Gourds & Squash', currentStockKg: 15, pricePerKg: 55, vendorName: 'Fresh Harvest Mart', supplyStatus: 'Low Stock' },
  { id: 'v-5', vegName: 'Pineapple', category: 'Fruits', currentStockKg: 40, pricePerKg: 70, vendorName: 'Tropica Fruit Supply', supplyStatus: 'In Stock' }
];
