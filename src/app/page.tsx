"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./lib/firebase";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import Image from "next/image";
import DesignBlog from "./components/DesignBlog";

export default function HomePage() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const articlesQuery = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(articlesQuery);
        const articlesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const navigateToArticle = (slug: string) => {
    router.push(`/${slug}`);
  };

  return (
    <>
      <DesignBlog />
    </>
  );
}
