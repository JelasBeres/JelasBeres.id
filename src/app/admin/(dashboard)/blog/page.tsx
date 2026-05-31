import { getArticles, deleteArticle } from "@/actions/articles";
import Link from "next/link";
import { Plus, Edit, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = {
  title: "Blog Management | Admin",
};

export default async function BlogAdminPage() {
  const articles = await getArticles(true);

  async function handleDelete(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    if (id) {
      await deleteArticle(id);
      revalidatePath("/admin/blog");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Blog Articles</h1>
          <p className="text-sm text-muted mt-1">Manage your blog articles.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-[#111] text-white px-4 py-2 text-sm font-medium rounded-sm hover:bg-[#333] transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8F8F8] border-b border-border text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Article</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBEB]">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    No articles found. Create one to get started.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-surface-hover transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-surface-hover overflow-hidden relative border border-border shrink-0">
                          {article.coverImage ? (
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                              No Img
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{article.title}</div>
                          <div className="text-xs text-muted font-mono mt-0.5">/{article.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted capitalize">{article.category}</td>
                    <td className="px-4 py-3">
                      {article.isPublished ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          <CheckCircle2 size={12} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          <XCircle size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/${article.id}/edit`}
                          className="p-1.5 text-muted hover:text-foreground hover:bg-[#EBEBEB] rounded-sm transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <form action={handleDelete}>
                          <input type="hidden" name="id" value={article.id} />
                          <DeleteButton />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
