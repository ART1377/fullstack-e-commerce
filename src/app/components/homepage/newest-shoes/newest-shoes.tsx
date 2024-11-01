import React from "react";
import Title from "../../title/title";
import NewestShoesSlider from "./newest-shoes-slider/newest-shoes-slider";
import * as actions from "@/app/actions/product-actions/product-action";

type Props = {};

const NewestShoes = async (props: Props) => {
  const { products } = await actions.getNewestShoes();

  return (
    <section className="mt-20 md:mt-28 w-full">
      {/* title */}
      {/* need change */}
      <Title link="/products?selectedCategory=کفش">
        <h3>جدیدترین کفش ها</h3>
      </Title>
      {/* slider */}
      <NewestShoesSlider products={products} />
    </section>
  );
};

export default NewestShoes;
