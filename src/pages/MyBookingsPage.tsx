import React, { useState } from 'react';
import { Booking } from '../types';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  RotateCcw, 
  FileText, 
  Play, 
  Star,
  ChefHat
} from 'lucide-react';

interface MyBookingsPageProps {
  bookings: Booking[];
  onTrackBooking: (b: Booking) => void;
  onViewReceipt: (b: Booking) => void;
  onRebook: (b: Booking) => void;
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  bookings,
  onTrackBooking,
  onViewReceipt,
  onRebook,
}) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'>('Upcoming');

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'Ongoing') return b.status === 'PRO_EN_ROUTE' || b.status === 'PRO_ARRIVED' || b.status === 'CUTTING_IN_PROGRESS';
    if (activeTab === 'Upcoming') return b.status === 'CONFIRMED';
    if (activeTab === 'Completed') return b.status === 'COMPLETED';
    if (activeTab === 'Cancelled') return b.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 font-heading">My Kitchen Prep Bookings</h1>
          <p className="text-xs text-stone-500">Track active sessions, rebook favorites, or download waste receipts</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200 text-xs font-semibold">
        {(['Upcoming', 'Ongoing', 'Completed', 'Cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === tab
                ? 'bg-white text-emerald-800 font-extrabold shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Booking Cards List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
            <ChefHat className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-700 text-base font-heading">No {activeTab} Bookings Found</h3>
            <p className="text-xs text-stone-400">You don't have any sessions under this category right now.</p>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm font-heading">#{b.bookingNumber}</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    b.status === 'COMPLETED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : b.status === 'CANCELLED'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-900 animate-pulse'
                  }`}>
                    {b.status}
                  </span>
                </div>
                <span className="text-stone-400">{b.date} • {b.timeSlot}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase">Service & Recipe</span>
                  <span className="font-bold text-stone-900">
                    {b.recipeName ? `Recipe: ${b.recipeName}` : 'One-Time Vegetable Cutting'}
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase">Specialist</span>
                  <span className="font-bold text-stone-900">{b.professional?.name || 'Assigned Prep Specialist'}</span>
                </div>

                <div>
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase">Total Paid</span>
                  <span className="font-extrabold text-emerald-800 font-heading">₹{b.totalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                {(b.status === 'PRO_EN_ROUTE' || b.status === 'PRO_ARRIVED' || b.status === 'CUTTING_IN_PROGRESS') && (
                  <button
                    onClick={() => onTrackBooking(b)}
                    className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Track Live Cutting Session</span>
                  </button>
                )}

                {b.status === 'COMPLETED' && (
                  <>
                    <button
                      onClick={() => onViewReceipt(b)}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-emerald-200"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Waste Receipt</span>
                    </button>

                    <button
                      onClick={() => onRebook(b)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Rebook Same List</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
