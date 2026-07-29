import React, { useState } from 'react';
import { 
  ServiceTypeId, 
  Recipe, 
  VegetableItem, 
  SelectedVeggie, 
  CutStyle, 
  SupplyType, 
  Address, 
  PrepProfessional, 
  Booking 
} from '../types';
import { INITIAL_VEGETABLES, INITIAL_RECIPES, INITIAL_PROFESSIONALS } from '../data/mockData';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Search, 
  Users, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Utensils, 
  Tag, 
  CreditCard, 
  Wallet, 
  Landmark, 
  Banknote, 
  Smartphone,
  Info,
  Trash2
} from 'lucide-react';

interface BookingFlowProps {
  initialServiceType?: ServiceTypeId;
  selectedAddress: Address;
  addresses: Address[];
  onBookingConfirmed: (newBooking: Booking) => void;
  onCancel: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({
  initialServiceType = 'one-time',
  selectedAddress,
  addresses,
  onBookingConfirmed,
  onCancel,
}) => {
  // Stepper state: 1=Service/Recipe, 2=Veggies & Cut Styles, 3=Supply & Address, 4=Pro Selection, 5=Summary & Payment
  const [currentStep, setCurrentStep] = useState<number>(initialServiceType === 'recipe-based' ? 1 : 2);
  const [serviceType, setServiceType] = useState<ServiceTypeId>(initialServiceType);

  // Recipe Selection State
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(INITIAL_RECIPES[0]);
  const [servings, setServings] = useState<number>(4);
  const [recipeSearchQuery, setRecipeSearchQuery] = useState('');

  // Vegetable Selection State
  const [selectedVegList, setSelectedVegList] = useState<SelectedVeggie[]>([
    {
      vegId: INITIAL_VEGETABLES[0].id,
      name: INITIAL_VEGETABLES[0].name,
      weightGrams: 500,
      cutStyle: 'Diced (Medium)' as CutStyle,
      image: INITIAL_VEGETABLES[0].image,
      pricePerKg: INITIAL_VEGETABLES[0].pricePerKg
    },
    {
      vegId: INITIAL_VEGETABLES[1].id,
      name: INITIAL_VEGETABLES[1].name,
      weightGrams: 500,
      cutStyle: 'Cubed (Large)' as CutStyle,
      image: INITIAL_VEGETABLES[1].image,
      pricePerKg: INITIAL_VEGETABLES[1].pricePerKg
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [vegSearchQuery, setVegSearchQuery] = useState('');

  // Supply, Address & Time
  const [supplyType, setSupplyType] = useState<SupplyType>('BYO');
  const [activeAddress, setActiveAddress] = useState<Address>(selectedAddress);
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('08:30 AM - 09:30 AM');

  // Professional Matching
  const [selectedPro, setSelectedPro] = useState<PrepProfessional>(INITIAL_PROFESSIONALS[0]);

  // Payment State
  const [tipAmount, setTipAmount] = useState<number>(30);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Net Banking' | 'Wallet' | 'Cash'>('UPI');

  // Auto-fill veggies when recipe or servings changes
  const applyRecipeVeggies = (recipe: Recipe, servingCount: number) => {
    const scaleFactor = servingCount / recipe.servings;
    const newItems: SelectedVeggie[] = recipe.vegetables.map((v) => {
      const matchVeg = INITIAL_VEGETABLES.find((i) => i.id === v.vegId);
      return {
        vegId: v.vegId,
        name: v.vegName,
        weightGrams: Math.round(v.weightGramsPer4Servings * scaleFactor),
        cutStyle: v.recommendedCutStyle,
        image: matchVeg?.image,
        pricePerKg: matchVeg?.pricePerKg
      };
    });
    setSelectedVegList(newItems);
  };

  // Pricing calculations
  const totalWeightKg = selectedVegList.reduce((sum, item) => sum + item.weightGrams / 1000, 0);
  const cuttingFee = Math.max(149, Math.round(totalWeightKg * 40 + 99));
  
  const supplyCost = supplyType === 'WE_SUPPLY'
    ? Math.round(selectedVegList.reduce((sum, item) => sum + ((item.pricePerKg || 50) * (item.weightGrams / 1000)), 0))
    : 0;

  const promoDiscount = promoApplied ? 50 : 0;
  const taxAmount = Math.round((cuttingFee + supplyCost) * 0.05);
  const grandTotal = Math.max(0, cuttingFee + supplyCost + taxAmount + tipAmount - promoDiscount);

  // Handlers for Veggie List
  const handleAddVeggie = (veg: VegetableItem) => {
    const existing = selectedVegList.find((v) => v.vegId === veg.id);
    if (existing) {
      setSelectedVegList(
        selectedVegList.map((v) =>
          v.vegId === veg.id ? { ...v, weightGrams: v.weightGrams + 250 } : v
        )
      );
    } else {
      setSelectedVegList([
        ...selectedVegList,
        {
          vegId: veg.id,
          name: veg.name,
          weightGrams: 500,
          cutStyle: veg.availableCutStyles[0],
          image: veg.image,
          pricePerKg: veg.pricePerKg
        }
      ]);
    }
  };

  const handleUpdateWeight = (vegId: string, newWeight: number) => {
    if (newWeight <= 0) {
      setSelectedVegList(selectedVegList.filter((v) => v.vegId !== vegId));
    } else {
      setSelectedVegList(
        selectedVegList.map((v) => (v.vegId === vegId ? { ...v, weightGrams: newWeight } : v))
      );
    }
  };

  const handleUpdateCutStyle = (vegId: string, style: CutStyle) => {
    setSelectedVegList(
      selectedVegList.map((v) => (v.vegId === vegId ? { ...v, cutStyle: style } : v))
    );
  };

  const handleFinalConfirmBooking = () => {
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingNumber: `VH-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceType,
      recipeName: serviceType === 'recipe-based' ? selectedRecipe?.name : undefined,
      servings: serviceType === 'recipe-based' ? servings : undefined,
      veggies: selectedVegList,
      supplyType,
      address: activeAddress,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      professional: selectedPro,
      tipAmount,
      promoDiscount,
      taxAmount,
      supplyCost,
      cuttingFee,
      totalAmount: grandTotal,
      paymentMethod,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      liveTimerSecondsElapsed: 0
    };

    onBookingConfirmed(newBooking);
  };

  const categories = ['All', 'Root Veggies', 'Leafy Greens', 'Gourds & Squash', 'Nightshades & Pods', 'Fruits & Citrus'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Cancel Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Exit</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest block font-heading">
            VeggieHands Booking
          </span>
          <span className="text-xs text-stone-500">
            Step {currentStep} of 5
          </span>
        </div>
      </div>

      {/* Progress Stepper Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs">
        <div className="grid grid-cols-5 gap-2 text-center text-[11px] font-semibold">
          {[
            { step: 1, label: 'Service / Recipe' },
            { step: 2, label: 'Veggies & Cuts' },
            { step: 3, label: 'Supply & Slot' },
            { step: 4, label: 'Pro Specialist' },
            { step: 5, label: 'Summary & Pay' },
          ].map((s) => (
            <div
              key={s.step}
              onClick={() => {
                if (s.step < currentStep) setCurrentStep(s.step);
              }}
              className={`py-2 px-1 rounded-xl transition-all ${
                s.step === currentStep
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : s.step < currentStep
                  ? 'bg-emerald-50 text-emerald-800 cursor-pointer hover:bg-emerald-100'
                  : 'bg-stone-50 text-stone-400'
              }`}
            >
              <div className="text-[10px] uppercase block">Step 0{s.step}</div>
              <div className="truncate font-heading">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: SERVICE TYPE & RECIPE SELECTION */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-heading">Choose Prep Service Mode</h2>
              <p className="text-xs text-stone-500 mt-0.5">Select recipe auto-list or custom vegetable cutting</p>
            </div>

            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setServiceType('recipe-based')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  serviceType === 'recipe-based' ? 'bg-amber-500 text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Recipe-Based Prep
              </button>
              <button
                onClick={() => {
                  setServiceType('one-time');
                  setCurrentStep(2);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  serviceType === 'one-time' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                Manual Veg Selection
              </button>
            </div>
          </div>

          {/* Recipe List View */}
          {serviceType === 'recipe-based' && (
            <div className="space-y-6">
              
              {/* Recipe Search & Filter */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search recipes (e.g. Sambar, Hakka Noodles, Pav Bhaji, Thai Curry)..."
                  value={recipeSearchQuery}
                  onChange={(e) => setRecipeSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              {/* Recipe Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INITIAL_RECIPES.filter(r => r.name.toLowerCase().includes(recipeSearchQuery.toLowerCase())).map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      applyRecipeVeggies(recipe, servings);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                      selectedRecipe?.id === recipe.id
                        ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-24 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 space-y-1.5 text-xs">
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {recipe.cuisine}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm font-heading">{recipe.name}</h4>
                      <p className="text-stone-500 line-clamp-2 text-[11px]">{recipe.description}</p>
                      <div className="text-emerald-700 font-semibold text-[11px] pt-1">
                        {recipe.vegetables.length} pre-mapped veggies included
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Serving Size Selector */}
              {selectedRecipe && (
                <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-amber-950 font-heading block">Select Serving Size for {selectedRecipe.name}</span>
                      <span className="text-amber-800 text-[11px]">Vegetable quantities auto-calculate proportionally</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-amber-300">
                      {[2, 4, 6, 8, 12].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setServings(s);
                            applyRecipeVeggies(selectedRecipe, s);
                          }}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                            servings === s ? 'bg-amber-500 text-stone-900' : 'text-stone-600 hover:bg-stone-100'
                          }`}
                        >
                          {s}p
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Auto generated veggie preview list */}
                  <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {selectedVegList.map((v, i) => (
                      <div key={i} className="bg-white p-2 rounded-lg border border-amber-200/80 text-[11px]">
                        <div className="font-bold text-stone-800 truncate">{v.name}</div>
                        <div className="text-stone-500">{v.weightGrams}g • <span className="text-emerald-700 font-semibold">{v.cutStyle}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          <button
            onClick={() => setCurrentStep(2)}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <span>Proceed to Veggie Cut Customization</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      )}

      {/* STEP 2: MANUAL VEGETABLE SELECTION & CUT STYLES */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Selected Veggies Summary Bar */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-stone-900 text-base font-heading">
                  Your Selected Vegetable & Cut Style List ({selectedVegList.length})
                </h3>
                <p className="text-xs text-stone-500">Adjust quantities, cut styles, or special knife requests</p>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Total Weight: {(totalWeightKg).toFixed(2)} kg
              </span>
            </div>

            {selectedVegList.length === 0 ? (
              <div className="text-center py-6 text-stone-400 text-xs">
                No vegetables added yet. Select from the catalog below!
              </div>
            ) : (
              <div className="space-y-3">
                {selectedVegList.map((item) => {
                  const matchCatalog = INITIAL_VEGETABLES.find((v) => v.id === item.vegId);
                  const availableStyles = matchCatalog?.availableCutStyles || [item.cutStyle];

                  return (
                    <div
                      key={item.vegId}
                      className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        )}
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm font-heading">{item.name}</h4>
                          <span className="text-stone-500 text-[11px]">
                            ₹{item.pricePerKg || 50}/kg partner rate
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        
                        {/* Weight Adjuster */}
                        <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden">
                          <button
                            onClick={() => handleUpdateWeight(item.vegId, item.weightGrams - 250)}
                            className="px-2.5 py-1.5 hover:bg-stone-100 text-stone-600"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1.5 font-bold text-stone-800 min-w-[70px] text-center">
                            {item.weightGrams >= 1000 ? `${(item.weightGrams / 1000).toFixed(1)} kg` : `${item.weightGrams} g`}
                          </span>
                          <button
                            onClick={() => handleUpdateWeight(item.vegId, item.weightGrams + 250)}
                            className="px-2.5 py-1.5 hover:bg-stone-100 text-stone-600"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Cut Style Dropdown */}
                        <div className="flex-1 sm:flex-initial">
                          <select
                            value={item.cutStyle}
                            onChange={(e) => handleUpdateCutStyle(item.vegId, e.target.value as CutStyle)}
                            className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-emerald-900 focus:outline-hidden focus:border-emerald-600"
                          >
                            {availableStyles.map((style) => (
                              <option key={style} value={style}>
                                Cut: {style}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleUpdateWeight(item.vegId, 0)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Add Vegetables Catalog Grid */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base font-heading">Add More Vegetables & Fruits</h3>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Veggie Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
              {INITIAL_VEGETABLES
                .filter(v => selectedCategory === 'All' || v.category === selectedCategory)
                .map((veg) => {
                  const isAdded = selectedVegList.some((i) => i.vegId === veg.id);
                  return (
                    <div
                      key={veg.id}
                      className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 flex flex-col justify-between hover:border-stone-300 transition-all text-xs"
                    >
                      <img src={veg.image} alt={veg.name} className="w-full h-24 rounded-xl object-cover mb-2" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-semibold text-stone-400 uppercase">{veg.category}</span>
                        <h4 className="font-bold text-stone-900 font-heading leading-tight">{veg.name}</h4>
                        <p className="text-stone-500 text-[11px]">₹{veg.pricePerKg}/kg</p>
                      </div>

                      <button
                        onClick={() => handleAddVeggie(veg)}
                        className={`w-full mt-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
                          isAdded
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isAdded ? 'Add +250g' : 'Add Veggie'}</span>
                      </button>
                    </div>
                  );
                })}
            </div>

          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-3.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              disabled={selectedVegList.length === 0}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors disabled:opacity-50"
            >
              <span>Proceed to Supply & Address</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: SUPPLY TOGGLE, ADDRESS & TIME SLOT */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Supply Toggle */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base font-heading">Choose Vegetable Supply Option</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 1: BYO */}
              <div
                onClick={() => setSupplyType('BYO')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  supplyType === 'BYO'
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-stone-900 font-heading text-sm">Bring Your Own (BYO)</span>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    supplyType === 'BYO' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300'
                  }`}>
                    {supplyType === 'BYO' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  You provide your fridge vegetables. Our specialist brings sanitized boards and knives to perform cutting. Pay service fee only.
                </p>
                <span className="text-[11px] font-bold text-emerald-800 mt-3 block">Supply Fee: ₹0</span>
              </div>

              {/* Option 2: We Supply */}
              <div
                onClick={() => setSupplyType('WE_SUPPLY')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  supplyType === 'WE_SUPPLY'
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-stone-900 font-heading text-sm">We Supply Fresh Vegetables</span>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    supplyType === 'WE_SUPPLY' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300'
                  }`}>
                    {supplyType === 'WE_SUPPLY' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sourced fresh from our verified farm partners directly before arrival. Clean, organic, and hand-selected.
                </p>
                <span className="text-[11px] font-bold text-amber-700 mt-3 block">Estimated Supply Cost: ₹{supplyCost}</span>
              </div>

            </div>
          </div>

          {/* Address Picker & Map Simulation */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base font-heading">Select Delivery Address</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setActiveAddress(addr)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 text-xs ${
                    activeAddress.id === addr.id
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${activeAddress.id === addr.id ? 'text-emerald-600' : 'text-stone-400'}`} />
                  <div>
                    <span className="font-bold text-stone-900 block font-heading">{addr.title}</span>
                    <span className="text-stone-500 text-[11px]">{addr.fullAddress}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Map Visual Mockup */}
            <div className="relative h-32 bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden flex items-center justify-center">
              <div 
                className="absolute inset-0 opacity-30 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80')` }}
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-xs px-4 py-2 rounded-xl shadow-md text-center text-xs">
                <MapPin className="w-5 h-5 text-emerald-600 mx-auto animate-bounce" />
                <span className="font-bold text-stone-900 block mt-0.5">Location Pinlocked</span>
                <span className="text-[10px] text-stone-500">{activeAddress.fullAddress}</span>
              </div>
            </div>
          </div>

          {/* Time Slot Picker */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base font-heading">Select Date & Time Slot</h3>
            
            <div className="flex gap-2">
              {['Today', 'Tomorrow', 'Day After'].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedDate === d ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                '07:30 AM - 08:30 AM',
                '08:30 AM - 09:30 AM',
                '10:00 AM - 11:00 AM',
                '12:30 PM - 01:30 PM',
                '05:00 PM - 06:00 PM',
                '06:30 PM - 07:30 PM',
              ].map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                    selectedTimeSlot === slot
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-2xs'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-3.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Match Prep Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 4: PROFESSIONAL MATCHING */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div>
              <h3 className="font-bold text-stone-900 text-base font-heading">Select Verified Prep Specialist</h3>
              <p className="text-xs text-stone-500">
                Specialists nearby fitted with sanitized knife & board kits
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INITIAL_PROFESSIONALS.map((pro) => (
                <div
                  key={pro.id}
                  onClick={() => setSelectedPro(pro)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    selectedPro.id === pro.id
                      ? 'border-emerald-500 bg-emerald-50/40 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={pro.avatar} alt={pro.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm font-heading">{pro.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5">
                        <span className="text-amber-500 font-bold">★ {pro.rating}</span>
                        <span>({pro.reviewsCount} reviews)</span>
                        <span>• {pro.jobsCompleted} jobs</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
                        {pro.distanceKm} km away • ETA {pro.etaMins} mins
                      </span>
                    </div>
                  </div>

                  {/* Hygiene Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pro.hygieneBadges.map((badge, idx) => (
                      <span key={idx} className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ✓ {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-3.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Review Booking & Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 5: BOOKING SUMMARY & PAYMENT */}
      {currentStep === 5 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          
          {/* Summary Left Col */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Booking Details Card */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-stone-900 text-base font-heading pb-3 border-b border-stone-100">
                Booking Summary Review
              </h3>

              <div className="grid grid-cols-2 gap-3 text-stone-600">
                <div>
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase">Service Mode</span>
                  <span className="font-bold text-stone-900">{serviceType === 'recipe-based' ? `Recipe: ${selectedRecipe?.name}` : 'One-Time Cut'}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase">Supply Toggle</span>
                  <span className="font-bold text-emerald-700">{supplyType === 'BYO' ? 'Bring Your Own (BYO)' : 'We Supply Fresh Veggies'}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase">Slot Time</span>
                  <span className="font-bold text-stone-900">{selectedDate}, {selectedTimeSlot}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase">Specialist</span>
                  <span className="font-bold text-stone-900">{selectedPro.name} ({selectedPro.rating}★)</span>
                </div>
              </div>

              {/* Items Table */}
              <div className="pt-2">
                <span className="text-stone-400 font-semibold block text-[10px] uppercase mb-2">Vegetables & Cut Styles</span>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {selectedVegList.map((item, idx) => (
                    <div key={idx} className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 flex items-center justify-between">
                      <span className="font-bold text-stone-900">{item.name} ({item.weightGrams}g)</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                        {item.cutStyle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-stone-900 text-base font-heading">Select Payment Method</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'UPI', label: 'UPI / GPay / PhonePe', icon: Smartphone },
                  { id: 'Card', label: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'Net Banking', label: 'Net Banking', icon: Landmark },
                  { id: 'Wallet', label: 'Paytm / Wallets', icon: Wallet },
                  { id: 'Cash', label: 'Cash Post Prep', icon: Banknote },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === pm.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-2xs'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <pm.icon className="w-5 h-5 text-emerald-700" />
                    <span className="text-[11px] font-semibold">{pm.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Price Breakdown Right Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-lg space-y-4 text-xs sticky top-24">
              <h3 className="font-bold text-stone-900 text-base font-heading pb-3 border-b border-stone-100">
                Payment Breakdown
              </h3>

              <div className="space-y-2.5 text-stone-600">
                <div className="flex justify-between">
                  <span>Vegetable Cutting Fee:</span>
                  <span className="font-bold text-stone-900">₹{cuttingFee}</span>
                </div>

                {supplyType === 'WE_SUPPLY' && (
                  <div className="flex justify-between">
                    <span>Partner Vegetable Supply:</span>
                    <span className="font-bold text-stone-900">₹{supplyCost}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Taxes & Hygiene Fee:</span>
                  <span className="font-bold text-stone-900">₹{taxAmount}</span>
                </div>

                {/* Tip option */}
                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Tip Specialist ({selectedPro.name})</span>
                  <div className="flex gap-2">
                    {[0, 20, 30, 50].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTipAmount(t)}
                        className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                          tipAmount === t ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        ₹{t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="pt-2 space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo (e.g. VEGGIE50)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs uppercase"
                    />
                    <button
                      onClick={() => setPromoApplied(true)}
                      className="px-3 py-1.5 bg-stone-900 text-white font-bold rounded-xl text-xs"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <span className="text-emerald-600 font-bold text-[11px]">✓ ₹50 Promo Applied!</span>
                  )}
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-sm">
                  <span className="font-bold text-stone-900 font-heading">Grand Total:</span>
                  <span className="text-xl font-extrabold text-emerald-800 font-heading">₹{grandTotal}</span>
                </div>
              </div>

              {/* Confirm Action Button */}
              <button
                onClick={handleFinalConfirmBooking}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-4 rounded-2xl text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <span>Confirm & Launch Live Tracker</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
