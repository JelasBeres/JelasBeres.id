import { getArticles } from "@/actions/articles";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";

export const metadata = {
  title: "Blog | JelasBeres.id",
  description: "Insights, updates, and thoughts from the JelasBeres team.",
};

export const revalidate = 0;

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="pt-24 pb-20 bg-background min-h-[80vh]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-sm text-green tracking-wider mb-4 block">
            [05] OUR BLOG
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6">
            Insights &amp; <span className="text-muted">Updates</span>
          </h1>
          <p className="font-sans text-muted text-lg">
            Thoughts, technical deep dives, and stories from our team building world-class digital products.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="py-20 text-center font-mono text-muted border border-border border-dashed">
            <p>Belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group border border-border bg-surface overflow-hidden hover:border-green transition-all flex flex-col"
              >
                <Link href={`/blog/${article.slug}`} className="block relative aspect-[16/10] bg-surface-hover overflow-hidden">
                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-muted">
                      No Image
                    </div>
                  )}
                </Link>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted mb-4">
                    <span className="flex items-center gap-1.5 uppercase text-green">
                      <Tag size={12} />
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {article.publishedAt ? format(new Date(article.publishedAt), 'MMM dd, yyyy') : 'Draft'}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-green transition-colors line-clamp-2">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="font-sans text-muted text-sm mb-6 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs font-medium text-foreground group-hover:text-green transition-colors mt-auto"
                  >
                    READ MORE <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
