"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";

const posts: BlogPost[] = [
  {
    title: "How to get the perfect look while also being practical",
    category: "Fashion",
    author: {
      name: "Judith Watson",
      avatar: "/api/placeholder/32/32",
    },
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&h=600",
    subtitle:
      "Looking perfect does not mean dressing smartly but comfortably and conveniently",
  },
  // Add more posts as needed
];

export default function SnazzyBlog() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.article
            className="md:col-span-2 bg-white rounded-3xl p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm uppercase tracking-wider">Fashion</span>
            <h1 className="text-4xl font-bold mt-4 leading-tight">
              {posts[0].title}
            </h1>
            <div className="flex items-center mt-6">
              <Image
                src={posts[0].author.avatar}
                alt={posts[0].author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="ml-2 text-sm">by {posts[0].author.name}</span>
            </div>
          </motion.article>
          <div className="md:col-span-1 space-y-6">
            {posts.slice(1).map((post, index) => (
              <BlogCard key={index} post={post} variant="small" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
