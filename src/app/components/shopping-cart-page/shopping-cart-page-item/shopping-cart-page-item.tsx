"use client";

import React, { useEffect, useState } from "react";
import OperationIcon from "../../operation-icon/operation-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import Image from "next/image";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";
import ShareIcon from "@/app/icons/share-icon";
import Price from "../../price/price";
import Stock from "../../stock/stock";
import Link from "next/link";
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from "@/app/redux/slices/favoritesSlice";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import { useSessionContext } from "@/app/context/useSessionContext";
import { removeFromCart, updateCartItem } from "@/app/redux/slices/cartSlice";
import Spinner from "../../spinner/spinner";
import HeartFillIcon from "@/app/icons/heart-fill-icon";
import PlusIcon from "@/app/icons/plus-icon";
import MinusIcon from "@/app/icons/minus-icon";
import ProductShare from "../../product-share/product-share";
import { CartItem } from "../../../../../next-type-models";

type Props = {
  cartItem: Partial<CartItem>;
};

const ShoppingCartPageItem = ({ cartItem }: Props) => {
  // need change
  const { stock, product, quantity, productId } = cartItem;

  const dispatch = useAppDispatch();

  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some(
    (favorite) => favorite.productId === productId
  );

  const { session } = useSessionContext();
  const userId = session?.user?.id;

  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    if (session && session.user && userId) {
      dispatch(fetchFavorites(userId)); // Fetch cart when user session is available
    }
  }, [session, dispatch, userId]);

  const handleIncreaseQuantity = () => {
    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
    } else {
      const newQuantity = (quantity || 0) + 1;
      if (newQuantity > stock?.quantity!) {
        toast.error(
          `حداکثر ${stock?.quantity} آیتم از این رنگ و سایز میتوان انتخاب کرد`
        );
        return;
      }

      if (cartItem) {
        setCartLoading(true);
        dispatch(
          updateCartItem({ cartItemId: cartItem.id!, quantity: newQuantity })
        ).finally(() => {
          setCartLoading(false); // End loading after action
        });
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
    } else {
      if (quantity! > 1) {
        setCartLoading(true);

        const newQuantity = cartItem.quantity! - 1;
        dispatch(
          updateCartItem({
            cartItemId: cartItem.id!,
            quantity: newQuantity,
          })
        ).finally(() => {
          setCartLoading(false); // End loading after action
        });
      } else {
        setCartLoading(true);
        // Remove item if quantity is 1
        dispatch(removeFromCart({ userId, cartItemId: cartItem.id! })).finally(
          () => {
            setCartLoading(false); // End loading after action
          }
        );
      }
    }
  };

  const handleRemoveCartItem = () => {
    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
    } else {
      if (cartItem) {
        setCartLoading(true);
        dispatch(removeFromCart({ userId, cartItemId: cartItem.id! })).finally(
          () => {
            setCartLoading(false); // End loading after action
          }
        );
      }
    }
  };

  // Function to handle adding/removing from favorites
  const handleAddFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior

    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    } else {
      setFavoriteLoading(true); // Start loading

      dispatch(addToFavorites({ userId, productId: productId! })).finally(
        () => {
          setFavoriteLoading(false); // End loading after action
        }
      );
    }
  };

  const handleRemoveFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior

    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    } else {
      setFavoriteLoading(true); // Start loading

      dispatch(removeFromFavorites({ userId, productId: productId! }))
        .then(() => {
          dispatch(fetchFavorites(userId)); // Optionally re-fetch if needed
        })
        .finally(() => {
          setFavoriteLoading(false); // End loading after action
        });
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow p-3 flex gap-3 flex-col sm:flex-row lg:gap-6">
      {/* in stock */}
      <div className="absolute left-1 top-5 -rotate-45">
        <Stock quantity={stock?.quantity!} />
      </div>

      {/* product images */}
      <div className="flex gap-4">
        <Link
          href={`products/${productId!}`}
          aria-label="product"
          className="relative w-32 aspect-square shadow rounded-xl overflow-hidden cursor-pointer custom-transition hover:opacity-60 xs:w-40"
        >
          <Image
            alt={product?.title!}
            src={product?.images?.[0].url!}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Link>
        {/* operators */}
        <div className="flex sm:hidden flex-col justify-end gap-2">
          <div onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}>
            <OperationIcon color={"error"}>
              {favoriteLoading ? (
                <Spinner size={24} color="error" />
              ) : isFavorite ? (
                <HeartFillIcon styles="size-6" />
              ) : (
                <HeartEmptyIcon styles="size-6" />
              )}
            </OperationIcon>
          </div>
          <OperationIcon color={"success"}>
            <ShareIcon styles="size-5" />
          </OperationIcon>
          <div onClick={handleRemoveCartItem}>
            <OperationIcon color={"error"}>
              <DeleteIcon styles="size-6" />
            </OperationIcon>
          </div>
        </div>
        {/* color - size */}
        <div className="flex sm:hidden flex-col items-center gap-4 mt-auto xs:mr-4">
          <div className="flex items-center gap-3">
            <small className="text-customGray-700 text-bodySmall">رنگ</small>
            <div
              className={`rounded-lg size-8  custom-transition hover:opacity-60 cursor-pointer ${
                stock?.color?.title === "white" &&
                "border border-customGray-300"
              }`}
              style={{
                backgroundColor: stock?.color?.hex,
              }}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <small className="text-customGray-700 text-bodySmall">سایز</small>
            <div
              className={`flex-center rounded-lg size-8 cursor-pointer custom-transition bg-light text-dark hover:bg-customGray-300
                        `}
            >
              {stock?.size}
            </div>
          </div>
        </div>
      </div>

      {/* product info */}
      <div className="flex flex-col gap-7 sm:w-[calc(100%-180px)]">
        {/* title */}
        <Link
          href={`products/${productId!}`}
          aria-label="product"
          className="text-dark text-bodyMain cursor-pointer custom-transition hover:text-primary-main"
        >
          {product?.title}
        </Link>
        {/* color - size */}
        <div className="hidden sm:flex items-center gap-10">
          <div className="flex items-center gap-3">
            <small className="text-customGray-700 text-bodySmall">رنگ</small>
            <div
              className={`rounded-lg size-8  custom-transition hover:opacity-60 cursor-pointer ${
                stock?.color?.title === "white" &&
                "border border-customGray-300"
              }`}
              style={{
                backgroundColor: stock?.color?.hex,
              }}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <small className="text-customGray-700 text-bodySmall">سایز</small>
            <div
              className={`flex-center rounded-lg size-8 cursor-pointer custom-transition bg-light text-dark hover:bg-customGray-300
                        `}
            >
              {stock?.size}
            </div>
          </div>
        </div>

        {/* operators - price */}
        <div className="flex items-end justify-between">
          {/* operators */}
          <div className="hidden sm:flex gap-2">
            <div
              onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
            >
              <OperationIcon color={"error"}>
                {favoriteLoading ? (
                  <Spinner size={24} color="error" />
                ) : isFavorite ? (
                  <HeartFillIcon styles="size-6" />
                ) : (
                  <HeartEmptyIcon styles="size-6" />
                )}
              </OperationIcon>
            </div>
            <ProductShare />
            <div onClick={handleRemoveCartItem}>
              <OperationIcon color={"error"}>
                <DeleteIcon styles="size-6" />
              </OperationIcon>
            </div>
          </div>
          {/* price */}
          <div className="w-full flex items-end justify-between gap-5 sm:justify-end">
            <div className="flex items-center gap-1.5">
              <div
                onClick={handleIncreaseQuantity}
                className="custom-shape size-8 text-bodyMain text-white bg-primary-main flex-center custom-transition hover:opacity-60 cursor-pointer"
              >
                <PlusIcon />
              </div>
              <div className="w-3 h-5 flex-center">
                {cartLoading ? (
                  <Spinner size={12} color="primary-main" />
                ) : (
                  <div className="text-bodyMain text-dark">{quantity}</div>
                )}
              </div>
              <div
                onClick={handleDecreaseQuantity}
                className="custom-shape size-8 text-bodyMain text-white bg-primary-light flex-center custom-transition hover:opacity-60 cursor-pointer"
              >
                {quantity! > 1 ? <MinusIcon /> : <DeleteIcon styles="size-6" />}
              </div>
            </div>
            <Price
              price={
                quantity && quantity > 0
                  ? quantity * product?.price!
                  : product?.price!
              }
              discountPercentage={product?.discount!}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPageItem;
