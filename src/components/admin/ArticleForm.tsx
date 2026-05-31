"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createArticle, updateArticle, getArticleById } from "@/actions/articles";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ArticleForm({ articleId }: { articleId?: number }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!articleId);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "blog",
    isPublished: false,
  });

  useEffect(() => {
    if (articleId) {
      getArticleById(articleId).then((data) => {
        if (data) {
          setFormData({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            coverImage: data.coverImage || "",
            category: data.category,
            isPublished: data.isPublished,
          });
        }
        setIsLoading(false);
      });
    }
  }, [articleId]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData({
      ...formData,
      title: newTitle,
      slug: !articleId ? generateSlug(newTitle) : formData.slug,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const action = articleId
      ? () => updateArticle(articleId, formData)
      : () => createArticle(formData);

    const result = await action();

    if (result?.success) {
      router.push("/admin/blog");
    } else {
      setError(result?.error || "An error occurred");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 text-muted hover:text-foreground hover:bg-[#EBEBEB] rounded-sm transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              {articleId ? "Edit Article" : "New Article"}
            </h1>
            <p className="text-sm text-muted mt-1">
              {articleId ? "Update your article content" : "Create a new article for your blog"}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 border border-red-200 rounded-sm text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Article Title"
                  className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:border-green text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Excerpt
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary of the article..."
                  className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:border-green text-sm resize-none"
                />
                <p className="text-xs text-muted mt-1">
                  Used for SEO descriptions and article preview cards.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Content
                </label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-surface border border-border p-5 rounded-sm space-y-5">
              <h3 className="font-medium text-foreground border-b border-border pb-3">
                Publishing Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:border-green text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:border-green text-sm bg-surface"
                >
                  <option value="blog">Blog</option>
                  <option value="news">News</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="case-study">Case Study</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Cover Image
                </label>
                <div className="space-y-3">
                  {formData.coverImage ? (
                    <div className="relative aspect-video w-full border border-border rounded-sm overflow-hidden bg-surface-hover">
                      <img
                        src={formData.coverImage}
                        alt="Cover"
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: "" })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <ArrowLeft size={14} className="rotate-45" /> {/* Use as X */}
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-sm p-6 flex flex-col items-center justify-center bg-surface-hover">
                      <ImageIcon size={24} className="text-muted mb-2" />
                      <p className="text-xs text-muted text-center mb-3">
                        Upload a cover image
                      </p>
                      <label className="cursor-pointer bg-surface border border-border px-3 py-1.5 text-xs font-medium rounded-sm hover:bg-surface-hover transition-colors flex items-center gap-2">
                        {isUploading ? (
                          <><Loader2 size={12} className="animate-spin" /> Uploading...</>
                        ) : (
                          "Choose Image"
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                  )}
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="Or paste image URL..."
                    className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:border-green text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="w-11 h-6 bg-[#EBEBEB] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {formData.isPublished ? "Published" : "Draft"}
                  </span>
                </label>
              </div>

              <div className="pt-5 mt-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#111] text-white px-4 py-3 text-sm font-medium rounded-sm hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {isSubmitting ? "Saving..." : "Save Article"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
