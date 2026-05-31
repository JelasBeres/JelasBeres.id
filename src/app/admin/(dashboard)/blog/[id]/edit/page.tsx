import ArticleForm from "@/components/admin/ArticleForm";

export const metadata = {
  title: "Edit Article | Admin",
};

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ArticleForm articleId={Number(resolvedParams.id)} />;
}
