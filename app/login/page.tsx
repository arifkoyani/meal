"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { login, clearError } from "@/lib/redux/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isAuthenticated, error: authError } = useSelector(
    (state: RootState) => state.auth
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Redirect to home portal if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000] flex flex-col font-sans relative overflow-hidden">
      {/* Header Bar */}
      <header className="border-b border-slate-200 bg-[#FFFFFF] py-3.5 sm:py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <Link href="/" className="flex flex-col sm:flex-row items-center space-y-1.5 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
            <img
              src="/uConnect-logo.png"
              alt="uConnect Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-wider text-[#000000]">
                UCONNECT
              </span>
              <span className="text-xs uppercase px-2.5 py-0.5 rounded-full bg-[#E97D26]/10 text-[#E97D26] border border-[#E97D26]/30 font-bold tracking-wider">
                Meals Portal
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-300 flex items-center justify-center space-x-2"
          >
            <svg
              className="w-4 h-4 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Portal</span>
          </Link>
        </div>
      </header>

      {/* Main Login Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl border border-slate-200 p-8 shadow-2xl relative">
          <div className="text-center mb-6">
            <img
              src="/uConnect-logo.png"
              alt="uConnect Logo"
              className="h-14 w-auto object-contain mx-auto mb-3"
            />
            <h2 className="text-2xl font-black text-[#000000]">
              Admin Portal Login
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Sign in to directly generate meal passes without employee passwords.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#000000] uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="azharkarim@uconnect.com"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                  if (authError) dispatch(clearError());
                }}
                required
                className="w-full px-4 py-3 bg-[#FFFFFF] border border-slate-300 rounded-xl text-[#000000] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E97D26] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000000] uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  if (authError) dispatch(clearError());
                }}
                required
                className="w-full px-4 py-3 bg-[#FFFFFF] border border-slate-300 rounded-xl text-[#000000] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E97D26] text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#E97D26] hover:bg-[#d46c1b] text-[#FFFFFF] font-black text-sm tracking-wide shadow-lg shadow-[#E97D26]/30 transition"
            >
              Sign In to Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Default system allows public generation with employee password.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
