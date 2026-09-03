"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { AppNotification } from "@/types/header";
import LiveClock from "./LiveClock";
import StoreStatusToggle from "./StoreStatusToggle";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { UserProfile } from "@/types/profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [profile, setProfile] = useState<UserProfile>({ name: "", role: "", email: "", phone: "", location: "", bio: "", avatar: "" });
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // 🚀 Premium Loading State
  const [isHeaderLoading, setIsHeaderLoading] = useState(true);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // 🚀 FIXED: Unified, Race-Condition-Proof Fetching Architecture
  useEffect(() => {
    let isMounted = true; // Prevents memory leaks if user navigates away quickly

    const fetchHeaderData = async () => {
      try {
        // Promise.allSettled ensures that if one fails, the other still loads!
        const [notifRes, profileRes] = await Promise.allSettled([
          axios.get(`${API_URL}/notifications`),
          axios.get(`${API_URL}/profile`)
        ]);

        if (isMounted) {
          if (notifRes.status === 'fulfilled') setNotifications(notifRes.value.data);
          if (profileRes.status === 'fulfilled') setProfile(profileRes.value.data);
        }
      } catch (error) {
        console.error("Critical error fetching header data:", error);
      } finally {
        if (isMounted) setIsHeaderLoading(false);
      }
    };

    fetchHeaderData();

    return () => { isMounted = false; }; // Cleanup function
  }, []);

  // Click Outside Listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = async () => {
    const unread = notifications.filter(n => !n.read);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await Promise.all(unread.map(n => axios.patch(`${API_URL}/notifications/${n.id}`, { read: true })));
    } catch (e) {
      console.error("Failed to mark read on server");
    }
  };

  const deleteNotification = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    setNotifications(prev => prev.filter(n => n.id !== id));
    try {
      await axios.delete(`${API_URL}/notifications/${id}`);
    } catch (e) {
      console.error("Failed to delete from server");
    }
  };

  const handleNotificationClick = async (item: AppNotification) => {
    if (!item.read) {
      setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
      axios.patch(`${API_URL}/notifications/${item.id}`, { read: true }).catch(console.error);
    }
    setShowNotifications(false);
    if (item.type === 'order') router.push('/orders');
    else if (item.type === 'alert') router.push('/inventory');
  };

  return (
    <header 
      className="
        sticky top-0 z-30 flex h-20 w-full items-center justify-between px-4 sm:px-6 
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-backdrop-filter:bg-white/60
        border-b border-slate-200/80 dark:border-white/8 shadow-sm transition-colors duration-300
      "
    >
      
      {/* LEFT: Mobile Menu & Live Clock */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-xl dark:text-slate-400 dark:hover:bg-white/5 active:scale-95 outline-none transition-transform"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <LiveClock />
      </div>

      {/* RIGHT: Status, Notifications, Profile */}
      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        
        <StoreStatusToggle />

        {/* 🚀 Premium Gradient Divider */}
        <div className="hidden sm:block h-8 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
        
        <NotificationDropdown 
          notifications={notifications}
          isOpen={showNotifications}
          onToggle={() => {
            setShowNotifications(!showNotifications);
            setShowProfileMenu(false);
          }}
          dropdownRef={notificationRef as any}
          onMarkAllRead={markAllAsRead}
          onDelete={deleteNotification}
          onClickItem={handleNotificationClick}
        />

        {/* 🚀 Premium Gradient Divider */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>

        {/* 🚀 Elegant Loading Skeleton vs Real Profile */}
        {isHeaderLoading ? (
          <div className="flex items-center gap-3 py-1.5 px-2">
            <div className="h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
            <div className="hidden sm:flex flex-col gap-1.5">
              <div className="h-2.5 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
            </div>
          </div>
        ) : (
          <ProfileDropdown 
            isOpen={showProfileMenu}
            onToggle={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            dropdownRef={profileRef as any}
            profile={profile}
          />
        )}

      </div>
    </header>
  );
}