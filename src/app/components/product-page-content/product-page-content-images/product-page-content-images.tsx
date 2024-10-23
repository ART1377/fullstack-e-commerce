"use client";

import React, { useEffect, useState } from "react";
import ArrowLeftIcon from "@/app/icons/arrow-left-icon";
import ArrowRightIcon from "@/app/icons/arrow-right-icon";
import Image from "next/image";
import { ProductImage } from "../../../../../next-type-models";

type Props = {
  images: ProductImage[];
  title: string;
};

const ProductPageContentImages = ({ images, title }: Props) => {
  const [current, setCurrent] = useState<number>(0);


  // to change slide each 5 second
  useEffect(() => {
    const lastElementIndex = Math.min(images.length, 2);

    const setSlider = setInterval(() => {
      if (lastElementIndex == 1) {
        return;
      }
      setCurrent((prev) => {
        if (prev == lastElementIndex) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);
    return () => {
      clearInterval(setSlider);
    };
  }, [current, images.length]);

  // change slide onClick to small images
  const changeSlide = (value: number) => {
    setCurrent(value);
  };

  // slider arrows click handler
  const handleArrowClick = (value: string) => {
    const lastElementIndex = Math.min(images.length, 2);
    if (value == "prev") {
      if (current === 0) {
        setCurrent(lastElementIndex);
      } else {
        setCurrent((prev: number) => prev - 1);
      }
    }
    if (value == "next") {
      if (current === lastElementIndex) {
        setCurrent(0);
      } else {
        setCurrent((prev: number) => prev + 1);
      }
    }
  };

  
  return (
    <div className="w-full flex flex-col gap-y-5 gap-x-2 xs:flex-row-reverse md:w-1/2 md:flex-col lg:flex-row-reverse">
      {/* big image */}
      <div className="w-full aspect-square relative xs:w-[75%] md:w-full md:aspect-auto md:min-h-[300px] lg:w-[75%]">
        <Image
          alt={title}
          src={images[current]?.url}
          fill
          style={{
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
        {/* slider button */}
        <div className="flex gap-3 rounded-full bg-light px-3 py-2 absolute-horizontally-center -bottom-4">
          <button
            onClick={() => handleArrowClick("prev")}
            className={`slider-button custom-shape bg-primary-main text-white flex-center size-6 cursor-pointer custom-transition hover:bg-primary-light`}
          >
            <ArrowRightIcon />
          </button>
          <button
            onClick={() => handleArrowClick("next")}
            className={`slider-button custom-shape bg-primary-main text-white flex-center size-6 cursor-pointer custom-transition hover:bg-primary-light`}
          >
            <ArrowLeftIcon />
          </button>
        </div>
      </div>
      {/* small images */}
      <div className="w-full flex gap-2 justify-between xs:flex-col xs:w-[25%] md:w-full md:flex-row lg:flex-col lg:w-[25%]">
        {images.slice(0, 3).map((image: ProductImage, index: number) => {
          return (
            <div
              key={image.id}
              onClick={() => changeSlide(index)}
              className={`cursor-pointer w-1/3 aspect-square relative rounded-xl overflow-hidden custom-transition hover:opacity-60 xs:w-full md:w-1/3 md:aspect-auto md:min-h-[130px] lg:w-full ${
                index === current && "border-4 border-customGray-300"
              }`}
            >
              <Image
                alt={title}
                src={image.url}
                fill
                style={{
                  objectFit: "cover",
                  borderRadius: "12px",
                  padding: `${index === current && "4px"}`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPageContentImages;
