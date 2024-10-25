import React from "react";
import Title from "../../title/title";
import NewestShoesSlider from "./newest-shoes-slider/newest-shoes-slider";
import { getFilteredProducts } from "@/app/actions/product-actions/product-action";

type Props = {};

const NewestShoes = async (props: Props) => {
  // need change
  const { products } = await getFilteredProducts({});

  return (
    <section className="mt-20 md:mt-28 w-full">
      {/* title */}
      {/* need change */}
      <Title link="/products?category=کفش&sort=newest">
        <h3>جدیدترین کفش ها</h3>
      </Title>
      {/* slider */}
      <NewestShoesSlider products={products} />
    </section>
  );
};

export default NewestShoes;
