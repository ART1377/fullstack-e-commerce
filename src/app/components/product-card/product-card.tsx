"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";
import { Color } from "../../../../next-type-d";
import OperationIcon from "@/app/components/operation-icon/operation-icon";
import Price from "../price/price";
import { getUniqueColors } from "@/app/lib/get-unique-colors";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from "@/app/redux/slices/favoritesSlice";
import { useSessionContext } from "@/app/context/useSessionContext";
import HeartFillIcon from "@/app/icons/heart-fill-icon";
import toast from "react-hot-toast";
import Spinner from "../spinner/spinner";
import { Product } from "../../../../next-type-models";

type Props = {
  product: Partial<Product>;
};

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { session } = useSessionContext();
  const userId = session?.user?.id as string;
  const { id, title, brand, images, stock, price, discount } = product;

  // Get unique colors
  const uniqueColors = getUniqueColors(stock!);

  // Check if the product is in the favorites
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((favorite) => favorite.productId === id);

  const totalQuantity = stock?.reduce(
    (acc, stockItem) => acc + stockItem.quantity,
    0
  );

  // Local loading state for this specific card
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

      dispatch(addToFavorites({ userId, productId: id! })).finally(() => {
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

      dispatch(removeFromFavorites({ userId, productId: id! }))
        .then(() => {
          dispatch(fetchFavorites(userId)); // Optionally re-fetch if needed
        })
        .finally(() => {
          setLoading(false); // End loading after action
        });
    }
  };

  return (
    <div className="w-full min-w-[200px] bg-white rounded-2xl shadow-md custom-transition hover:shadow-none p-3 flex flex-col gap-2 group">
      {/* card image */}
      <Link
        href={`/products/${id}`}
        className="overflow-hidden rounded-lg aspect-square w-full relative custom-transition group-hover:scale-[1.02]"
      >
        <Image
          alt={title!}
          src={images?.[0].url!}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Link>
      {/* card info */}
      <div className="w-full flex flex-col gap-2 h-[153px]">
        {/* first row */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 w-[calc(100%-40px)]">
            <Link
              href={`/products/${id}`}
              className="text-bodyMain text-dark line-clamp-1 custom-transition  group-hover:text-primary-main"
            >
              {title}
            </Link>
            <small className="text-customGray-700 text-captionMain line-clamp-1">
              {brand}
            </small>
          </div>
          <div
            data-product-id={id}
            onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
          >
            <OperationIcon color={"error"}>
              {loading ? (
                <Spinner size={24} color="error" />
              ) : isFavorite ? (
                <HeartFillIcon styles="size-6" />
              ) : (
                <HeartEmptyIcon styles="size-6" />
              )}
            </OperationIcon>
          </div>
        </div>
        {/* second row */}
        <div className="flex gap-1">
          {uniqueColors.slice(0, 3).map((color: Color) => {
            return (
              <div
                key={color.id}
                className={`rounded-full size-5 ${
                  color.title === "white" && "border border-customGray-300"
                }`}
                style={{ backgroundColor: color.hex }}
              ></div>
            );
          })}
          <span className="text-customGray-500 text-bodySmall">
            {uniqueColors.length > 3 && `(+${uniqueColors.length - 3})`}
          </span>
        </div>

        {/* third row */}
        <div className="flex flex-col justify-end gap-1 h-[70px]">
          <Price price={price!} discountPercentage={discount!} />
          <small className="text-bodySmall text-state-error">
            تعداد موجودی : {totalQuantity}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
