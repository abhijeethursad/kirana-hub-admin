import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function OrdersSkeleton() {
  return (
    <div className="space-y-6 pb-20 relative">
      
      {/* 🚀 Inverted Waterfall Physics Engine */}
      <style>{`
        @keyframes invertedWaterfall { 
          0% { opacity: 0; transform: translateY(20px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        .animate-waterfall-invert { 
          opacity: 0; 
          animation: invertedWaterfall 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>
      
      {/* --- 1. STATIC HEADER (Loads Last: 200ms) --- */}
      <div className="animate-waterfall-invert" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Order Manager</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage kitchen orders.</p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-full md:w-auto opacity-50 pointer-events-none">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-white dark:bg-slate-900 text-slate-400 shadow-sm">
              <Squares2X2Icon className="h-4 w-4" /> Live Board
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400">
              <ListBulletIcon className="h-4 w-4" /> History
            </button>
          </div>
        </div>
      </div>

      {/* --- 2. LOADING CONTENT --- */}
      <div className="space-y-6">
        
        {/* --- 🚀 FIXED: Kanban Status Tabs Skeleton --- */}
        <div className="animate-waterfall-invert" style={{ animationDelay: '100ms' }}>
          <div className="bg-white dark:bg-slate-900/40 rounded-2xl p-2 border border-slate-200 dark:border-slate-800/60 shadow-sm animate-pulse">
            <div className="grid grid-cols-3 gap-1 md:flex md:gap-2">
               
               {/* Pending Tab Skeleton */}
               <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 md:px-6 py-3 rounded-xl border bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30 w-full md:w-auto">
                 <div className="h-4 w-4 md:h-5 md:w-5 bg-orange-200 dark:bg-orange-500/40 rounded-md shrink-0"></div>
                 <div className="h-3 md:h-3.5 w-12 md:w-16 bg-orange-200 dark:bg-orange-500/40 rounded-md"></div>
               </div>

               {/* Preparing Tab Skeleton */}
               <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 md:px-6 py-3 rounded-xl border border-transparent bg-slate-100 dark:bg-slate-800/50 w-full md:w-auto">
                 <div className="h-4 w-4 md:h-5 md:w-5 bg-slate-200 dark:bg-slate-700 rounded-md shrink-0"></div>
                 <div className="h-3 md:h-3.5 w-14 md:w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
               </div>

               {/* Ready Tab Skeleton */}
               <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 md:px-6 py-3 rounded-xl border border-transparent bg-slate-100 dark:bg-slate-800/50 w-full md:w-auto">
                 <div className="h-4 w-4 md:h-5 md:w-5 bg-slate-200 dark:bg-slate-700 rounded-md shrink-0"></div>
                 <div className="h-3 md:h-3.5 w-10 md:w-14 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
               </div>

            </div>
          </div>
        </div>

        {/* --- Cards Grid Skeleton (Loads First: 0ms) --- */}
        <div className="animate-waterfall-invert" style={{ animationDelay: '0ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
             {[1, 2, 3, 4, 5, 6].map((i) => (
               <div key={i} className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200 dark:border-slate-700/60 flex flex-col shadow-sm">
                 
                 {/* Header: Order ID & Timer */}
                 <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                       <div className="space-y-2">
                         <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                         <div className="h-2.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-sm"></div>
                       </div>
                    </div>
                    <div className="h-6 w-12 bg-slate-100 dark:bg-slate-700/50 rounded-md"></div>
                 </div>

                 {/* Customer Box (Recessed) */}
                 <div className="mb-5 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-800/60">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                    <div className="space-y-2 w-full">
                       <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                       <div className="h-2.5 w-32 bg-slate-100 dark:bg-slate-800 rounded-sm"></div>
                    </div>
                 </div>

                 {/* Order Items List (Recessed) */}
                 <div className="space-y-4 flex-1 mb-5 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                    {[1, 2].map((item) => (
                      <div key={item} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded-md shrink-0"></div>
                          <div className="h-3 w-24 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                        </div>
                        <div className="h-3 w-10 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                      </div>
                    ))}
                 </div>

                 {/* Footer: Totals & Buttons */}
                 <div className="mt-auto">
                    <div className="flex justify-between items-end mb-4">
                       <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded-sm"></div>
                       <div className="h-6 w-20 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                       <div className="h-11.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"></div>
                       <div className="h-11.5 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                 </div>

               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}