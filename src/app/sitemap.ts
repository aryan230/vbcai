import { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

interface Article {
  id: string;
  slug: string;
  createdAt: any;
  updatedAt?: any;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get base URL from environment variable or use a default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  // Fetch all articles
  const articlesSnapshot = await getDocs(collection(db, "blogs"));
  const articles = articlesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Article[];

  // Create sitemap entries
  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug || article.id}`,
    lastModified:
      article.updatedAt?.toDate?.()?.toISOString() ||
      article.createdAt?.toDate?.()?.toISOString() ||
      new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Add static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    // Add other static pages here
  ];

  return [...staticPages, ...articleEntries];
}
