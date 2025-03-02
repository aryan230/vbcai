"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Loader2, Check, AlertCircle, Mail, ArrowRight } from "lucide-react";

function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("cta-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !validateEmail(email.trim())) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await addDoc(collection(db, "subscribe"), {
        email: email.trim(),
        source: "homepage_cta",
        timestamp: serverTimestamp(),
      });

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Error subscribing: ", err);
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section
      id="cta-section"
      className={`py-16 px-4 sm:px-6 relative transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative">
        <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden">
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="text-center">
              {/* Simple icon */}
              <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-6">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-800">
                Stay Updated with VBC Insights
              </h2>

              <p className="text-base text-slate-600 mb-8 max-w-lg mx-auto">
                Join healthcare leaders and receive our weekly digest of VBC
                strategies, case studies, and analytics insights.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading" || status === "success"}
                      className="w-full px-4 py-3 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    />

                    {status === "error" && (
                      <div className="absolute -bottom-6 left-0 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                        {errorMessage}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={`py-3 px-6 rounded-lg font-medium transition-colors duration-200
                      ${
                        status === "success"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                        <span>Subscribing...</span>
                      </>
                    ) : status === "success" ? (
                      <>
                        <Check className="w-4 h-4 mr-2 inline" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Simple trust indicators */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-center text-sm text-slate-600">
                <div className="flex items-center">
                  <div className="flex -space-x-1 mr-2">
                    <div className="w-5 h-5 rounded-full bg-blue-400 border-2 border-white"></div>
                    <div className="w-5 h-5 rounded-full bg-indigo-400 border-2 border-white"></div>
                    <div className="w-5 h-5 rounded-full bg-violet-400 border-2 border-white"></div>
                  </div>
                  <span>Join 2,500+ subscribers</span>
                </div>
                <div>
                  <span className="text-yellow-500">★★★★★</span> Trusted by
                  healthcare professionals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
