import React, { Suspense } from "react";
import ProductPageContentImages from "./product-images/product-images";
import ProductPageContentInformation from "./product-page-information/product-page-information";
import ProductPageContentTabs from "./product-page-tabs/product-page-tabs";
import ProductPageContentRelatedProducts from "./related-products/related-products";
import { Product } from "../../../../next-type-models";
import { CommentWithAuthor } from "@/app/actions/comment-actions/get-comments-action";
import Spinner from "../spinner/spinner";

type Props = {
  product: Product;
  productId: string;
  comments: CommentWithAuthor[] | undefined;
};

const ProductPageContent = ({ product, productId, comments }: Props) => {
  const { images, title, description, features } = product;



  return (
    <section className="w-full mt-4 sm:mt-10">
      <div className="flex flex-col gap-7 md:flex-row">
        {/* images */}
        <ProductPageContentImages images={images?.slice(0, 3)!} title={title} />
        {/* content - information */}
        <ProductPageContentInformation
          product={product!}
          commentsCount={
            comments?.length != undefined && comments?.length > 0
              ? comments?.length
              : 0
          }
        />
      </div>
      <ProductPageContentTabs
        description={description}
        comments={comments!}
        features={features!}
      />
      <Suspense
        fallback={
          <div className="w-full h-full flex-center min-h-[300px]">
            <Spinner size={50} />
          </div>
        }
      >
        <ProductPageContentRelatedProducts productId={productId} />
      </Suspense>
    </section>
  );
};

export default ProductPageContent;
