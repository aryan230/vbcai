"use client";

import ArticlePage from "../components/ArticlePage";
import { useParams } from "next/navigation";

export default function Page() {
  const { slug } = useParams();
  return <ArticlePage slug={slug as string} />;
}
