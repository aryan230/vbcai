"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      className="w-full p-4 flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="text-xl font-bold">
        {pathname.includes("snazzyblog") ? "snazzyblog" : "Untitled UI"}
      </Link>
      <nav className="flex gap-4">
        <Link href="/" className="hover:opacity-80">
          Home
        </Link>
        <Link href="#" className="hover:opacity-80">
          Products
        </Link>
        <Link href="#" className="hover:opacity-80">
          Solutions
        </Link>
        <button className="px-4 py-2 bg-black text-white rounded-md">
          Get started
        </button>
      </nav>
    </motion.header>
  );
}
