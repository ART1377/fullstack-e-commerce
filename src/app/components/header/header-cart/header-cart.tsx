"use client";

import CartIcon from "@/app/icons/cart-icon";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import Link from "next/link";
import React, { useEffect } from "react";
import Spinner from "../../spinner/spinner";
import { useSessionContext } from "@/app/context/useSessionContext";
import { fetchCart } from "@/app/redux/slices/cartSlice";
import DashboardIcon from "@/app/icons/dashboard-icon";

type Props = {};

const HeaderCart = (props: Props) => {
  const { session } = useSessionContext();

  const user: any = session && session?.user ? session.user : undefined;

  const isAdmin = session?.user?.role === "admin";

  const dispatch = useAppDispatch();

  const cartStatus = useAppSelector((state) => state.cart.status);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems?.reduce(
    (acc, item) => acc + item.quantity!,
    0
  );

  useEffect(() => {
    if (session && session.user && session.user.id) {
      dispatch(fetchCart(session.user.id)); // Fetch cart when user session is available
    }
  }, [session, dispatch]);

  return (
    <>
      {isAdmin ? (
        <Link
          href={session && session.user ? "/dashboard" : "/auth/login"}
          className="relative flex-center bg-customGray-100 rounded-full size-10 cursor-pointer hover:bg-customGray-200 custom-transition"
        >
          <DashboardIcon styles="size-6" />
        </Link>
      ) : (
        <Link
          href={session && session.user ? "/shopping-cart" : "/auth/login"}
          className="relative flex-center bg-customGray-100 rounded-full size-10 cursor-pointer hover:bg-customGray-200 custom-transition"
        >
          <CartIcon styles="size-6" />
          {session && session?.user && (
            <div className="rounded-full size-6 flex-center bg-state-error text-white text-captionMain absolute -top-2.5 -right-2.5">
              {cartStatus === "loading" ? (
                <Spinner size={16} color="white" />
              ) : (
                totalQuantity
              )}
            </div>
          )}
        </Link>
      )}
    </>
  );
};

export default HeaderCart;
