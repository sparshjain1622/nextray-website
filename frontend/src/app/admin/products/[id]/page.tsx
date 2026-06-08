"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminCard from "@/components/admin/AdminCard";
import ProductForm from "@/components/admin/ProductForm";
import { fetchProduct, type AdminProduct } from "@/lib/admin-api";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<AdminProduct | null>(null);

  useEffect(() => {
    fetchProduct(id)
      .then((r) => setProduct(r.data))
      .catch(() => {});
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nextray-green border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title={`Edit: ${product.title}`}
        description={`Slug: ${product.slug}`}
      />
      <AdminCard>
        <ProductForm product={product} />
      </AdminCard>
    </div>
  );
}
