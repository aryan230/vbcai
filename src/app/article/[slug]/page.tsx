"use client";

import ArticlePage from "@/app/components/ArticlePage";
import { useParams } from "next/navigation";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: ArticlePageProps) {
  const { slug } = useParams();
  return <ArticlePage slug={slug as string} />;
}
