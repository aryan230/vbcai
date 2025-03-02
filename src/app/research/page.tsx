import ComingSoon from "../components/CommingSoon";

export const metadata = {
  title: "Research - Coming Soon | VBCAI.org",
  description:
    "Our curated research and insights on value-based care is coming soon. Get notified when we launch our research section.",
};

export default function ResearchPage() {
  return (
    <ComingSoon
      title="Research"
      description="Our curated collection of value-based care research papers, studies, and data-driven insights is coming soon."
      timeframe="Fall 2025"
    />
  );
}
