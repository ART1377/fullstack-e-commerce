"use client";

import React from "react";
import ProductCard from "@/app/components/product-card/product-card";
import ArrowLeftIcon from "@/app/icons/arrow-left-icon";
import ArrowRightIcon from "@/app/icons/arrow-right-icon";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Product } from "../../../../../../next-type-models";

type Props = {
  products: Product[];
};

const ProfilePageFavoritesSlider = ({ products }: Props) => {
  return (
    <>
      <Swiper
        slidesPerView="auto"
        navigation={{
          nextEl: ".newest-shoes-next",
          prevEl: ".newest-shoes-prev",
        }}
        modules={[Navigation]}
        className="newest-shoes-swiper mt-4 lg:mt-5"
      >
        {products.map((product: Product) => {
          return (
            <SwiperSlide
              key={product.id}
              className="max-w-[260px] w-fit rounded-2xl p-2 bg-light !mr-0 !ml-2 lg:max-w-[300px] lg:!ml-4"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex w-full justify-center gap-5 mt-5">
        <button
          className={`slider-button newest-shoes-prev custom-shape bg-primary-main text-white flex-center size-10 cursor-pointer custom-transition hover:bg-primary-light`}
        >
          <ArrowRightIcon size={32} />
        </button>
        <button
          className={`slider-button newest-shoes-next custom-shape bg-primary-main text-white flex-center size-10 cursor-pointer custom-transition hover:bg-primary-light`}
        >
          <ArrowLeftIcon size={32} />
        </button>
      </div>
    </>
  );
};

export default ProfilePageFavoritesSlider;
