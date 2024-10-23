"use client";
import React from "react";
import ProductCard from "../../../product-card/product-card";
import ArrowLeftIcon from "@/app/icons/arrow-left-icon";
import ArrowRightIcon from "@/app/icons/arrow-right-icon";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Product } from "../../../../../../next-type-models";

type Props = {
    products:Product[];
};

const DiscountSlider = ({products}: Props) => {
  return (
    <>
      <div
        id="discount-slider-container"
        className="w-full mr-2 xs:mr-4 md:mr-6"
      >
        <Swiper
          slidesPerView="auto"
          navigation={{
            nextEl: ".discount-next",
            prevEl: ".discount-prev",
          }}
          modules={[Navigation]}
          className="discount-swiper !absolute w-[calc(100%-96px)] bottom-10 xs:w-[calc(100%-105px)] md:w-[calc(100%-130px)] lg:w-[calc(100%-240px)]"
        >
          {products.map((product: Product) => {
            return (
              <SwiperSlide
                key={product.id}
                className="max-w-[260px] min-w-fit rounded-2xl p-2 bg-light !mr-0 !ml-4 xs:p-3 lg:max-w-[300px]"
              >
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex gap-2 rounded-full p-2 absolute -top-20 right-2 lg:gap-5 lg:px-5 lg:py-4 lg:-top-24">
        <button
          className={`slider-button discount-prev custom-shape bg-primary-main text-white flex-center size-7 cursor-pointer custom-transition hover:bg-primary-light sm:size-8 lg:size-10`}
        >
          <ArrowRightIcon size={32} />
        </button>
        <button
          className={`slider-button discount-next custom-shape bg-primary-main text-white flex-center size-7 cursor-pointer custom-transition hover:bg-primary-light sm:size-8 lg:size-10`}
        >
          <ArrowLeftIcon size={32} />
        </button>
      </div>
    </>
  );
};

export default DiscountSlider;

{
  /* <SwiperSlide
  slidesPerView={3}
  spaceBetween={30}
  navigation={{
    nextEl: ".discount-next",
    prevEl: ".discount-prev",
  }}
  modules={[Navigation]}
  className="discount-swiper"
>
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
  <SwiperSlide>Slide 3</SwiperSlide>
  <SwiperSlide>Slide 4</SwiperSlide>
  <SwiperSlide>Slide 5</SwiperSlide>
  <SwiperSlide>Slide 6</SwiperSlide>
  <SwiperSlide>Slide 7</SwiperSlide>
  <SwiperSlide>Slide 8</SwiperSlide>
  <SwiperSlide>Slide 9</SwiperSlide>
</Swiper>

<div className="flex justify-between mt-4">
  <button className={`discount-prev ${discountButtonStyle}`}>Prev</button>
  <button className={`discount-next ${discountButtonStyle}`}>Next</button>
</div> */
}

