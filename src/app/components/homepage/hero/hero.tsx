import React, { Suspense } from "react";
import HeroContent from "./hero-content/hero-content";
import * as actions from '@/app/actions/product-actions/product-action'
import Spinner from "../../spinner/spinner";

type Props={}

const Hero = async(props: Props) => {

  const { products } = await actions.getNewestHeroProducts();

  return (
    <>
        <HeroContent products={products} />
    </>
  );
};

export default Hero;
