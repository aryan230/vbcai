"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CalendarClock,
  Mail,
  BellRing,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import CTA from "./CTA";
import Footer from "./Footer";

interface ComingSoonProps {
  title: string;
  description: string;
  timeframe?: string;
}

export default function ComingSoon({
  title,
  description,
  timeframe = "Summer 2025",
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission - replace with actual submission logic
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-250px)] bg-gradient-to-b from-blue-50/50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Activity className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
              {title} <span className="text-blue-500">Coming Soon</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden mb-12"
          >
            <div className="px-6 py-8 sm:p-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CalendarClock className="w-5 h-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Launch Timeframe
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                We're hard at work building our comprehensive{" "}
                {title.toLowerCase()} section. Our team is curating high-quality
                content specifically designed for healthcare professionals
                involved in value-based care.
              </p>

              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg mb-6">
                <p className="text-blue-800 font-medium">
                  Expected launch: {timeframe}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Get notified when we launch
                </h3>

                {isSuccess ? (
                  <div className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg">
                    <BellRing className="w-5 h-5 mr-2" />
                    <p>
                      Thank you! You'll be notified when our{" "}
                      {title.toLowerCase()} section launches.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleNotifySubmit}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <div className="relative flex-1">
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 px-6 rounded-lg font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Notify Me</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-6">
              In the meantime, check out our latest articles on value-based
              care.
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors rounded-lg font-medium"
            >
              Explore Latest Articles
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
