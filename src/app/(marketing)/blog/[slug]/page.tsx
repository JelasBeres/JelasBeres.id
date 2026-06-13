import { getArticleBySlug, getArticles } from "@/actions/articles";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";

import ShareButtons from "@/components/blog/ShareButtons";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);
  
  if (!article) {
    return {
      title: "Article Not Found | JelasBeres.id",
    };
  }

  return {
    title: `${article.title} | JelasBeres.id`,
    description: article.excerpt,
    openGraph: {
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-20 md:pt-32 pb-16 bg-background min-h-[80vh]">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[10px] text-muted hover:text-green transition-colors mb-6 uppercase tracking-wider"
        >
          <ArrowLeft size={12} /> BACK TO BLOG
        </Link>

        <header className="mb-6 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[10px] font-mono text-muted mb-4">
            <span className="flex items-center gap-1 uppercase text-green bg-green/10 px-2 py-0.5 rounded-sm">
              <Tag size={10} />
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {article.publishedAt ? format(new Date(article.publishedAt), 'MMMM dd, yyyy') : 'Draft'}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl md:text-4xl text-foreground leading-tight mb-4 uppercase tracking-tight">
            {article.title}
          </h1>

          <p className="font-sans text-sm md:text-base text-muted leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
        </header>

        {article.coverImage && (
          <div className="relative aspect-[21/9] w-full mb-8 border border-border bg-surface overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div 
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none prose-invert font-sans text-[#EAEAEA]
          prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
          prose-a:text-green hover:prose-a:text-green/80
          prose-img:rounded-md prose-img:border prose-img:border-border"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <ShareButtons title={article.title} slug={article.slug} />
      </div>
    </div>
  );
}
