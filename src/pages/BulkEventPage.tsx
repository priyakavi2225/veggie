import React, { useState } from 'react';
import { 
  Users, 
  Scale, 
  Calculator, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Send,
  ChefHat,
  Building
} from 'lucide-react';
import { BulkEventQuote } from '../types';

export const BulkEventPage: React.FC = () => {
  const [guestCount, setGuestCount] = useState<number>(150);
  const [functionType, setFunctionType] = useState<'Wedding' | 'Corporate Catering' | 'Family Function' | 'Restaurant Back-of-House'>('Wedding');
  const [eventDate, setEventDate] = useState<string>('2026-08-15');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  // Estimator Math
  // ~120g vegetable prep per guest for catering meals
  const estimatedVegKg = Math.round((guestCount * 0.12) * 10) / 10;
  // 1 pro can cut ~15kg per hour; 4 hour bulk window
  const requiredPros = Math.max(2, Math.ceil(estimatedVegKg / 60));
  const estimatedCost = Math.round(estimatedVegKg * 45 + requiredPros * 800);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          Bulk & Event Catering Mode
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 font-heading">
          Weddings, Catering & Large Functions
        </h1>
        <p className="text-stone-600 text-sm">
          High-volume precision chopping teams equipped with heavy stainless tools deployed to your event kitchen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Calculator Controls Left Col */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-stone-900 font-heading border-b border-stone-100 pb-3">
              Bulk Event Calculator
            </h2>

            {/* Function Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Function Type</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'Wedding',
                  'Corporate Catering',
                  'Family Function',
                  'Restaurant Back-of-House'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFunctionType(type as any)}
                    className={`p-3 rounded-2xl border font-bold text-left transition-all ${
                      functionType === type
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-2xs'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count Slider */}
            <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-900 uppercase tracking-wider">Expected Guest Count</span>
                <span className="text-lg font-extrabold text-emerald-800 font-heading">{guestCount} Guests</span>
              </div>

              <input
                type="range"
                min={30}
                max={1500}
                step={10}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                <span>30 Guests (Small Party)</span>
                <span>500 Guests</span>
                <span>1,500+ (Grand Wedding)</span>
              </div>
            </div>

            {/* Event Date Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 text-xs focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            {/* Custom Requirements Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Custom Instructions</label>
              <textarea
                rows={3}
                placeholder="Mention specific cuts (e.g. 50kg onions fine chopped, 30kg fruit platters carved)..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 text-xs focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Live Estimate Breakdown Right Col */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-b from-stone-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 sticky top-24">
            <h3 className="text-lg font-bold font-heading text-white border-b border-white/10 pb-3 flex items-center justify-between">
              <span>Bulk Deployment Estimate</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h3>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span>Estimated Veg Quantity:</span>
                <span className="font-extrabold text-white text-sm">{estimatedVegKg} kg</span>
              </div>

              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span>Prep Team Deployment:</span>
                <span className="font-extrabold text-emerald-400 text-sm">{requiredPros} Knife Specialists</span>
              </div>

              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span>Supervisor On-Site:</span>
                <span className="font-bold text-amber-300">Included</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                <span className="font-bold text-white font-heading">Estimated Package Cost:</span>
                <span className="text-2xl font-black text-amber-400 font-heading">₹{estimatedCost}</span>
              </div>
            </div>

            {quoteSubmitted ? (
              <div className="bg-emerald-800 p-4 rounded-2xl text-center space-y-1 text-xs text-emerald-100 border border-emerald-500">
                <span className="font-bold text-white text-sm block">Custom Quote Request Submitted!</span>
                <span>Our Bulk Manager will call you within 15 minutes.</span>
              </div>
            ) : (
              <button
                onClick={handleSubmitQuote}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold py-4 rounded-2xl text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Official Bulk Quote Request</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
