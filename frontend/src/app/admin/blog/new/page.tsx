import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminCard from "@/components/admin/AdminCard";
import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminPageHeader
        title="New Blog Post"
        description="Create a post with SEO title, meta description, keywords and Open Graph image."
      />
      <AdminCard>
        <BlogForm />
      </AdminCard>
    </div>
  );
}
