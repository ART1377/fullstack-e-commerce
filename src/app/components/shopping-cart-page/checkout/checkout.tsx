import { formatPrice } from "@/app/lib/functions";
import React from "react";
import Title from "../../title/title";
import Button from "../../button/button";

type Props = {
  productsCount: number;
};

const Checkout = ({ productsCount }: Props) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow w-[280px] h-fit mx-auto">
      <Title>پرداخت</Title>
      <div className="flex flex-col gap-5 mt-2 mb-7">
        <div className="flex items-center justify-between">
          <small className="text-bodySmall text-customGray-500">
            تعداد کالا
          </small>
          <small className="text-bodyMain text-customGray-500">
            {productsCount}
          </small>
        </div>

        <div className="flex items-center justify-between">
          <small className="text-bodySmall text-customGray-500">قیمت</small>
          <div className="text-bodyMain text-customGray-500 flex gap-1">
            <span>{formatPrice(10400000)}</span>
            <span>تومان</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <small className="text-bodySmall text-customGray-500">
            سود شما از خرید
          </small>
          <div className="text-bodyMain text-state-success flex gap-1">
            <span>{formatPrice(1040000)}</span>
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
            <span>{formatPrice(9000000)}</span>
            <span>تومان</span>
          </div>
        </div>
      </div>
      <Button color="dark" styles="w-full" outline>
        پرداخت
      </Button>
    </div>
  );
};

export default Checkout;
