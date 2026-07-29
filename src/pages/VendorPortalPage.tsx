import React, { useState } from 'react';
import { INITIAL_VENDOR_INVENTORY } from '../data/mockData';
import { VendorInventoryItem } from '../types';
import { Store, PackageCheck, Edit3, Save, TrendingUp, AlertTriangle } from 'lucide-react';

export const VendorPortalPage: React.FC = () => {
  const [inventory, setInventory] = useState<VendorInventoryItem[]>(INITIAL_VENDOR_INVENTORY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  const handleSavePrice = (id: string) => {
    setInventory(inventory.map((item) => (item.id === id ? { ...item, pricePerKg: editPrice } : item)));
    setEditingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="bg-amber-950 text-amber-100 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="bg-amber-500 text-stone-900 font-extrabold px-3 py-1 rounded-full text-[10px] uppercase">
            Vendor Partner Hub
          </span>
          <h1 className="text-2xl font-extrabold font-heading text-white mt-1">GreenFarm Organic Supply Partner</h1>
          <p className="text-amber-300 text-xs">Direct fresh supply partner for VeggieHands "We Supply" orders</p>
        </div>

        <div className="bg-amber-900 p-4 rounded-2xl border border-amber-800 text-xs text-center space-y-1">
          <span className="text-amber-400 font-bold block uppercase">Today's Dispatch Quantity</span>
          <span className="text-2xl font-black text-white font-heading">340 kg</span>
        </div>
      </div>

      {/* Inventory & Wholesale Catalog Price Management */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 text-xs">
        <h2 className="font-bold text-stone-900 text-base font-heading">Vegetable Catalog & Daily Wholesale Pricing</h2>
        
        <div className="space-y-3">
          {inventory.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-semibold block">{item.category}</span>
                <h4 className="font-bold text-stone-900 text-sm font-heading">{item.vegName}</h4>
                <span className="text-stone-500 text-[11px]">Current Stock: {item.currentStockKg} kg</span>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  item.supplyStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                }`}>
                  {item.supplyStatus}
                </span>

                {editingId === item.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      className="w-20 bg-stone-50 border border-stone-300 rounded-xl p-1.5 text-xs font-bold"
                    />
                    <button
                      onClick={() => handleSavePrice(item.id)}
                      className="bg-emerald-700 text-white p-1.5 rounded-xl text-xs font-bold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">₹{item.pricePerKg}/kg</span>
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditPrice(item.pricePerKg);
                      }}
                      className="p-1.5 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-lg"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
