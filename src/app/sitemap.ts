import { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all articles
  const articlesSnapshot = await getDocs(collection(db, "blogs"));
  const articles = articlesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Create sitemap entries
  const articleEntries = articles.map((article: any) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${article.slug}`,
    lastModified:
      article.updatedAt?.toISOString() || article.createdAt.toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Add static pages
  const staticPages = [
    {
      url: process.env.NEXT_PUBLIC_SITE_URL || "",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    // Add other static pages here
  ];

  return [...staticPages, ...articleEntries];
}
