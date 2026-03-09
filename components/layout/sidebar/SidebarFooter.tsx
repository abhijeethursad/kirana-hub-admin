import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function SidebarFooter() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // 1. Securely destroy the HttpOnly cookie via our internal API
      await axios.post("/api/logout");

      // 2. 💣 CRITICAL: Wipe the frontend user data we stored during login
      localStorage.removeItem("user");

      // 3. Smooth client-side redirect back to the login page
      router.push("/login");
      router.refresh(); // Forces Next.js to realize the cookie is gone
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="border-t border-slate-200/80 dark:border-white/5 p-4 shrink-0 bg-white dark:bg-transparent z-10">
      <button 
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`flex w-full items-center justify-center sm:justify-start gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-transform active:scale-95 outline-none
          ${isLoggingOut 
            ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 cursor-not-allowed" 
            : "text-slate-600 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 group"
          }
        `}
      >
        {isLoggingOut ? (
          <>
            <div className="h-5 w-5 rounded-full border-2 border-red-200 dark:border-red-900/50 border-t-red-600 dark:border-t-red-500 animate-spin shrink-0"></div>
            <span>Logging out...</span>
          </>
        ) : (
          <>
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-slate-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors shrink-0" />
            <span>Logout</span>
          </>
        )}
      </button>
    </div>
  );
}