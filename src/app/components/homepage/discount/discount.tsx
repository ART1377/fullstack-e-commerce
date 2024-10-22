import React from "react";
import Image from "next/image";
import DiscountSlider from "./discount-slider/discount-slider";
import { getFilteredProducts } from "@/app/actions/product-action";

type Props = {};

const Discount = async (props: Props) => {
  // need change
  const { products } = await getFilteredProducts({});

  return (
    <section id="discount" className="mt-[450px] blgxl:mt-[500px]">
      <div className="relative w-full min-h-[100px] bg-primary-200 rounded-s-3xl flex">
        <div className="w-fit h-full relative [min-height:inherit] bg-primary-main py-4 px-3 flex-center flex-col text-center text-light text-bodyMainBold rounded-s-3xl md:text-h6 lg:text-h4 lg:px-10 lg:py-14">
          تخفیفات
          <div>ویژه</div>
          <div className="absolute top-full w-[75px] h-[120px] lg:w-[100px] lg:h-[150px]">
            <Image
              alt="تخفیف"
              src="/images/discount.png"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <DiscountSlider products={products} />
      </div>
    </section>
  );
};

export default Discount;
