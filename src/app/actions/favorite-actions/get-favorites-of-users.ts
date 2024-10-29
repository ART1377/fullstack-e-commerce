"use server";

import { db } from "@/app/db/db";
import { Product, ProductImage, Stock } from "../../../../next-type-models";



export async function getUserFavorites(userId: string): Promise<Partial<Product>[]> {
  const userFavorites = await db.user.findUnique({
    where: { id: userId },
    select: {
      favorites: {
        select: {
          product: {
            select: {
              id: true,
              title: true,
              model: true,
              brand: true,
              description: true,
              price: true,
              category: true,
              rating: true,
              discount: true,
              isInDiscountSection: true,
              isInHeroSection: true,
              images: {
                select: {
                  id: true,          // Include ID
                  url: true,
                  productId: true,   // Include productId
                },
              },
              stock: {
                select: {
                  id: true, // Include id for Stock
                  size: true,
                  quantity: true,
                  color: {
                    select: {
                      title: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  // Map the fetched data to the `Partial<Product>` type
  return (
    userFavorites?.favorites.map((fav) => ({
      id: fav.product.id,
      title: fav.product.title,
      model: fav.product.model,
      brand: fav.product.brand,
      description: fav.product.description,
      price: fav.product.price,
      category: fav.product.category,
      rating: fav.product.rating,
      discount: fav.product.discount,
      isInDiscountSection: fav.product.isInDiscountSection,
      isInHeroSection: fav.product.isInHeroSection,
      images: fav.product.images?.map((image) => ({
        id: image.id,
        url: image.url,
        productId: image.productId, // Now included
        product: fav.product, // Include product reference
      })) as ProductImage[], // Ensure images are cast to ProductImage[]
      stock: fav.product.stock?.map((s) => ({
          id: s.id, // Include id for Stock
          size: s.size,
          quantity: s.quantity,
          color: s.color?.title || "",
      })) as unknown as Stock[], // Ensure stock is cast to Stock[]
    })) || []
  );
}

