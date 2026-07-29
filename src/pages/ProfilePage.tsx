import React, { useState } from 'react';
import { UserProfile, Address } from '../types';
import { INITIAL_USER_PROFILE } from '../data/mockData';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  ShieldAlert, 
  Utensils, 
  CheckCircle2, 
  Plus, 
  Save, 
  LogOut 
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 font-heading">Account Profile & Preferences</h1>
          <p className="text-xs text-stone-500">Manage your saved addresses, dietary restrictions, and kitchen notes</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Personal Info */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold text-stone-900 text-base font-heading border-b border-stone-100 pb-3">Personal Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block">Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Dietary & Allergy Notes */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold text-stone-900 text-base font-heading border-b border-stone-100 pb-3">
            Kitchen & Allergy Notes
          </h3>
          <p className="text-xs text-stone-500">Specialists read these notes before every cutting session</p>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block">Dietary Restrictions (e.g. Jain / Vegan / Pure Veg)</label>
              <input
                type="text"
                value={profile.dietaryNotes}
                onChange={(e) => setProfile({ ...profile, dietaryNotes: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase tracking-wider block">Allergy Notes</label>
              <input
                type="text"
                value={profile.allergyNotes}
                onChange={(e) => setProfile({ ...profile, allergyNotes: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold text-stone-900 text-base font-heading border-b border-stone-100 pb-3">Saved Delivery Locations</h3>
          <div className="space-y-3 text-xs">
            {profile.savedAddresses.map((addr) => (
              <div key={addr.id} className="p-4 rounded-2xl border border-stone-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 font-heading block">{addr.title}</span>
                    <span className="text-stone-500 text-[11px]">{addr.fullAddress}</span>
                  </div>
                </div>
                {addr.isDefault && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Default</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-800 text-white p-3.5 rounded-2xl text-xs text-center font-bold">
            ✓ Preferences saved successfully!
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-2xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Preferences</span>
        </button>
      </form>

    </div>
  );
};
