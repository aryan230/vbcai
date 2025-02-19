export interface Author {
  id: string;
  name: string;
  date: string;
  avatar: string;
  role?: string;
  company?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: Author;
  image: string;
  category: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  tags?: string[];
}
