export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      
      {/* 🚀 Inverted Waterfall Physics Engine (Bottom-to-Top sequence) */}
      <style>{`
        @keyframes invertedWaterfall { 
          0% { opacity: 0; transform: translateY(20px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        .animate-waterfall-invert { 
          opacity: 0; 
          animation: invertedWaterfall 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>
      
      {/* 1. STATIC HEADER (Loads Last: 300ms) */}
      <div className="animate-waterfall-invert" style={{ animationDelay: '300ms' }}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Welcome back, Admin 👋
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* 2. Top Stats Skeleton (Loads Third: 200ms) */}
        <div className="animate-waterfall-invert" style={{ animationDelay: '200ms' }}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm h-34.5">
                <div className="h-4 w-24 bg-slate-100 dark:bg-slate-700 rounded-md mb-3.5"></div>
                <div className="h-8 w-32 bg-slate-200 dark:bg-slate-600 rounded-lg mb-3.5"></div>
                <div className="h-3 w-36 bg-slate-100 dark:bg-green-500/20 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Live Activity Skeleton (Loads Second: 100ms) */}
        <div className="animate-waterfall-invert" style={{ animationDelay: '100ms' }}>
          <div className="animate-pulse">
            <div className="h-6.5 w-28 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
            <div className="grid grid-cols-2 gap-6  lg:grid-cols-4">
                {[
                // Pink Faded
                { bg: "bg-pink-50 dark:bg-pink-500/10", border: "border-pink-100 dark:border-pink-500/20", ghost: "bg-pink-200 dark:bg-pink-500/20" },
                // Blue Faded
                { bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", ghost: "bg-blue-200 dark:bg-blue-500/20" },
                // Orange Faded
                { bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-100 dark:border-orange-500/20", ghost: "bg-orange-200 dark:bg-orange-500/20" },
                // Purple Faded
                { bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20", ghost: "bg-purple-200 dark:bg-purple-500/20" }
                ].map((color, i) => (
                <div key={i} className={`rounded-2xl p-6 border h-34 relative overflow-hidden ${color.bg} ${color.border}`}>
                    <div className={`h-4 w-24 rounded-md mb-4 ${color.ghost}`}></div>
                    <div className={`h-8 w-16 rounded-lg mb-3 ${color.ghost}`}></div>
                    <div className={`h-3 w-28 rounded-md ${color.ghost}`}></div>
                    <div className={`absolute top-4 right-4 h-6 w-6 rounded-full ${color.ghost}`}></div>
                </div>
                ))}
            </div>
          </div>
        </div>

        {/* 4. Bottom Section Skeleton (Loads First: 0ms) */}
        <div className="animate-waterfall-invert" style={{ animationDelay: '0ms' }}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 animate-pulse">
            
            {/* Premium Chart Skeleton */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm lg:col-span-2 h-[400px] flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between mb-8 shrink-0">
                <div>
                  <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                </div>
                <div className="h-7 w-27 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>
              </div>

              {/* High-Fidelity Chart Area */}
              <div className="flex-1 flex gap-4 ml-0 sm:ml-7 relative">
                
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-between pb-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={`y-${i}`} className="h-2.5 w-8 bg-slate-100 dark:bg-slate-700/50 rounded-sm"></div>
                  ))}
                </div>

                {/* Chart Core (Grid + Bars) */}
                <div className="flex-1 relative flex flex-col">
                  
                  {/* Absolute Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pb-8 z-0 pointer-events-none">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={`grid-${i}`} className="w-full border-t border-slate-100 dark:border-slate-700/30"></div>
                    ))}
                  </div>

                  {/* X-Axis Labels */}
                  <div className="absolute bottom-0 w-full flex items-center justify-between px-2 pt-3 border-slate-200 dark:border-slate-700/50">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div key={`x-${i}`} className="h-2 w-6 sm:w-10 bg-slate-100 dark:bg-slate-700/50 rounded-sm hidden sm:block last:block first:block"></div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* 🚀 High-Fidelity Live Partners Widget Skeleton */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm flex flex-col h-[400px]">
              
              {/* --- Widget Header --- */}
              <div className="flex justify-between items-center mb-6 shrink-0">
                <div className="flex items-center gap-2">
                  {/* Truck Icon Placeholder */}
                  <div className="h-5 w-5 rounded-md bg-slate-200 dark:bg-slate-700"></div>
                  {/* Title Placeholder */}
                  <div className="h-5 w-28 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                </div>
                {/* Active Count Badge */}
                <div className="h-5 w-16 bg-slate-100 dark:bg-slate-700/80 border border-slate-200/50 dark:border-slate-700/50 rounded-lg"></div>
              </div>
              
              {/* --- Runner List --- */}
              <div className="space-y-1 flex-1 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div key={`runner-${i}`} className="flex items-center justify-between p-3 -mx-3 rounded-2xl">
                    
                    <div className="flex items-center gap-3">
                      {/* Avatar with Slack-style Status Ring */}
                      <div className="relative shrink-0">
                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-800 bg-slate-300 dark:bg-slate-600"></div>
                      </div>

                      {/* Runner Details & Task Context */}
                      <div className="flex flex-col gap-1.5 mt-0.5">
                        {/* Name */}
                        <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                        {/* Status Badge */}
                        <div className="h-4 w-20 bg-slate-100 dark:bg-slate-700/50 rounded-md"></div>
                      </div>
                    </div>

                    {/* Quick Action: One-Click Call Button */}
                    <div className="shrink-0 h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700/50"></div>

                  </div>
                ))}
              </div>
              
              {/* --- Footer Action --- */}
              <div className="w-full mt-4 h-[44px] bg-slate-100 dark:bg-slate-700/30 rounded-xl shrink-0"></div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}