"use client";

import React, { useEffect, useState } from "react";
import ProductPageContentImages from "./product-page-content-images/product-page-content-images";
import ProductPageContentInformation from "./product-page-content-information/product-page-content-information";
import ProductPageContentTabs from "./product-page-content-tabs/product-page-content-tabs";
import ProductPageContentRelatedProducts from "./product-page-content-related-products/product-page-content-related-products";
import { getSizesForColor, getUniqueColors } from "@/app/lib/functions";
import { Product } from "../../../../next-type-models";

type Props = {
  product: Product;
  relatedProducts: Product[];
};

const ProductPageContent = ({ product, relatedProducts }: Props) => {
  const { stock, images, title, description, comments, features } = product;

  const uniqueColors = getUniqueColors(stock!);

  const [selectedColor, setSelectedColor] = useState<string>(
    uniqueColors?.[0].persian!
  );
  const [selectedSize, setSelectedSize] = useState<string>(stock?.[0].size!);

  const sizes = getSizesForColor(stock!, selectedColor);

  useEffect(() => {
    setSelectedSize(sizes[0]);
  }, [selectedColor, sizes]);

  const handleColorSelection = (colorName: string) => {
    setSelectedColor(colorName);
  };
  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <section className="w-full mt-4 sm:mt-10">
      <div className="flex flex-col gap-7 md:flex-row">
        {/* images */}
        <ProductPageContentImages images={images?.slice(0,3)!} title={title} />
        {/* content - information */}
        <ProductPageContentInformation
          product={product!}
          selectedColor={selectedColor}
          handleColorSelection={handleColorSelection}
          selectedSize={selectedSize}
          handleSizeSelection={handleSizeSelection}
        />
      </div>
      <ProductPageContentTabs
        description={description}
        commentItems={comments!}
        features={features!}
      />
      <ProductPageContentRelatedProducts relatedProducts={relatedProducts} />
    </section>
  );
};

export default ProductPageContent;
