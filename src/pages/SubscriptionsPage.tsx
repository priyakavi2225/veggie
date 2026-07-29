import React, { useState } from 'react';
import { INITIAL_SUBSCRIPTION_PLANS, INITIAL_ACTIVE_SUBSCRIPTION } from '../data/mockData';
import { ActiveSubscription } from '../types';
import { 
  Calendar, 
  CheckCircle2, 
  Pause, 
  Play, 
  SkipForward, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Settings
} from 'lucide-react';

export const SubscriptionsPage: React.FC = () => {
  const [activeSub, setActiveSub] = useState<ActiveSubscription>(INITIAL_ACTIVE_SUBSCRIPTION);
  const [skipNotice, setSkipNotice] = useState<string>('');

  const handleTogglePause = () => {
    if (activeSub.status === 'ACTIVE') {
      setActiveSub({
        ...activeSub,
        status: 'PAUSED',
        pausedUntil: '2026-08-05'
      });
    } else {
      setActiveSub({
        ...activeSub,
        status: 'ACTIVE',
        pausedUntil: undefined
      });
    }
  };

  const handleSkipDay = () => {
    setSkipNotice('Tomorrow session (29th July) skipped successfully! No charge incurred.');
    setTimeout(() => setSkipNotice(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Daily Subscription Pass
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 font-heading">
          Automated Morning Kitchen Prep
        </h1>
        <p className="text-stone-600 text-sm">
          Lock in dedicated knife specialists every morning. Pause or skip anytime with 1-click.
        </p>
      </div>

      {/* Active Subscription Control Panel */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-stone-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Active Pass
              </span>
              <span className="text-stone-300 text-xs font-mono">ID: {activeSub.id}</span>
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">{activeSub.planTitle}</h2>
            <p className="text-stone-300 text-xs">
              Time Slot: <strong className="text-white">{activeSub.preferredTimeSlot}</strong> • Next Renewal: <strong className="text-white">{activeSub.nextRenewalDate}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleTogglePause}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                activeSub.status === 'ACTIVE'
                  ? 'bg-amber-500 hover:bg-amber-600 text-stone-900'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {activeSub.status === 'ACTIVE' ? (
                <>
                  <Pause className="w-4 h-4" /> Pause Pass
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Resume Pass
                </>
              )}
            </button>

            <button
              onClick={handleSkipDay}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors"
            >
              <SkipForward className="w-4 h-4 text-emerald-300" />
              <span>Skip Tomorrow</span>
            </button>
          </div>
        </div>

        {/* Status Notification Toast */}
        {skipNotice && (
          <div className="bg-emerald-800/90 text-emerald-200 text-xs p-3 rounded-xl border border-emerald-500 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{skipNotice}</span>
          </div>
        )}

        {/* Subscription Veggie List Summary */}
        <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs space-y-1">
          <span className="text-stone-400 font-semibold block text-[10px] uppercase">Default Daily Prep Recipe</span>
          <p className="text-white font-medium">{activeSub.defaultVeggieListSummary}</p>
        </div>
      </div>

      {/* PLAN CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INITIAL_SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-3xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 transition-all ${
              plan.frequency === 'Daily'
                ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                : 'border-stone-200/90 hover:border-stone-300 shadow-xs'
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {plan.frequency} Pass
                </span>
                {plan.frequency === 'Daily' && (
                  <span className="bg-amber-500 text-stone-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Most Popular
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 font-heading">{plan.title}</h3>
                <p className="text-stone-500 text-xs mt-1">{plan.recommendedFor}</p>
              </div>

              <div className="pt-2">
                <span className="text-3xl font-extrabold text-stone-900 font-heading">₹{plan.pricePerMonth}</span>
                <span className="text-stone-500 text-xs"> / month (₹{plan.pricePerSession}/session)</span>
              </div>

              <div className="space-y-2 pt-2 text-xs text-stone-700">
                {plan.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveSub({
                  ...activeSub,
                  planId: plan.id,
                  planTitle: plan.title,
                  frequency: plan.frequency
                });
                alert(`Subscribed to ${plan.title}!`);
              }}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-colors"
            >
              Select & Subscribe Pass
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
