import { XMarkIcon, PhotoIcon, TrashIcon, ArrowPathIcon, CubeIcon, CurrencyRupeeIcon, ChartBarSquareIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import CustomSelect from "./CustomSelect";
import { Product, CATEGORIES } from "@/types/inventory";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
  formData: Product;
  setFormData: (val: Product | ((prev: Product) => Product)) => void;
  handleSave: (e: React.FormEvent) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  removeImage: (index: number) => void;
}

export default function ProductModal({
  isOpen, onClose, editingProduct, formData, setFormData, handleSave, handleImageUpload, isUploading, removeImage
}: ProductModalProps) {
  if (!isOpen) return null;

  const blockInvalidNumberChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300 md:p-4">
      
      {/* 🚀 Mobile Optimization: h-[100dvh] and rounded-none on mobile for a native full-screen feel, centered card on desktop */}
      <div className="bg-slate-50 dark:bg-slate-900 w-full h-[100dvh] md:h-auto md:w-[680px] rounded-none md:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-0 md:border border-slate-200/60 dark:border-slate-700/60 flex flex-col md:max-h-[90vh] animate-in slide-in-from-bottom-8 md:zoom-in-95 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
        
        {/* Header */}
        <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 shrink-0">
              <CubeIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>
              <p className="text-[11px] md:text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
                Configure details, media, and inventory status.
              </p>
            </div>
          </div>
          {/* 🚀 Increased touch target on mobile (h-10 w-10) */}
          <button 
            onClick={onClose} 
            className="h-10 w-10 md:h-8 md:w-8 shrink-0 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-transform active:scale-95 outline-none"
          >
            <XMarkIcon className="h-6 w-6 md:h-5 md:w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-3 sm:p-6 overflow-y-auto custom-scrollbar flex-1 relative bg-slate-50 dark:bg-slate-900/50">
          <form id="productForm" onSubmit={handleSave} className="space-y-4 md:space-y-6">
            
            {/* Section 1: Media Uploader */}
            <div className="bg-white dark:bg-slate-800/80 p-4 md:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
               <div>
                 <h4 className="text-sm font-bold text-slate-900 dark:text-white">Product Media</h4>
                 <p className="text-[11px] text-slate-500 font-medium mt-0.5">Upload up to 4 high-quality images.</p>
               </div>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden group shadow-sm shrink-0">
                    <img src={img} alt="preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <button type="button" onClick={() => removeImage(idx)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-transform active:scale-95 shadow-md">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <label className={`h-20 w-20 sm:h-24 sm:w-24 shrink-0 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer group transition-[border-color,background-color] ${isUploading ? "opacity-50 pointer-events-none" : ""}`}>
                  {isUploading ? (
                    <ArrowPathIcon className="h-6 w-6 text-indigo-500 animate-spin" />
                  ) : (
                    <>
                      <PhotoIcon className="h-6 w-6 text-slate-400 group-hover:text-indigo-500 transition-transform group-hover:scale-110" />
                      <span className="text-[10px] text-slate-500 font-bold mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 hidden sm:block">Upload</span>
                    </>
                  )}
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                </label>
              </div>
            </div>

            {/* Section 2: General Info */}
            <div className="bg-white dark:bg-slate-800/80 p-4 md:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4 md:space-y-5">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                General Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Product Name</label>
                  {/* 🚀 Increased padding to py-3.5 on mobile for better touch targets */}
                  <input required type="text" value={formData.name || ""} onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} className="w-full px-4 py-3.5 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 font-medium text-sm shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" placeholder="e.g. Fortune Refined Soyabean Oil" />
                </div>
                
                <div className="relative z-50">
                  <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                  <CustomSelect 
                    value={formData.category || ""} 
                    onChange={(val) => setFormData(prev => ({...prev, category: val}))} 
                    options={CATEGORIES} 
                  />
                </div>
                
                <div className="relative z-10">
                  <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Unit Size</label>
                  <input required type="text" value={formData.unit || ""} onChange={(e) => setFormData(prev => ({...prev, unit: e.target.value}))} className="w-full px-4 py-3.5 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 font-medium text-sm shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" placeholder="e.g. 1 Litre, 500g" />
                </div>
              </div>
            </div>

            {/* Section 3: Pricing & Stock */}
            <div className="bg-white dark:bg-slate-800/80 p-4 md:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4 md:space-y-5">
               <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Pricing & Inventory
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                
                {/* Premium Price Input */}
                <div className="relative z-0 group">
                  <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5"><CurrencyRupeeIcon className="h-4 w-4 text-slate-400"/> Selling Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    {/* 🚀 Increased right padding to pr-12 to fit mobile spinners */}
                    <input required type="number" min="0" onKeyDown={blockInvalidNumberChars} value={formData.price === 0 ? "" : formData.price} onChange={(e) => setFormData(prev => ({...prev, price: e.target.value === "" ? 0 : Math.max(0, Number(e.target.value))}))} className="w-full pl-8 pr-12 md:pr-10 py-3.5 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 font-medium text-sm shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="0" />
                    
                    {/* 🚀 Mobile Spinners: opacity-100 on mobile, fade-in on desktop hover. Made buttons larger (p-2) for thumb tapping. */}
                    <div className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 flex flex-col opacity-100 md:opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => setFormData(p => ({...p, price: p.price + 1}))} className="p-1.5 md:p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400 rounded-t-lg transition-colors outline-none">
                        <ChevronUpIcon className="h-4 w-4 md:h-3 md:w-3" strokeWidth={3} />
                      </button>
                      <button type="button" onClick={() => setFormData(p => ({...p, price: Math.max(0, p.price - 1)}))} className="p-1.5 md:p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400 rounded-b-lg transition-colors outline-none">
                        <ChevronDownIcon className="h-4 w-4 md:h-3 md:w-3" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Premium Stock Input */}
                <div className="relative z-0 group">
                  <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5"><ChartBarSquareIcon className="h-4 w-4 text-slate-400"/> Available Stock</label>
                  <div className="relative">
                    <input required type="number" min="0" onKeyDown={blockInvalidNumberChars} value={formData.stock === 0 ? "" : formData.stock} onChange={(e) => setFormData(prev => ({...prev, stock: e.target.value === "" ? 0 : Math.max(0, Number(e.target.value))}))} className="w-full px-4 pr-12 md:pr-10 py-3.5 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 font-medium text-sm shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="0 units" />
                    
                    <div className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 flex flex-col opacity-100 md:opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => setFormData(p => ({...p, stock: p.stock + 1}))} className="p-1.5 md:p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400 rounded-t-lg transition-colors outline-none">
                        <ChevronUpIcon className="h-4 w-4 md:h-3 md:w-3" strokeWidth={3} />
                      </button>
                      <button type="button" onClick={() => setFormData(p => ({...p, stock: Math.max(0, p.stock - 1)}))} className="p-1.5 md:p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400 rounded-b-lg transition-colors outline-none">
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
            form="productForm" 
            type="submit" 
            disabled={isUploading} 
            className="flex-1 px-4 py-4 md:py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center"
          >
            {isUploading ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : editingProduct ? "Save Changes" : "Create Product"}
          </button>
        </div>

      </div>
    </div>
  );
}