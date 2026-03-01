import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";

interface CustomerHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  onAdd: () => void;
}

export default function CustomerHeader({ search, setSearch, onAdd }: CustomerHeaderProps) {
  return (
    <div className="relative z-20 shrink-0 p-4 sm:p-5 flex flex-col md:flex-row gap-3 sm:gap-4 justify-between items-start md:items-center border-b border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-800">
      
      {/* 🚀 Search Bar Wrapper: Takes full width on mobile, fixed width on tablet/desktop */}
      <div className="relative w-full md:w-80 lg:w-96 group">
        <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-[color]" />
        
        {/* 🚀 Recessed Input Styling for Dark Mode */}
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone..." 
          className="w-full pl-11 pr-4 py-3 sm:py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:bg-slate-800 transition-[border-color,box-shadow,background-color] dark:text-white shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] placeholder:text-slate-400"
        />
      </div>
      
      {/* 🚀 Premium Tactile Button */}
      <button 
        onClick={onAdd}
        className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform active:scale-95 outline-none"
      >
        <UserPlusIcon className="h-5 w-5" />
        Add Customer
      </button>
      
    </div>
  );
}