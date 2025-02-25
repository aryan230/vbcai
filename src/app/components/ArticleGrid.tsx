import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ArrowRight, Clock, ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import Link from "next/link";

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

function ArticleGrid() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleArticles, setVisibleArticles] = useState(4);

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
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12">
      {/* Featured Article */}
      {featuredArticle && (
        <Link href={`/article/${featuredArticle.id}`}>
          <article className="group relative grid md:grid-cols-2 gap-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 overflow-hidden">
            <div className="relative z-10 flex flex-col justify-center">
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full mb-6 w-fit">
                Featured Article
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 group-hover:text-blue-600 transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-blue-700/70 mb-6 line-clamp-2">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {featuredArticle.author.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm text-blue-900">
                      {featuredArticle.author}
                    </p>
                    <p className="text-sm text-blue-900/60">
                      {featuredArticle.readTime} read
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-blue-600 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {featuredArticle.images?.[0] && (
                <img
                  src={featuredArticle.images[0]}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
          </article>
        </Link>
      )}

      {/* Regular Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularArticles.slice(0, visibleArticles).map((article) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/9] relative overflow-hidden">
                {article.images?.[0] && (
                  <img
                    src={article.images[0]}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-blue-900/70 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-blue-50">
                  <div className="flex items-center">
                    <span className="text-sm text-blue-900 font-medium">
                      {article.author}
                    </span>
                    <span className="mx-2 text-blue-200">•</span>
                    <span className="text-sm text-blue-900/60">
                      {article.readTime}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-blue-600 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {regularArticles.length > visibleArticles && (
        <div className="text-center">
          <button
            onClick={() => setVisibleArticles((prev) => prev + 3)}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
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
