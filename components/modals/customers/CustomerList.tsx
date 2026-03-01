import { PhoneIcon, ChatBubbleLeftRightIcon, PencilSquareIcon, TrashIcon, ClockIcon, ShoppingBagIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Customer } from "@/types/customer";

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  openWhatsApp: (phone: string) => void;
}

export default function CustomerList({ customers, onEdit, onDelete, openWhatsApp }: CustomerListProps) {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto backdrop-blur-3xl custom-scrollbar">
      
      {/* 📱 MOBILE & 💊 TABLET CARD VIEW (Native App Feel) */}
      {/* 🚀 Changed to lg:hidden to cover iPads, and added md:grid-cols-2 for a beautiful tablet layout */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 p-3 sm:p-4">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div key={customer.id} className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                 <div className="flex items-center gap-3">
                    <img src={customer.avatar} alt={customer.name} className="h-12 w-12 rounded-full border border-slate-200 dark:border-white/10 object-cover bg-slate-100 dark:bg-slate-700" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{customer.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                         <ClockIcon className="h-3 w-3" />
                         <span className="line-clamp-1">Last visit: {customer.lastVisit}</span>
                      </div>
                    </div>
                 </div>
                 {customer.credit > 0 ? (
                    <span className="shrink-0 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 text-[10px] font-bold uppercase tracking-wide">
                      Due: ₹{customer.credit}
                    </span>
                 ) : (
                    <span className="shrink-0 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                      Paid
                    </span>
                 )}
              </div>
              <div className="grid grid-cols-2 gap-3 py-2">
                 <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 shadow-inner dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Phone</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 font-mono mt-0.5 line-clamp-1">{customer.phone}</p>
                 </div>
                 <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 shadow-inner dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Total Spent</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-1">₹{customer.spent.toLocaleString()}</p>
                 </div>
              </div>
              <div className="flex gap-2">
                 {/* 🚀 Replaced transition-colors with transition-transform active:scale-95 for premium touch feel */}
                 <button onClick={() => openWhatsApp(customer.phone)} className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 transition-transform active:scale-95">
                   <ChatBubbleLeftRightIcon className="h-5 w-5" /> Chat
                 </button>
                 <button onClick={() => window.location.href = `tel:${customer.phone}`} className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 transition-transform active:scale-95">
                   <PhoneIcon className="h-5 w-5" /> Call
                 </button>
                 <button onClick={() => onEdit(customer)} className="p-3 sm:p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:text-slate-400 dark:hover:bg-slate-800 transition-transform active:scale-95">
                   <PencilSquareIcon className="h-5 w-5" />
                 </button>
                 <button onClick={() => onDelete(customer.id)} className="p-3 sm:p-2.5 rounded-xl border border-slate-200 text-red-500 hover:bg-red-50 dark:border-white/10 dark:text-red-400 dark:hover:bg-red-500/10 transition-transform active:scale-95">
                   <TrashIcon className="h-5 w-5" />
                 </button>
              </div>
            </div>
          ))
        ) : (
           <div className="col-span-1 md:col-span-2 p-10 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm mt-4">
              <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 opacity-30 dark:opacity-20" />
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">No customers found</p>
           </div>
        )}
      </div>

      {/* 💻 DESKTOP TABLE VIEW (Laptops & Large Monitors Only) */}
      {/* 🚀 Changed to hidden lg:block to keep it off iPads */}
      <div className="hidden lg:block overflow-x-auto w-full ">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50/95 dark:bg-slate-700/95 backdrop-blur-md">
            <tr className="text-slate-500 dark:text-slate-300 text-xs uppercase tracking-wider font-extrabold border border-slate-200 dark:border-slate-600/80">
              <th className="p-4 pl-6">Customer</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4">Credit (Udhaar)</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-800 ">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/40 border border-slate-200 dark:border-slate-700/80">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-4 ">
                      <img src={customer.avatar} alt={customer.name} className="h-10 w-10 rounded-full border border-slate-200 dark:border-white/10 object-cover bg-slate-100 dark:bg-slate-800 shadow-sm" />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{customer.name}</div>
                        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Last visit: {customer.lastVisit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300 font-mono">{customer.phone}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/80 text-xs font-bold text-slate-700 dark:text-slate-300 border border-transparent dark:border-white/5">
                      <ShoppingBagIcon className="h-3.5 w-3.5 text-slate-400" />
                      {customer.orders}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900 dark:text-white">₹{customer.spent.toLocaleString()}</td>
                  <td className="p-4">
                    {customer.credit > 0 ? (
                      <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 text-[10px] font-bold uppercase tracking-wide">
                        Due: ₹{customer.credit}
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                        Paid
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {/* 🚀 Premium clean hover actions just like the Product List */}
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openWhatsApp(customer.phone)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 rounded-lg transition-transform active:scale-95 outline-none" title="Chat">
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => window.location.href = `tel:${customer.phone}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 rounded-lg transition-transform active:scale-95 outline-none" title="Call">
                        <PhoneIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => onEdit(customer)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 rounded-lg transition-transform active:scale-95 outline-none" title="Edit">
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => onDelete(customer.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 rounded-lg transition-transform active:scale-95 outline-none" title="Delete">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-16 w-16 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-white/5">
                      <MagnifyingGlassIcon className="h-8 w-8 text-slate-300 dark:text-slate-500" />
                    </div>
                    <p className="font-bold text-slate-500 dark:text-slate-400 text-sm">No customers found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}