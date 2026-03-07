import { EyeIcon, TrashIcon, XCircleIcon, CheckBadgeIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Order } from "@/types/order";

interface HistoryListProps {
  orders: Order[];
  onDelete: (id: string | number) => void;
  onView: () => void;
}

export default function HistoryList({ orders, onDelete, onView }: HistoryListProps) {
  
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20';
      case 'Refunded': return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
      default: return 'bg-red-500 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10';
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50 dark:bg-slate-900/50 custom-scrollbar border-t border-slate-200/50 dark:border-white/5">
      
      {/* 📱 MOBILE & 💊 TABLET CARD VIEW */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 ">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-slate-800 p-4 sm:p-5 border-b border-slate-200 dark:border-white/5 shadow-sm flex flex-col">
              
              <div className="flex justify-between items-start mb-4">
                 <div>
                   <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Order ID</span>
                   <p className="font-bold text-slate-900 dark:text-white text-sm">#{order.id}</p>
                 </div>
                 <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle(order.status)}`}>
                   {order.status}
                 </span>
              </div>

              <div className="flex items-center gap-3 mb-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-white/5 shadow-inner dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                 <div className="h-10 w-10 shrink-0 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center font-bold text-sm text-slate-600 dark:text-slate-300 shadow-sm">
                   {order.customer.charAt(0)}
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{order.customer}</p>
                   <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{order.timeAgo}</p>
                 </div>
                 <div className="text-right pl-2">
                   <p className="text-base font-black text-indigo-600 dark:text-indigo-400 tracking-tight">₹{order.total}</p>
                 </div>
              </div>

              {/* Removed Items Section */}
              {order.removedItems && order.removedItems.length > 0 && (
                 <div className="mb-4 px-3 py-2.5 bg-red-50 dark:bg-red-500/5 rounded-xl border border-red-100 dark:border-red-500/10">
                    <p className="text-[10px] text-red-600 dark:text-red-400 font-extrabold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <XCircleIcon className="h-3.5 w-3.5" /> Removed Items
                    </p>
                    <div className="space-y-1.5">
                      {order.removedItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start text-[11px]">
                          <span className="text-red-800 dark:text-red-300 font-medium line-clamp-1 pr-2">{item.qty}x {item.name}</span>
                          <span className="text-red-500 dark:text-red-500/70 italic text-right shrink-0">- {item.reason}</span>
                        </div>
                      ))}
                    </div>
                 </div>
              )}

              {/* Rejection Note */}
              {order.rejectionReason && !order.removedItems && (
                 <div className="mb-4 px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-white/5">
                   <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider mb-0.5">Note</p>
                   <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{order.rejectionReason}</p>
                 </div>
              )}

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2 mt-auto">
                 <button onClick={onView} className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform active:scale-95 outline-none">
                   <EyeIcon className="h-4 w-4" /> <span className="text-[10px] font-bold">View</span>
                 </button>
                 <button className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform active:scale-95 outline-none">
                   <DocumentTextIcon className="h-4 w-4" /> <span className="text-[10px] font-bold">Invoice</span>
                 </button>
                 <button onClick={() => onDelete(order.id)} className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-transform active:scale-95 outline-none">
                   <TrashIcon className="h-4 w-4" /> <span className="text-[10px] font-bold">Delete</span>
                 </button>
              </div>
            </div>
          ))
        ) : (
           <div className="col-span-1 md:col-span-2 p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm mt-4 flex flex-col items-center justify-center">
             <div className="h-16 w-16 rounded-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center border border-slate-100 dark:border-white/5 mb-3">
               <DocumentTextIcon className="h-8 w-8 text-slate-300 dark:text-slate-600" />
             </div>
             <p className="text-sm font-bold text-slate-500 dark:text-slate-400">No matching orders found</p>
           </div>
        )}
      </div>

      {/* 💻 DESKTOP VIEW (Laptops & Large Monitors Only) */}
      <div className="hidden lg:block overflow-x-auto w-full pb-10">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80">
            <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-extrabold">
              <th className="p-4 pl-6">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items Summary</th>
              <th className="p-4">Amount</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-4 pl-6 font-extrabold text-slate-800 dark:text-slate-200">#{order.id}</td>
                  
                  <td className="p-4">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{order.customer}</div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 max-w-[150px]">{order.location}</div>
                  </td>
                  
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300 max-w-xs">
                    <div className="truncate font-medium">{order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</div>
                    {order.removedItems && order.removedItems.length > 0 && (
                      <div className="text-[11px] text-red-500 dark:text-red-400 font-bold mt-1 truncate" title={order.removedItems.map(i => `${i.name} (${i.reason})`).join(', ')}>
                        Removed: {order.removedItems.length} items
                      </div>
                    )}
                  </td>
                  
                  <td className="p-4 font-black text-slate-900 dark:text-white tracking-tight">₹{order.total}</td>
                  
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={onView} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 rounded-lg transition-transform active:scale-95 outline-none" title="View Details">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 rounded-lg transition-transform active:scale-95 outline-none" title="Download Invoice">
                        <DocumentTextIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => onDelete(order.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 rounded-lg transition-transform active:scale-95 outline-none" title="Delete">
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
                      <DocumentTextIcon className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="font-bold text-slate-500 dark:text-slate-400 text-sm">No matching orders found</p>
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