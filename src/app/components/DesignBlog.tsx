// components/DesignBlog.tsx
"use client";
import React, { useState, useEffect } from "react";
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
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { navigation, categories, articles } from "../data/content";
import Link from "next/link";
import Header from "./Header";
import ArticleGrid from "./ArticleGrid";
import CTA from "./CTA";
import Footer from "./Footer";
import CTA2 from "./CTA2";

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
}

const DesignBlog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(3);

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Get the latest article as featured
  const featuredArticle = articles[0];
  // Get remaining articles
  const regularArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Elegant Header with Medical Blue Gradient */}
      <Header />
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
        {/* // Inside Featured Article Hero section */}
        {/* {featuredArticle && (
          <div className="mb-24">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                {featuredArticle.images?.[0] && (
                  <img
                    src={featuredArticle.images[0]}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80 mix-blend-multiply" />
              </div>
              <div className="relative px-8 py-16 md:px-12 md:py-20">
                <div className="max-w-3xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                      {featuredArticle.category}
                    </span>
                    <div className="flex items-center text-sm text-white/80">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {featuredArticle.readTime}
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-white/90 text-lg mb-8 max-w-2xl line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mr-4 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {featuredArticle.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {featuredArticle.author}
                        </p>
                        <p className="text-sm text-white/80">
                          {new Date(
                            featuredArticle.createdAt.toDate()
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/article/${featuredArticle.id}`}
                      className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-900 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm group"
                    >
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
        {/* Article Grid */}
        <ArticleGrid />
        {/* Newsletter Section */}
        <CTA />
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
        {/* <section className="my-24 bg-blue-50/50 py-16 px-6 rounded-3xl">
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
        </section> */}
        {/* CTA Section */}
        <CTA2 />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default DesignBlog;
