import React from "react";
import Title from "../../title/title";
import NewestClothesSlider from "./newest-clothes-slider/newest-clothes-slider";
import * as actions from "@/app/actions/product-actions/product-action";

type Props = {};

const NewestClothes = async (props: Props) => {
  const { products } = await actions.getNewestClothes();

  return (
    <section className="mt-20 md:mt-28 w-full">
      {/* title */}
      {/* need change */}
      <Title link="/products?category=پوشاک&sort=newest">
        <h4>جدیدترین پوشاک</h4>
      </Title>
      {/* slider */}
      <NewestClothesSlider products={products} />
    </section>
  );
};

export default NewestClothes;
