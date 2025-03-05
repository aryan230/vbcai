import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ArrowRight, Clock, ArrowUpRight, Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

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

function ArticleGrid() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleArticles, setVisibleArticles] = useState(6);

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

  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="h-96 rounded-3xl bg-slate-100 animate-pulse"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl overflow-hidden"
              >
                <div className="h-52 bg-slate-100 animate-pulse"></div>
                <div className="p-6 space-y-4 bg-white border border-slate-100">
                  <div className="h-6 bg-slate-100 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-1/2 mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Featured Article */}
      {featuredArticle && (
        <section aria-label="Featured article">
          <Link href={`/${featuredArticle.slug}`} className="block">
            <article className="group relative grid md:grid-cols-2 gap-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl p-6 md:p-10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative z-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold tracking-wide uppercase rounded-full">
                    Featured
                  </span>
                  <span className="text-slate-500 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {featuredArticle.createdAt?.toDate
                      ? format(
                          featuredArticle.createdAt.toDate(),
                          "MMM d, yyyy"
                        )
                      : "Recent"}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-blue-700 transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-slate-700 mb-8 text-lg leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
                      <span className="text-blue-700 font-semibold text-lg">
                        {featuredArticle.author.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-slate-900">
                        {featuredArticle.author}
                      </p>
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{featuredArticle.readTime} read</span>
                      </div>
                    </div>
                  </div>

                  <span className="hidden md:flex items-center text-blue-600 font-medium">
                    <span className="mr-2 text-sm">Read article</span>
                    <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-[1.02] transition-all duration-500">
                {featuredArticle.images?.[0] ? (
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    <img
                      src={featuredArticle.images[0]}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                    <span className="text-white text-xl font-medium">
                      {featuredArticle.title.charAt(0)}
                    </span>
                  </div>
                )}

                {featuredArticle.category && (
                  <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm">
                    {featuredArticle.category}
                  </span>
                )}
              </div>
            </article>
          </Link>
        </section>
      )}

      {/* Articles Section Title */}
      <section aria-label="Latest articles" className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Latest Articles
          </h2>
          <div className="hidden md:flex space-x-2">
            {/* We could add category filters here in the future */}
          </div>
        </div>

        {/* Regular Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {regularArticles.slice(0, visibleArticles).map((article) => (
            <Link key={article.id} href={`/${article.slug}`}>
              <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1">
                <div className="aspect-[16/10] relative overflow-hidden">
                  {article.images?.[0] ? (
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <img
                        src={article.images[0]}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <span className="text-slate-500 text-xl font-medium">
                        {article.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  {article.category && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm">
                      {article.category}
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4 text-xs text-slate-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <time>
                      {article.createdAt?.toDate
                        ? format(article.createdAt.toDate(), "MMM d, yyyy")
                        : "Recent"}
                    </time>
                    <span className="mx-2 text-slate-300">•</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h3>

                  <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center mt-auto pt-4 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                      <span className="text-blue-700 font-medium text-sm">
                        {article.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900 flex-grow">
                      {article.author}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-blue-600 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Load More Button */}
      {regularArticles.length > visibleArticles && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleArticles((prev) => prev + 6)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-blue-700 font-medium rounded-full hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 shadow-sm"
          >
            <span>View more articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleGrid;
