import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  UserCheck, 
  Store, 
  User, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  Briefcase, 
  HelpCircle, 
  Menu, 
  X, 
  Mic, 
  Search,
  CheckCircle2,
  ChefHat
} from 'lucide-react';
import { Address } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activeRole: 'customer' | 'pro' | 'vendor';
  setActiveRole: (role: 'customer' | 'pro' | 'vendor') => void;
  addresses: Address[];
  selectedAddress: Address;
  setSelectedAddress: (addr: Address) => void;
  hasActiveBooking?: boolean;
  onOpenVoiceBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  activeRole,
  setActiveRole,
  addresses,
  selectedAddress,
  setSelectedAddress,
  hasActiveBooking,
  onOpenVoiceBooking
}) => {
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'subscriptions', label: 'Daily Subscription' },
    { id: 'bulk', label: 'Bulk / Events' },
    { id: 'my-bookings', label: 'My Bookings' },
    { id: 'support', label: 'Help & Support' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      {/* Top Banner / Hygiene Assurance Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex items-center justify-between font-medium">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-emerald-800 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Sanitized & Verified
            </span>
            <span className="hidden sm:inline text-emerald-200/90">
              Gloves, Sanitized Cutting Boards & N95 Masks mandatory for all Pros
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <button 
              onClick={onOpenVoiceBooking}
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors bg-emerald-800/80 hover:bg-emerald-800 px-2.5 py-0.5 rounded-full"
            >
              <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Voice Booking</span>
            </button>
            <span className="text-emerald-700">|</span>
            <span className="hidden md:inline">24x7 Customer Care: +91 800-VEGGIE</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setCurrentTab('home'); setActiveRole('customer'); }}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <ChefHat className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-stone-900 font-heading block leading-none">
                  Veggie<span className="text-emerald-600">Hands</span>
                </span>
                <span className="text-[10px] font-medium text-stone-500 uppercase tracking-wider block mt-0.5">
                  Urban Prep Services
                </span>
              </div>
            </button>

            {/* Location Selector */}
            {activeRole === 'customer' && (
              <div className="relative hidden md:block ml-4 pl-4 border-l border-stone-200">
                <button
                  onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                  className="flex items-center gap-2 text-xs font-medium text-stone-700 hover:text-emerald-700 bg-stone-50 hover:bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200/80 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div className="text-left max-w-[140px] truncate">
                    <span className="font-semibold text-stone-900 block truncate">{selectedAddress.title}</span>
                    <span className="text-[10px] text-stone-500 truncate block">{selectedAddress.fullAddress}</span>
                  </div>
                </button>

                {showAddressDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="text-xs font-semibold text-stone-400 px-2 py-1 uppercase tracking-wider">
                      Select Delivery Location
                    </div>
                    {addresses.map((addr) => (
                      <button
                        key={addr.id}
                        onClick={() => {
                          setSelectedAddress(addr);
                          setShowAddressDropdown(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs flex items-start gap-2.5 transition-colors ${
                          selectedAddress.id === addr.id ? 'bg-emerald-50 text-emerald-900 font-medium' : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${selectedAddress.id === addr.id ? 'text-emerald-600' : 'text-stone-400'}`} />
                        <div>
                          <div className="font-semibold">{addr.title}</div>
                          <div className="text-stone-500 text-[11px] line-clamp-2">{addr.fullAddress}</div>
                        </div>
                      </button>
                    ))}
                    <button 
                      onClick={() => {
                        setShowAddressDropdown(false);
                        setCurrentTab('profile');
                      }}
                      className="w-full text-center mt-1 py-1.5 text-xs text-emerald-700 font-semibold hover:bg-emerald-50 rounded-md transition-colors"
                    >
                      + Add New Location
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links (Desktop Customer Mode) */}
          {activeRole === 'customer' && (
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                    currentTab === item.id
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                  }`}
                >
                  {item.label}
                  {item.id === 'subscriptions' && (
                    <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-white text-[9px] font-bold rounded-full uppercase">
                      Pass
                    </span>
                  )}
                </button>
              ))}
            </nav>
          )}

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            
            {/* Live Tracker Badge if active booking exists */}
            {hasActiveBooking && activeRole === 'customer' && (
              <button
                onClick={() => setCurrentTab('tracker')}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shadow-xs animate-pulse transition-all"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Live Session Running</span>
              </button>
            )}

            {/* Role Switcher Pill (Customer / Pro Portal / Vendor Partner) */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
              <button
                onClick={() => setActiveRole('customer')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  activeRole === 'customer'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => setActiveRole('pro')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  activeRole === 'pro'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <UserCheck className="w-3 h-3" />
                <span>Veggie Pro</span>
              </button>
              <button
                onClick={() => setActiveRole('vendor')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  activeRole === 'vendor'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Store className="w-3 h-3" />
                <span>Vendor</span>
              </button>
            </div>

            {/* User Profile Button */}
            {activeRole === 'customer' && (
              <button
                onClick={() => setCurrentTab('profile')}
                className={`p-2 rounded-lg border transition-colors ${
                  currentTab === 'profile'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
                title="User Profile"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-4 space-y-2 animate-in slide-in-from-top-2">
          {/* Mobile Address selector */}
          <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 mb-3">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block mb-1">
              Active Location
            </span>
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
              <span className="truncate">{selectedAddress.title} - {selectedAddress.fullAddress}</span>
              <button onClick={() => setCurrentTab('profile')} className="text-emerald-700 text-[11px] underline">
                Change
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                  currentTab === item.id
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenVoiceBooking();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2"
          >
            <Mic className="w-4 h-4 animate-pulse text-amber-300" />
            <span>Launch Voice Assistant Booking</span>
          </button>
        </div>
      )}
    </header>
  );
};
