import React, { useCallback, useEffect, useState } from "react"; // Added useState
import Image from "next/image";
import Link from "next/link";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";
import ShopIcon from "@/app/icons/shop-icon";
import { Color } from "../../../../next-type-d";
import OperationIcon from "@/app/components/operation-icon/operation-icon";
import Price from "../price/price";
import MinusIcon from "@/app/icons/minus-icon";
import PlusIcon from "@/app/icons/plus-icon";
import { getUniqueColors } from "@/app/lib/functions";
import { Product } from "../../../../next-type-models";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook"; //
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from "@/app/redux/slices/favoritesSlice"; // Adjust the import as necessary
import { useCurrentSession } from "@/app/hooks/useCurrentSession";
import HeartFillIcon from "@/app/icons/heart-fill-icon";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCartItem,
} from "@/app/redux/slices/cartSlice";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { session } = useCurrentSession();
  const userId = session?.user?.id as string;
  const { id, title, brand, images, stock, price, discount } = product;

  // Get unique colors
  const uniqueColors = getUniqueColors(stock!);

  // Check if the product is in the favorites
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((favorite) => favorite.productId === id);

  // Retrieve cart items from Redux store
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.productId === id);

  // Function to find cart item based on product ID
  const getCartItem = useCallback(() =>
    cartItems.find((item) => item.productId === id),[cartItems, id]);

  // Set initial quantity based on the cart item or default to 1
  const [quantity, setQuantity] = useState(getCartItem()?.quantity || 1);

  useEffect(() => {
    if (session && session.user) {
      dispatch(fetchCart(userId)); // Fetch cart when user session is available
    }
  }, [session, dispatch, userId]);

  // Effect to update quantity when cart items change
  useEffect(() => {
    const cartItem = getCartItem(); // Get updated cart item
    setQuantity(cartItem ? cartItem.quantity : 1); // Update quantity based on current cart item
  }, [cartItems, getCartItem]); // Run this effect when cartItems change


  const handleAddToCart = () => {
    if (session) {
      dispatch(addToCart({ userId, productId: product.id, quantity: 1 }));
      setQuantity(1); // Set quantity to 1 after adding to cart
    }
  };


  const handleIncreaseQuantity = () => {
    if (session && cartItem) {
      const newQuantity = cartItem.quantity + 1;
      dispatch(
        updateCartItem({ cartItemId: cartItem.id, quantity: newQuantity })
      ); // Pass cartItem.id
    }
  };

  const handleDecreaseQuantity = () => {
    if (session && cartItem) {
      if (cartItem.quantity > 1) {
        const newQuantity = cartItem.quantity - 1;
        dispatch(
          updateCartItem({ cartItemId: cartItem.id, quantity: newQuantity })
        ); // Pass cartItem.id
      } else {
        // Logic to remove item from cart if quantity is 1
        dispatch(removeFromCart({ userId, cartItemId: cartItem.id }));
      }
    }
  };

  // Function to handle adding/removing from favorites
  const handleAddFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    if (session) {
      dispatch(addToFavorites({ userId, productId: id }));
    }
  };
  const handleRemoveFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    if (session) {
      dispatch(removeFromFavorites({ userId, productId: id })).then(() => {
        dispatch(fetchFavorites(userId)); // Optionally re-fetch if needed
      });
    }
  };

  console.log(cartItems);


  return (
    <div className="w-full min-w-[200px] bg-white rounded-2xl shadow-md custom-transition hover:shadow-none p-3 flex flex-col gap-2 group">
      {/* card image */}
      <Link
        href={`/products/${id}`}
        className="overflow-hidden rounded-lg aspect-square w-full relative custom-transition group-hover:scale-[1.02]"
      >
        <Image
          alt={title}
          src={images?.[0].url!}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Link>
      {/* card info */}
      <div className="w-full flex flex-col gap-2">
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
          {isFavorite ? (
            <div onClick={handleRemoveFavorite}>
              <OperationIcon color={"error"}>
                <HeartFillIcon styles="size-6" />
              </OperationIcon>
            </div>
          ) : (
            <div onClick={handleAddFavorite}>
              <OperationIcon color={"error"}>
                <HeartEmptyIcon styles="size-6" />
              </OperationIcon>
            </div>
          )}
        </div>
        {/* second row */}
        <div className="flex gap-1">
          {uniqueColors.slice(0, 8).map((color: Color) => {
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
        </div>
        {/* third row */}
        <div className="flex flex-col justify-end gap-1 h-[90px]">
          <Price price={price} discountPercentage={discount!} />
          <div className="w-full min-w-[200px] bg-white p-3 flex flex-col gap-2 group">
            {/* Other card components */}
            {cartItem ? (
              <div className="flex items-center gap-1.5">
                <div
                  onClick={handleIncreaseQuantity}
                  className="custom-shape size-8 text-bodyMain text-white bg-primary-main flex-center custom-transition hover:opacity-60 cursor-pointer"
                >
                  <PlusIcon size={32} />
                </div>
                <div className="text-bodyMain text-dark">
                  {quantity} {/* Display the updated quantity */}
                </div>
                <div
                  onClick={handleDecreaseQuantity}
                  className="custom-shape size-8 text-bodyMain text-white bg-primary-light flex-center custom-transition hover:opacity-60 cursor-pointer"
                >
                  <MinusIcon size={32} />
                </div>
              </div>
            ) : (
              <div onClick={handleAddToCart}>
                <OperationIcon color={"primary"}>
                  <ShopIcon />
                </OperationIcon>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
