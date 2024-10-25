import React from "react";
import Title from "../../title/title";
import ProfilePageFavoritesSlider from "./favorites-slider/favorites-slider";
import { User } from "../../../../../next-type-d";
import { getFilteredProducts } from "@/app/actions/product-actions/product-action";

type Props = {
  user: User;
};

const ProfilePageFavorites = async ({ user }: Props) => {
  // need change
  const { products } = await getFilteredProducts({});

  return (
    <section className="w-full">
      {/* title */}
      <Title>
        <h3>لیست علاقه مندی ها</h3>
      </Title>
      {/* slider */}
      <ProfilePageFavoritesSlider products={products} />
    </section>
  );
};

export default ProfilePageFavorites;
