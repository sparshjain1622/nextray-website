import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminCard from "@/components/admin/AdminCard";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <AdminPageHeader
        title="Add Product"
        description="Create a new product with SEO slug, images and tags."
      />
      <AdminCard>
        <ProductForm />
      </AdminCard>
    </div>
  );
}
