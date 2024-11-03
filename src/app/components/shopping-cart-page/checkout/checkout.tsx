import { formatPrice } from "@/app/lib/format-price";
import React from "react";
import Title from "../../title/title";
import Spinner from "../../spinner/spinner";
import CheckoutButton from "./checkout-button/checkout-button";

type Props = {
  totalQuantity: number;
  totalPrice: number;
  totalDiscount: number;
  loading: boolean;
};

const Checkout = ({
  totalQuantity,
  totalPrice,
  totalDiscount,
  loading,
}: Props) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow w-[280px] h-fit mx-auto">
      {loading ? (
        <div className="h-[320px]">
          <Spinner size={32} />
        </div>
      ) : (
        <>
          <Title>پرداخت</Title>
          <div className="flex flex-col gap-5 mt-2 mb-7">
            <div className="flex items-center justify-between">
              <small className="text-bodySmall text-customGray-500">
                تعداد کالا
              </small>
              <small className="text-bodyMain text-customGray-500">
                {totalQuantity}
              </small>
            </div>

            <div className="flex items-center justify-between">
              <small className="text-bodySmall text-customGray-500">قیمت</small>
              <div className="text-bodyMain text-customGray-500 flex gap-1">
                <span>{formatPrice(totalPrice)}</span>
                <span>تومان</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <small className="text-bodySmall text-customGray-500">
                سود شما از خرید
              </small>
              <div className="text-bodyMain text-state-success flex gap-1">
                <span>{formatPrice(totalPrice - totalDiscount)}</span>
                <span>تومان</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <small className="text-bodySmall text-customGray-500">
                هزینه ارسال
              </small>
              <small className="text-bodyMain text-state-success">رایگان</small>
            </div>

            <div className="flex items-center justify-between border-t border-customGray-300 pt-3">
              <small className="text-bodyMain text-dark">قیمت کل</small>
              <div className="text-bodyMain text-dark flex gap-1">
                <span>{formatPrice(totalDiscount)}</span>
                <span>تومان</span>
              </div>
            </div>
          </div>
          <CheckoutButton />
        </>
      )}
    </div>
  );
};

export default Checkout;
