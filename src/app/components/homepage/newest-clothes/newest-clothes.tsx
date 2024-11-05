import React from "react";
import Title from "../../title/title";
import NewestClothesSlider from "./newest-clothes-slider/newest-clothes-slider";
import * as actions from "@/app/actions/product-actions/product-action";

type Props = {};

const NewestClothes = async (props: Props) => {
  const { products } = await actions.getNewestClothes();

  return (
    <>
      {products && products?.length > 0 && (
        <section className="mt-20 md:mt-28 w-full">
          {/* title */}
          <Title link="/products?selectedCategory=پوشاک&sort=جدید ترین">
            <h4>جدیدترین پوشاک</h4>
          </Title>
          {/* slider */}
          <NewestClothesSlider products={products!} />
        </section>
      )}
    </>
  );
};

export default NewestClothes;
