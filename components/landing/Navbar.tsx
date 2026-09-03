"use client";
import Link from "next/link";
import { Store, ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[#030712]/80 border-b border-white/[0.08]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group outline-none">
        <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
          <Store className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Kirana Hub</span>
      </Link>

      {/* Role Badge (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full backdrop-blur-md">
        <ShieldCheck className="h-4 w-4 text-indigo-400" />
        <span className="text-slate-300">Authorized Merchant Portal</span>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
          Login
        </Link>
        <Link 
          href="/login" 
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}