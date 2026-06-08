"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminCard from "@/components/admin/AdminCard";
import BlogForm from "@/components/admin/BlogForm";
import { fetchBlogPost, type AdminBlogPost } from "@/lib/admin-api";

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<AdminBlogPost | null>(null);

  useEffect(() => {
    fetchBlogPost(id)
      .then((r) => setPost(r.data))
      .catch(() => {});
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nextray-green border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title={`Edit: ${post.title}`}
        description={`Slug: ${post.slug}`}
      />
      <AdminCard>
        <BlogForm post={post} />
      </AdminCard>
    </div>
  );
}
