"use server";

import { db } from "../db/db";
import * as auth from "@/app/auth";
import { PAGE_LIMIT } from "../lib/values";
import { User } from "../../../next-type-models";

// get list of filtered users
type Filters = {
  page?: string;
  limit?: number;
  searchQuery?: string;
  sortBy?: "createdAt"; // Sort by user creation date
  sortOrder?: "asc" | "desc"; // Ascending or descending order
};

interface GetUsersState {
  success: boolean;
  error?: string;
  users?: any;
  totalPages?: number;
  currentPage?: number;
  totalCount?: number;
}

export async function getAllUsers({
  page = "1",
  limit = PAGE_LIMIT, // Default limit
  searchQuery = "",
  sortBy, // Default sort by user creation date
  sortOrder, // Default sorting order
}: Filters): Promise<GetUsersState> {
  const pageQuery = parseInt(page); // Convert page to a number
  const skip = (pageQuery - 1) * limit; // Calculate how many records to skip
  const searchQueryLowerCase = searchQuery.toLowerCase(); // Normalize search query

  try {
    // Count total users for pagination
    const totalCount = await db.user.count({
      where: {
        OR: [
          {
            firstName: { contains: searchQueryLowerCase },
          },
          { lastName: { contains: searchQueryLowerCase } },
        ],
      },
    });

    // Build dynamic sorting logic based on sortBy and sortOrder
    let orderBy: any = undefined;

    if (sortBy === "createdAt") {
      orderBy = { createdAt: sortOrder };
    }

    // Fetch users with pagination, search, and sorting by user creation date
    const users = await db.user.findMany({
      skip,
      take: limit,
      where: {
        OR: [
          {
            firstName: { contains: searchQueryLowerCase },
          },
          { lastName: { contains: searchQueryLowerCase } },
        ],
      },
      orderBy: orderBy,
      select: {
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        createdAt: true, // Date of user creation
        orders: {
          select: {
            price: true, // Total price of the order
            createdAt: true, // Date of the order
          },
        },
      },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      users,
      totalPages,
      currentPage: pageQuery,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching users: ", error);
    return {
      success: false,
      error: "An error occurred while fetching users",
    };
  }
}

interface GetUserByIdState {
  success: boolean;
  error?: string;
  user?: any;
}

export async function getUserProfileInformation(
  userId: string
): Promise<GetUserByIdState> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        orders: true,
        favorites: true,
      },
    });

    return { success: true, user };
  } catch (error) {
    return { success: true, error: "خطایی رخ داده است" };
  }
}
