"use client";

import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { logout } from "@/lib/redux/authSlice";

export interface Employee {
  id: string;
  name: string;
  password: string;
  dp: string;
}

const RAW_EMPLOYEE_DATA: { name: string; password: string }[] = [
  { name: "Arif ali koyani", password: "arif673" },
  { name: "Shahid Karim", password: "shahid738" },
  { name: "Aliyan Humayoon", password: "aliyan742" },
  { name: "SherazAhmad", password: "sherazahmad509" },
  { name: "Qamar Abbas", password: "qamar283" },
  { name: "Awais Karim", password: "awais917" },
  { name: "Ejaz Alam", password: "ejaz482" },
  { name: "NISAR ALI SHAH", password: "nisar592" },
  { name: "Amjad Ali Harri", password: "amjad304" },
  { name: "Zohaib Ahmed", password: "zohaib748" },
  { name: "Seema Mir", password: "seema183" },
  { name: "Ejaz Karim", password: "ejaz402" },
  { name: "Naeem", password: "naeem682" },
  { name: "Sajid Ali", password: "sajid592" },
  { name: "Naveed Danish", password: "naveed203" },
  { name: "Zahid Karim", password: "zahid718" },
  { name: "Sahahzad Ali", password: "sahahzad492" },
  { name: "Ilyas Karim", password: "ilyas582" },
  { name: "Shaan M Khan", password: "shaan102" },
  { name: "Zeeshan", password: "zeeshan849" },
  { name: "Anita Shaheen", password: "anita392" },
  { name: "Suriya Akhtar", password: "suriya682" },
  { name: "Kamran", password: "kamran402" },
  { name: "Khalilz", password: "khalilz192" },
  { name: "Sohail Ahmed", password: "sohail582" },
  { name: "Afaq Karim", password: "afaq392" },
  { name: "Ehsanullah Baig", password: "ehsanullah748" },
  { name: "Nadeem Akhtar", password: "nadeem293" },
  { name: "Sunail Ahmed", password: "sunail502" },
  { name: "Nauman Akram Barcha", password: "nauman192" },
  { name: "Naveed Harri", password: "naveed682" },
  { name: "Pervaiz Aslam", password: "pervaiz492" },
  { name: "Sunil", password: "sunil758" },
  { name: "hanif khan", password: "hanif293" },
  { name: "Ayaz Aslam", password: "ayaz582" },
  { name: "Faizan Karim", password: "faizan102" },
  { name: "Kifayat Hussain", password: "kifayat682" },
  { name: "somi", password: "somi492" },
  { name: "ishaq karim (ilhan)", password: "ishaq738" },
  { name: "Sameer Aslam", password: "sameer293" },
  { name: "shabana", password: "shabana582" },
  { name: "Hakeem Sardar", password: "hakeem102" },
  { name: "marjina muskaan", password: "marjina682" },
  { name: "Saira Karim", password: "saira492" },
  { name: "Sajid", password: "sajid738" },
  { name: "Ansar Ali", password: "ansar293" },
  { name: "Rashid Minhas", password: "rashid582" },
  { name: "Adnan Ali", password: "adnan102" },
  { name: "Asim Shah", password: "asim682" },
  { name: "Rukhsana", password: "rukhsana492" },
  { name: "Mushtaq Ali", password: "mushtaq738" },
  { name: "Tufail Alam", password: "tufail293" },
  { name: "Altaf Hussain", password: "altaf582" },
  { name: "Irfan Saeed", password: "irfan102" },
  { name: "Zeeshan Karim", password: "zeeshan682" },
  { name: "Asif Ali", password: "asif492" },
  { name: "Azhar Ud Din", password: "azhar738" },
  { name: "Inayat Karim", password: "inayat293" },
  { name: "Arsalan", password: "arsalan582" },
  { name: "Sajad ali", password: "sajad102" },
  { name: "Ahtiram Ullah", password: "ahtiram682" },
  { name: "Zubair Akhtar", password: "zubair492" },
  { name: "Faizan Ali", password: "faizan738" },
  { name: "Sohail Abbas", password: "sohail293" },
  { name: "Shumaila Kareem", password: "shumaila582" },
  { name: "Shehzad Zahoor", password: "shehzad102" },
  { name: "Imtiaz karim", password: "imtiaz682" },
  { name: "Hassan Iqbal", password: "hassan492" },
  { name: "arslan", password: "arslan738" },
  { name: "Naseem Hameed", password: "naseem293" },
  { name: "Israr Hussain", password: "israr582" },
  { name: "Shehnaz babar", password: "shehnaz102" },
  { name: "Muhammad Waseem", password: "muhammad682" },
  { name: "Nahida hassan", password: "nahida492" },
  { name: "Taswoor Hussain", password: "taswoor738" },
  { name: "Sadat bakht", password: "sadat293" },
  { name: "Faisal Nazeem", password: "faisal582" },
  { name: "Fareed Iqbal", password: "fareed102" },
  { name: "Janbaz Karim", password: "janbaz682" },
  { name: "Ali shan", password: "ali492" },
  { name: "Sheena Alam", password: "sheena738" },
  { name: "Sheharyar Darbar", password: "sheharyar293" },
  { name: "Rehana", password: "rehana582" },
  { name: "ShehzadBaig", password: "shehzadbaig102" },
  { name: "Ghulamabbas", password: "ghulamabbas682" },
  { name: "Ambreen ali", password: "ambreen492" },
  { name: "Sunaila Murtaza", password: "sunaila738" },
  { name: "Sumera Usman", password: "sumera293" },
  { name: "Melad Ali", password: "melad582" },
  { name: "Anaya Noor", password: "anaya102" },
  { name: "Saqlain Faraz", password: "saqlain682" },
  { name: "Umeed Bano", password: "umeed492" },
  { name: "Noreen", password: "noreen738" },
  { name: "Rifat Rumi", password: "rifat293" },
  { name: "Fariha Karim", password: "fariha582" },
  { name: "muhammad ajmal", password: "muhammad102" },
  { name: "ASIF ALI", password: "asif682" },
  { name: "Shan iqbal", password: "shan492" },
  { name: "Akmal Hussain", password: "akmal738" },
  { name: "Daniyal Karim", password: "daniyal293" },
  { name: "Shahrukh arbaz", password: "shahrukh582" },
  { name: "maqsoodalikhan72", password: "maqsoodalikhan72102" },
  { name: "Sadaf Khan", password: "sadaf682" },
  { name: "Aftab Haider", password: "aftab492" },
  { name: "Shahid Khan", password: "shahid738" },
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

  // Unauthenticated Password Verification State
  const [empPassword, setEmpPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Anonymous Feedback State (just above search card)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

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
      {/* Background Glow Overlay */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#E97D26]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#E97D26]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar / Navbar */}
      <header className="border-b border-slate-200 bg-[#FFFFFF] sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/uConnect-logo.png"
              alt="uConnect Logo"
              className="h-10 w-auto object-contain"
            />
            <div>
              <span className="ml-2 text-xs uppercase px-2.5 py-0.5 rounded-full bg-[#E97D26]/10 text-[#E97D26] border border-[#E97D26]/30 font-bold tracking-wider">
                Meals Portal
              </span>
            </div>
          </Link>

          {/* Navigation Action Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="text-xs font-medium text-slate-700 hidden sm:flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-[#000000]">
                    {user?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-300 text-xs font-bold transition text-slate-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-[#E97D26] hover:bg-[#d46c1b] text-[#FFFFFF] text-xs font-black tracking-wide shadow-md shadow-[#E97D26]/20 transition flex items-center space-x-1.5"
              >
                <span>Login</span>
              </Link>
            )}
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
        <div className="w-full max-w-xl bg-[#FFFFFF] rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl relative mb-4">
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
                Logged in as Admin ({user?.email}) — Direct Token Generation (No
                Employee Password Required)
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
                <span>
                  {isAuthenticated
                    ? "Generate Meal Token"
                    : "Verify & Generate Meal Token"}
                </span>
              </button>
            </div>
          )}

          {!selectedEmployee && (
            <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 text-sm font-medium">
              Please search and select an employee above to proceed.
            </div>
          )}
        </div>

        {/* ANONYMOUS FEEDBACK SECTION */}
        <div className="w-full max-w-xl mb-6">
          <div className="bg-[#FFFFFF] border border-slate-200 rounded-2xl p-4 shadow-sm relative overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#E97D26]/10 text-[#E97D26] flex items-center justify-center flex-shrink-0 font-bold">
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-black text-[#000000] truncate">
                      Feedback (Anonymously)
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97D26] bg-[#E97D26]/10 px-2 py-0.5 rounded-full border border-[#E97D26]/20 flex-shrink-0">
                      100% Private
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                    How can we make this service better?
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsFeedbackOpen(!isFeedbackOpen);
                  setFeedbackSuccess(false);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#E97D26] hover:bg-[#d46c1b] text-white text-xs font-bold transition shadow-sm flex items-center space-x-1.5 flex-shrink-0 ml-3"
              >
                <span>{isFeedbackOpen ? "Close" : "Give Feedback"}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isFeedbackOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* EXPANDABLE FEEDBACK FORM */}
            {isFeedbackOpen && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                {feedbackSuccess ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-emerald-600 flex-shrink-0"
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
                        Thank you! Your feedback has been sent anonymously.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsFeedbackOpen(false)}
                      className="text-emerald-700 hover:text-emerald-900 underline text-[11px] ml-2"
                    >
                      Dismiss
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!feedbackText.trim()) return;
                      try {
                        await fetch("/api/feedback", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            feedback: feedbackText.trim(),
                            timestamp: new Date().toISOString(),
                          }),
                        });
                      } catch (err) {
                        console.error("Feedback submission error:", err);
                      }
                      setFeedbackSuccess(true);
                      setFeedbackText("");
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        How can we make this service better?
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Type your feedback or suggestions here anonymously..."
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-slate-300 rounded-xl text-[#000000] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E97D26] text-xs resize-none font-medium"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="py-2.5 px-5 rounded-xl bg-[#E97D26] hover:bg-[#d46c1b] text-[#FFFFFF] font-black text-xs tracking-wide shadow-md shadow-[#E97D26]/20 transition flex items-center space-x-1.5"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        <span>Send Feedback</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
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
