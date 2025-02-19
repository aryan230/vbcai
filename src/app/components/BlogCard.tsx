"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
  variant?: "large" | "small";
}

export default function BlogCard({ post, variant = "large" }: BlogCardProps) {
  return (
    <motion.article
      className={`relative overflow-hidden rounded-xl ${
        variant === "large" ? "col-span-2 row-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-full min-h-[300px]">
        <Image
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&h=600"
          alt={post.title}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <span className="text-sm uppercase tracking-wider">
            {post.category}
          </span>
          <h2 className="text-2xl font-bold mt-2">{post.title}</h2>
          {post.subtitle && (
            <p className="mt-2 text-gray-200">{post.subtitle}</p>
          )}
          <div className="flex items-center mt-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="ml-2">{post.author.name}</span>
            {post.date && <span className="ml-2">• {post.date}</span>}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
