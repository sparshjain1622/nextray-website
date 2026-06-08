import Image from "next/image";
import Link from "next/link";
import { productPath, type ApiProduct } from "@/lib/products-api";

export default function ApiCategoryProductsList({
  products,
  categorySlug,
}: {
  products: ApiProduct[];
  categorySlug: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-card p-8 text-center md:p-12">
        <p className="text-white/60">
          No products in this category yet. Add products from the admin panel and
          assign them to this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const href = productPath(categorySlug, product.slug);
        const image =
          product.imageUnlit || "/images/products/6_watt_down_light.jpg";

        return (
          <Link
            key={product.id}
            href={href}
            className="group overflow-hidden rounded-xl border border-white/10 bg-card ring-1 ring-transparent transition-colors hover:border-nextray-green/40 hover:ring-nextray-green/20"
          >
            <div className="relative aspect-[4/3] bg-black/20">
              <Image
                src={image}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="border-t border-white/10 p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-nextray-green">
                {product.brand}
              </p>
              <h3 className="font-heading font-bold text-white group-hover:text-nextray-green">
                {product.title}
              </h3>
              {product.description && (
                <p className="mt-2 line-clamp-2 text-sm text-white/60">
                  {product.description}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
