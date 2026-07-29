import React, { useState } from 'react';
import { Booking } from '../types';
import { 
  CheckCircle2, 
  Download, 
  Star, 
  Scale, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';

interface SessionSummaryPageProps {
  booking: Booking;
  onDone: () => void;
}

export const SessionSummaryPage: React.FC<SessionSummaryPageProps> = ({
  booking,
  onDone,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Neatness', 'Punctuality', 'Hygiene']);
  const [comment, setComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [showAfterPhoto, setShowAfterPhoto] = useState<boolean>(true);

  const receipt = booking.wasteReceipt || {
    initialWeightKg: 3.5,
    peelWasteKg: 0.55,
    usableWeightKg: 2.95,
    kitchenEfficiencyScore: 84,
    timeTakenMinutes: 22,
    beforePhotoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80'
  };

  const tagOptions = ['Neatness', 'Punctuality', 'Hygiene', 'Knife Precision', 'Friendly Behavior'];

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDownloadInvoice = () => {
    alert(`Downloading VeggieHands Session Receipt #${booking.bookingNumber}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Top Banner */}
      <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl text-center space-y-3">
        <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Kitchen Prep Session Completed!
        </h1>
        <p className="text-emerald-200 text-xs sm:text-sm max-w-lg mx-auto">
          Session #{booking.bookingNumber} completed successfully. Workstation sanitized and veggies ready for cooking.
        </p>
        <button
          onClick={handleDownloadInvoice}
          className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-750 text-white text-xs font-bold px-4 py-2 rounded-xl border border-emerald-600 transition-colors"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Download PDF Waste & Payment Receipt</span>
        </button>
      </div>

      {/* Waste Weight Audit Receipt Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h3 className="font-bold text-stone-900 text-base font-heading">Waste Weight Audit Receipt</h3>
            <p className="text-xs text-stone-500">Official peel vs usable output audit</p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full text-xs">
            Efficiency Score: {receipt.kitchenEfficiencyScore}%
          </span>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-center">
            <span className="text-stone-400 text-[10px] font-semibold uppercase block">Initial Weight</span>
            <span className="text-base font-extrabold text-stone-900 font-heading">{receipt.initialWeightKg} kg</span>
          </div>

          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-center">
            <span className="text-amber-800 text-[10px] font-semibold uppercase block">Peel Waste</span>
            <span className="text-base font-extrabold text-amber-900 font-heading">{receipt.peelWasteKg} kg</span>
          </div>

          <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-center">
            <span className="text-emerald-800 text-[10px] font-semibold uppercase block">Usable Yield</span>
            <span className="text-base font-extrabold text-emerald-900 font-heading">{receipt.usableWeightKg} kg</span>
          </div>

          <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-center">
            <span className="text-stone-400 text-[10px] font-semibold uppercase block">Prep Time</span>
            <span className="text-base font-extrabold text-stone-900 font-heading">{receipt.timeTakenMinutes} Mins</span>
          </div>
        </div>

        {/* Before & After Photo Comparison */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 text-xs font-heading flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-emerald-600" /> Before vs After Workstation Photo Audit
            </span>
            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
              <button
                onClick={() => setShowAfterPhoto(false)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  !showAfterPhoto ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                }`}
              >
                Before Cut
              </button>
              <button
                onClick={() => setShowAfterPhoto(true)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  showAfterPhoto ? 'bg-emerald-700 text-white shadow-2xs' : 'text-stone-500'
                }`}
              >
                After Precision Cut
              </button>
            </div>
          </div>

          <div className="relative h-56 rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
            <img
              src={showAfterPhoto ? receipt.afterPhotoUrl : receipt.beforePhotoUrl}
              alt="Audit Workstation"
              className="w-full h-full object-cover transition-all duration-300"
            />
            <span className="absolute bottom-3 left-3 bg-stone-900/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
              {showAfterPhoto ? '✓ Post-Prep Precision Cut Output' : 'Unprocessed Fresh Ingredients'}
            </span>
          </div>
        </div>
      </div>

      {/* Ratings & Review Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
        <h3 className="font-bold text-stone-900 text-base font-heading">Rate Your Specialist ({booking.professional?.name || 'Ramesh'})</h3>

        {reviewSubmitted ? (
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center space-y-1 text-xs">
            <span className="font-bold text-emerald-900 text-sm block">Thank you for your review!</span>
            <span className="text-emerald-700">Your feedback keeps VeggieHands standards high.</span>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            
            {/* Stars */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform"
                >
                  <Star className={`w-8 h-8 ${rating >= star ? 'fill-current text-amber-400' : 'text-stone-300'}`} />
                </button>
              ))}
              <span className="ml-2 font-bold text-stone-800 text-sm">{rating}.0 / 5.0</span>
            </div>

            {/* Tag Pills */}
            <div className="space-y-1.5">
              <span className="text-stone-400 font-semibold block text-[11px] uppercase">What went well?</span>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleToggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full font-bold transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    ✓ {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Area */}
            <textarea
              rows={3}
              placeholder="Add optional notes regarding hygiene, behavior, or knife precision..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 text-xs focus:bg-white focus:border-emerald-600 focus:outline-hidden"
            />

            <button
              onClick={() => setReviewSubmitted(true)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              Submit Star Rating & Review
            </button>
          </div>
        )}
      </div>

      <div className="pt-2">
        <button
          onClick={onDone}
          className="w-full bg-stone-900 hover:bg-stone-800 text-white font-extrabold py-4 rounded-2xl text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
