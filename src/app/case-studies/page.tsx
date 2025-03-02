import React from "react";
import ComingSoon from "../components/CommingSoon";

export const metadata = {
  title: "Case Studies - Coming Soon | VBCAI.org",
  description:
    "Our comprehensive collection of value-based care case studies is coming soon. Get notified when we launch our case studies section.",
};

export default function CaseStudiesPage() {
  return (
    <ComingSoon
      title="Case Studies"
      description="Our comprehensive collection of real-world value-based care case studies from leading healthcare organizations is coming soon."
      timeframe="Summer 2025"
    />
  );
}
