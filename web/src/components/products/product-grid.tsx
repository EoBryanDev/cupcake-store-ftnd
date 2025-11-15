"use client";
import { IProduct } from "@/src/interface/IProductVariant";
import ProductItem from "./product-item";

interface IProductGridProps {
  products: IProduct[];
  className?: string;
}

const ProductGrid = ({ products, className }: IProductGridProps) => {
  return (
    <div
      className={`grid w-full gap-6 ${className ?? ""}`}
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      }}
    >
      {products.map((product) => (
        <ProductItem key={product.productId} product={product} />
      ))}
    </div>
  );
};

export { ProductGrid };
