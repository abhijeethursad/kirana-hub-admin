import { PencilSquareIcon, TrashIcon, MagnifyingGlassIcon, TagIcon } from "@heroicons/react/24/outline";
import { Product } from "@/types/inventory";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void; 
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  
  // 🚀 Premium rich colors for dark mode badges
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20" };
    if (stock < 10) return { label: "Low Stock", color: "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200 dark:border-orange-500/20" };
    return { label: "In Stock", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20" };
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto backdrop-blur-md transform-gpu will-change-scroll custom-scrollbar border-t border-slate-200/50 dark:border-white/5">
      
      {/* 📱 MOBILE & 💊 TABLET CARD VIEW (Grid System) */}
      {/* 🚀 Shifted to lg:hidden so iPads get the grid, and added md:grid-cols-2 */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4">
        {products.length > 0 ? (
          products.map((product) => {
            const status = getStockStatus(product.stock);
            return (
              <div key={product.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col gap-3">
                <div className="flex gap-3 sm:gap-4">
                   <div className="relative h-20 w-20 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-900/50 overflow-hidden border border-slate-200 dark:border-white/10">
                      {product.images.length > 0 ? ( 
                        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" /> 
                      ) : ( 
                        <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold bg-slate-50 dark:bg-slate-800/50">{product.name.charAt(0)}</div> 
                      )}
                      {product.stock < 10 && ( 
                        <div className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg shadow-sm"><TagIcon className="h-3 w-3" /></div> 
                      )}
                   </div>
                   <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 leading-tight">{product.name}</h4>
                      </div>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">{product.category} • {product.unit}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">₹{product.price}</span>
                        <div className="flex items-center gap-1.5">
                           <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${status.color}`}>{status.label}</span>
                           <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">({product.stock})</span>
                        </div>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                   <button 
                     onClick={() => onEdit(product)} 
                     className="flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-transform active:scale-95 outline-none"
                   >
                     <PencilSquareIcon className="h-4 w-4" />Edit
                   </button>
                   <button 
                     onClick={() => onDelete(product.id)} 
                     className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 font-bold text-xs hover:bg-red-100 dark:hover:bg-red-500/20 transition-transform active:scale-95 outline-none"
                   >
                     <TrashIcon className="h-4 w-4" />Delete
                   </button>
                </div>
              </div>
            );
          })
        ) : (
           <div className="col-span-1 md:col-span-2 p-10 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm mt-4">
             <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 opacity-30 dark:opacity-20" />
             <p className="text-sm font-bold text-slate-500 dark:text-slate-400">No products found</p>
           </div>
        )}
      </div>

      {/* 💻 DESKTOP TABLE VIEW (Laptops & Large Monitors Only) */}
      {/* 🚀 Changed to hidden lg:block */}
      <div className="hidden lg:block overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50/95 dark:bg-slate-700/95 backdrop-blur-md">
            <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-extrabold border-b border-slate-200 dark:border-slate-700/80">
              <th className="p-4 pl-6">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock Level</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-600/60 bg-white dark:bg-slate-800">
            {products.length > 0 ? (
              products.map((product) => {
                const status = getStockStatus(product.stock);
                return (
                  <tr key={product.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-white/5 shrink-0 shadow-sm">
                          {product.images.length > 0 ? ( 
                            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" /> 
                          ) : ( 
                            <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold bg-slate-50 dark:bg-slate-800/50">{product.name.charAt(0)}</div> 
                          )}
                          {product.images.length > 1 && ( 
                            <div className="absolute bottom-0 right-0 bg-black/70 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 font-bold rounded-tl-md">+{product.images.length - 1}</div> 
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{product.name}</div>
                          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{product.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-transparent dark:border-white/5 text-xs text-slate-600 dark:text-slate-300">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-extrabold text-slate-900 dark:text-white">₹{product.price}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${status.color}`}>
                          {status.label}
                        </span>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">({product.stock})</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {/* 🚀 Clean hidden hover actions */}
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => onEdit(product)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 rounded-lg transition-transform active:scale-95 outline-none" title="Edit">
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => onDelete(product.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 rounded-lg transition-transform active:scale-95 outline-none" title="Delete">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-16 w-16 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-white/5">
                      <MagnifyingGlassIcon className="h-8 w-8 text-slate-300 dark:text-slate-500" />
                    </div>
                    <p className="font-bold text-slate-500 dark:text-slate-400 text-sm">No products found in inventory</p>
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