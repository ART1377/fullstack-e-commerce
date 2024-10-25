import type { Metadata } from "next";
import Hero from "@/app/components/homepage/hero/hero";
import Discount from "@/app/components/homepage/discount/discount";
import Category from "@/app/components/homepage/category/category";
import NewestShoes from "@/app/components/homepage/newest-shoes/newest-shoes";
import NewestClothes from "@/app/components/homepage/newest-clothes/newest-clothes";
import Options from "@/app/components/homepage/options/options";
import { Color } from "../../../../../next-type-d";
import { db } from "@/app/db/db";
import * as actions from "@/app/actions/product-actions/product-action";

export const metadata: Metadata = {
  title: "هامتوسیتی - صفحه اصلی",
  description: "صفحه اصلی فروشگاه هامتوسیتی",
};

export default async function Home() {
  // await db.product.deleteMany({});

  // const colors = [
  //   {
  //     title: "red",
  //     hex: "#FF0000",
  //     persian: "قرمز",
  //   },
  //   {
  //     title: "green",
  //     hex: "#00FF00",
  //     persian: "سبز",
  //   },
  //   {
  //     title: "blue",
  //     hex: "#0000FF",
  //     persian: "آبی",
  //   },
  //   {
  //     title: "yellow",
  //     hex: "#FFFF00",
  //     persian: "زرد",
  //   },
  //   {
  //     title: "orange",
  //     hex: "#FFA500",
  //     persian: "نارنجی",
  //   },
  //   {
  //     title: "purple",
  //     hex: "#800080",
  //     persian: "بنفش",
  //   },
  //   {
  //     title: "pink",
  //     hex: "#FFC0CB",
  //     persian: "صورتی",
  //   },
  //   {
  //     title: "brown",
  //     hex: "#A52A2A",
  //     persian: "قهوه‌ای",
  //   },
  //   {
  //     title: "black",
  //     hex: "#000000",
  //     persian: "مشکی",
  //   },
  //   {
  //     title: "white",
  //     hex: "#FFFFFF",
  //     persian: "سفید",
  //   },
  // ];

  // await db.color.deleteMany({});

  // Check if colors are already in the database
  // const existingColors = await db.color.findMany({
  //   where: {
  //     title: {
  //       in: colors.map((color) => color.title),
  //     },
  //   },
  // });

  // // Find new colors that don't already exist
  // const newColors = colors.filter(
  //   (color) =>
  //     !existingColors.some(
  //       (existingColor) => existingColor.title === color.title
  //     )
  // );

  // // Only create colors if there are any new ones
  // if (newColors.length > 0) {
  //   await db.color.createMany({
  //     data: newColors,
  //   });
  // }

  // need change
  const { products } = await actions.getAllProducts();

  return (
    <>
      <Hero products={products.slice(0, 3)} />
      <Discount />
      <Category />
      <NewestShoes />
      <NewestClothes />
      <Options />
    </>
  );
}
