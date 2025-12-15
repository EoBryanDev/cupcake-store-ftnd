"use client";

import { IProduct } from "@/src/interface/IProductVariant";
import ProductItem from "./product-item";

interface IProductsListProps {
  products: IProduct[];
}

export const ProductList = ({ products }: IProductsListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex w-full gap-4 overflow-x-auto px-5">
        {products?.map((product) => (
          <ProductItem key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};
