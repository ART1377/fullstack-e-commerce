import React from "react";
import Title from "../../title/title";
import ProductPageContentRelatedProductsSlider from "./related-products-slider/related-products-slider";
import * as actions from "@/app/actions/product-actions/product-action";

type Props = {
  productId: string;
};
const RelatedProducts = async ({ productId }: Props) => {
  const { products } = await actions.getRelatedProducts(productId);

  return (
    <>
      {products && products.length > 0 && (
        <section className="mt-28 md:mt-32 w-full">
          {/* title */}
          <Title>
            <h3>محصولات مرتبط</h3>
          </Title>
          {/* slider */}
          <ProductPageContentRelatedProductsSlider products={products} />
        </section>
      )}
    </>
  );
};

export default RelatedProducts;
