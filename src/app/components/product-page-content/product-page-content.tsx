"use client";

import React, { useEffect, useState } from "react";
import ProductPageContentImages from "./product-images/product-images";
import ProductPageContentInformation from "./product-page-information/product-page-information";
import ProductPageContentTabs from "./product-page-tabs/product-page-tabs";
import ProductPageContentRelatedProducts from "./related-products/related-products";
import { getSizesForColor, getUniqueColors } from "@/app/lib/functions";
import { Product } from "../../../../next-type-models";
import { CommentWithAuthor } from "@/app/actions/comment-actions/get-comments-action";

type Props = {
  product: Product;
  relatedProducts: Product[];
  comments: CommentWithAuthor[] | undefined;
};

const ProductPageContent = ({ product, relatedProducts,comments }: Props) => {
  const { stock, images, title, description, features } = product;

  const uniqueColors = getUniqueColors(stock!);

  const [selectedColor, setSelectedColor] = useState<string>(
    uniqueColors?.[0].persian!
  );
  const [selectedSize, setSelectedSize] = useState<string>(stock?.[0].size!);

  const handleColorSelection = (colorName: string) => {   
    const sizes = getSizesForColor(stock!, colorName);
    setSelectedSize(sizes[0]);
    setSelectedColor(colorName);
  };
  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };


  return (
    <section className="w-full mt-4 sm:mt-10">
      <div className="flex flex-col gap-7 md:flex-row">
        {/* images */}
        <ProductPageContentImages images={images?.slice(0, 3)!} title={title} />
        {/* content - information */}
        <ProductPageContentInformation
          product={product!}
          selectedColor={selectedColor}
          handleColorSelection={handleColorSelection}
          selectedSize={selectedSize}
          handleSizeSelection={handleSizeSelection}
          commentsCount={
            comments?.length != undefined && comments?.length > 0
              ? comments?.length
              : 0
          }
        />
      </div>
      <ProductPageContentTabs
        description={description}
        comments={comments!}
        features={features!}
      />
      {relatedProducts && (
        <ProductPageContentRelatedProducts relatedProducts={relatedProducts} />
      )}
    </section>
  );
};

export default ProductPageContent;
