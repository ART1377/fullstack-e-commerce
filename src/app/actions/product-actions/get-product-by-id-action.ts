"use server";

import { Product } from "../../../../next-type-models";
import { db } from "../../db/db";

interface GetProductByIdState {
  success: boolean;
  error?: string;
  product?: Product; //need change
}
// Define a function to fetch a product by its ID
export async function getProductById(
  productId: string
): Promise<GetProductByIdState> {
  try {
    // Query the product by ID, including related features, stock, and images
    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        features: true, // Include the related features
        images: true, // Optionally include images if needed
        stock: {
          include: {
            color: true, // Include all fields from the ProductColor model
          },
        },
      },
    });

    // If the product is not found, return null or handle accordingly
    if (!product) {
      return {
        success: false,
        error: "اطلاعاتی یافت نشد",
      }; // Or you can throw an error or return a custom message
    }

    // Return the product data
    return {
      success: true,
      product,
    };
  } catch (error) {
    // Handle any errors that occur during the query
    return {
      success: false,
      error: "خطایی رخ داده است",
    };
  }
}
