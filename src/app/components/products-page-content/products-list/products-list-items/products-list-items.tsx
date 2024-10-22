"use client";

import ProductCard from "@/app/components/product-card/product-card";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "../../../../../../next-type-models";

type Props = {
  products: Product[];
  itemsPerPage: number;
};

const ProductsListItems = ({ products, itemsPerPage }: Props) => {


  return (
    <div className="flex flex-wrap gap-2">
      {products.map((product: Product) => {
        return (
          <div
            key={product.id}
            className="w-full mx-auto xs:w-[calc(50%-4px)] max-w-[300px] xs:mx-0 sm:w-full sm:mx-auto md:w-[calc(50%-4px)] md:mx-0 lg:w-[calc(33%-4px)] blgxl:w-[calc(25%-6px)]"
          >
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsListItems;
