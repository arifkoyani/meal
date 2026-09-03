"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { logout } from "@/lib/redux/authSlice";
import Sops from "@/components/Sops/Sops";
import Navbar from "@/components/Navbar/Navbar";

export interface Employee {
  id: string;
  name: string;
  password: string;
  dp: string;
}

const RAW_EMPLOYEE_DATA: { name: string; password: string }[] = [
  { name: "Arif ali koyani", password: "arif067" },
  { name: "Shahid Karim", password: "shahid073" },
  { name: "Aliyan Humayoon", password: "aliyan074" },
  { name: "SherazAhmad", password: "sheraz509" },
  { name: "Qamar Abbas", password: "qamar028" },
  { name: "Awais Karim", password: "awais091" },
  { name: "Ejaz Alam", password: "ejaz048" },
  { name: "NISAR ALI SHAH", password: "nisar082" },
  { name: "Amjad Ali Harri", password: "amjad304" },
  { name: "Zohaib Ahmed", password: "zohaib074" },
  { name: "Seema Mir", password: "seema018" },
  { name: "Ejaz Karim", password: "ejaz402" },
  { name: "Naeem", password: "naeem068" },
  { name: "Sajid Ali", password: "sajid059" },
  { name: "Naveed Danish", password: "naveed203" },
  { name: "Zahid Karim", password: "zahid071" },
  { name: "Sahahzad Ali", password: "sahahzad049" },
  { name: "Ilyas Karim", password: "ilyas058" },
  { name: "Shaan M Khan", password: "shaan102" },
  { name: "Zeeshan", password: "zeeshan084" },
  { name: "Anita Shaheen", password: "anita039" },
  { name: "Suriya Akhtar", password: "suriya068" },
  { name: "Kamran", password: "kamran402" },
  { name: "Khalilz", password: "khalilz019" },
  { name: "Sohail Ahmed", password: "sohail058" },
  { name: "Afaq Karim", password: "afaq039" },
  { name: "Ehsanullah Baig", password: "ehsanullah074" },
  { name: "Nadeem Akhtar", password: "nadeem029" },
  { name: "Sunail Ahmed", password: "sunail502" },
  { name: "Nauman Akram Barcha", password: "nauman019" },
  { name: "Naveed Harri", password: "naveed068" },
  { name: "Pervaiz Aslam", password: "pervaiz049" },
  { name: "Sunil", password: "sunil075" },
  { name: "hanif khan", password: "hanif029" },
  { name: "Ayaz Aslam", password: "ayaz058" },
  { name: "Faizan Karim", password: "faizan102" },
  { name: "Kifayat Hussain", password: "kifayat068" },
  { name: "somi", password: "somi049" },
  { name: "ishaq karim (ilhan)", password: "ishaq073" },
  { name: "Sameer Aslam", password: "sameer029" },
  { name: "shabana", password: "shabana058" },
  { name: "Hakeem Sardar", password: "hakeem102" },
  { name: "marjina muskaan", password: "marjina068" },
  { name: "Saira Karim", password: "saira049" },
  { name: "Sajid", password: "sajid073" },
  { name: "Ansar Ali", password: "ansar029" },
  { name: "Rashid Minhas", password: "rashid058" },
  { name: "Adnan Ali", password: "adnan102" },
  { name: "Asim Shah", password: "asim068" },
  { name: "Rukhsana", password: "rukhsana049" },
  { name: "Mushtaq Ali", password: "mushtaq073" },
  { name: "Tufail Alam", password: "tufail029" },
  { name: "Altaf Hussain", password: "altaf058" },
  { name: "Irfan Saeed", password: "irfan102" },
  { name: "Zeeshan Karim", password: "zeeshan068" },
  { name: "Asif Ali", password: "asif049" },
  { name: "Azhar Ud Din", password: "azhar073" },
  { name: "Inayat Karim", password: "inayat029" },
  { name: "Arsalan", password: "arsalan058" },
  { name: "Sajad ali", password: "sajad102" },
  { name: "Ahtiram Ullah", password: "ahtiram068" },
  { name: "Zubair Akhtar", password: "zubair049" },
  { name: "Faizan Ali", password: "faizan073" },
  { name: "Sohail Abbas", password: "sohail029" },
  { name: "Shumaila Kareem", password: "shumaila058" },
  { name: "Shehzad Zahoor", password: "shehzad102" },
  { name: "Imtiaz karim", password: "imtiaz068" },
  { name: "Hassan Iqbal", password: "hassan049" },
  { name: "arslan", password: "arslan073" },
  { name: "Naseem Hameed", password: "naseem029" },
  { name: "Israr Hussain", password: "israr058" },
  { name: "Shehnaz babar", password: "shehnaz102" },
  { name: "Muhammad Waseem", password: "muhammad068" },
  { name: "Nahida hassan", password: "nahida049" },
  { name: "Taswoor Hussain", password: "taswoor073" },
  { name: "Sadat bakht", password: "sadat029" },
  { name: "Faisal Nazeem", password: "faisal058" },
  { name: "Fareed Iqbal", password: "fareed102" },
  { name: "Janbaz Karim", password: "janbaz068" },
  { name: "Ali shan", password: "ali049" },
  { name: "Sheena Alam", password: "sheena073" },
  { name: "Sheharyar Darbar", password: "sheharyar029" },
  { name: "Rehana", password: "rehana058" },
  { name: "ShehzadBaig", password: "shehzadbaig102" },
  { name: "Ghulamabbas", password: "ghulamabbas068" },
  { name: "Ambreen ali", password: "ambreen049" },
  { name: "Sunaila Murtaza", password: "sunaila073" },
  { name: "Sumera Usman", password: "sumera029" },
  { name: "Melad Ali", password: "melad058" },
  { name: "Anaya Noor", password: "anaya102" },
  { name: "Saqlain Faraz", password: "saqlain068" },
  { name: "Umeed Bano", password: "umeed049" },
  { name: "Noreen", password: "noreen073" },
  { name: "Rifat Rumi", password: "rifat029" },
  { name: "Fariha Karim", password: "fariha058" },
  { name: "muhammad ajmal", password: "muhammad102" },
  { name: "ASIF ALI", password: "asif068" },
  { name: "Shan iqbal", password: "shan049" },
  { name: "Akmal Hussain", password: "akmal073" },
  { name: "Daniyal Karim", password: "daniyal029" },
  { name: "Shahrukh arbaz", password: "shahrukh058" },
  { name: "maqsoodalikhan72", password: "maqsood072" },
  { name: "Sadaf Khan", password: "sadaf068" },
  { name: "Aftab Haider", password: "aftab049" },
  { name: "Shahid Khan", password: "shahid073" },
];

const EMPLOYEES: Employee[] = RAW_EMPLOYEE_DATA.map((item, idx) => ({
  id: `EMP-${(idx + 1).toString().padStart(3, "0")}`,
  name: item.name.toLowerCase(),
  password: item.password.toLowerCase(),
  dp: `https://ui-avatars.com/api/?name=${encodeURIComponent(
    item.name,
  )}&background=E97D26&color=FFFFFF&bold=true&size=128`,
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
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  // Token Generator Local State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Unauthenticated Password Verification State
  const [empPassword, setEmpPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Modal & Webhook status
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [webhookResponseStatus, setWebhookResponseStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [webhookMessage, setWebhookMessage] = useState("");

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    setSelectedEmployee(null);
    setSearchTerm("");
    setEmpPassword("");
    setPasswordError(null);
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
    setEmpPassword("");
    setPasswordError(null);
  };

  const handleReset = () => {
    setSelectedEmployee(null);
    setSearchTerm("");
    setIsDropdownOpen(false);
    setEmpPassword("");
    setPasswordError(null);
  };

  // Password verification: checks lowercased firstname + 3 digits (e.g. adnan102, arif673, etc.)
  const validateEmployeePassword = (
    employee: Employee,
    passwordInput: string,
  ): boolean => {
    if (!passwordInput || !passwordInput.trim()) return false;
    const cleanInput = passwordInput.trim().toLowerCase();

    // 1. Exact match with lowercased password
    if (employee.password.toLowerCase() === cleanInput) return true;

    // 2. Lowercased first word of employee name + password digits
    const firstName = employee.name.trim().split(/\s+/)[0].toLowerCase();
    const passDigitsMatch = employee.password.match(/\d+$/);
    const passDigits = passDigitsMatch ? passDigitsMatch[0] : "";

    const firstNameWithPassDigits = `${firstName}${passDigits}`.toLowerCase();
    if (cleanInput === firstNameWithPassDigits) return true;

    return false;
  };

  const handleGenerateToken = async () => {
    if (!selectedEmployee) return;

    // IF NOT AUTHENTICATED: Validate employee password
    if (!isAuthenticated) {
      const isValid = validateEmployeePassword(selectedEmployee, empPassword);
      if (!isValid) {
        setPasswordError("Incorrect password. Token was not generated.");
        return; // DO NOT generate token!
      }
    }

    // Password is valid (or user is logged in): clear error and proceed
    setPasswordError(null);
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
    const firstName = selectedEmployee.name
      .trim()
      .split(/\s+/)[0]
      .toLowerCase();
    const dateStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(now)
      .replace(/-/g, "");
    const newTokenId = `${firstName}-${dateStr}`;

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
        setWebhookMessage("Token successfully generated & forwarded to HR!");
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

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000] flex flex-col font-sans selection:bg-[#E97D26] selection:text-[#FFFFFF] relative overflow-hidden">
      {/* Header Bar / Navbar */}
      <Navbar onLogout={handleLogout} />

      {/* Hero Section with background image */}
      <section className=" relative h-[100vh] w-full bg-[url('/background.jpg')] bg-cover bg-center py-12 sm:py-16 px-4 sm:px-6 flex flex-col justify-center items-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px] pointer-events-none" />

        {/* Hero Content Wrapper */}
        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center">
          {/* Banner Title */}
          <div className="text-center mb-8 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight mb-0 drop-shadow-md">
              Employee Meal Token Portal
            </h1>
          </div>

          {/* Interactive Search & Verification Card */}
          <div className="w-full max-w-xl bg-transparent rounded-3xl  p-6 sm:p-8 shadow-2xl relative mb-4">
            {/* Employee Search Input */}
            <div ref={searchRef} className="mb-6 relative">
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
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
                      setEmpPassword("");
                      setPasswordError(null);
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#FFFFFF]  rounded-xl shadow-2xl max-h-60 overflow-y-auto z-20 divide-y divide-slate-100 bg-white/10 backdrop-blur-sm">
                  {filteredEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      onClick={() => handleSelectEmployee(emp)}
                      className="p-3 hover:bg-[#FFF7ED]/40 cursor-pointer transition flex items-center space-x-3"
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

            {/* PASSWORD STEP (Only for Unauthenticated Mode) */}
            {selectedEmployee && !isAuthenticated && (
              <div className="mb-6 p-4.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#000000] uppercase tracking-wider">
                    Enter Password
                  </label>
                </div>
                <input
                  type="password"
                  placeholder="Enter password..."
                  value={empPassword}
                  onChange={(e) => {
                    setEmpPassword(e.target.value);
                    if (passwordError) setPasswordError(null);
                  }}
                  className="w-full px-4 py-3 bg-[#FFFFFF] border border-slate-300 rounded-xl text-[#000000] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E97D26] text-sm font-medium"
                />

                {passwordError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0 text-rose-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{passwordError}</span>
                  </div>
                )}
              </div>
            )}

            {/* ADMIN LOGGED IN BADGE (Skip Password Step) */}
            {selectedEmployee && isAuthenticated && (
              <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span>
                  Logged in as Admin ({user?.email}). No Employee Password
                  Required
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
                  <span>
                    {isAuthenticated
                      ? "Generate Meal Token"
                      : "Generate Meal Token"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MEAL & MESS SOPS SECTION (Only for Unauthenticated / Non-logged in Users) */}
      {!isAuthenticated && (
        <section className="w-full py-12 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl lg:max-w-7xl mx-auto">
            <Sops />
          </div>
        </section>
      )}

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
                  <span>Transmitting data to HR...</span>
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
