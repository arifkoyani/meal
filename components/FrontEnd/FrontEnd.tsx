"use client";

import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { login, logout, clearError } from "@/lib/redux/authSlice";

export interface Employee {
  id: string;
  name: string;
  dp: string;
}

const RAW_EMPLOYEE_LIST = [
  "arif ali koyani",
  "shahid karim",
  "ahmed faraz",
  "aliyan humayoon",
  "sherazahmad",
  "qamar abbas",
  "awais karim",
  "ejaz alam",
  "nisar ali shah",
  "amjad ali harri",
  "zohaib ahmed",
  "seema mir",
  "ejaz karim",
  "naeem",
  "sajid ali",
  "naveed danish",
  "zahid karim",
  "sahahzad ali",
  "ilyas karim",
  "shaan m khan",
  "zeeshan",
  "anita shaheen",
  "suriya akhtar",
  "kamran",
  "khalilz",
  "sohail ahmed",
  "afaq karim",
  "ehsanullah baig",
  "nadeem akhtar",
  "sunail ahmed",
  "nauman akram barcha",
  "naveed harri",
  "pervaiz aslam",
  "sunil",
  "hanif khan",
  "ayaz aslam",
  "faizan karim",
  "kifayat hussain",
  "somi",
  "ishaq karim (ilhan)",
  "sameer aslam",
  "shabana",
  "hakeem sardar",
  "marjina muskaan",
  "saira karim",
  "sajid",
  "ansar ali",
  "rashid minhas",
  "adnan ali",
  "asim shah",
  "rukhsana",
  "mushtaq ali",
  "tufail alam",
  "altaf hussain",
  "irfan saeed",
  "zeeshan karim",
  "asif ali",
  "azhar ud din",
  "inayat karim",
  "arsalan",
  "sajad ali",
  "ahtiram ullah",
  "zubair akhtar",
  "faizan ali",
  "sohail abbas",
  "shumaila kareem",
  "shehzad zahoor",
  "imtiaz karim",
  "hassan iqbal",
  "arslan",
  "naseem hameed",
  "israr hussain",
  "shehnaz babar",
  "muhammad waseem",
  "nahida hassan",
  "taswoor hussain",
  "sadat bakht",
  "faisal nazeem",
  "fareed iqbal",
  "janbaz karim",
  "ali shan",
  "sheena alam",
  "sheharyar darbar",
  "rehana",
  "shehzadbaig",
  "ghulamabbas",
  "ambreen ali",
  "sunaila murtaza",
  "sumera usman",
  "melad ali",
  "anaya noor",
  "saqlain faraz",
  "umeed bano",
  "noreen",
  "rifat rumi",
  "fariha karim",
  "muhammad ajmal",
  "asif ali",
  "shan iqbal",
  "akmal hussain",
  "daniyal karim",
  "shahrukh arbaz",
  "maqsoodalikhan72",
  "sadaf khan",
  "aftab haider",
];

const EMPLOYEES: Employee[] = RAW_EMPLOYEE_LIST.map((name, idx) => ({
  id: `EMP-${(idx + 1).toString().padStart(3, "0")}`,
  name: name.toLowerCase(),
  dp: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=E97D26&color=FFFFFF&bold=true&size=128`,
}));

export interface TokenDetails {
  tokenId: string;
  employee: Employee;
  date: string;
  time: string;
  timestamp: string;
}

export default function FrontEnd() {
  // Redux Toolkit Auth State
  const dispatch = useDispatch<AppDispatch>();
  const {
    isAuthenticated,
    user,
    error: authError,
  } = useSelector((state: RootState) => state.auth);

  // Login Form Local State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Token Generator Local State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Modal & Webhook status
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [webhookResponseStatus, setWebhookResponseStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [webhookMessage, setWebhookMessage] = useState("");

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    setSelectedEmployee(null);
    setSearchTerm("");
  };

  // Filter employees based on search
  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return EMPLOYEES;
    const query = searchTerm.trim().toLowerCase();
    return EMPLOYEES.filter((emp) => emp.name.includes(query));
  }, [searchTerm]);

  const handleSelectEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    setSearchTerm(emp.name);
    setIsDropdownOpen(false);
  };

  const handleGenerateToken = async () => {
    if (!selectedEmployee) return;

    const now = new Date();

    // Format date & time accurately
    const formattedDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const isoTimestamp = now.toISOString();

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newTokenId = `UCM-${randomNum}`;

    const details: TokenDetails = {
      tokenId: newTokenId,
      employee: selectedEmployee,
      date: formattedDate,
      time: formattedTime,
      timestamp: isoTimestamp,
    };

    setTokenDetails(details);
    setIsModalOpen(true);
    setIsSending(true);
    setWebhookResponseStatus("idle");
    setWebhookMessage("");

    // Send payload to Next.js API Route /api/uconnectmeal
    try {
      const res = await fetch("/api/uconnectmeal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedEmployee.name,
          token: newTokenId,
          tokenId: newTokenId,
          date: formattedDate,
          time: formattedTime,
          timestamp: isoTimestamp,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setWebhookResponseStatus("success");
        setWebhookMessage(
          "Token successfully generated & forwarded to webhook automation!",
        );
      } else {
        setWebhookResponseStatus("error");
        setWebhookMessage(data.error || "Failed to reach automation server.");
      }
    } catch (err: unknown) {
      console.error(err);
      setWebhookResponseStatus("error");
      setWebhookMessage("Network error: Could not reach backend route.");
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setSelectedEmployee(null);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  // IF NOT AUTHENTICATED: Render Login Page Card managed by Redux Toolkit
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-[#000000] flex flex-col font-sans relative overflow-hidden">
        <header className="border-b border-slate-200 bg-[#FFFFFF] py-4 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/uConnect-logo.png"
                alt="uConnect Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl border border-slate-200 p-8 shadow-2xl relative">
            <div className="text-center mb-6">
              <img
                src="/uConnect-logo.png"
                alt="uConnect Logo"
                className="h-14 w-auto object-contain mx-auto mb-3"
              />
              <h2 className="text-2xl font-black text-[#000000]">
                Portal Login
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Enter your admin credentials to access Uconnect Meal Portal Pass
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
          </div>
        </main>
      </div>
    );
  }

  // IF AUTHENTICATED: Render Full Portal UI with Logout Button
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000] flex flex-col font-sans selection:bg-[#E97D26] selection:text-[#FFFFFF] relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#E97D26]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#E97D26]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-slate-200 bg-[#FFFFFF] sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/uConnect-logo.png"
              alt="uConnect Logo"
              className="h-10 w-auto object-contain"
            />
            <div>
              <span className="text-xl font-black tracking-wider text-[#000000]">
                UCONNECT
              </span>
              <span className="ml-2 text-xs uppercase px-2.5 py-0.5 rounded-full bg-[#E97D26]/10 text-[#E97D26] border border-[#E97D26]/30 font-bold tracking-wider">
                Meals Portal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-xs font-medium text-slate-700 hidden sm:flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-[#000000]">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-300 text-xs font-bold transition text-slate-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 flex flex-col justify-center items-center z-10">
        {/* Banner Title */}
        <div className="text-center mb-8 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-black text-[#000000] tracking-tight mb-2">
            Employee Meal Token Portal
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Search employee name and generate your meal pass.
          </p>
        </div>

        {/* Interactive Search & Verification Card */}
        <div className="w-full max-w-xl bg-[#FFFFFF] rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl relative">
          {/* Employee Search Input */}
          <div className="mb-6 relative">
            <label className="block text-xs font-bold text-[#000000] uppercase tracking-wider mb-2">
              Search & Select Employee Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type employee name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                  if (
                    selectedEmployee &&
                    e.target.value.toLowerCase() !== selectedEmployee.name
                  ) {
                    setSelectedEmployee(null);
                  }
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="w-full pl-11 pr-10 py-3.5 bg-[#FFFFFF] border border-slate-300 rounded-xl text-[#000000] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E97D26] focus:border-[#E97D26] text-sm transition"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E97D26]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {selectedEmployee && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
                  title="Clear Selection"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown Suggestions */}
            {isDropdownOpen && filteredEmployees.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#FFFFFF] border border-slate-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-20 divide-y divide-slate-100">
                {filteredEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    onClick={() => handleSelectEmployee(emp)}
                    className="p-3 hover:bg-[#FFF7ED] cursor-pointer transition flex items-center space-x-3"
                  >
                    <img
                      src={emp.dp}
                      alt={emp.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#E97D26]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#E97D26] capitalize truncate">
                        {emp.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {emp.id}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Employee Display Card */}
          {selectedEmployee && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FFF7ED] border border-[#E97D26]/40 flex items-center space-x-4">
              <img
                src={selectedEmployee.dp}
                alt={selectedEmployee.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#E97D26] shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-[#E97D26] capitalize truncate">
                  {selectedEmployee.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Uconnect Employee ({selectedEmployee.id})
                </p>
              </div>
              <span className="px-3 py-1 text-[11px] font-bold text-[#FFFFFF] bg-[#E97D26] rounded-full shadow-sm">
                Selected
              </span>
            </div>
          )}

          {/* GENERATE TOKEN BUTTON */}
          {selectedEmployee && (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerateToken}
                className="w-full py-4 px-6 rounded-2xl bg-[#E97D26] hover:bg-[#d46c1b] text-[#FFFFFF] font-black text-base tracking-wide shadow-xl shadow-[#E97D26]/30 active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-6 h-6 text-[#FFFFFF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                <span>Generate Meal Token</span>
              </button>
            </div>
          )}

          {!selectedEmployee && (
            <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 text-sm font-medium">
              Please search and select an employee above to proceed.
            </div>
          )}
        </div>
      </main>

      {/* GENERATE TOKEN MODAL WINDOW */}
      {isModalOpen && tokenDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#000000]">
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-[#E97D26]" />

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E97D26]/10 text-[#E97D26] mb-3">
                <svg
                  className="w-6 h-6 text-[#E97D26]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-[#000000] tracking-tight">
                Official Meal Token
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Uconnect Meal Authorization Pass
              </p>
            </div>

            {/* Employee Profile Section */}
            <div className="bg-[#FFF7ED] rounded-2xl p-4 border border-[#E97D26]/30 mb-5 flex items-center space-x-4">
              <img
                src={tokenDetails.employee.dp}
                alt={tokenDetails.employee.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E97D26] shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-black tracking-wider text-[#FFFFFF] bg-[#E97D26] px-2 py-0.5 rounded shadow-sm">
                  {tokenDetails.employee.id}
                </span>
                <h3 className="text-lg font-black text-[#E97D26] capitalize truncate mt-1">
                  {tokenDetails.employee.name}
                </h3>
              </div>
            </div>

            {/* Generation Date & Time Tracking */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-600 font-medium">
                  Generation Date:
                </span>
                <span className="text-[#000000] font-bold">
                  {tokenDetails.date}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-600 font-medium">
                  Generation Time:
                </span>
                <span className="text-[#E97D26] font-mono font-extrabold">
                  {tokenDetails.time}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Token ID:</span>
                <span className="text-[#E97D26] font-mono font-black text-sm">
                  {tokenDetails.tokenId}
                </span>
              </div>
            </div>

            {/* Automation Webhook Status Notification */}
            <div className="mb-6">
              {isSending ? (
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center space-x-2 text-xs text-[#E97D26] font-medium">
                  <svg
                    className="w-4 h-4 animate-spin text-[#E97D26]"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Transmitting data to automation webhook...</span>
                </div>
              ) : webhookResponseStatus === "success" ? (
                <div className="p-3 rounded-xl bg-[#FFF7ED] border border-[#E97D26] text-[#E97D26] text-xs text-center flex items-center justify-center space-x-2 font-bold">
                  <svg
                    className="w-4 h-4 flex-shrink-0 text-[#E97D26]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{webhookMessage}</span>
                </div>
              ) : webhookResponseStatus === "error" ? (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-600 text-xs text-center flex items-center justify-center space-x-2 font-medium">
                  <svg
                    className="w-4 h-4 flex-shrink-0 text-rose-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{webhookMessage}</span>
                </div>
              ) : null}
            </div>

            {/* Modal Actions */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#000000] text-xs font-bold transition border border-slate-300"
              >
                Print Token
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#E97D26] hover:bg-[#d46c1b] text-[#FFFFFF] text-xs font-black transition shadow-lg shadow-[#E97D26]/30"
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
