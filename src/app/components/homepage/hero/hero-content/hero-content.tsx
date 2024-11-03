"use client";
import React, { useState, useEffect, useCallback } from "react";
import HeroImages from "./hero-images/hero-images";
import { Product } from "../../../../../../next-type-models";
import HeroInformation from "./hero-information/hero-information";

type Props = {
  products: Product[];
};

const HeroContent = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const setSlider = setInterval(() => {
      setCurrent((prev) => {
        if (prev == 2) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);
    return () => {
      clearInterval(setSlider);
    };
  }, [current]);

  const changeSlide = useCallback((value: number) => {
    setCurrent(value);
  }, []);

  return (
    <>
      <section className="flex flex-col md:flex-row mt-[18%] md:mt-[8%]">
        {/* images */}
        <HeroImages
          products={products}
          current={current}
          changeSlide={changeSlide}
        />
        {/* content */}
        <HeroInformation key={current} product={products[current]} />
      </section>
    </>
  );
};

export default HeroContent;
