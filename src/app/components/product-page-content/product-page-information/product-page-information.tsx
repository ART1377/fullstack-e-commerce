"use client";

import React, { useEffect, useState } from "react";
import Rating from "../../rating/rating";
import ChatIcon from "@/app/icons/chat-icon";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";
import ColorItem from "../../color-item/color-item";
import SizeItem from "../../size-item/size-item";
import OperationIcon from "../../operation-icon/operation-icon";
import ShopIcon from "@/app/icons/shop-icon";
import Price from "../../price/price";
import Button from "../../button/button";
import Stock from "../../stock/stock";
import { getUniqueColors } from "@/app/lib/get-unique-colors";
import { CartItem, Color, Product } from "../../../../../next-type-models";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCartItem,
} from "@/app/redux/slices/cartSlice";
import { useSessionContext } from "@/app/context/useSessionContext";
import PlusIcon from "@/app/icons/plus-icon";
import MinusIcon from "@/app/icons/minus-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import toast from "react-hot-toast";
import Spinner from "../../spinner/spinner";
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from "@/app/redux/slices/favoritesSlice";
import HeartFillIcon from "@/app/icons/heart-fill-icon";
import ProductShare from "../../product-share/product-share";
import { getSizesForColor } from "@/app/lib/get-sizes-of-color";

type Props = {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  handleColorSelection: (color: string) => void;
  handleSizeSelection: (size: string) => void;
  commentsCount: number;
};

const ProductPageInformation = ({
  product,
  selectedColor,
  selectedSize,
  handleColorSelection,
  handleSizeSelection,
  commentsCount,
}: Props) => {
  const { stock, description, price, rating, title, discount, id } = product;

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartStatus = useAppSelector((state) => state.cart.status);

  const favorites = useAppSelector((state) => state.favorites.items);
  const favoritesStatus = useAppSelector((state) => state.favorites.status);
  const isFavorite = favorites.some((favorite) => favorite.productId === id);

  const { session } = useSessionContext();
  const userId = session?.user?.id;

  const uniqueColors = getUniqueColors(stock!);
  const sizes = getSizesForColor(stock!, selectedColor);

  const [quantityOfStock, setQuantityOfStock] = useState<number | null>(null);
  const [cartItem, setCartItem] = useState<Partial<CartItem> | null>(null);

  const totalQuantity = stock?.reduce(
    (acc, stockItem) => acc + stockItem.quantity,
    0
  );

  const selectedStock = stock?.find((stockItem) => {
    return (
      stockItem.color?.persian === selectedColor &&
      stockItem.size === selectedSize
    );
  });

  const selectedStockId = selectedStock?.id;

  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  useEffect(() => {
    if (session && session.user && userId) {
      const cartItemData = cartItems.find(
        (item) => item.productId === id && item.stockId === selectedStockId
      );

      if (cartItemData) {
        setCartItem(cartItemData);
        setQuantity(cartItemData.quantity!);
      } else {
        setCartItem(null);
      }
    }
  }, [
    cartItems,
    id,
    selectedColor,
    selectedSize,
    selectedStockId,
    session,
    userId,
  ]);

  useEffect(() => {
    if (session && session.user && userId) {
      dispatch(fetchCart(userId)); // Fetch cart when user session is available
      dispatch(fetchFavorites(userId)); // Fetch cart when user session is available
    }
  }, [session, dispatch, userId]);

  useEffect(() => {
    const stockItem = stock?.find(
      (item) =>
        item.color?.persian === selectedColor && item.size === selectedSize
    );
    if (stockItem) {
      setQuantityOfStock(stockItem.quantity);
      if (cartItem) {
        setQuantity(cartItem.quantity!);
      } else {
        setQuantity(1);
      }
    } else {
      setQuantityOfStock(null);
      setQuantity(1);
    }
  }, [cartItem, selectedColor, selectedSize, stock]);

  const handleAddToCart = () => {
    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
    } else {
      if (!selectedStockId) {
        toast.error("لطفا یک رنگ و سایز انتخاب کنید !");
        return;
      }

      if (quantityOfStock === 0) {
        toast.error("این موجودی به پایان رسیده");
        return;
      }

      if (cartItem && quantity >= quantityOfStock!) {
        toast.error(
          `حداکثر ${quantityOfStock} آیتم از این رنگ و سایز میتوان انتخاب کرد`
        );
        return;
      }

      // If item is in cart, remove it
      if (cartItem) {
        handleRemoveCartItem();
        return;
      }

      // Add to cart
      dispatch(
        addToCart({
          userId,
          productId: product.id,
          stockId: selectedStockId,
          quantity: 1,
        })
      );
    }
  };

  const handleIncreaseQuantity = () => {
    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
    } else {
      const newQuantity = (cartItem?.quantity || 0) + 1;

      if (newQuantity > quantityOfStock!) {
        toast.error(
          `حداکثر ${quantityOfStock} آیتم از این رنگ و سایز میتوان انتخاب کرد`
        );
        return;
      }

      if (cartItem) {
        dispatch(
          updateCartItem({ cartItemId: cartItem.id!, quantity: newQuantity })
        );
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
    } else {
      if (cartItem) {
        if (cartItem.quantity! > 1) {
          const newQuantity = cartItem.quantity! - 1;
          dispatch(
            updateCartItem({ cartItemId: cartItem.id!, quantity: newQuantity })
          );
        } else {
          // Remove item if quantity is 1
          dispatch(removeFromCart({ userId, cartItemId: cartItem.id! }));
        }
      }
    }
  };

  const handleRemoveCartItem = () => {
    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
    } else {
      if (cartItem) {
        dispatch(removeFromCart({ userId, cartItemId: cartItem.id! }));
      }
    }
  };

  // favorites operations
  // Function to handle adding/removing from favorites
  const handleAddFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior

    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    } else {
      dispatch(addToFavorites({ userId, productId: id }));
    }
  };

  const handleRemoveFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior

    if (!session || !session.user || !userId) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    } else {
      dispatch(removeFromFavorites({ userId, productId: id })).then(() => {
        dispatch(fetchFavorites(userId)); // Optionally re-fetch if needed
      });
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col lg:justify-between">
      <Stock quantity={totalQuantity!} />
      <h1 className="my-3 text-dark text-bodyMainBold sm:text-h6">{title}</h1>
      <div className="flex justify-between flex-wrap items-baseline gap-3 max-w-[450px]">
        {rating ? (
          <div className="flex items-center gap-1">
            <Rating rating={rating} />
            <span className="text-dark text-bodySmall mt-1.5">({rating})</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Rating rating={5} />
            <span className="text-dark text-bodySmall mt-1.5">({5})</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-customGray-500 text-bodySmall">
          <ChatIcon styles="size-6 mb-1" />
          <span>({commentsCount}) دیدگاه</span>
        </div>
        <div className="flex gap-2">
          <ProductShare />
          <div onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}>
            <OperationIcon color={"error"}>
              {favoritesStatus === "loading" ? (
                <Spinner size={24} color="error" />
              ) : isFavorite ? (
                <HeartFillIcon styles="size-6" />
              ) : (
                <HeartEmptyIcon styles="size-6" />
              )}
            </OperationIcon>
          </div>
        </div>
      </div>
      <div className="line-clamp-2 text-bodySmall text-customGray-500 my-4">
        <h2>{description}</h2>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-bodyMain text-customGray-700">رنگ</p>
        <div className="flex gap-3">
          {uniqueColors.map((color: Color) => {
            const isSelected = selectedColor === color.persian;
            return (
              <ColorItem
                key={color.id}
                color={color}
                isSelected={isSelected}
                handleColorSelection={handleColorSelection}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <p className="text-bodyMain text-customGray-700">سایز</p>
        <div className="flex gap-2">
          {sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <SizeItem
                key={size}
                size={size}
                isSelected={isSelected}
                handleSizeSelection={handleSizeSelection}
                isInProductDetailPage
              />
            );
          })}
        </div>
      </div>
      <div className="my-4 text-captionMain text-state-error">
        تعداد موجودی : {quantityOfStock}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          {!!cartItem ? (
            <div className="flex items-center gap-1.5">
              <div
                onClick={handleIncreaseQuantity}
                className="custom-shape size-8 text-bodyMain text-white bg-primary-main flex-center custom-transition hover:opacity-60 cursor-pointer"
              >
                <PlusIcon />
              </div>
              <div className="w-3 h-5 flex-center">
                {cartStatus === "loading" ? (
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
          ) : (
            <div></div>
          )}
          <Price
            price={price}
            discountPercentage={discount ? discount : undefined}
          />
        </div>
        <div className="w-full">
          {!!cartItem ? (
            <Button
              size="large"
              color="state-error"
              icon={<DeleteIcon styles="size-6" />}
              styles="w-full"
              onClick={handleRemoveCartItem}
              disabled={cartStatus === "loading"}
              loading={
                cartStatus === "loading" && <Spinner size={20} color="white" />
              }
            >
              حذف از سبد خرید
            </Button>
          ) : (
            <Button
              size="large"
              color="primary-main"
              icon={<ShopIcon />}
              styles="w-full"
              onClick={handleAddToCart}
              disabled={cartStatus === "loading" || quantityOfStock === 0}
              loading={
                cartStatus === "loading" && <Spinner size={20} color="white" />
              }
            >
              افزودن به سبد خرید
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPageInformation;
