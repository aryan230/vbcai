"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";

const posts: BlogPost[] = [
  {
    title:
      "2030: Maya Louvière on IPOs, The No Code Movement & Offending People With The Future",
    category: "Design Journal",
    author: {
      name: "Amélie Laurent",
      avatar: "/api/placeholder/32/32",
    },
    image: "/api/placeholder/800/600",
    date: "20 Jan 2024",
  },
  // Add more posts as needed
];

export default function DesignJournal() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <span className="text-sm text-gray-600">Design Journal</span>
          <h1 className="text-4xl font-bold mt-2">
            Inside Design: Stories and interviews
          </h1>
          <p className="text-gray-600 mt-2">
            Subscribe for the latest design trends, design software and
            releases, and exclusive interviews with design leaders.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              post={post}
              variant={index === 0 ? "large" : "small"}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
