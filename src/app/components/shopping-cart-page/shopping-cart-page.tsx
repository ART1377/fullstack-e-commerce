import React from "react";
import ShoppingCartPageHeader from "./shopping-cart-page-header/shopping-cart-page-header";
import Checkout from "./checkout/checkout";
import ShoppingCartPageItem from "./shopping-cart-page-item/shopping-cart-page-item";
import { getFilteredProducts } from "@/app/actions/product-action";
import { Product } from "../../../../next-type-models";

type Props = {
};

const ShoppingCartPage = async (props: Props) => {
  // need change
  const { products,totalCount } = await getFilteredProducts({});
  
  return (
    <section className="w-full mt-4 sm:mt-10 flex flex-col gap-y-8 bmlg:flex-row-reverse">
      {/* cart items - header */}
      <div className="w-full flex flex-col gap-3 bmlg:w-[calc(100%-300px)]">
        {/* header */}
        <ShoppingCartPageHeader productsCount={totalCount!} />
        {/* cart items */}
        <div className="flex flex-col gap-3">
          {products.map((product: Product) => {
            return <ShoppingCartPageItem key={product.id} product={product} />;
          })}
        </div>
      </div>
      {/* checkout */}
      <Checkout productsCount={totalCount!} />
    </section>
  );
};

export default ShoppingCartPage;
