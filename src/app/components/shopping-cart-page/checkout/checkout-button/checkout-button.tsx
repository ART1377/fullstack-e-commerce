"use client";

import Spinner from "@/app/components/spinner/spinner";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as actions from "@/app/actions/checkout-actions/checkout-actions";
import Button from "@/app/components/button/button";
import { useSessionContext } from "@/app/context/useSessionContext";
import { fetchFavorites } from "@/app/redux/slices/favoritesSlice";
import { useAppDispatch } from "@/app/redux/hooks/hook";

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
      await actions.checkout(session.user.id); // Execute checkout logic
      dispatch(fetchFavorites(session.user.id)); // Optionally re-fetch if needed
      toast.dismiss(loadingToastId); // Dismiss the loading toast
      toast.success("سفارش شما با موفقیت ثبت شد!");
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
        onClick={handleCheckout}
        disabled={loading}
        loading={loading && <Spinner size={20} color="dark" />}
        color="dark"
        styles="w-full"
        outline
      >
        پرداخت
      </Button>
    </div>
  );
}
