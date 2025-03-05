"use client";
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import Link from "next/link";
import { Search, Clock, Tag, ArrowRight, Loader2 } from "lucide-react";
import Header from "./Header";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  createdAt: any;
  content: string;
  images: string[];
  tags: string[];
  status: string;
  slug: string;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleArticles, setVisibleArticles] = useState(9);

  // Categories
  const categories = [
    "All",
    "Population Health",
    "Care Management",
    "Analytics",
    "Value-Based Care",
    "Clinical Quality",
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const articlesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Article[];

        setArticles(articlesData);
        setFilteredArticles(articlesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    // Filter articles based on search query and active category
    let results = articles;

    if (searchQuery) {
      results = results.filter((article) => {
        const title = article.title?.toLowerCase() || "";
        const excerpt = article.excerpt?.toLowerCase() || "";
        const tags = article.tags || [];
        const searchTerm = searchQuery.toLowerCase();

        return (
          title.includes(searchTerm) ||
          excerpt.includes(searchTerm) ||
          tags.some((tag) => (tag?.toLowerCase() || "").includes(searchTerm))
        );
      });
    }

    if (activeCategory !== "All") {
      results = results.filter(
        (article) => article.category === activeCategory
      );
    }

    setFilteredArticles(results);
  }, [searchQuery, activeCategory, articles]);

  const loadMoreArticles = () => {
    setVisibleArticles((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
              VBC Insights Library
            </h1>
            <p className="text-blue-900/80 text-lg mb-8">
              Explore our collection of articles, case studies and insights on
              value-based care, population health management, and healthcare
              transformation.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-blue-400" />
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-blue-100 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-start overflow-x-auto py-4 space-x-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <p className="text-blue-900 font-medium">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-blue-900 mb-2">
                No articles found
              </h3>
              <p className="text-blue-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.slice(0, visibleArticles).map((article) => (
                  <Link
                    key={article.id}
                    href={`/${article.slug}`}
                    className="group"
                  >
                    <article className="h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-blue-100 shadow-sm hover:shadow-lg transition-all">
                      <div className="aspect-[16/9] overflow-hidden relative">
                        {article.images?.[0] && (
                          <img
                            src={article.images[0]}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-3 text-blue-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-blue-900/70 mb-6 line-clamp-2">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-blue-50">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {(article.author && article.author.charAt(0)) ||
                                  "A"}
                              </span>
                            </div>
                            <div className="ml-2">
                              <p className="text-xs font-medium text-blue-900">
                                {article.author || "Anonymous"}
                              </p>
                              <p className="text-xs text-blue-900/60">
                                {article.createdAt
                                  ? new Date(
                                      article.createdAt.toDate()
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : "No date"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-blue-900/60">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {filteredArticles.length > visibleArticles && (
                <div className="text-center mt-16">
                  <button
                    onClick={loadMoreArticles}
                    className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <span>Load more articles</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
            Stay Updated with VBC Insights
          </h2>
          <p className="text-blue-900/70 mb-8">
            Join our community of healthcare leaders and receive our weekly
            digest of the latest VBC strategies and insights.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-blue-900/70">
            © {new Date().getFullYear()} VBC.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Articles;
