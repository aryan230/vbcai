import { Article, Author, Category } from "../lib/types";

export const authors: Author[] = [
  {
    id: "1",
    name: "Amélie Laurent",
    date: "20 Jan 2024",
    avatar: "/placeholder/avatar-1.jpg",
    role: "Design Director",
    company: "Untitled UI",
  },
  {
    id: "2",
    name: "Alex Wilson",
    date: "17 Jan 2024",
    avatar: "/placeholder/avatar-2.jpg",
    role: "UX Researcher",
    company: "DesignCo",
  },
  {
    id: "3",
    name: "Sarah Chen",
    date: "15 Jan 2024",
    avatar: "/placeholder/avatar-3.jpg",
    role: "Product Designer",
    company: "TechStart",
  },
];

export const categories: Category[] = [
  { id: "1", name: "Design", slug: "design", count: 128 },
  { id: "2", name: "Product", slug: "product", count: 86 },
  { id: "3", name: "Software Engineering", slug: "engineering", count: 54 },
  { id: "4", name: "Customer Success", slug: "customer-success", count: 42 },
  { id: "5", name: "Leadership", slug: "leadership", count: 38 },
  { id: "6", name: "Management", slug: "management", count: 31 },
  { id: "7", name: "UX Research", slug: "ux-research", count: 28 },
  { id: "8", name: "UI Design", slug: "ui-design", count: 25 },
  { id: "9", name: "Innovation", slug: "innovation", count: 22 },
];

export const articles: Article[] = [
  {
    id: "1",
    title:
      "2030: Maya Louvière on IPOs, The No Code Movement & Offending People With The Future",
    excerpt:
      'Turns out predicting the future can offend people, even if it turn. In 2019, we interviewed Maya Sweilman who predicted, "Learning to code will eventually be as useful as learning Ancient Greek." Today, learning to code is being over-promised as a silver bullet for long-term career success. We chatted to her about her 2030 predictions.',
    author: authors[0],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&h=600",
    category: "Design",
    readTime: "8 min read",
    publishedAt: "2024-01-20",
    featured: true,
    tags: ["Future of Design", "No Code", "Technology"],
  },
  {
    id: "2",
    title: "Cognitive Dissonance Theory: Crash Course for UX Designers",
    excerpt:
      "We all like to think of ourselves in certain ways. We consider ourselves to be truthful, hard-working, health-conscious, and in control of our decisions. But what happens when our actions don't align with these beliefs?",
    author: authors[1],
    image: "/placeholder/article-2.jpg",
    category: "UX Research",
    readTime: "6 min read",
    publishedAt: "2024-01-17",
    tags: ["UX Design", "Psychology", "Research"],
  },
  {
    id: "3",
    title:
      "The Evolution of Design Systems: From Style Guides to Living Documentation",
    excerpt:
      "Design systems have come a long way from simple style guides. Learn how modern teams are building and maintaining scalable design systems that evolve with their products.",
    author: authors[2],
    image: "/placeholder/article-3.jpg",
    category: "Design",
    readTime: "10 min read",
    publishedAt: "2024-01-15",
    tags: ["Design Systems", "Documentation", "Collaboration"],
  },
];

export const navigation = [
  {
    name: "Products",
    items: ["Design System", "Prototyping", "Development", "Collaboration"],
  },
  {
    name: "Solutions",
    items: ["Enterprise", "Startups", "Teams", "Education"],
  },
  {
    name: "Resources",
    items: ["Blog", "Documentation", "Guides", "Help Center"],
  },
  {
    name: "Company",
    items: ["About", "Careers", "Press", "Contact"],
  },
];
