"use client";

import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { logout } from "@/lib/redux/authSlice";

interface NavbarProps {
  onLogout?: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogoutClick = () => {
    dispatch(logout());
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="border-b border-slate-200 bg-[#FFFFFF] sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        <Link
          href="/"
          className="flex flex-col sm:flex-row items-center space-y-1.5 sm:space-y-0 sm:space-x-3 text-center sm:text-left"
        >
          <img
            src="/uConnect-logo.png"
            alt="uConnect Logo"
            className="h-10 w-auto object-contain"
          />
          <div className="flex items-center">
            <span className="text-xs uppercase px-2.5 py-0.5 rounded-full bg-[#E97D26]/10 text-[#E97D26] border border-[#E97D26]/30 font-bold tracking-wider">
              Meals Portal
            </span>
          </div>
        </Link>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          {isAuthenticated ? (
            <>
              <div className="text-xs font-medium text-slate-700 flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 max-w-full truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="font-bold text-[#000000] truncate">
                  {user?.email}
                </span>
              </div>
              <button
                onClick={handleLogoutClick}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-300 text-xs font-bold transition text-slate-700 text-center"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#E97D26] hover:bg-[#d46c1b] text-[#FFFFFF] text-xs font-black tracking-wide shadow-md shadow-[#E97D26]/20 transition flex items-center justify-center space-x-1.5"
            >
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
