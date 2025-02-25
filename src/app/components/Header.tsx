"use client";

import { motion } from "framer-motion";
import { Activity, ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="border-b border-gray-100 py-2 px-4 md:px-6">
          <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
            <div className="flex items-center space-x-2 md:space-x-6">
              <a className="truncate">VBC Healthcare Insights</a>
              <span className="hidden sm:inline">|</span>
              <a className="hidden sm:inline">Subscribe to our newsletter</a>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <a href="#" className="hover:text-gray-900">
                Sign in
              </a>
              <span>|</span>
              <a href="#" className="hover:text-gray-900">
                Subscribe
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4 md:py-6 px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 md:space-x-12">
              <Link href="/" className="flex items-center space-x-3">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                <span className="font-black text-lg md:text-xl bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
                  VBC.ai
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  href="/articles"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Latest
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                    <span>Topics</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute hidden group-hover:block w-56 bg-white shadow-lg rounded-lg py-2 mt-1 z-10">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Value-Based Care
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Population Health
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Care Management
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Quality Metrics
                    </a>
                  </div>
                </div>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Case Studies
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Research
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-3 md:space-x-6">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="hidden md:block px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 py-4"
          >
            <nav className="flex flex-col space-y-4">
              <Link
                href="/articles"
                className="text-gray-600 hover:text-gray-900 py-2 px-4 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Latest
              </Link>
              <div className="py-2 px-4">
                <button className="flex items-center justify-between w-full text-gray-600 hover:text-gray-900">
                  <span>Topics</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="mt-2 ml-4 space-y-2">
                  <a
                    href="#"
                    className="block py-1 text-sm text-gray-700 hover:text-gray-900"
                  >
                    Value-Based Care
                  </a>
                  <a
                    href="#"
                    className="block py-1 text-sm text-gray-700 hover:text-gray-900"
                  >
                    Population Health
                  </a>
                  <a
                    href="#"
                    className="block py-1 text-sm text-gray-700 hover:text-gray-900"
                  >
                    Care Management
                  </a>
                  <a
                    href="#"
                    className="block py-1 text-sm text-gray-700 hover:text-gray-900"
                  >
                    Quality Metrics
                  </a>
                </div>
              </div>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 py-2 px-4 hover:bg-gray-50 rounded-md"
              >
                Case Studies
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 py-2 px-4 hover:bg-gray-50 rounded-md"
              >
                Research
              </a>
              <button className="mt-2 w-full px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </nav>
          </motion.div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-gray-100 py-3 md:py-4 px-4 md:px-6"
          >
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories Bar */}
        <div className="overflow-x-auto border-t border-gray-100">
          <div className="px-4 md:px-6 py-2 md:py-3 flex items-center space-x-4 md:space-x-6 text-xs md:text-sm whitespace-nowrap">
            <span className="font-medium text-gray-900">Trending:</span>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Payment Models
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Clinical Outcomes
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Patient Engagement
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Risk Stratification
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Care Coordination
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Healthcare Analytics
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
