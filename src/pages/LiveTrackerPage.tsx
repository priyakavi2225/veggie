import React, { useState } from 'react';
import { Booking } from '../types';
import { CircularTimer } from '../components/CircularTimer';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  ArrowRight, 
  Scale, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface LiveTrackerPageProps {
  booking: Booking;
  onSessionFinished: (completedBooking: Booking) => void;
}

export const LiveTrackerPage: React.FC<LiveTrackerPageProps> = ({
  booking,
  onSessionFinished,
}) => {
  const [sessionStatus, setSessionStatus] = useState<'PRO_EN_ROUTE' | 'PRO_ARRIVED' | 'CUTTING_IN_PROGRESS' | 'COMPLETED'>(
    (booking.status as any) || 'CUTTING_IN_PROGRESS'
  );
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'Pro', text: `Hello! I am ${booking.professional?.name || 'Ramesh'}. I am carrying a sanitized cutting kit and nitrile gloves.` },
    { sender: 'User', text: 'Great, please buzz flat 402 when you reach.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const pro = booking.professional || {
    name: 'Ramesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 4.95,
    phone: '+91 98765 43210',
    etaMins: 12
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { sender: 'User', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'Pro', text: 'Understood! I will follow your instructions precisely.' }
      ]);
    }, 1200);
  };

  const handleTimerComplete = (elapsedSeconds: number) => {
    const wasteWeight = Number((0.12 * elapsedSeconds * 0.01).toFixed(2)) || 0.55;
    const initialWeight = Number(booking.veggies.reduce((sum, v) => sum + v.weightGrams / 1000, 0).toFixed(2)) || 3.5;
    const usableWeight = Number((initialWeight - wasteWeight).toFixed(2));

    const updatedBooking: Booking = {
      ...booking,
      status: 'COMPLETED',
      wasteReceipt: {
        initialWeightKg: initialWeight,
        peelWasteKg: wasteWeight,
        usableWeightKg: Math.max(0.1, usableWeight),
        kitchenEfficiencyScore: Math.round((usableWeight / initialWeight) * 100) || 85,
        timeTakenMinutes: Math.round(elapsedSeconds / 60) || 20,
        beforePhotoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
        afterPhotoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80'
      }
    };

    onSessionFinished(updatedBooking);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Top Banner Status */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-600/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Session #{booking.bookingNumber}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            {sessionStatus === 'PRO_EN_ROUTE' && 'Specialist En Route'}
            {sessionStatus === 'PRO_ARRIVED' && 'Specialist Arrived at Location'}
            {sessionStatus === 'CUTTING_IN_PROGRESS' && 'Vegetable Cutting in Progress'}
            {sessionStatus === 'COMPLETED' && 'Session Complete'}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm">
            Address: <strong className="text-white">{booking.address.title}</strong> - {booking.address.fullAddress}
          </p>
        </div>

        {/* Quick Action Status Shift Toggle */}
        <div className="flex bg-stone-800/90 p-1.5 rounded-2xl border border-stone-700 text-xs">
          <button
            onClick={() => setSessionStatus('PRO_EN_ROUTE')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              sessionStatus === 'PRO_EN_ROUTE' ? 'bg-amber-500 text-stone-900' : 'text-stone-400'
            }`}
          >
            En Route
          </button>
          <button
            onClick={() => setSessionStatus('CUTTING_IN_PROGRESS')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              sessionStatus === 'CUTTING_IN_PROGRESS' ? 'bg-emerald-600 text-white' : 'text-stone-400'
            }`}
          >
            Cutting Live
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Specialist Info & Map */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Pro Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <img src={pro.avatar} alt={pro.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-900 text-base font-heading">{pro.name}</h3>
                  <div className="text-xs text-amber-500 font-bold">★ {pro.rating} Verified Prep Master</div>
                </div>
              </div>

              {/* Call & Chat Triggers */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Calling ${pro.name} at ${pro.phone}`)}
                  className="p-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl transition-colors"
                  title="Call Specialist"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-colors"
                  title="Chat Specialist"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Chat Box Toggle */}
            {chatOpen && (
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-3 text-xs animate-in slide-in-from-top-2">
                <div className="font-bold text-stone-700 flex justify-between">
                  <span>Direct Chat with {pro.name}</span>
                  <button onClick={() => setChatOpen(false)} className="text-stone-400">Close</button>
                </div>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {messages.map((m, i) => (
                    <div key={i} className={`p-2 rounded-xl text-xs max-w-[80%] ${
                      m.sender === 'User' ? 'bg-emerald-700 text-white ml-auto' : 'bg-white text-stone-800 border border-stone-200'
                    }`}>
                      {m.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type instruction..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs"
                  />
                  <button onClick={handleSendMessage} className="bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs">
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Hygiene Certification Pill */}
            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900 font-semibold">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Specialist verified equipped with Medical Gloves & Sanitized Stainless Boards.</span>
            </div>
          </div>

          {/* Interactive Map Tracking Simulation */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-sm font-heading">Live Location Tracking</h3>
              <span className="text-xs font-bold text-emerald-700">ETA: {pro.etaMins} Mins</span>
            </div>

            <div className="relative h-48 bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden flex items-center justify-center">
              <div 
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80')` }}
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-lg border border-stone-200 flex items-center gap-3 text-xs max-w-xs">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <span className="font-bold text-stone-900 block">{pro.name} is on route</span>
                  <span className="text-[11px] text-stone-500">Passing Indiranagar 100ft Road</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Circular Timer Control */}
        <div className="lg:col-span-6 space-y-6">
          <CircularTimer
            totalEstimatedMins={20}
            initialElapsedSeconds={booking.liveTimerSecondsElapsed || 240}
            veggieCount={booking.veggies.length}
            onSessionComplete={handleTimerComplete}
            isInteractive={true}
          />

          {/* Veggies Cutting Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-stone-900 text-sm font-heading">Session Vegetable Checklist</h3>
            <div className="space-y-2">
              {booking.veggies.map((veg, idx) => (
                <div key={idx} className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-stone-900">{veg.name} ({veg.weightGrams}g)</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md text-[11px]">
                    Cut: {veg.cutStyle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
