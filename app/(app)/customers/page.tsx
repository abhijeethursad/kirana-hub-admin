"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { UsersIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";

// --- Components ---
import { Customer } from "@/types/customer";
import CustomerSkeleton from "@/components/Skeletons/CustomerSkeleton";
import CustomerHeader from "@/components/modals/customers/CustomerHeader";
import CustomerList from "@/components/modals/customers/CustomerList";
import CustomerModal from "@/components/modals/customers/CustomerModal";
import DeleteCustomerModal from "@/components/modals/customers/DeleteCustomerModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CustomersPage() {
  // --- STATE ---
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // --- FORM STATE ---
  const initialFormState: Customer = { id: "0", name: "", phone: "", orders: 0, spent: 0, credit: 0, lastVisit: "Just now", avatar: "" };
  const [formData, setFormData] = useState<Customer>(initialFormState);

  // --- TOAST STATE ---
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" as "success" | "error" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchCustomers = async () => {
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      const dataFetch = axios.get(`${API_URL}/customers`);

      try {
        setLoading(true);
        const [_, res] = await Promise.all([minLoadTime, dataFetch]);
        
        // Ensure string IDs
        const normalizedData = res.data.map((item: any) => ({
          ...item,
          id: String(item.id)
        }));
        
        setCustomers(normalizedData);
      } catch (err) {
        console.error("API Fetch Error:", err);
        showToast("Failed to connect to server", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // --- 2. CRUD ACTIONS ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    
    // Auto-generate avatar
    const finalAvatar = editingCustomer && formData.avatar ? formData.avatar : `https://ui-avatars.com/api/?name=${formData.name.replace(" ", "+")}&background=random`;
    const dataToSave = { ...formData, avatar: finalAvatar };

    if (editingCustomer) {
      // UPDATE (PATCH)
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? dataToSave : c)); 
      showToast("Customer updated");
      try { 
        await axios.patch(`${API_URL}/customers/${editingCustomer.id}`, dataToSave); 
      } catch (e) { 
        showToast("Failed to update in DB", "error");
      }
    } else {
      // CREATE (POST)
      const newCustomer = { ...dataToSave, id: Date.now().toString() }; 
      setCustomers(prev => [newCustomer, ...prev]); 
      showToast("Customer added successfully");
      try { 
        await axios.post(`${API_URL}/customers`, newCustomer); 
      } catch (e) { 
        showToast("Failed to save to DB", "error");
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleteModalOpen(false);
    
    // Optimistic UI
    setCustomers(prev => prev.filter(c => c.id !== deleteId)); 
    showToast("Customer removed permanently", "error");
    
    try { 
      await axios.delete(`${API_URL}/customers/${deleteId}`); 
    } catch (e) { 
      showToast("Failed to delete from DB", "error");
    }
  };

  // --- HELPERS ---
  const handleOpenAdd = () => { setEditingCustomer(null); setFormData(initialFormState); setIsModalOpen(true); };
  const handleOpenEdit = (customer: Customer) => { setEditingCustomer(customer); setFormData(customer); setIsModalOpen(true); };
  const confirmDelete = (id: string) => { setDeleteId(id); setIsDeleteModalOpen(true); };
  
  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/91${cleanPhone}`, '_blank');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  // Dynamic Stats
  const totalCredit = customers.reduce((sum, customer) => sum + customer.credit, 0);

  // --- RENDER ---
  return (
    <div className="space-y-6">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row  justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Customers</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your customer relationships and track credits.</p>
        </div>
        

        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full sm:w-fit ">
          {/* Card 1: Total Customers */}
          <div className="relative overflow-hidden p-4 sm:p-5 bg-white dark:bg-slate-800/50 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/5 shadow-sm flex flex-col justify-center">
            {/* Subtle ambient glow effect */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/5 blur-2xl rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <div className="inline-flex w-max p-1.5 sm:p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg sm:rounded-xl border border-indigo-100 dark:border-indigo-500/20 shadow-inner dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <UsersIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider">
                Total Customers
              </p>
            </div>
            
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {loading ? (
                <span className="animate-pulse bg-slate-200 dark:bg-slate-700 text-transparent rounded-md w-12 inline-block h-8">00</span>
              ) : (
                customers.length
              )}
            </div>
          </div>

          {/* Card 2: Total Credit (Udhaar) */}
          <div className="relative overflow-hidden p-4 sm:p-5 bg-white dark:bg-slate-800/50 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/5 shadow-sm flex flex-col justify-center">
            {/* Subtle ambient glow effect */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-500/10 dark:bg-red-500/5 blur-2xl rounded-full pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <div className="inline-flex w-max p-1.5 sm:p-2 bg-red-50 dark:bg-red-500/10 rounded-lg sm:rounded-xl border border-red-100 dark:border-red-500/20 shadow-inner dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <CurrencyRupeeIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-[10px] sm:text-xs text-red-500 dark:text-red-400 font-extrabold uppercase tracking-wider">
                Total Credit
              </p>
            </div>
    
            <div className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400 tracking-tight">
              {loading ? (
                <span className="animate-pulse bg-red-100 dark:bg-red-900/40 text-transparent rounded-md w-20 inline-block h-8">0000</span>
              ) : (
                `₹${totalCredit.toLocaleString()}`
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
         <CustomerSkeleton />
      ) : (
         <div className="relative bg-white dark:bg-slate-900 rounded-3xl md:border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transform-gpu">
            {/* Toast Notification */}
            <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
              <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border ${toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' : 'bg-red-500 text-white border-red-600'}`}>
                {toast.type === 'success' ? <CheckBadgeIcon className="h-5 w-5" /> : <ExclamationTriangleIcon className="h-5 w-5" />}
                <span className="font-medium text-sm">{toast.msg}</span>
              </div>
            </div>

            <CustomerHeader search={search} setSearch={setSearch} onAdd={handleOpenAdd} />
            
            <CustomerList customers={filteredCustomers} onEdit={handleOpenEdit} onDelete={confirmDelete} openWhatsApp={openWhatsApp} />
         </div>
      )}

      {/* Modals */}
      <CustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingCustomer={editingCustomer} formData={formData} setFormData={setFormData} handleSave={handleSave} />
      <DeleteCustomerModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} />

    </div>
  );
}