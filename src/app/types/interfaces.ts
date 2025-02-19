interface BlogPost {
  title: string;
  subtitle?: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  date?: string;
}
