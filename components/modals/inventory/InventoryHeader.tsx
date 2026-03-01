import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import CustomSelect from "./CustomSelect";
import { CATEGORIES } from "@/types/inventory";

interface InventoryHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  onAdd: () => void;
}

export default function InventoryHeader({ search, setSearch, categoryFilter, setCategoryFilter, onAdd }: InventoryHeaderProps) {
  return (
    <div className="relative p-4 sm:p-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800 shrink-0">
      
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 md:max-w-3xl ">
        
        {/* Search Bar */}
        <div className="relative w-full sm:flex-1 md:w-72 group">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500" />
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search inventory..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-[box-shadow] dark:text-white" 
          />
        </div>
        
        {/* Category Filter */}
        <div className="relative w-full sm:w-56 shrink-0">
           <CustomSelect value={categoryFilter} onChange={setCategoryFilter} options={["All Categories", ...CATEGORIES]} />
        </div>
      </div>

      {/* Add Product Button */}
      <button 
        onClick={onAdd} 
        className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 transition-transform hover:scale-105 active:scale-95"
      >
        <PlusIcon className="h-5 w-5" /> Add Product
      </button>

    </div>
  );
}