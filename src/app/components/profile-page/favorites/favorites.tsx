import React from "react";
import Title from "../../title/title";
import ProfilePageFavoritesSlider from "./favorites-slider/favorites-slider";
import * as actions from "@/app/actions/favorite-actions/favorite-actions";
import { auth } from "@/app/auth";

type Props = {};

const ProfilePageFavorites = async (props: Props) => {


  const session = await auth();
  const favoriteProducts = await actions.getUserFavorites(session?.user?.id!);

  return (
    <section className="w-full">
      {/* title */}
      <Title>
        <h3>لیست علاقه مندی ها</h3>
      </Title>
      {/* slider */}
      {favoriteProducts?.length &&
      favoriteProducts?.length > 0 ? (
        <ProfilePageFavoritesSlider products={favoriteProducts} />
      ) : (
        <div className="w-full px-4 py-8 bg-state-error-200 text-state-error rounded-xl flex-center flex-col gap-4 text-center text-bodyMain my-4">
          <p>محصول مورد علاقه ای موجود نیست</p>
        </div>
      )}
    </section>
  );
};

export default ProfilePageFavorites;
