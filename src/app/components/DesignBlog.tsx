// components/DesignBlog.tsx
"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  Clock,
  Tag,
  ArrowRight,
  BarChart2,
  Users,
  Activity,
  Search,
  Menu,
} from "lucide-react";
import { navigation, categories, articles } from "../data/content";

const DesignBlog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const featuredArticle = articles.find((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Elegant Header with Medical Blue Gradient */}

      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Top Bar */}
          <div className="border-b border-gray-100 py-2 px-6">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-6">
                <a>VBC Healthcare Insights</a>
                <span>|</span>
                <a>Subscribe to our newsletter</a>
              </div>
              <div className="flex items-center space-x-4">
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
          <div className="py-6 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-12">
                <div className="flex items-center space-x-3">
                  <Activity className="w-8 h-8 text-blue-600" />
                  <span className="font-black text-xl bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
                    VBC.ai
                  </span>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Latest
                  </a>
                  <div className="relative group">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                      <span>Topics</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute hidden group-hover:block w-56 bg-white shadow-lg rounded-lg py-2 mt-1">
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

              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <button className="hidden md:block px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
                <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="border-t border-gray-100 py-4 px-6">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Categories Bar */}
          <div className="overflow-x-auto border-t border-gray-100">
            <div className="px-6 py-3 flex items-center space-x-6 text-sm whitespace-nowrap">
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

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium mb-6">
            Value-Based Care Insights
          </span>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
            Transforming Healthcare Through Value-Based Care
          </h1>
          <p className="text-blue-900/80 text-lg">
            Stay informed about the latest trends, strategies, and success
            stories in value-based care delivery and population health
            management.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Users,
              label: "Population Health",
              value: "85%",
              desc: "Patient Engagement",
            },
            {
              icon: BarChart2,
              label: "Quality Metrics",
              value: "32%",
              desc: "Cost Reduction",
            },
            {
              icon: Activity,
              label: "Outcomes",
              value: "94%",
              desc: "Patient Satisfaction",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <stat.icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {stat.value}
                    </span>
                    <span className="text-sm text-blue-900/60">
                      {stat.desc}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Article Hero */}
        {featuredArticle && (
          <div className="relative rounded-2xl overflow-hidden mb-24 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-indigo-100 to-sky-100 animate-gradient opacity-90" />
            <div className="relative p-12 md:p-16">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="px-3 py-1 bg-blue-600/10 rounded-full text-sm font-medium text-blue-700">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center text-sm text-blue-900/70">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredArticle.readTime}
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-6 text-blue-900 group-hover:text-blue-700 transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-blue-900/80 text-lg mb-8 max-w-2xl">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600/10 mr-4" />
                    <div>
                      <p className="font-medium text-blue-900">
                        {featuredArticle.author.name}
                      </p>
                      <p className="text-sm text-blue-900/70">
                        {featuredArticle.author.role}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                    <span>Read article</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article, index) => (
            <article
              key={article.id}
              className={`group rounded-2xl overflow-hidden bg-white border border-blue-100 shadow-sm hover:shadow-lg transition-all ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-r animate-gradient ${
                    index % 2 === 0
                      ? "from-blue-100 via-indigo-100 to-sky-100"
                      : "from-sky-100 via-blue-100 to-indigo-100"
                  }`}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-blue-900/70">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-900 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-blue-900/70 mb-6 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 mr-3" />
                    <div>
                      <p className="font-medium text-sm text-blue-900">
                        {article.author.name}
                      </p>
                      <p className="text-xs text-blue-900/70">
                        {article.author.date}
                      </p>
                    </div>
                  </div>
                  {article.tags && (
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                        {article.tags[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <section className="my-24 px-6 py-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
              Stay Updated with VBC Insights
            </h2>
            <p className="text-blue-900/70 mb-8">
              Join healthcare leaders and receive our weekly digest of VBC
              strategies, case studies, and analytics insights.
            </p>
            <div className="flex max-w-md mx-auto space-x-4">
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

        {/* Key Benefits Section */}
        <section className="my-24">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
            Why Value-Based Care Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Better Patient Outcomes",
                description:
                  "Focus on quality over quantity leads to improved health outcomes and patient satisfaction.",
                icon: "❤️",
              },
              {
                title: "Cost Effectiveness",
                description:
                  "Reduced healthcare costs through preventive care and efficient resource utilization.",
                icon: "💰",
              },
              {
                title: "Data-Driven Decisions",
                description:
                  "Leverage analytics and AI to make informed clinical and operational decisions.",
                icon: "📊",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all bg-white"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-blue-900/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories Carousel */}
        <section className="my-24 bg-blue-50/50 py-16 px-6 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
              Success Stories in VBC Implementation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100"></div>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900">
                      Memorial Healthcare
                    </h3>
                    <p className="text-blue-900/70">
                      30% Reduction in Readmissions
                    </p>
                  </div>
                </div>
                <p className="text-blue-900/80">
                  "Implementing VBC strategies helped us significantly improve
                  patient outcomes while reducing operational costs."
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100"></div>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900">
                      Pacific Medical Group
                    </h3>
                    <p className="text-blue-900/70">25% Cost Reduction</p>
                  </div>
                </div>
                <p className="text-blue-900/80">
                  "Our transition to value-based care has revolutionized how we
                  deliver healthcare services to our community."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
              Ready to Transform Your Healthcare Delivery?
            </h2>
            <p className="text-blue-900/70 mb-8">
              Join leading healthcare organizations in their journey towards
              value-based care excellence.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-blue-600" />
                <span className="font-black text-lg bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
                  VBC.ai
                </span>
              </div>
              <p className="text-sm text-blue-900/70">
                Empowering healthcare organizations with data-driven insights
                for better value-based care delivery.
              </p>
              <div className="flex space-x-4">
                {["twitter", "linkedin", "facebook"].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center hover:bg-blue-50 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-blue-900 mb-4">Solutions</h3>
              <ul className="space-y-3">
                {[
                  "Population Health",
                  "Care Management",
                  "Risk Analytics",
                  "Quality Metrics",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-blue-900/70 hover:text-blue-900"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                {[
                  "Blog",
                  "Case Studies",
                  "Webinars",
                  "Research Papers",
                  "Documentation",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-blue-900/70 hover:text-blue-900"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-900 mb-4">Company</h3>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Careers",
                  "Contact",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-blue-900/70 hover:text-blue-900"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-blue-100">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-blue-900/70">
                © {new Date().getFullYear()} VBC.ai. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-sm text-blue-900/70 hover:text-blue-900"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-blue-900/70 hover:text-blue-900"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-sm text-blue-900/70 hover:text-blue-900"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DesignBlog;
