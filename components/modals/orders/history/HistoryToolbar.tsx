import { MagnifyingGlassIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface HistoryToolbarProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onExport: () => void;
}

export default function HistoryToolbar({ search, setSearch, statusFilter, setStatusFilter, onExport }: HistoryToolbarProps) {
  return (
    <div className="shrink-0 p-4 sm:p-5 border-b border-slate-200/80 dark:border-white/5 flex flex-col gap-4 bg-white dark:bg-transparent z-10 relative">
      
      <div className="flex flex-col md:flex-row gap-3">
        
        {/* 🚀 Premium Recessed Search Bar */}
        <div className="relative flex-1 group">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-[color]" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history..." 
            className="w-full pl-11 pr-4 py-3 md:py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:bg-slate-800 dark:text-white shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] placeholder:text-slate-400 transition-[border-color,box-shadow,background-color]"
          />
        </div>

        {/* 🚀 Premium Export Button */}
        <button 
          onClick={onExport} 
          className="shrink-0 flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold shadow-md dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform active:scale-95 outline-none"
        >
          <ArrowDownTrayIcon className="h-4 w-4" /> <span>Export CSV</span>
        </button>

      </div>

      {/* 🚀 Premium Filter Pills */}
      {/* scrollbar-hide ensures the ugly horizontal scrollbar doesn't show on mobile, but allows swiping */}
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
         {['All', 'Delivered', 'Cancelled'].map((status) => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)} 
              className={`shrink-0 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-colors outline-none border ${
                statusFilter === status 
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/30' 
                  : 'text-slate-500 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {status}
            </button>
         ))}
      </div>
    </div>
  );
}