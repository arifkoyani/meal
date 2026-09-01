"use client";

import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { login, logout, clearError } from "@/lib/redux/authSlice";

export interface Employee {
  id: string;
  name: string;
  dp: string;
  password: string;
}

const RAW_EMPLOYEE_LIST = [
  { name: "arif ali koyani", password: "arifkoyani121" },
  { name: "shahid karim", password: "shahidkhan738" },
  { name: "ahmed faraz", password: "ahmedfaraz128" },
  { name: "aliyan humayoon", password: "aliyanhumayoon742" },
  { name: "sherazahmad", password: "sherazahmad509" },
  { name: "qamar abbas", password: "qamarabbas283" },
  { name: "awais karim", password: "awaiskarim917" },
  { name: "ejaz alam", password: "ejazalam482" },
  { name: "nisar ali shah", password: "nisaralishah592" },
  { name: "amjad ali harri", password: "amjadaliharri304" },
  { name: "zohaib ahmed", password: "zohaibahmed748" },
  { name: "seema mir", password: "seemamir183" },
  { name: "ejaz karim", password: "ejazkarim402" },
  { name: "naeem", password: "naeem682" },
  { name: "sajid ali", password: "sajidali592" },
  { name: "naveed danish", password: "naveeddanish203" },
  { name: "zahid karim", password: "zahidkarim718" },
  { name: "sahahzad ali", password: "sahahzadali492" },
  { name: "ilyas karim", password: "ilyaskarim582" },
  { name: "shaan m khan", password: "shaanmkhan102" },
  { name: "zeeshan", password: "zeeshan849" },
  { name: "anita shaheen", password: "anitashaheen392" },
  { name: "suriya akhtar", password: "suriyaakhtar682" },
  { name: "kamran", password: "kamran402" },
  { name: "khalilz", password: "khalilz192" },
  { name: "sohail ahmed", password: "sohailahmed582" },
  { name: "afaq karim", password: "afaqkarim392" },
  { name: "ehsanullah baig", password: "ehsanullahbaig748" },
  { name: "nadeem akhtar", password: "nadeemakhtar293" },
  { name: "sunail ahmed", password: "sunailahmed502" },
  { name: "nauman akram barcha", password: "naumanakrambarcha192" },
  { name: "naveed harri", password: "naveedharri682" },
  { name: "pervaiz aslam", password: "pervaizaslam492" },
  { name: "sunil", password: "sunil758" },
  { name: "hanif khan", password: "hanifkhan293" },
  { name: "ayaz aslam", password: "ayazaslam582" },
  { name: "faizan karim", password: "faizankarim102" },
  { name: "kifayat hussain", password: "kifayathussain682" },
  { name: "somi", password: "somi492" },
  { name: "ishaq karim (ilhan)", password: "ishaqkarimilhan738" },
  { name: "sameer aslam", password: "sameeraslam293" },
  { name: "shabana", password: "shabana582" },
  { name: "hakeem sardar", password: "hakeemsardar102" },
  { name: "marjina muskaan", password: "marjinamuskaan682" },
  { name: "saira karim", password: "sairakarim492" },
  { name: "sajid", password: "sajid738" },
  { name: "ansar ali", password: "ansarali293" },
  { name: "rashid minhas", password: "rashidminhas582" },
  { name: "adnan ali", password: "adnanali102" },
  { name: "asim shah", password: "asimshah682" },
  { name: "rukhsana", password: "rukhsana492" },
  { name: "mushtaq ali", password: "mushtaqali738" },
  { name: "tufail alam", password: "tufailalam293" },
  { name: "altaf hussain", password: "altafhussain582" },
  { name: "irfan saeed", password: "irfansaeed102" },
  { name: "zeeshan karim", password: "zeeshankarim682" },
  { name: "asif ali", password: "asifali492" },
  { name: "azhar ud din", password: "azharuddin738" },
  { name: "inayat karim", password: "inayatkarim293" },
  { name: "arsalan", password: "arsalan582" },
  { name: "sajad ali", password: "sajadali102" },
  { name: "ahtiram ullah", password: "ahtiramullah682" },
  { name: "zubair akhtar", password: "zubairakhtar492" },
  { name: "faizan ali", password: "faizanali738" },
  { name: "sohail abbas", password: "sohailabbas293" },
  { name: "shumaila kareem", password: "shumailakareem582" },
  { name: "shehzad zahoor", password: "shehzadzahoor102" },
  { name: "imtiaz karim", password: "imtiazkarim682" },
  { name: "hassan iqbal", password: "hassaniqbal492" },
  { name: "arslan", password: "arslan738" },
  { name: "naseem hameed", password: "naseemhameed293" },
  { name: "israr hussain", password: "israrhussain582" },
  { name: "shehnaz babar", password: "shehnazbabar102" },
  { name: "muhammad waseem", password: "muhammadwaseem682" },
  { name: "nahida hassan", password: "nahidahassan492" },
  { name: "taswoor hussain", password: "taswoorhussain738" },
  { name: "sadat bakht", password: "sadatbakht293" },
  { name: "faisal nazeem", password: "faisalnazeem582" },
  { name: "fareed iqbal", password: "fareediqbal102" },
  { name: "janbaz karim", password: "janbazkarim682" },
  { name: "ali shan", password: "alishan492" },
  { name: "sheena alam", password: "sheenaalam738" },
  { name: "sheharyar darbar", password: "sheharyardarbar293" },
  { name: "rehana", password: "rehana582" },
  { name: "shehzadbaig", password: "shehzadbaig102" },
  { name: "ghulamabbas", password: "ghulamabbas682" },
  { name: "ambreen ali", password: "ambreenali492" },
  { name: "sunaila murtaza", password: "sunailamurtaza738" },
  { name: "sumera usman", password: "sumerausman293" },
  { name: "melad ali", password: "meladali582" },
  { name: "anaya noor", password: "anayanoor102" },
  { name: "saqlain faraz", password: "saqlainfaraz682" },
  { name: "umeed bano", password: "umeedbano492" },
  { name: "noreen", password: "noreen738" },
  { name: "rifat rumi", password: "rifatrumi293" },
  { name: "fariha karim", password: "farihakarim582" },
  { name: "muhammad ajmal", password: "muhammadajmal102" },
  { name: "asif ali", password: "asifali682" },
  { name: "shan iqbal", password: "shaniqbal492" },
  { name: "akmal hussain", password: "akmalhussain738" },
  { name: "daniyal karim", password: "daniyalkarim293" },
  { name: "shahrukh arbaz", password: "shahrukharbaz582" },
  { name: "maqsoodalikhan72", password: "maqsoodalikhan72102" },
  { name: "sadaf khan", password: "sadafkhan682" },
  { name: "aftab haider", password: "aftabhaider492" },
];

const EMPLOYEES: Employee[] = RAW_EMPLOYEE_LIST.map((user, idx) => ({
  id: `EMP-${(idx + 1).toString().padStart(3, "0")}`,
  name: user.name.toLowerCase(),
  password: user.password.toLowerCase(),
  dp: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=E97D26&color=FFFFFF&bold=true&size=128`,
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
  const [password, setPassword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPasswordMask, setShowPasswordMask] = useState(true);

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
    setPassword("");
  };

  // Filter employees based on search
  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return EMPLOYEES;
    const query = searchTerm.trim().toLowerCase();
    return EMPLOYEES.filter((emp) => emp.name.includes(query));
  }, [searchTerm]);

  // Check if password matches selected employee's password exactly (case-insensitive)
  const isPasswordCorrect = useMemo(() => {
    if (!selectedEmployee) return false;
    return (
      password.trim().toLowerCase() === selectedEmployee.password.toLowerCase()
    );
  }, [selectedEmployee, password]);

  const handleSelectEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    setSearchTerm(emp.name);
    setIsDropdownOpen(false);
    setPassword(""); // reset password on change
  };

  const handleGenerateToken = async () => {
    if (!selectedEmployee || !isPasswordCorrect) return;

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
    setPassword("");
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
            Search employee name, authenticate with password, and generate your
            meal pass.
          </p>
        </div>

        {/* Interactive Search & Verification Card */}
        <div className="w-full max-w-xl bg-[#FFFFFF] rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl relative">
          {/* Step 1: Employee Search Input */}
          <div className="mb-6 relative">
            <label className="block text-xs font-bold text-[#000000] uppercase tracking-wider mb-2">
              1. Search & Select Employee Name
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
                    setPassword("");
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

          {/* Step 2: Password Input */}
          {selectedEmployee && (
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#000000] uppercase tracking-wider mb-2">
                2. Enter Password for{" "}
                <span className="capitalize text-[#E97D26]">
                  {selectedEmployee.name}
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPasswordMask ? "password" : "text"}
                  placeholder="Enter employee password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-12 py-3.5 bg-[#FFFFFF] border rounded-xl text-[#000000] placeholder-slate-400 focus:outline-none text-sm transition ${
                    password.length > 0
                      ? isPasswordCorrect
                        ? "border-[#E97D26] focus:ring-2 focus:ring-[#E97D26]"
                        : "border-rose-500 focus:ring-2 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-2 focus:ring-[#E97D26]"
                  }`}
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPasswordMask(!showPasswordMask)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#E97D26] hover:text-[#d46c1b] transition text-xs font-bold"
                >
                  {showPasswordMask ? "SHOW" : "HIDE"}
                </button>
              </div>

              {/* Password Match / Error Indicator */}
              {password.length > 0 && (
                <div className="mt-2 text-xs flex items-center space-x-1.5">
                  {isPasswordCorrect ? (
                    <span className="text-[#E97D26] font-bold flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
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
                      <span>
                        Password correct! Token generator button unlocked.
                      </span>
                    </span>
                  ) : (
                    <span className="text-rose-500 font-bold flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
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
                      <span>
                        Incorrect password for{" "}
                        <span className="capitalize">
                          {selectedEmployee.name}
                        </span>
                        .
                      </span>
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: GENERATE TOKEN BUTTON (APPEARS ONLY WHEN PASSWORD IS CORRECT) */}
          {selectedEmployee && isPasswordCorrect && (
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
              Please search and select an employee above to proceed with
              authentication.
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
