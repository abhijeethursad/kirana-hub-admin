"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { broadcastSync } from "@/lib/sync"; // 🚀 Import the helper

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StoreStatusToggle() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    setMounted(true);

    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${API_URL}/settings`);
        if (res.data?.store?.isOpen !== undefined) {
          setIsOpen(res.data.store.isOpen);
        }
      } catch (error) {
        console.error("Failed to fetch store status", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();

    // Listen ONLY for local changes (the GlobalSync engine handles the cross-tab stuff now!)
    const handleSync = (e: CustomEvent) => setIsOpen(e.detail);
    window.addEventListener('sync-store-status', handleSync as EventListener);
    
    return () => {
      window.removeEventListener('sync-store-status', handleSync as EventListener);
    };
  }, []);

  const handleToggle = async () => {
    const newState = !isOpen;
    
    // 1. Optimistic UI
    setIsOpen(newState);
    showToast(`Store is now ${newState ? 'OPEN' : 'CLOSED'}`);

    // 2. Broadcast to Same Tab & Other Tabs
    window.dispatchEvent(new CustomEvent('sync-store-status', { detail: newState }));
    broadcastSync('SHOP_STATUS_CHANGED', newState); // 🚀 1 Line!

    try {
      const res = await axios.get(`${API_URL}/settings`);
      const currentStore = res.data.store;
      await axios.patch(`${API_URL}/settings`, { store: { ...currentStore, isOpen: newState } });
    } catch (error) {
      console.error("Failed to update store status", error);
      setIsOpen(!newState);
      showToast("Failed to update status", "error");
      
      // 3. Revert Broadcasts
      window.dispatchEvent(new CustomEvent('sync-store-status', { detail: !newState }));
      broadcastSync('SHOP_STATUS_CHANGED', !newState); // 🚀 1 Line!
    }
  };

  if (loading) return (
    <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 dark:bg-slate-800/50 p-1 pr-3 rounded-full border border-slate-200 dark:border-slate-700">
       <div className="h-7 w-12 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
       <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
    </div>
  );

  const ToastNotification = mounted ? createPortal(
    <div className={`fixed bottom-8 right-8 z-[9999] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${toast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'}`}>
      <div className={`flex items-center gap-3 px-6 py-3.5 rounded-full shadow-2xl border ${toast.type === 'success' ? 'bg-white text-slate-900 border-slate-200/50' : 'bg-red-500 text-white border-red-600'}`}>
        {toast.type === 'success' ? <CheckBadgeIcon className="h-5 w-5 text-slate-700" /> : <ExclamationTriangleIcon className="h-5 w-5" />}
        <span className="font-bold text-sm tracking-wide">{toast.msg}</span>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {ToastNotification}
      <button onClick={handleToggle} className={`group flex items-center gap-2.5 p-1 pr-3 sm:pr-4 rounded-full border transition-transform duration-300 active:scale-95 shadow-sm outline-none ${isOpen ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20" : "bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20"}`}>
        <div className={`relative w-10 h-6 rounded-full shrink-0 shadow-inner ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}>
          <div className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center ${isOpen ? 'translate-x-4' : 'translate-x-0'}`}>
            {isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>}
            <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          </div>
        </div>
        <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wide ${isOpen ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
          {isOpen ? "Shop Open" : "Shop Closed"}
        </span>
      </button>
    </>
  );
}