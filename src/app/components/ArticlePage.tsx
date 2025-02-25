"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import {
  Clock,
  Calendar,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark,
  Copy,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
} from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Header from "./Header";

interface ArticlePageProps {
  articleId: string;
}

export default function ArticlePage({ articleId }: ArticlePageProps) {
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const shareButtonRef = useRef<HTMLButtonElement>(null);

  // URL to share
  const articleUrl = typeof window !== "undefined" ? window.location.href : "";

  // Function to handle opening the share modal
  const handleOpenShareModal = () => {
    if (shareButtonRef.current) {
      const rect = shareButtonRef.current.getBoundingClientRect();
      setModalPosition({
        x: rect.right + 20, // Position modal to the right of the button
        y: rect.top - 100, // Align top of modal with button
      });
      setShowShareModal(true);
    }
  };

  useEffect(() => {
    async function fetchArticle() {
      try {
        const docRef = doc(db, "blogs", articleId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No article found with this ID");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    }

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  // Function to copy article link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Functions for sharing
  const shareViaWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${article.title} - ${articleUrl}`
      )}`,
      "_blank"
    );
    setShowShareModal(false);
  };

  const shareViaFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
    setShowShareModal(false);
  };

  const shareViaTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${article.title} - ${articleUrl}`
      )}`,
      "_blank"
    );
    setShowShareModal(false);
  };

  const shareViaLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
    setShowShareModal(false);
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      article.title
    )}&body=${encodeURIComponent(`Check out this article: ${articleUrl}`)}`;
    setShowShareModal(false);
  };

  const shareViaReddit = () => {
    window.open(
      `https://www.reddit.com/submit?url=${encodeURIComponent(
        articleUrl
      )}&title=${encodeURIComponent(article.title)}`,
      "_blank"
    );
    setShowShareModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-blue-200 rounded mb-4"></div>
            <div className="h-4 w-40 bg-blue-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <ArrowLeft size={16} />
            <span>Go back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Include the Header component */}
      <Header />

      {/* Navigation breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          <span>Back to articles</span>
        </button>
      </div>

      {/* Article content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Sticky share bar - visible on desktop */}
        <div className="hidden lg:flex flex-col fixed left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 space-y-3">
          <button
            ref={shareButtonRef}
            onClick={handleOpenShareModal}
            className="p-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            aria-label="Share article"
          >
            <Share2 size={18} />
          </button>
          <button
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Save article"
          >
            <Bookmark size={18} className="text-gray-700" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Category and tags */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                {article.category}
              </span>
              {article.tags &&
                article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>

            {/* Article metadata */}
            <div className="flex items-center text-gray-600 gap-6 border-b border-gray-200 pb-6">
              {/* Author info */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-800">
                    {typeof article.author === "string"
                      ? article.author.charAt(0)
                      : article.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {typeof article.author === "string"
                      ? article.author
                      : article.author.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {format(article.createdAt.toDate(), "MMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5 text-gray-500" />
                <span className="text-sm">{article.readTime}</span>
              </div>
            </div>

            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] relative">
              {article.images?.[0] ? (
                <Image
                  src={article.images[0]}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-900 to-blue-600" />
              )}
            </div>

            {/* Article content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {article.content || "No content available."}
              </ReactMarkdown>
            </div>

            {/* Article footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 mt-12">
              <div className="flex flex-wrap gap-3">
                <span className="text-sm text-gray-600 font-medium">Tags:</span>
                {article.tags &&
                  article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>

              {/* Mobile share buttons */}
              <div className="flex items-center gap-3 lg:hidden">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Share2 size={18} className="text-gray-700" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Bookmark size={18} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar column */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Author card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">About the author</h3>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-800 text-xl">
                      {typeof article.author === "string"
                        ? article.author.charAt(0)
                        : article.author.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {typeof article.author === "string"
                        ? article.author
                        : article.author.name}
                    </p>
                    {typeof article.author !== "string" &&
                      article.author.role && (
                        <p className="text-sm text-gray-600">
                          {article.author.role}, {article.author.company}
                        </p>
                      )}
                  </div>
                </div>
                <p className="mt-4 text-gray-600 text-sm">
                  {typeof article.author !== "string" && article.author.bio
                    ? article.author.bio
                    : "Content creator passionate about design, technology, and creative solutions."}
                </p>
              </div>

              {/* Related tags */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Related Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags &&
                    article.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition-colors">
                    #design
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition-colors">
                    #creative
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowShareModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                position: "fixed",
                left: `${modalPosition.x}px`,
                top: `${modalPosition.y}px`,
                transform: "none",
              }}
              className="bg-white rounded-2xl p-6 z-50 w-[90%] max-w-md shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Share this article</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Share via</p>
                <div className="grid grid-cols-4 gap-4">
                  <button
                    onClick={shareViaWhatsapp}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-green-50"
                  >
                    <div className="bg-green-500 text-white p-3 rounded-full mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                      </svg>
                    </div>
                    <span className="text-xs">WhatsApp</span>
                  </button>

                  <button
                    onClick={shareViaFacebook}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-blue-50"
                  >
                    <div className="bg-blue-600 text-white p-3 rounded-full mb-2">
                      <Facebook size={16} />
                    </div>
                    <span className="text-xs">Facebook</span>
                  </button>

                  <button
                    onClick={shareViaTwitter}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-blue-50"
                  >
                    <div className="bg-blue-400 text-white p-3 rounded-full mb-2">
                      <Twitter size={16} />
                    </div>
                    <span className="text-xs">Twitter</span>
                  </button>

                  <button
                    onClick={shareViaLinkedIn}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-blue-50"
                  >
                    <div className="bg-blue-800 text-white p-3 rounded-full mb-2">
                      <Linkedin size={16} />
                    </div>
                    <span className="text-xs">LinkedIn</span>
                  </button>

                  <button
                    onClick={shareViaEmail}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100"
                  >
                    <div className="bg-gray-700 text-white p-3 rounded-full mb-2">
                      <Mail size={16} />
                    </div>
                    <span className="text-xs">Email</span>
                  </button>

                  <button
                    onClick={shareViaReddit}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-orange-50"
                  >
                    <div className="bg-orange-600 text-white p-3 rounded-full mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                      </svg>
                    </div>
                    <span className="text-xs">Reddit</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Or copy link</p>
                <div className="flex">
                  <input
                    type="text"
                    value={articleUrl}
                    readOnly
                    className="flex-1 p-3 border border-r-0 rounded-l-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`p-3 rounded-r-lg flex items-center justify-center ${
                      copySuccess ? "bg-green-500" : "bg-blue-600"
                    } text-white`}
                  >
                    {copySuccess ? (
                      <span className="text-sm font-medium">Copied!</span>
                    ) : (
                      <>
                        <Copy size={16} className="mr-1.5" />
                        <span className="text-sm font-medium">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
