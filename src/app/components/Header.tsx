"use client";

import { motion } from "framer-motion";
import { Activity, ChevronDown, Loader2, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "../lib/firebase";
import SubscribeModal from "./SubscribeModal";

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  // State for dynamically loaded data
  const [topics, setTopics] = useState<string[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);

  // Fetch topics and trending data
  useEffect(() => {
    async function fetchTopicsAndTrending() {
      try {
        // Fetch all blog categories for Topics dropdown
        const blogsRef = collection(db, "blogs");
        const blogsQuery = query(blogsRef);
        const blogSnapshot = await getDocs(blogsQuery);

        // Extract unique categories
        const categories = new Set<string>();
        blogSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.category) {
            categories.add(data.category);
          }
        });
        setTopics(Array.from(categories));
        setIsTopicsLoading(false);

        // Attempt to fetch trending topics based on views first
        const trendingQuery = query(
          blogsRef,
          orderBy("views", "desc"),
          limit(8) // Fetch more to ensure we get enough tags
        );
        const trendingSnapshot = await getDocs(trendingQuery);

        // Extract trending tags
        const trendingTags = new Set<string>();

        // Check if we got any results
        if (!trendingSnapshot.empty) {
          trendingSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.tags && Array.isArray(data.tags)) {
              data.tags.forEach((tag: string) => {
                trendingTags.add(tag);
              });
            }
          });
        }

        // If we didn't get any tags from views, fall back to most recent posts
        if (trendingTags.size === 0) {
          console.log(
            "No tags found in trending posts, falling back to recent posts"
          );
          const recentQuery = query(
            blogsRef,
            orderBy("createdAt", "desc"),
            limit(8)
          );
          const recentSnapshot = await getDocs(recentQuery);

          recentSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.tags && Array.isArray(data.tags)) {
              data.tags.slice(0, 3).forEach((tag: string) => {
                trendingTags.add(tag);
              });
            }
          });
        }

        // If we still have no tags, use the categories as fallback
        const finalTrendingTopics = Array.from(trendingTags).slice(0, 6);

        if (finalTrendingTopics.length === 0 && topics.length > 0) {
          console.log("No tags found, using categories as trending topics");
          setTrendingTopics(topics.slice(0, 6));
        } else {
          setTrendingTopics(finalTrendingTopics);
        }

        console.log("Final trending topics:", finalTrendingTopics);
        setIsTrendingLoading(false);
      } catch (error) {
        console.error("Error fetching topics and trending:", error);
        setTopics([
          "Value-Based Care",
          "Population Health",
          "Care Management",
          "Quality Metrics",
        ]);
        setTrendingTopics([
          "Payment Models",
          "Clinical Outcomes",
          "Patient Engagement",
          "Healthcare Analytics",
          "Quality Measures",
          "Risk Adjustment",
        ]);
        setIsTopicsLoading(false);
        setIsTrendingLoading(false);
      }
    }

    fetchTopicsAndTrending();
  }, []);

  return (
    <header className="border-b border-gray-100 relative bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="border-b border-gray-100 py-2 px-4 md:px-6">
          <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
            <div className="flex items-center space-x-2 md:space-x-6">
              <a className="truncate">VBC Healthcare Insights</a>
              <span className="hidden sm:inline">|</span>
              <a
                className="hidden sm:inline"
                href="#"
                onClick={() => setIsSubscribeModalOpen(true)}
              >
                Subscribe to our newsletter
              </a>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <a href="#" className="hover:text-gray-900">
                Sign in
              </a>
              <span>|</span>
              <a
                href="#"
                onClick={() => setIsSubscribeModalOpen(true)}
                className="hover:text-gray-900"
              >
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
                  VBCAI.org
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
                    {isTopicsLoading ? (
                      <div className="flex justify-center items-center py-4">
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                      </div>
                    ) : (
                      topics.map((topic, index) => (
                        <a
                          key={index}
                          href={`/topics/${encodeURIComponent(
                            topic.toLowerCase()
                          )}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {topic}
                        </a>
                      ))
                    )}
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
              <button
                className="hidden md:block px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                onClick={() => setIsSubscribeModalOpen(true)}
              >
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
                  {isTopicsLoading ? (
                    <div className="flex py-2">
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                      <span className="ml-2 text-sm text-gray-500">
                        Loading topics...
                      </span>
                    </div>
                  ) : (
                    topics.map((topic, index) => (
                      <a
                        key={index}
                        href={`/topics/${encodeURIComponent(
                          topic.toLowerCase()
                        )}`}
                        className="block py-1 text-sm text-gray-700 hover:text-gray-900"
                      >
                        {topic}
                      </a>
                    ))
                  )}
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
              <button
                className="mt-2 w-full px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                onClick={() => setIsSubscribeModalOpen(true)}
              >
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

        {/* Categories Bar - Now with Dynamic Trending Topics */}
        <div className="overflow-x-auto border-t border-gray-100">
          <div className="px-4 md:px-6 py-2 md:py-3 flex items-center space-x-4 md:space-x-6 text-xs md:text-sm whitespace-nowrap">
            <span className="font-medium text-gray-900">Trending:</span>

            {isTrendingLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-gray-500">
                  Loading trending topics...
                </span>
              </div>
            ) : trendingTopics.length > 0 ? (
              trendingTopics.map((topic, index) => (
                <a
                  key={index}
                  href={`/topics/${encodeURIComponent(topic.toLowerCase())}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {topic}
                </a>
              ))
            ) : (
              <span className="text-gray-500">
                No trending topics available
              </span>
            )}
          </div>
        </div>
      </div>
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </header>
  );
}
