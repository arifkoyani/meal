"use client";

import React, { useState } from "react";

export default function Feedback() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-6">
      <div className="bg-[#FFFFFF] border border-slate-200 rounded-2xl p-4 shadow-xl relative overflow-hidden transition-all duration-300">
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
              <form onSubmit={handleSubmit} className="space-y-3">
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
  );
}
