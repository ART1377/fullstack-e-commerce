import React from "react";
import Title from "../../title/title";
import ProductPageContentRelatedProductsSlider from "./product-page-content-related-products-slider/product-page-content-related-products-slider";
import { Product } from "../../../../../next-type-models";
import { getFilteredProducts } from "@/app/actions/product-action";

type Props = {
  relatedProducts: Product[];
};
const ProductPageContentRelatedProducts = ({ relatedProducts }: Props) => {
  return (
    <section className="mt-28 md:mt-32 w-full">
      {/* title */}
      <Title>
        <h3>محصولات مرتبط</h3>
      </Title>
      {/* slider */}
      <ProductPageContentRelatedProductsSlider products={relatedProducts} />
    </section>
  );
};

export default ProductPageContentRelatedProducts;
