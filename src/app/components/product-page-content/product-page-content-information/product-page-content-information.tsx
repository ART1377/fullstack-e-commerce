import React, { useCallback, useEffect, useState } from "react";
import Rating from "../../rating/rating";
import ChatIcon from "@/app/icons/chat-icon";
import ShareIcon from "@/app/icons/share-icon";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";
import ColorItem from "../../color-item/color-item";
import SizeItem from "../../size-item/size-item";
import OperationIcon from "../../operation-icon/operation-icon";
import ShopIcon from "@/app/icons/shop-icon";
import Price from "../../price/price";
import Button from "../../button/button";
import Stock from "../../stock/stock";
import { getSizesForColor, getUniqueColors } from "@/app/lib/functions";
import { CartItem, Color, Product } from "../../../../../next-type-models";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCartItem,
} from "@/app/redux/slices/cartSlice";
import { useCurrentSession } from "@/app/hooks/useCurrentSession";
import { redirect } from "next/navigation";
import PlusIcon from "@/app/icons/plus-icon";
import MinusIcon from "@/app/icons/minus-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import toast from "react-hot-toast";

type Props = {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  handleColorSelection: (color: string) => void;
  handleSizeSelection: (size: string) => void;
};

const ProductPageContentInformation = ({
  product,
  selectedColor,
  selectedSize,
  handleColorSelection,
  handleSizeSelection,
}: Props) => {
  const { stock, description, price, rating, title, discount, comments, id } =
    product;

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { session } = useCurrentSession();
  const userId = session?.user?.id;

  const uniqueColors = getUniqueColors(stock!);
  const sizes = getSizesForColor(stock!, selectedColor);

  // Initially get stock quantity for selected color and size
  const [quantityOfStock, setQuantityOfStock] = useState<number | null>(null);

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

  // Function to find cart item based on product ID, color, and size
  const getCartItemForSelectedVariant = useCallback(() => {
    return cartItems.find(
      (item) =>
        item.productId === id &&
        item.stock?.color?.persian === selectedColor &&
        item.stock?.size === selectedSize
    ) as CartItem;
  }, [cartItems, id, selectedColor, selectedSize]);

  // Set initial quantity based on the cart item or default to 1
  const [quantity, setQuantity] = useState(
    getCartItemForSelectedVariant()?.quantity || 1
  );

  useEffect(() => {
    if (session && session.user && userId) {
      dispatch(fetchCart(userId)); // Fetch cart when user session is available
    }
  }, [session, dispatch, userId]);

  // Effect to update quantityOfStock when selectedColor or selectedSize changes
  useEffect(() => {
    const stockItem = stock?.find(
      (item) =>
        item.color?.persian === selectedColor && item.size === selectedSize
    );
    const cartItem = getCartItemForSelectedVariant();

    if (stockItem) {
      setQuantityOfStock(stockItem.quantity);
      // If there's a cart item for this specific color/size variant, set the quantity to that cart item's quantity.
      if (cartItem) {
        setQuantity(cartItem.quantity);
      } else {
        setQuantity(1); // Reset quantity to 1 if no such variant is in the cart.
      }
    } else {
      setQuantityOfStock(null); // No stock available for this variant
      setQuantity(1); // Reset quantity if there's no stock
    }
  }, [selectedColor, selectedSize, stock, getCartItemForSelectedVariant]);

  const handleAddToCart = () => {
    if (!session || !session.user || !userId) {
      redirect("/auth/login");
    } else {
      if (!selectedStockId) {
        toast.error("لطفا یک رنگ و سایز انتخاب کنید !");
        return;
      }

      // Check if the quantity in the cart is less than the available stock quantity
      if (getCartItemForSelectedVariant() && quantity >= quantityOfStock!) {
        toast.error(
          `حداکثر ${quantityOfStock} آیتم از این رنگ و سایز میتوان انتخاب کرد`
        );
        return;
      }

      if (quantity > 1) {
        return;
      }
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
    if (session) {
      const cartItem = getCartItemForSelectedVariant();
      const newQuantity = (cartItem?.quantity || 0) + 1;

      // Prevent increasing the quantity beyond available stock
      if (newQuantity > quantityOfStock!) {
        toast.error(
          `حداکثر ${quantityOfStock} آیتم از این رنگ و سایز میتوان انتخاب کرد`
        );
        return;
      }

      if (cartItem) {
        dispatch(
          updateCartItem({ cartItemId: cartItem.id, quantity: newQuantity })
        );
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (session && userId) {
      const cartItem = getCartItemForSelectedVariant();
      if (cartItem) {
        if (cartItem.quantity > 1) {
          const newQuantity = cartItem.quantity - 1;
          dispatch(
            updateCartItem({ cartItemId: cartItem.id, quantity: newQuantity })
          );
        } else {
          // Logic to remove item from cart if quantity is 1
          dispatch(removeFromCart({ userId, cartItemId: cartItem.id }));
        }
      }
    }
  };

  const handleRemoveCartItem = () => {
    if (session && userId) {
      const cartItem = getCartItemForSelectedVariant();
      if (cartItem) {
        dispatch(removeFromCart({ userId, cartItemId: cartItem.id }));
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col lg:justify-between">
      {/* stock */}
      <Stock quantity={totalQuantity!} />
      {/* title */}
      <h1 className="my-3 text-dark text-bodyMainBold sm:text-h6">{title}</h1>
      {/* rating - comment(count) - share / favorite buttons */}
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
          <span>({comments?.length}) دیدگاه</span>
        </div>
        <div className="flex gap-2">
          <OperationIcon color="success">
            <ShareIcon styles="size-5" />
          </OperationIcon>
          <OperationIcon color="error">
            <HeartEmptyIcon styles="size-6" />
          </OperationIcon>
        </div>
      </div>
      {/* description */}
      <div className="line-clamp-2 text-bodySmall text-customGray-500 my-4">
        <h2>{description}</h2>
      </div>
      {/* colors */}
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
      {/* sizes */}
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
      {/* quantity */}
      <div className="my-4 text-captionMain text-state-error">
        تعداد موجودی : {quantityOfStock}
      </div>
      {/* price and button */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          {!!getCartItemForSelectedVariant() ? (
            <div className="flex items-center gap-1.5">
              <div
                onClick={handleIncreaseQuantity}
                className="custom-shape size-8 text-bodyMain text-white bg-primary-main flex-center custom-transition hover:opacity-60 cursor-pointer"
              >
                <PlusIcon size={32} />
              </div>
              <div className="text-bodyMain text-dark">{quantity}</div>
              <div
                onClick={handleDecreaseQuantity}
                className="custom-shape size-8 text-bodyMain text-white bg-primary-light flex-center custom-transition hover:opacity-60 cursor-pointer"
              >
                <MinusIcon size={32} />
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
          {!!getCartItemForSelectedVariant() ? (
            <Button
              size="large"
              color="state-error"
              icon={<DeleteIcon styles="size-6" />}
              styles="w-full"
              onClick={handleRemoveCartItem}
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
            >
              افزودن به سبد خرید
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPageContentInformation;
