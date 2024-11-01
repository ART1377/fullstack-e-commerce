"use client";

import Spinner from "@/app/components/spinner/spinner";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as actions from "@/app/actions/checkout-actions/checkout-actions";
import Button from "@/app/components/button/button";
import { useSessionContext } from "@/app/context/useSessionContext";
import { useAppDispatch } from "@/app/redux/hooks/hook";
import { fetchCart } from "@/app/redux/slices/cartSlice";

export default function CheckoutButton() {
  const { session } = useSessionContext();

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!session || !session?.user || !session.user.id) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    }

    setLoading(true);
    const loadingToastId = toast.loading("در حال ثبت سفارش...");

    try {
      const response = await actions.checkout(session.user.id);

      toast.dismiss(loadingToastId); // Dismiss the loading toast

      if (response.success) {
        // If checkout is successful
        dispatch(fetchCart(session.user.id)); // Optionally re-fetch if needed
        toast.success("سفارش شما با موفقیت ثبت شد!");
      } else {
        // Display the specific error returned from the server
        toast.error("خطایی رخ داده است");
      }
    } catch (error) {
      toast.dismiss(loadingToastId); // Dismiss the loading toast
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        color="dark"
        styles="w-full"
        outline
        onClick={handleCheckout}
        loading={loading && <Spinner size={20} color="dark" />}
        disabled={loading}
      >
        پرداخت
      </Button>
    </div>
  );
}
