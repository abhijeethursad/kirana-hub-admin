import Navbar from "@/components/landing/Navbar";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function LandingPage() {
  // const router = useRouter();

  const handleDemoAccess = () => {
    // router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 overflow-x-hidden flex flex-col">
      <Navbar />

      {/* HERO SECTION - Uses min-h and vertical padding to naturally fit and scroll on all devices */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-28 lg:py-20 overflow-hidden flex-1 flex flex-col justify-center">
        
        {/* Background Gradients/Orbs - Scaled safely for mobile screens */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] lg:w-[1000px] h-[280px] sm:h-[400px] lg:h-[500px] bg-indigo-600/20 rounded-full blur-[100px] lg:blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[250px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[400px] lg:h-[600px] bg-purple-600/10 rounded-full blur-[90px] lg:blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 text-center w-full max-w-7xl">
          
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 sm:mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-medium text-slate-300 tracking-wide uppercase">
              V 2.0 Now Live
            </span>
          </div> */}

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 sm:mb-8 leading-[1.1]">
            Retail clarity, <br className="hidden sm:inline" />
            built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">the future.</span>
          </h1>

          <p className="max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 mb-10 sm:mb-12 leading-relaxed px-2">
            Empower your local Kirana store with enterprise-grade analytics, 
            real-time inventory management, and instant delivery tracking.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto sm:max-w-none">
            <Link href="/dashboard">
              <button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-bold text-base sm:text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              >
                Explore Live Demo
                <ArrowRightIcon className="h-5 w-5 shrink-0" />
              </button>
            </Link>

          <Link href={"/login"}>
              <button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all cursor-pointer hover:scale-105 active:scale-95 text-base sm:text-lg"
              >
                Sign In to Portal
              </button>
            </Link>
          </div>

          {/* GLOWING STATS CARDS */}
          <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto text-left">
            
            {/* Card 1 */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <p className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">Active Stores</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">2,000+</h3>
                <p className="text-indigo-400 text-xs">Across 12 Cities</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group hover:border-purple-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <p className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">Daily Orders</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">45k</h3>
                <p className="text-purple-400 text-xs">Processed Real-time</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/50 transition-colors sm:col-span-2 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <p className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">Uptime</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">99.9%</h3>
                <p className="text-emerald-400 text-xs">Enterprise Reliability</p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}