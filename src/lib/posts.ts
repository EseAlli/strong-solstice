export interface Post {
  url: string;
  frontmatter: {
    title: string;
    pubDate: string | Date;
    description: string;
    author: string;
    image: { url: string; alt: string };
    tags: string[];
  };
}

export function getPosts(): Post[] {
  const modules = import.meta.glob<Post>("../pages/posts/*.md", { eager: true });
  return Object.values(modules).sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate).getTime() -
      new Date(a.frontmatter.pubDate).getTime(),
  );
}

export function shortDate(date: string | Date): string {
  return new Date(date).toISOString().slice(0, 10).replaceAll("-", "/");
}

export function longDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function isoDate(date: string | Date): string {
  return new Date(date).toISOString();
}
