import { IProduct } from "@/src/interface/IProductVariant";
import { ProductCard } from "./product-card";

interface IProductGridProps {
  products: IProduct[];
}

const ProductGrid = ({ products }: IProductGridProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-muted-foreground text-center">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
};

export { ProductGrid };
