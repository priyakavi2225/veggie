import React, { useState } from 'react';
import { Mic, X, Sparkles, Check, Play, Volume2, ArrowRight } from 'lucide-react';
import { SelectedVeggie, CutStyle } from '../types';

interface VoiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyParsedVeggies: (veggies: SelectedVeggie[]) => void;
}

export const VoiceBookingModal: React.FC<VoiceBookingModalProps> = ({
  isOpen,
  onClose,
  onApplyParsedVeggies,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Kannada' | 'Tamil'>('English');
  const [parsedList, setParsedList] = useState<SelectedVeggie[] | null>(null);

  if (!isOpen) return null;

  const sampleVoicePrompts = {
    English: "Cut 1kg red onions fine diced, 500g tomatoes cubed and 1kg carrots julienne thin sticks.",
    Hindi: "1 kg pyaz fine chopped karo aur 500g gajar julienne cut karke rakho.",
    Kannada: "1kg eerulli diced cut mathu 500g gajjari julienne cut beku.",
    Tamil: "1kg vengayam fine chopped matrum 500g carrot julienne cut venum."
  };

  const handleSimulateVoiceInput = (sample?: string) => {
    setIsListening(true);
    setSpokenText('');
    setParsedList(null);

    const textToSpeak = sample || sampleVoicePrompts[language];

    setTimeout(() => {
      setSpokenText(textToSpeak);
      setIsListening(false);

      // Parse simulated items
      const items: SelectedVeggie[] = [
        {
          vegId: 'veg-1',
          name: 'Red Onions',
          weightGrams: 1000,
          cutStyle: 'Diced (Fine)' as CutStyle,
          specialInstructions: 'Separated layers'
        },
        {
          vegId: 'veg-2',
          name: 'Roma Tomatoes',
          weightGrams: 500,
          cutStyle: 'Cubed (Large)' as CutStyle
        },
        {
          vegId: 'veg-3',
          name: 'Fresh Carrots',
          weightGrams: 1000,
          cutStyle: 'Julienne (Thin Sticks)' as CutStyle
        }
      ];
      setParsedList(items);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Mic className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 font-heading text-base">Regional Voice Booking</h3>
              <p className="text-xs text-stone-500">Speak your vegetable cut list naturally</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language selector tabs */}
        <div className="flex items-center gap-2 my-4">
          <span className="text-xs font-semibold text-stone-400 uppercase">Lang:</span>
          {(['English', 'Hindi', 'Kannada', 'Tamil'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                language === lang 
                  ? 'bg-emerald-700 text-white shadow-xs' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Mic Visualizer Area */}
        <div className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-200/80 my-2 flex flex-col items-center">
          <button
            onClick={() => handleSimulateVoiceInput()}
            disabled={isListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform active:scale-95 ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse-ring'
                : 'bg-gradient-to-tr from-emerald-600 to-emerald-800 text-white hover:scale-105'
            }`}
          >
            <Mic className="w-8 h-8" />
          </button>

          <p className="text-xs font-bold text-stone-700 mt-4">
            {isListening ? 'Listening... Speak now' : 'Tap Microphone to Speak'}
          </p>

          {/* Sample Prompts */}
          <div className="mt-3 bg-white p-3 rounded-xl border border-stone-200 text-left w-full text-xs">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Sample Command ({language}):
            </div>
            <p className="text-stone-700 italic font-medium">
              "{sampleVoicePrompts[language]}"
            </p>
            <button
              onClick={() => handleSimulateVoiceInput(sampleVoicePrompts[language])}
              className="mt-2 text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <Play className="w-3 h-3 fill-current" /> Auto-fill Sample Command
            </button>
          </div>
        </div>

        {/* Parsed Output */}
        {spokenText && (
          <div className="mt-4 animate-in slide-in-from-bottom-2">
            <div className="text-xs font-bold text-stone-800 mb-1 flex items-center justify-between">
              <span>Detected Command:</span>
              <span className="text-emerald-600 font-semibold text-[11px]">AI Parsed Successfully</span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-stone-800 mb-3 font-medium">
              "{spokenText}"
            </div>

            {parsedList && (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {parsedList.map((item, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900">{item.name}</span>
                      <span className="text-stone-500 text-[11px] ml-2">({item.weightGrams}g)</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md text-[11px]">
                      {item.cutStyle}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                if (parsedList) {
                  onApplyParsedVeggies(parsedList);
                  onClose();
                }
              }}
              className="w-full mt-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Transfer Items to Booking Flow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
