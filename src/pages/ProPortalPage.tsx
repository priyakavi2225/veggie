import React, { useState } from 'react';
import { INITIAL_PROFESSIONALS, INITIAL_BOOKINGS } from '../data/mockData';
import { Booking } from '../types';
import { CircularTimer } from '../components/CircularTimer';
import { 
  UserCheck, 
  Award, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Clock, 
  Camera, 
  Play, 
  Pause, 
  Square,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Briefcase
} from 'lucide-react';

export const ProPortalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'incoming' | 'active-job' | 'earnings' | 'training'>('active-job');
  const [isOnline, setIsOnline] = useState(true);
  const [jobState, setJobState] = useState<'IDLE' | 'CUTTING'>('CUTTING');
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const sampleIncomingJob: Booking = {
    id: 'book-999',
    bookingNumber: 'VH-9910',
    serviceType: 'recipe-based',
    recipeName: 'Thai Green Curry Assembly',
    veggies: [
      { vegId: 'veg-3', name: 'Carrots', weightGrams: 500, cutStyle: 'Julienne (Thin Sticks)' },
      { vegId: 'veg-4', name: 'Bell Peppers', weightGrams: 500, cutStyle: 'Cubed (Large)' },
      { vegId: 'veg-6', name: 'French Beans', weightGrams: 300, cutStyle: 'Sliced (Thin)' }
    ],
    supplyType: 'BYO',
    address: { id: 'a-1', title: 'Customer Home', fullAddress: 'Flat 301, Palm Grove, Indiranagar', lat: 12.97, lng: 77.64 },
    date: 'Today',
    timeSlot: '11:00 AM - 12:00 PM',
    tipAmount: 20,
    promoDiscount: 0,
    taxAmount: 10,
    supplyCost: 0,
    cuttingFee: 199,
    totalAmount: 229,
    paymentMethod: 'UPI',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString()
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Top Pro Header */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
        <div className="flex items-center gap-4">
          <img src={INITIAL_PROFESSIONALS[0].avatar} alt="Pro Avatar" className="w-16 h-16 rounded-2xl object-cover shrink-0 border-2 border-emerald-500" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-heading text-white">{INITIAL_PROFESSIONALS[0].name}</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/40">
                PRO VERIFIED ★ 4.95
              </span>
            </div>
            <p className="text-stone-400 text-xs mt-0.5">
              Badges: Nitrile Gloves Certified • UV Board Sanitized • Master Knife Specialist
            </p>
          </div>
        </div>

        {/* Duty Toggle */}
        <div className="flex items-center gap-3 bg-stone-800 p-2 rounded-2xl border border-stone-700">
          <span className="text-xs font-bold text-stone-300">Duty Status:</span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isOnline ? 'bg-emerald-600 text-white shadow-xs' : 'bg-rose-900 text-rose-200'
            }`}
          >
            {isOnline ? 'ONLINE & ACCEPTING JOBS' : 'OFF DUTY'}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200 text-xs font-semibold">
        {[
          { id: 'active-job', label: 'Active Job Screen' },
          { id: 'incoming', label: 'Incoming Job Offers (1)' },
          { id: 'earnings', label: 'Earnings Dashboard' },
          { id: 'training', label: 'Training & Certifications' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-700 text-white font-extrabold shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTIVE JOB SCREEN */}
      {activeTab === 'active-job' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                <span className="font-bold text-stone-900 text-sm font-heading">Active Job #VH-9821</span>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full text-[11px]">
                  Cutting In Progress
                </span>
              </div>

              <div className="space-y-2 text-stone-700">
                <div>
                  <span className="text-stone-400 text-[10px] font-semibold uppercase block">Customer Details</span>
                  <span className="font-bold text-stone-900 text-sm">Sunita Mehra (+91 98450 11223)</span>
                  <p className="text-stone-500 text-[11px] mt-0.5">Flat 402, Green Valley Apartments, Indiranagar</p>
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
                  <span className="font-bold block">Dietary Note:</span>
                  <span>Strict Vegetarian - Clean sanitized cutting board required.</span>
                </div>
              </div>

              {/* Cutting Checklist */}
              <div className="pt-2 space-y-2">
                <span className="font-bold text-stone-900 block text-xs font-heading">Cutting Requirements Checklist</span>
                <div className="space-y-1.5">
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex justify-between items-center">
                    <span>500g Red Onions</span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px]">Diced (Medium)</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex justify-between items-center">
                    <span>500g Roma Tomatoes</span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px]">Cubed (Large)</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex justify-between items-center">
                    <span>300g Fresh Carrots</span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px]">Sliced (Thick)</span>
                  </div>
                </div>
              </div>

              {/* Photo Audit Capture Button */}
              <div className="pt-2">
                <button
                  onClick={() => setPhotoCaptured(true)}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-xs transition-colors ${
                    photoCaptured ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>{photoCaptured ? '✓ Workstation Photo Uploaded' : 'Capture Post-Cut Workstation Photo'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Timer Control */}
          <div className="lg:col-span-6">
            <CircularTimer
              totalEstimatedMins={25}
              initialElapsedSeconds={540}
              veggieCount={3}
              isInteractive={true}
            />
          </div>

        </div>
      )}

      {/* INCOMING JOBS */}
      {activeTab === 'incoming' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 text-xs">
          <h2 className="font-bold text-stone-900 text-base font-heading">Available Immediate Jobs Nearby</h2>
          
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-amber-500 text-stone-900 font-extrabold px-2.5 py-0.5 rounded-full text-[10px] uppercase">
                  1.4 km Away • Instant Match
                </span>
                <h3 className="font-bold text-stone-900 text-sm mt-1">{sampleIncomingJob.recipeName}</h3>
                <p className="text-stone-500 text-[11px]">{sampleIncomingJob.address.fullAddress}</p>
              </div>

              <div className="text-right">
                <span className="text-stone-400 text-[10px] font-semibold uppercase block">Payout</span>
                <span className="text-xl font-black text-emerald-800 font-heading">₹{sampleIncomingJob.cuttingFee + sampleIncomingJob.tipAmount}</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-800 block text-[11px]">Veggie Preview:</span>
              <p className="text-stone-600">500g Carrots (Julienne), 500g Bell Peppers (Cubed), 300g French Beans (Thin Sliced)</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => alert('Job accepted! Route maps launching...')}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md"
              >
                Accept Job & Launch Navigation
              </button>
              <button
                onClick={() => alert('Job passed.')}
                className="px-5 py-3 rounded-xl bg-stone-200 text-stone-700 font-bold text-xs"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EARNINGS DASHBOARD */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-stone-400 font-semibold block uppercase">Today's Income</span>
              <span className="text-2xl font-black text-emerald-800 font-heading">₹1,420</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-stone-400 font-semibold block uppercase">Weekly Total</span>
              <span className="text-2xl font-black text-stone-900 font-heading">₹8,950</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-stone-400 font-semibold block uppercase">Subscription Pass Earnings</span>
              <span className="text-2xl font-black text-amber-600 font-heading">₹4,200</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-stone-400 font-semibold block uppercase">Pending Payout</span>
              <span className="text-2xl font-black text-emerald-700 font-heading">₹2,840</span>
            </div>
          </div>
        </div>
      )}

      {/* TRAINING & BADGES */}
      {activeTab === 'training' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 text-xs">
          <h2 className="font-bold text-stone-900 text-base font-heading">Hygiene Certification & Knife Precision Badges</h2>
          
          <div className="space-y-3">
            {[
              { title: 'Nitrile Gloves & Hairnet Protocols', status: 'Passed 100%', badge: 'Active' },
              { title: 'Stainless Board Chemical Sanitation', status: 'Passed 98%', badge: 'Active' },
              { title: 'Precision Julienne & Carving Masterclass', status: 'Passed 100%', badge: 'Active' },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-2xl border border-stone-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm font-heading">{m.title}</h4>
                  <span className="text-stone-500 text-[11px]">Score: {m.status}</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full">
                  ✓ {m.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
