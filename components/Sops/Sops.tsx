"use client";

export default function Sops() {
  return (
    <div className="w-full  max-w-6xl  lg:max-w-7xl mx-auto  mb-8">
      {/* Main Section Header with Styled Background */}
      <div className="bg-[#FFF7ED] border border-[#E97D26]/30 rounded-2xl p-4 sm:p-5 mb-4 shadow-sm">
        <div className="flex items-center justify-center space-x-3 text-center">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#E97D26] tracking-tight">
              Mess SOPs for Employees
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Important guidelines to follow during meal hours in the mess
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Card 1 */}
        <div className="bg-[#FFFFFF] border border-slate-200 hover:border-[#E97D26]/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <h3 className="text-xs sm:text-sm font-black text-[#000000]">
              Cleanliness & Hygiene
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Employees must maintain cleanliness and proper hygiene while eating
            in the mess.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#FFFFFF] border border-slate-200 hover:border-[#E97D26]/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <h3 className="text-xs sm:text-sm font-black text-[#000000]">
              Meal Timings
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Follow the designated meal timings and avoid unnecessary delays.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#FFFFFF] border border-slate-200 hover:border-[#E97D26]/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <h3 className="text-xs sm:text-sm font-black text-[#000000]">
              Zero Food Wastage
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Take only the amount of food you need and avoid food wastage.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#FFFFFF] border border-slate-200 hover:border-[#E97D26]/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <h3 className="text-xs sm:text-sm font-black text-[#000000]">
              Discipline & Respect
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Maintain discipline, respect others, and keep noise at a reasonable
            level.
          </p>
        </div>

        {/* Card 5 (Spans 2 columns) */}
        <div className="sm:col-span-2 bg-[#FFFFFF] border border-slate-200 hover:border-[#E97D26]/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <h3 className="text-xs sm:text-sm font-black text-[#000000]">
              Table & Waste Disposal
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Clean your table and dispose of waste properly after finishing your
            meal.
          </p>
        </div>
      </div>
    </div>
  );
}
