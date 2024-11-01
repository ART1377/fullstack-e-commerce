"use client";

import React, { useEffect, useState } from "react";
import Button from "../../../button/button";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";
import Link from "next/link";
import BurgerMenuIcon from "@/app/icons/burger-menu-icon";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import { useSessionContext } from "@/app/context/useSessionContext";
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from "@/app/redux/slices/favoritesSlice";
import toast from "react-hot-toast";
import HeartFillIcon from "@/app/icons/heart-fill-icon";
import Spinner from "@/app/components/spinner/spinner";

type Props = {
  productId: string;
};

const HeroButtons = ({ productId }: Props) => {
  const dispatch = useAppDispatch();
  const { session } = useSessionContext();
  const userId = session?.user?.id as string;

  // Check if the product is in the favorites
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some(
    (favorite) => favorite.productId === productId
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session && session.user && userId) {
      dispatch(fetchFavorites(userId)); // Fetch cart when user session is available
    }
  }, [session, dispatch, userId]);

  // Function to handle adding/removing from favorites
  const handleAddFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior

    if (!session || !session.user) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    } else {
      setLoading(true); // Start loading

      dispatch(addToFavorites({ userId, productId })).finally(() => {
        setLoading(false); // End loading after action
      });
    }
  };

  const handleRemoveFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior

    if (!session || !session.user) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    } else {
      setLoading(true); // Start loading

      dispatch(removeFromFavorites({ userId, productId }))
        .then(() => {
          dispatch(fetchFavorites(userId)); // Optionally re-fetch if needed
        })
        .finally(() => {
          setLoading(false); // End loading after action
        });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full blgxl:gap-4">
      <Link href={`/products/${productId}`}>
        <Button
          color="primary-main"
          styles="w-full"
          icon={<BurgerMenuIcon styles="size-6" />}
        >
          جزییات بیشتر
        </Button>
      </Link>
      <div
        onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
        className="w-full"
      >
        <Button
          color="primary-main"
          icon={
            loading ? (
              <Spinner size={24} />
            ) : isFavorite ? (
              <HeartFillIcon styles="size-6" />
            ) : (
              <HeartEmptyIcon styles="size-6" />
            )
          }
          styles="w-full"
          outline
          disabled={loading}
        >
          {isFavorite ? "حذف از علاقه مندی ها" : "افزودن به علاقه مندی ها"}
        </Button>
      </div>
    </div>
  );
};

export default HeroButtons;
