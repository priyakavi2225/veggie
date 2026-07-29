import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Utensils, 
  Users, 
  ShieldCheck, 
  Mic, 
  Clock, 
  Award, 
  Scale, 
  CheckCircle2, 
  ChefHat, 
  TrendingUp, 
  Zap, 
  Flame,
  Check
} from 'lucide-react';
import { ServiceTypeId, Address } from '../types';
import { CircularTimer } from '../components/CircularTimer';

interface HomePageProps {
  onStartBooking: (serviceType: ServiceTypeId) => void;
  selectedAddress: Address;
  onOpenVoiceBooking: () => void;
  setCurrentTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartBooking,
  selectedAddress,
  onOpenVoiceBooking,
  setCurrentTab,
}) => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-850 to-emerald-950 text-white rounded-b-3xl md:rounded-3xl mx-0 sm:mx-4 mt-0 sm:mt-4 p-6 sm:p-12 shadow-2xl">
        {/* Background Subtle Food Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=80')` }}
        />

        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 z-10">
          
          {/* Hero Left Content */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Serving in <strong className="text-white">{selectedAddress.title}</strong> ({selectedAddress.fullAddress.split(',')[2] || 'Bengaluru'})</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Professional Vegetable & Fruit <span className="text-emerald-400">Cutting at Home.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-body">
              On-demand verified kitchen prep specialists equipped with sanitized stainless boards and precision knives. Diced, julienne, or sliced to perfection in your kitchen.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onStartBooking('one-time')}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <span>Book Prep Specialist Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onStartBooking('recipe-based')}
                className="w-full sm:w-auto bg-stone-800/90 hover:bg-stone-800 text-amber-300 border border-stone-700/80 font-bold px-5 py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Recipe-Based Booking</span>
              </button>

              <button
                onClick={onOpenVoiceBooking}
                className="w-full sm:w-auto bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-300 border border-emerald-700/50 font-semibold px-4 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Voice Booking</span>
              </button>
            </div>

            {/* Daily Subscription Teaser */}
            <div 
              onClick={() => setCurrentTab('subscriptions')}
              className="inline-flex items-center gap-3 bg-stone-800/70 hover:bg-stone-800 border border-amber-500/30 p-2.5 px-4 rounded-xl cursor-pointer text-xs transition-all"
            >
              <div className="p-1.5 bg-amber-500 text-stone-900 rounded-lg shrink-0 font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-bold text-amber-300 block">Daily Subscription Pass Available</span>
                <span className="text-stone-400 text-[11px]">Save up to 40% with automated daily prep slots</span>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Banner / Quick Badge Card */}
          <div className="w-full md:w-80 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Hygiene Guarantee</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                100% Vetted
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-stone-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Medical-Grade Nitrile Gloves</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UV-Sanitized Knife & Board Kit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Exact Peel Waste Weight Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Clean Up Needed Afterwards</span>
              </div>
            </div>

            <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30 flex items-center gap-3">
              <div className="text-2xl font-black text-amber-400 font-heading">4.9★</div>
              <div className="text-[11px] text-stone-300">
                <span className="font-bold text-white block">25,000+ Kitchens</span>
                Satisfied in Bengaluru
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOUR CORE SERVICE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Our Core Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-heading mt-2">
            Tailored Prep Services for Every Kitchen Need
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            From daily curry chopping to grand event catering prep, choose your ideal service mode.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: One-Time Vegetable Cutting */}
          <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80" 
                alt="One-Time Vegetable Cutting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                On-Demand
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-heading">One-Time Vegetable Cutting</h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Select your veggies and custom cut styles (diced, julienne, cubed). Specialists arrive in 20 mins.
                </p>
              </div>
              <button
                onClick={() => onStartBooking('one-time')}
                className="w-full bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Book One-Time Prep</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Recipe-Based Prep */}
          <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80" 
                alt="Recipe-Based Prep"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-amber-500 text-stone-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                Smart Recipe Auto-List
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-heading">Recipe-Based Prep</h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Pick Sambar, Hakka Noodles, Pav Bhaji or Thai Curry. Auto-generates exact veggies and cut styles for servings.
                </p>
              </div>
              <button
                onClick={() => onStartBooking('recipe-based')}
                className="w-full bg-amber-50 hover:bg-amber-500 text-amber-900 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Select Recipe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Daily Subscription */}
          <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80" 
                alt="Daily Subscription"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-emerald-800 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
                Daily / Alternate / Weekly
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-heading">Daily Subscription</h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Set up recurring morning prep slots. Pause, skip, or modify veggie lists anytime with zero penalties.
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('subscriptions')}
                className="w-full bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Explore Subscription Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Bulk / Event Booking */}
          <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80" 
                alt="Bulk Event Booking"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-rose-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                Weddings & Catering
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-heading">Bulk / Event Booking</h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Dedicated multi-specialist team deployment for 50 to 1,000+ guest functions with heavy chopping gear.
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('bulk')}
                className="w-full bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS (5-STEP CARDS) */}
      <section className="bg-stone-100/80 py-12 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-white px-3 py-1 rounded-full border border-stone-200">
              5-Step Seamless Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-heading mt-2">
              How VeggieHands Works
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Hassle-free kitchen prep in 5 quick steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {[
              { num: 1, title: 'Choose Service', desc: 'Select one-time, recipe auto-list, or subscription pass.' },
              { num: 2, title: 'Add Vegetable List', desc: 'Pick vegetables, weights & desired precision cut styles.' },
              { num: 3, title: 'Choose Address', desc: 'Set location, time slot & BYO vs Partner Supply.' },
              { num: 4, title: 'Professional Match', desc: 'Vetted knife specialist assigned with live ETA.' },
              { num: 5, title: 'Payment & Confirm', desc: 'Live timer tracking & waste weight receipt upon finish.' },
            ].map((step) => (
              <div 
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer relative ${
                  activeStep === step.num 
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20' 
                    : 'border-stone-200/80 hover:border-stone-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center font-heading mb-3">
                  {step.num}
                </div>
                <h4 className="font-bold text-stone-900 text-sm font-heading">{step.title}</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* FEATURE HIGHLIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Pioneering Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-heading mt-2">
            Built Specifically for Modern Home Kitchens
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1: Live Cutting Timer Interactive Demo */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl w-fit mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-base font-heading">Live Circular Cutting Timer</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Track every minute of active prep. Real-time circular progress ring with pause controls and real-time peel waste estimate.
              </p>
            </div>
            <div className="pt-2">
              <CircularTimer totalEstimatedMins={15} initialElapsedSeconds={320} isInteractive={false} />
            </div>
          </div>

          {/* Feature 2: BYO vs We Supply */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl w-fit mb-3">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-base font-heading">Bring Your Own OR We Supply</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Choose to supply your own fridge vegetables or request fresh farm vegetables sourced directly from verified organic partner vendors.
              </p>
            </div>

            <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="bg-white p-3 rounded-lg border border-emerald-300 shadow-2xs flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900 block">Bring Your Own (BYO)</span>
                  <span className="text-stone-500 text-[11px]">Pay cutting fee only</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Selected</span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200 opacity-80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900 block">We Supply Fresh Veggies</span>
                  <span className="text-stone-500 text-[11px]">Organic vendor partnership</span>
                </div>
                <span className="text-stone-400 text-[10px] font-semibold">Option</span>
              </div>
            </div>

            <button
              onClick={() => onStartBooking('one-time')}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              Start Custom Booking
            </button>
          </div>

          {/* Feature 3: Waste Weight Receipt */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="p-2.5 bg-rose-100 text-rose-800 rounded-xl w-fit mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-base font-heading">Waste Weight Audit Receipt</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Every session logs exact peel weight, usable cooking weight, and kitchen efficiency score to prevent food waste.
              </p>
            </div>

            <div className="bg-stone-900 text-stone-200 p-4 rounded-xl space-y-2 text-xs font-mono">
              <div className="flex justify-between pb-1 border-b border-stone-800 text-[11px] text-stone-400">
                <span>METRIC</span>
                <span>AUDIT RECORD</span>
              </div>
              <div className="flex justify-between">
                <span>Initial Gross Weight:</span>
                <span className="font-bold text-white">4.20 kg</span>
              </div>
              <div className="flex justify-between">
                <span>Peels & Waste:</span>
                <span className="font-bold text-amber-400">0.52 kg</span>
              </div>
              <div className="flex justify-between">
                <span>Usable Cooking Output:</span>
                <span className="font-bold text-emerald-400">3.68 kg</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-800 text-emerald-300 font-sans font-bold text-[11px]">
                <span>Kitchen Efficiency:</span>
                <span>87.6% (Optimal)</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('my-bookings')}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              View Sample Session Receipts
            </button>
          </div>

        </div>
      </section>

      {/* HYGIENE CERTIFICATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              VeggieHands Medical Grade Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Zero-Touch Food Safety & Hygiene Badges
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Every prep specialist undergoes rigorous background checks, health screenings, and daily temperature audits. Equipment is sanitized with food-safe non-chemical solution before every session.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-white/10 text-emerald-300 text-xs px-3 py-1 rounded-full font-semibold border border-white/20">
                ✓ Medical Nitrile Gloves
              </span>
              <span className="bg-white/10 text-emerald-300 text-xs px-3 py-1 rounded-full font-semibold border border-white/20">
                ✓ Sanitized Board Badge
              </span>
              <span className="bg-white/10 text-emerald-300 text-xs px-3 py-1 rounded-full font-semibold border border-white/20">
                ✓ Hygiene Verified
              </span>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 text-center w-full md:w-auto shrink-0 space-y-3">
            <div className="text-3xl font-black text-amber-300 font-heading">100%</div>
            <div className="text-xs font-semibold text-stone-200">Satisfaction or Free Re-prep</div>
            <button
              onClick={() => onStartBooking('one-time')}
              className="bg-emerald-500 hover:bg-emerald-400 text-stone-900 font-bold px-6 py-3 rounded-xl text-xs w-full transition-colors shadow-lg"
            >
              Experience Hygienic Prep
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
