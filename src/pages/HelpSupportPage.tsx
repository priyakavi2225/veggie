import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  ChevronDown, 
  ShieldCheck, 
  Send, 
  PhoneCall, 
  LifeBuoy, 
  RefreshCcw 
} from 'lucide-react';

export const HelpSupportPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [issueSubmitted, setIssueSubmitted] = useState(false);
  const [issueCategory, setIssueCategory] = useState('Quality / Cut Style');
  const [issueDetails, setIssueDetails] = useState('');

  const faqs = [
    {
      q: 'Do I need to provide knives or cutting boards?',
      a: 'No! VeggieHands prep specialists bring their own sanitized food-grade stainless steel knives and color-coded chopping boards in a sterile case. However, if you prefer them to use your kitchen equipment, they are happy to comply.'
    },
    {
      q: 'How is hygiene and safety maintained?',
      a: 'All specialists undergo daily health checks, wear medical nitrile gloves, hairnets, and sanitized aprons. Boards are disinfected before every session.'
    },
    {
      q: 'What is the difference between BYO and We Supply?',
      a: 'BYO (Bring Your Own) means you supply the raw vegetables from your fridge and pay only the cutting fee. We Supply means our partner organic vendors deliver farm-fresh vegetables directly before the specialist arrives.'
    },
    {
      q: 'How does the Waste Weight Audit Receipt work?',
      a: 'Before starting, the pro weighs raw vegetables. After cutting, they weigh peels/stems and final usable output. You receive an automated digital receipt calculating your kitchen efficiency score.'
    },
    {
      q: 'Can I cancel or pause my daily subscription pass?',
      a: 'Yes! You can pause your pass or skip specific daily slots with 1-click in the app up to 2 hours before the scheduled morning time slot with zero fee.'
    }
  ];

  const handleRaiseIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setIssueSubmitted(true);
    setTimeout(() => setIssueSubmitted(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Customer Care & Help
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 font-heading">
          How Can We Help You Today?
        </h1>
        <p className="text-stone-600 text-sm">
          24/7 dedicated support for active sessions, refunds, hygiene inquiries, and subscription management.
        </p>
      </div>

      {/* 3 Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-stone-900 block font-heading">24x7 Hotline</span>
            <span className="text-stone-500 text-[11px]">+91 800-VEGGIE (834443)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-900 rounded-xl">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-stone-900 block font-heading">Live Chat Agent</span>
            <span className="text-emerald-700 text-[11px] font-semibold">Average response &lt; 2 mins</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="p-3 bg-rose-100 text-rose-800 rounded-xl">
            <RefreshCcw className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-stone-900 block font-heading">Instant Refund Support</span>
            <span className="text-stone-500 text-[11px]">100% Satisfaction policy</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FAQ Accordion Left Col */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-stone-900 font-heading">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-stone-900 text-xs flex justify-between items-center font-heading hover:bg-stone-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${openFaq === idx ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Raise Issue Ticket Right Col */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-stone-900 font-heading">Raise Support Ticket / Complaint</h2>
            
            <form onSubmit={handleRaiseIssue} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block">Category</label>
                <select
                  value={issueCategory}
                  onChange={(e) => setIssueCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-semibold text-stone-800 focus:outline-hidden"
                >
                  <option value="Quality / Cut Style">Quality / Cut Style Issue</option>
                  <option value="Specialist Delay">Specialist Arrival Delay</option>
                  <option value="Billing / Refund">Billing / Refund Request</option>
                  <option value="Hygiene Concerns">Hygiene Verification Inquiry</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase tracking-wider block">Issue Details</label>
                <textarea
                  rows={4}
                  placeholder="Describe your query or issue with booking..."
                  value={issueDetails}
                  onChange={(e) => setIssueDetails(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              {issueSubmitted && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-center font-bold">
                  ✓ Ticket #TK-8422 raised! Support team will reach out in 10 mins.
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
