import type { Metadata } from "next";
import Hero from "@/app/components/homepage/hero/hero";
import Discount from "@/app/components/homepage/discount/discount";
import Category from "@/app/components/homepage/category/category";
import NewestShoes from "@/app/components/homepage/newest-shoes/newest-shoes";
import NewestClothes from "@/app/components/homepage/newest-clothes/newest-clothes";
import Options from "@/app/components/homepage/options/options";
import Spinner from "@/app/components/spinner/spinner";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "هامتوسیتی - صفحه اصلی",
  description: "صفحه اصلی فروشگاه هامتوسیتی",
};

export default function Home() {


  return (
    <>
      <Suspense
        fallback={
          <div className="w-full h-full flex-center min-h-[300px]">
            <Spinner size={50} />
          </div>
        }
      >
        <Hero />
      </Suspense>
      <Suspense
        fallback={
          <div className="w-full h-full flex-center min-h-[300px]">
            <Spinner size={50} />
          </div>
        }
      >
        <Discount />
      </Suspense>
      <Category />
      <Suspense
        fallback={
          <div className="w-full h-full flex-center min-h-[300px]">
            <Spinner size={50} />
          </div>
        }
      >
        <NewestShoes />
      </Suspense>
      <Suspense
        fallback={
          <div className="w-full h-full flex-center min-h-[300px]">
            <Spinner size={50} />
          </div>
        }
      >
        <NewestClothes />
      </Suspense>
      <Options />
    </>
  );
}
