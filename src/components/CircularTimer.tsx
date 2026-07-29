import React, { useEffect, useState } from 'react';
import { Play, Pause, Square, CheckCircle, ShieldCheck, Clock, Flame, Scale } from 'lucide-react';

interface CircularTimerProps {
  totalEstimatedMins?: number;
  initialElapsedSeconds?: number;
  veggieCount?: number;
  onSessionComplete?: (elapsedSeconds: number) => void;
  isInteractive?: boolean;
}

export const CircularTimer: React.FC<CircularTimerProps> = ({
  totalEstimatedMins = 25,
  initialElapsedSeconds = 0,
  veggieCount = 4,
  onSessionComplete,
  isInteractive = true,
}) => {
  const [seconds, setSeconds] = useState(initialElapsedSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [currentVeggieIndex, setCurrentVeggieIndex] = useState(0);

  const totalTargetSeconds = totalEstimatedMins * 60;
  const progressPercent = Math.min(100, Math.round((seconds / totalTargetSeconds) * 100));

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          // Dynamically shift veggie focus as time advances
          const stage = Math.floor((next / totalTargetSeconds) * veggieCount);
          if (stage < veggieCount) {
            setCurrentVeggieIndex(stage);
          }
          return next;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, totalTargetSeconds, veggieCount]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // SVG parameters
  const radius = 90;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const estimatedPeelWasteKg = (seconds * 0.015).toFixed(2);
  const estimatedUsableYieldKg = (1.5 + seconds * 0.08).toFixed(2);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 flex flex-col items-center">
      
      {/* Header Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Live Cutting Session Timer
        </span>
      </div>

      {/* SVG Ring & Digital Counter */}
      <div className="relative w-56 h-56 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
          {/* Background Ring */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            className="stroke-stone-100"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active Progress Ring */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            className="stroke-emerald-600 transition-all duration-500 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Clock className="w-5 h-5 text-emerald-600 mb-1" />
          <div className="text-3xl font-extrabold text-stone-900 font-heading tracking-tight">
            {formatTime(seconds)}
          </div>
          <div className="text-[11px] font-semibold text-stone-500 mt-0.5">
            Target: {totalEstimatedMins} mins
          </div>
          <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            {progressPercent}% Complete
          </div>
        </div>
      </div>

      {/* Live Stats Bar */}
      <div className="w-full grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-stone-100 text-xs">
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 text-center">
          <span className="text-[10px] text-stone-400 font-semibold uppercase block">Est. Peel Waste</span>
          <span className="text-sm font-bold text-amber-600 font-heading">{estimatedPeelWasteKg} kg</span>
        </div>
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 text-center">
          <span className="text-[10px] text-stone-400 font-semibold uppercase block">Usable Output</span>
          <span className="text-sm font-bold text-emerald-700 font-heading">{estimatedUsableYieldKg} kg</span>
        </div>
      </div>

      {/* Interactive Controls */}
      {isInteractive && (
        <div className="flex items-center gap-3 mt-5 w-full">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors ${
              isRunning 
                ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause Timer
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Resume Timer
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              if (onSessionComplete) onSessionComplete(seconds);
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1.5 transition-colors border border-stone-300"
          >
            <Square className="w-3.5 h-3.5 text-rose-600 fill-current" />
            Complete
          </button>
        </div>
      )}

    </div>
  );
};
