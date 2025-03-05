export default function ArticleSchema({ article }: { article: any }) {
  const getISOString = (timestamp: any) => {
    if (!timestamp) return new Date().toISOString();
    // Handle Firestore Timestamp
    if (timestamp.toDate) return timestamp.toDate().toISOString();
    // Handle regular Date objects
    if (timestamp instanceof Date) return timestamp.toISOString();
    // Handle ISO strings
    if (typeof timestamp === "string") return timestamp;
    // Fallback
    return new Date().toISOString();
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seo?.description || article.content.substring(0, 160),
    image: article.images?.[0],
    author: {
      "@type": "Person",
      name:
        typeof article.author === "string"
          ? article.author
          : article.author.name,
    },
    datePublished: getISOString(article.createdAt),
    dateModified: getISOString(article.updatedAt || article.createdAt),
    publisher: {
      "@type": "Organization",
      name: "Your Blog Name",
      logo: {
        "@type": "ImageObject",
        url: "https://yourdomain.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : "",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
