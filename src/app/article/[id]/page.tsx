// src/app/article/[id]/page.tsx
"use client";

import ArticlePage from "@/app/components/ArticlePage";
import CTA from "@/app/components/CTA";
import Footer from "@/app/components/Footer";
import { useParams } from "next/navigation";

export default function ArticlePageRoute() {
  const params = useParams();
  const articleId = params.id as string;

  return (
    <>
      <ArticlePage articleId={articleId} />
      <CTA />
      <Footer />
    </>
  );
}
