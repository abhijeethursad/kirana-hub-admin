"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CheckBadgeIcon, ExclamationTriangleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

import { UserProfile } from "@/types/profile";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";
import ProfileHeader from "@/components/modals/profile/ProfileHeader";
import ProfileForm from "@/components/modals/profile/ProfileForm";
import ProfileStats from "@/components/modals/profile/ProfileStats";
import ProfileActivity from "@/components/modals/profile/ProfileActivity";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProfileView() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [originalUser, setOriginalUser] = useState<UserProfile | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  // --- FETCH DATA (With Error Handling) ---
  const fetchProfile = async () => {
    setLoading(true);
    setFetchError(false);
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
    try {
      const [_, res] = await Promise.all([minLoadTime, axios.get(`${API_URL}/profile`)]);
      setUser(res.data);
      setOriginalUser(res.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setFetchError(true); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // --- SAVE ACTIONS ---
  const handleSave = async () => {
    if (!user) return;
    setSaveLoading(true);
    try {
      await axios.patch(`${API_URL}/profile`, user);
      setOriginalUser(user);
      setIsEditing(false);
      
      // Sync the updated user data to localStorage so the Header/Sidebar update instantly
      const cachedUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...cachedUser, name: user.name, avatar: user.avatar, role: user.role }));
      
      window.dispatchEvent(new Event('user-updated'));

      showToast("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save profile", error);
      if (originalUser) setUser(originalUser); // Revert on error
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <ProfileSkeleton />;

  if (fetchError || !user) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="h-16 w-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center border border-red-100 dark:border-red-500/20 mb-4">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Failed to load profile</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 text-center max-w-md">
          We couldn't connect to the server to fetch your profile data. Please check your connection.
        </p>
        <button onClick={fetchProfile} className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
          <ArrowPathIcon className="h-5 w-5" /> Try Again
        </button>
      </div>
    );
  }

  return (
    // 🚀 Removed the monolithic wrapper animation so the elements can stagger independently
    <div className="space-y-6 pb-10 md:pb-0">
      
      {/* 🚀 Injecting the premium physics curve for the whole page layout */}
      <style>{`
        @keyframes pageSlideUp { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-stagger-page { opacity: 0; animation: pageSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* 🚀 Subtle Page Header - Leads the waterfall at 0ms */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between px-2 sm:px-0 animate-stagger-page" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Profile Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Manage your personal information.
          </p>
        </div>
      </div>
      
      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-transparent">
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* 1. Header Section - Drops in at 100ms */}
      <div className="animate-stagger-page" style={{ animationDelay: '100ms' }}>
        <ProfileHeader 
          user={user} 
          setUser={setUser} 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          onSave={handleSave} 
          loading={saveLoading} 
        />
      </div>

      {/* 2. Grid Content - Left side drops at 200ms, Right side drops at 300ms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 animate-stagger-page" style={{ animationDelay: '200ms' }}>
           <ProfileForm user={user} setUser={setUser} isEditing={isEditing} />
         </div>
         <div className="space-y-6 animate-stagger-page" style={{ animationDelay: '300ms' }}>
           <ProfileStats />
           <ProfileActivity />
         </div>
      </div>

    </div>
  );
}