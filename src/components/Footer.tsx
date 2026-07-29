import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ChefHat, 
  Award, 
  PhoneCall, 
  CheckCircle, 
  HeartHandshake, 
  Scale, 
  UtensilsCrossed 
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hygiene & Quality Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-stone-800">
          <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/50 flex items-start gap-3">
            <div className="p-2 bg-emerald-950 text-emerald-400 rounded-lg shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-heading">Sanitized Equipment</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Custom stainless steel knives & food-grade sanitized boards.</p>
            </div>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/50 flex items-start gap-3">
            <div className="p-2 bg-amber-950 text-amber-400 rounded-lg shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-heading">Hygiene Certified</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">100% Gloves, Hairnets & Temperature checked pros.</p>
            </div>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/50 flex items-start gap-3">
            <div className="p-2 bg-rose-950 text-rose-400 rounded-lg shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-heading">Waste Weight Audit</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Exact peel vs usable weight receipt delivered post-session.</p>
            </div>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/50 flex items-start gap-3">
            <div className="p-2 bg-emerald-950 text-emerald-400 rounded-lg shrink-0">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-heading">BYO or We Supply</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Use your kitchen veggies or let our organic partners deliver.</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-10 border-b border-stone-800 text-xs">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <ChefHat className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white font-heading">
                Veggie<span className="text-emerald-500">Hands</span>
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-sm">
              India's premier on-demand vegetable cutting, fruit platter preparation, and specialized kitchen prep marketplace delivered directly to your doorstep.
            </p>
            <div className="flex items-center gap-2 text-stone-400 pt-1">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Support Hotline: <strong>+91 800-VEGGIE (834443)</strong></span>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Services</h5>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => setCurrentTab('services')} className="hover:text-emerald-400">One-Time Cut Prep</button></li>
              <li><button onClick={() => setCurrentTab('services')} className="hover:text-emerald-400">Recipe-Based Cutting</button></li>
              <li><button onClick={() => setCurrentTab('subscriptions')} className="hover:text-emerald-400">Daily Subscription Pass</button></li>
              <li><button onClick={() => setCurrentTab('bulk')} className="hover:text-emerald-400">Bulk & Wedding Event Mode</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Features</h5>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => setCurrentTab('home')} className="hover:text-emerald-400">Live Circular Timer</button></li>
              <li><button onClick={() => setCurrentTab('home')} className="hover:text-emerald-400">Waste Weight Receipt</button></li>
              <li><button onClick={() => setCurrentTab('home')} className="hover:text-emerald-400">Voice Booking Regional</button></li>
              <li><button onClick={() => setCurrentTab('support')} className="hover:text-emerald-400">Hygiene Badges System</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Partners</h5>
            <ul className="space-y-2 text-stone-400">
              <li><span className="text-emerald-400 font-medium">Join as Prep Professional</span></li>
              <li><span className="text-amber-400 font-medium">Partner Fresh Veggie Vendor</span></li>
              <li><button onClick={() => setCurrentTab('support')} className="hover:text-emerald-400">Safety & Insurance</button></li>
              <li><button onClick={() => setCurrentTab('support')} className="hover:text-emerald-400">FAQs & Help</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <div>© {new Date().getFullYear()} VeggieHands Technologies Pvt Ltd. All rights reserved.</div>
          <div className="flex gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">Hygiene Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
