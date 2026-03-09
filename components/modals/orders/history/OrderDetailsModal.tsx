import { useRef, useEffect } from "react";
import { XMarkIcon, MapPinIcon, ClockIcon, CreditCardIcon, XCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Order } from "@/types/order";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  // 🚀 Enterprise Animation & Physics Engine
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const currentDragY = useRef(0);

  // 🚀 The Perfect Spring Entrance Animation
  useEffect(() => {
    if (isOpen && modalRef.current && backdropRef.current) {
      modalRef.current.style.transition = 'none';
      modalRef.current.style.transform = 'translateY(100%)';
      backdropRef.current.style.transition = 'none';
      backdropRef.current.style.opacity = '0';

      const frame = requestAnimationFrame(() => {
        if (modalRef.current && backdropRef.current) {
          modalRef.current.style.transition = 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)';
          modalRef.current.style.transform = 'translateY(0px)';
          
          backdropRef.current.style.transition = 'opacity 0.4s ease';
          backdropRef.current.style.opacity = '1';
        }
      });

      currentDragY.current = 0;
      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const getPremiumStatusStyle = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 ring-1 ring-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]';
      case 'Cancelled': return 'bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400 ring-1 ring-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)]';
      case 'Refunded': return 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 ring-1 ring-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-slate-300/50 dark:ring-white/10';
    }
  };

  // 🚀 The Unified Exit Engine
  const triggerClose = () => {
    if (modalRef.current && backdropRef.current) {
      modalRef.current.style.transition = 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
      modalRef.current.style.transform = 'translateY(100%)';
      
      backdropRef.current.style.transition = 'opacity 0.4s ease';
      backdropRef.current.style.opacity = '0';
    }
    
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      triggerClose();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    if (modalRef.current) {
      modalRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const delta = currentY - touchStartY.current;
    
    if (delta > 0 && modalRef.current) {
      currentDragY.current = delta;
      modalRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!modalRef.current) return;
    modalRef.current.style.transition = 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
    
    if (currentDragY.current > 150) {
      triggerClose(); 
    } else {
      modalRef.current.style.transform = `translateY(0px)`;
      currentDragY.current = 0;
    }
  };

  return (
    <div 
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{ opacity: 0 }} 
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm p-0 sm:p-6"
    >
      <div 
        ref={modalRef}
        style={{ transform: 'translateY(100%)' }} 
        className="bg-slate-50 dark:bg-[#0A0A0C] w-full sm:w-[540px] max-h-[85vh] rounded-t-[2rem] sm:rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden ring-1 ring-slate-200 dark:ring-white/10 will-change-transform"
      >
        
        <div 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="shrink-0 touch-none cursor-grab active:cursor-grabbing bg-white dark:bg-[#121418] z-20 relative"
        >
          <div className="w-full pt-4 pb-1.5 flex justify-center sm:hidden">
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          </div>

          <div className="px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center border-b border-slate-200 dark:border-white/5 shadow-sm relative">
            <div>
              <p className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-1">Receipt Summary</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-mono">#{order.id}</h3>
                <span className={`px-2 py-1 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${getPremiumStatusStyle(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <button onClick={triggerClose} className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-transform active:scale-90 outline-none z-30 relative cursor-pointer">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-[#0A0A0C]">
          <div className="p-5 sm:p-8 flex flex-col gap-5 sm:gap-6 pb-24 sm:pb-10">
            
            <div className="flex items-center gap-3 sm:gap-4 bg-white dark:bg-[#121418] p-3.5 sm:p-4 rounded-[1.5rem] border border-slate-200/60 dark:border-white/5 shadow-sm">
              <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full bg-gradient-to-tr from-indigo-100 to-slate-50 dark:from-indigo-500/20 dark:to-slate-800 border border-indigo-200/50 dark:border-indigo-500/20 flex items-center justify-center font-black text-lg sm:text-xl text-indigo-700 dark:text-indigo-300 shadow-inner">
                {order.customer.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate tracking-tight">{order.customer}</p>
                <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{order.location || "Location not provided"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-[#121418] p-3.5 sm:p-4 rounded-[1.5rem] border border-slate-200/60 dark:border-white/5 shadow-sm flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest truncate">
                  <div className="p-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 shrink-0">
                    <ClockIcon className="h-3 w-3" />
                  </div>
                  <span className="truncate">Date & Time</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 pl-1 truncate">{order.timeAgo}</p>
              </div>
              <div className="bg-white dark:bg-[#121418] p-3.5 sm:p-4 rounded-[1.5rem] border border-slate-200/60 dark:border-white/5 shadow-sm flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest truncate">
                  <div className="p-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 shrink-0">
                    <CreditCardIcon className="h-3 w-3" />
                  </div>
                  <span className="truncate">Payment</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 pl-1 truncate">{order.payment || "COD"}</p>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] sm:text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                <ShoppingBagIcon className="h-4 w-4" /> Order Summary
              </h4>
              
              <div className="bg-white dark:bg-[#121418] rounded-3xl sm:rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-white/5 relative">
                <div className="p-1.5 sm:p-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2.5 sm:p-4 rounded-[1rem] sm:rounded-2xl hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center h-6 w-6 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400 transition-colors">
                          {item.qty}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">{item.name}</span>
                      </div>
                      {/* 🚀 FIXED: Added Item Price to Modal */}
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">₹{item.price || 0}</span>
                    </div>
                  ))}
                </div>

                <div className="relative h-6 w-full flex items-center justify-center overflow-hidden">
                  <div className="absolute w-full border-t-[1.5px] border-dashed border-slate-200 dark:border-slate-800"></div>
                  <div className="absolute -left-3 h-6 w-6 rounded-full bg-slate-50 dark:bg-[#0A0A0C] border border-slate-200 dark:border-white/5 shadow-inner z-10"></div>
                  <div className="absolute -right-3 h-6 w-6 rounded-full bg-slate-50 dark:bg-[#0A0A0C] border border-slate-200 dark:border-white/5 shadow-inner z-10"></div>
                </div>

                <div className="px-5 py-4 sm:p-6 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02] rounded-b-3xl sm:rounded-b-[2rem]">
                  <span className="text-[10px] sm:text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Grand Total</span>
                  <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">₹{order.total}</span>
                </div>
              </div>
            </div>

            {order.removedItems && order.removedItems.length > 0 && (
              <div>
                <h4 className="text-[10px] sm:text-[11px] font-black text-red-500 dark:text-red-400 uppercase tracking-widest mb-2.5 sm:mb-3 flex items-center gap-1.5">
                  <XCircleIcon className="h-4 w-4" /> Removed / Out of Stock
                </h4>
                <div className="bg-red-50/50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-sm">
                  {order.removedItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2.5 sm:p-3 rounded-[1rem] sm:rounded-2xl">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-md bg-red-100 dark:bg-red-500/10 text-[10px] sm:text-xs font-black text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                          {item.qty}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-red-900 dark:text-red-300 line-clamp-1">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         {/* 🚀 Added strikethrough price for removed items */}
                         <span className="text-xs font-bold text-red-400 line-through">₹{item.price || 0}</span>
                         <span className="text-[9px] sm:text-[11px] font-bold text-red-500 dark:text-red-500/70 italic bg-red-100 dark:bg-red-500/10 px-1.5 sm:px-2 py-1 rounded-md shrink-0">
                           {item.reason}
                         </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {order.rejectionReason && !order.removedItems && (
              <div className="bg-amber-50/50 dark:bg-amber-500/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-amber-200/50 dark:border-amber-500/10 shadow-sm">
                <p className="text-[9px] sm:text-[10px] text-amber-600 dark:text-amber-500 font-black uppercase tracking-widest mb-1 sm:mb-1.5">Cancellation Note</p>
                <p className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 leading-relaxed">{order.rejectionReason}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}