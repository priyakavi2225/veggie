import React from 'react';
import { ServiceTypeId } from '../types';
import { ArrowRight, CheckCircle2, Clock, Sparkles, Calendar, Users, ShieldCheck } from 'lucide-react';

interface ServiceSelectionPageProps {
  onStartBooking: (serviceType: ServiceTypeId) => void;
  setCurrentTab: (tab: string) => void;
}

export const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({
  onStartBooking,
  setCurrentTab,
}) => {
  const services = [
    {
      id: 'one-time' as ServiceTypeId,
      title: 'One-Time Vegetable & Fruit Cut',
      tagline: 'On-demand prep specialist at your home in 20 mins',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
      description: 'Ideal for daily home cooking, salad assemblies, and casual dinners. Pick your custom vegetables, weights, and precision cut styles.',
      benefits: [
        'Custom cut style choice (Fine diced, julienne, cubed, thin sliced)',
        'Bring Your Own (BYO) or Partner Supply toggle',
        'Transparent cutting fee starting at just ₹149',
        'Sanitized cutting board & knife set included'
      ],
      buttonText: 'Start One-Time Booking',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      badge: 'Popular for Daily Meals',
      badgeBg: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'recipe-based' as ServiceTypeId,
      title: 'Recipe-Based Kitchen Prep',
      tagline: 'Select recipe → Auto vegetable list & cut style generator',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
      description: 'Skip ingredient calculation. Pick recipes like Sambar, Hakka Noodles, Pav Bhaji, or Thai Curry, and we auto-generate exact vegetable quantities for your serving size.',
      benefits: [
        'Serving size selector (2 to 12 servings)',
        'Auto-suggests exact cut styles suited for the recipe',
        'Editable vegetable list & special instructions',
        'Zero ingredient wastage'
      ],
      buttonText: 'Explore Recipes & Book',
      buttonBg: 'bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold',
      badge: 'Zero Waste Recipe Mode',
      badgeBg: 'bg-amber-100 text-amber-900'
    },
    {
      id: 'daily-subscription' as ServiceTypeId,
      title: 'Daily / Weekly Subscription Pass',
      tagline: 'Automated recurring morning prep slots with dedicated pros',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80',
      description: 'Never chop vegetables again. Lock in daily, alternate day, or weekly morning prep slots. Pause, skip days, or adjust veggie lists anytime.',
      benefits: [
        'Up to 40% discount on session charges',
        'Dedicated trained professional assigned to your home',
        'Pause subscription or skip specific days with 1-click',
        'Priority slot booking guarantee'
      ],
      buttonText: 'View Subscription Plans',
      buttonBg: 'bg-emerald-800 hover:bg-emerald-900 text-white',
      badge: 'Save Up to 40%',
      badgeBg: 'bg-emerald-900 text-emerald-200'
    },
    {
      id: 'bulk-event' as ServiceTypeId,
      title: 'Bulk & Event Prep Mode',
      tagline: 'High-volume chopping team for weddings, parties & catering',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80',
      description: 'Host large gatherings effortlessly. Deploys specialized multi-person knife teams equipped with industrial-grade chopper tools for 50 to 1,000+ guests.',
      benefits: [
        'Guest count quantity & team requirement auto-calculator',
        'Fruit platter carvings & salad presentation options',
        'Dedicated supervisor on-site for quality check',
        'Custom corporate & wedding catering pricing'
      ],
      buttonText: 'Calculate Bulk Event Estimate',
      buttonBg: 'bg-stone-900 hover:bg-stone-800 text-white',
      badge: '50 to 1,000+ Guests',
      badgeBg: 'bg-rose-100 text-rose-800'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Service Selection
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 font-heading">
          Choose Your Kitchen Prep Mode
        </h1>
        <p className="text-stone-600 text-sm">
          Select the service format that fits your cooking workflow today.
        </p>
      </div>

      {/* 4 Large Cards */}
      <div className="space-y-8">
        {services.map((srv) => (
          <div 
            key={srv.id}
            className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12"
          >
            {/* Image Column */}
            <div className="md:col-span-5 relative min-h-[240px] md:min-h-full">
              <img 
                src={srv.image} 
                alt={srv.title} 
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-4 left-4 text-xs font-extrabold px-3 py-1 rounded-full shadow-xs ${srv.badgeBg}`}>
                {srv.badge}
              </span>
            </div>

            {/* Content Column */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                  {srv.tagline}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading">
                  {srv.title}
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {srv.description}
                </p>

                {/* Benefits List */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {srv.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-stone-100">
                <button
                  onClick={() => {
                    if (srv.id === 'daily-subscription') {
                      setCurrentTab('subscriptions');
                    } else if (srv.id === 'bulk-event') {
                      setCurrentTab('bulk');
                    } else {
                      onStartBooking(srv.id);
                    }
                  }}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all ${srv.buttonBg}`}
                >
                  <span>{srv.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
