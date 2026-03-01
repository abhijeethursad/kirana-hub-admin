import { XMarkIcon, CurrencyRupeeIcon, UserIcon, BanknotesIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Customer } from "@/types/customer";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCustomer: Customer | null;
  formData: Customer;
  setFormData: (val: Customer) => void;
  handleSave: (e: React.FormEvent) => void;
}

export default function CustomerModal({ isOpen, onClose, editingCustomer, formData, setFormData, handleSave }: CustomerModalProps) {
  if (!isOpen) return null;

  // 🚀 Prevents typing negative signs or exponential 'e' in financial inputs
  const blockInvalidNumberChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300 md:p-4">
      
      {/* 🚀 Mobile Optimization: h-[100dvh] and rounded-none on mobile for native feel */}
      <div className="bg-slate-50 dark:bg-slate-900 w-full h-[100dvh] md:h-auto md:w-[600px] rounded-none md:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-0 md:border border-slate-200/60 dark:border-slate-700/60 flex flex-col md:max-h-[90vh] animate-in slide-in-from-bottom-8 md:zoom-in-95 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
        
        {/* Header */}
        <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 shrink-0">
              <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {editingCustomer ? "Edit Customer" : "Add New Customer"}
              </h3>
              <p className="text-[11px] md:text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
                Manage contact details and credit status.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="h-10 w-10 md:h-8 md:w-8 shrink-0 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-transform active:scale-95 outline-none"
          >
            <XMarkIcon className="h-6 w-6 md:h-5 md:w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 relative bg-slate-50 dark:bg-slate-900/50">
          <form id="customerForm" onSubmit={handleSave} className="space-y-4 md:space-y-6 pb-10">
            
            {/* 🚀 Section 1: Personal Details */}
            <div className="bg-white dark:bg-slate-800/80 p-4 md:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4 md:space-y-5">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Personal Details
              </h4>
              <div className="grid grid-cols-1 gap-4 md:gap-5">
                <div>
                  <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                  {/* 🚀 Recessed styling & larger mobile padding */}
                  <input required type="text" value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3.5 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 font-medium text-sm shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" placeholder="e.g. Rahul Sharma" />
                </div>
                
                <div>
                  <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 dark:border-slate-700 pr-2">
                      <span className="text-slate-500 font-bold text-sm">+91</span>
                    </div>
                    <input required type="tel" value={formData.phone || ""} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-16 pr-4 py-3.5 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 font-medium text-sm shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" placeholder="98765 43210" />
                  </div>
                </div>
              </div>
            </div>

            {/* 🚀 Section 2: Financial Standing */}
            <div className="bg-white dark:bg-slate-800/80 p-4 md:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4 md:space-y-5">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BanknotesIcon className="h-5 w-5 text-slate-400" />
                Financial Standing
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                
                {/* 🚀 Premium Credit Input with Dynamic Red Highlighting & Custom Spinners */}
                <div className="relative z-0 group">
                  <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Credit (Udhaar)</label>
                  <div className="relative">
                    <CurrencyRupeeIcon className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 ${formData.credit > 0 ? "text-red-500" : "text-slate-400"}`} />
                    <input 
                      type="number" 
                      min="0"
                      onKeyDown={blockInvalidNumberChars}
                      value={formData.credit === 0 ? "" : formData.credit} 
                      onChange={(e) => setFormData({...formData, credit: e.target.value === "" ? 0 : Math.max(0, Number(e.target.value))})} 
                      className={`w-full pl-10 pr-12 md:pr-10 py-3.5 md:py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-800 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 font-medium text-sm shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        formData.credit > 0 
                          ? "border-red-200 dark:border-red-900/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-red-600 font-bold" 
                          : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      }`} 
                      placeholder="0"
                    />
                    
                    {/* Custom Spinners */}
                    <div className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 flex flex-col opacity-100 md:opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => setFormData({...formData, credit: formData.credit + 10})} className="p-1.5 md:p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400 rounded-t-lg outline-none">
                        <ChevronUpIcon className="h-4 w-4 md:h-3 md:w-3" strokeWidth={3} />
                      </button>
                      <button type="button" onClick={() => setFormData({...formData, credit: Math.max(0, formData.credit - 10)})} className="p-1.5 md:p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400 rounded-b-lg outline-none">
                        <ChevronDownIcon className="h-4 w-4 md:h-3 md:w-3" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 🚀 Premium Total Spent Input */}
                <div className="relative z-0 group">
                  <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Total Spent</label>
                  <div className="relative">
                    <CurrencyRupeeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="number" 
                      min="0"
                      onKeyDown={blockInvalidNumberChars}
                      value={formData.spent === 0 ? "" : formData.spent} 
                      onChange={(e) => setFormData({...formData, spent: e.target.value === "" ? 0 : Math.max(0, Number(e.target.value))})} 
                      className="w-full pl-10 pr-12 md:pr-10 py-3.5 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 font-medium text-sm shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                      placeholder="0"
                    />
                    
                    {/* Custom Spinners */}
                    <div className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 flex flex-col opacity-100 md:opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => setFormData({...formData, spent: formData.spent + 50})} className="p-1.5 md:p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400 rounded-t-lg outline-none">
                        <ChevronUpIcon className="h-4 w-4 md:h-3 md:w-3" strokeWidth={3} />
                      </button>
                      <button type="button" onClick={() => setFormData({...formData, spent: Math.max(0, formData.spent - 50)})} className="p-1.5 md:p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400 rounded-b-lg outline-none">
                        <ChevronDownIcon className="h-4 w-4 md:h-3 md:w-3" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 border-t border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-3 md:gap-4 shrink-0 mt-auto">
          <button 
            onClick={onClose} 
            type="button"
            className="flex-1 px-4 py-4 md:py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-transform active:scale-95 text-sm"
          >
            Cancel
          </button>
          <button 
            form="customerForm" 
            type="submit" 
            className="flex-1 px-4 py-4 md:py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-transform active:scale-95 text-sm flex items-center justify-center"
          >
            {editingCustomer ? "Save Changes" : "Add Customer"}
          </button>
        </div>

      </div>
    </div>
  );
}