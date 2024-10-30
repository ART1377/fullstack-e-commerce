"use server";

import { db } from "@/app/db/db";
import { Notification } from "../../../../next-type-models";

export type OrderWithName = Notification & {
  userName: string;
  totalItems: number;
};

type Filters = {
  page?: string;
  limit?: number;
};

interface GetNotificationsState {
  success: boolean;
  error?: string;
  notifications?: any;
  totalPages?: number;
  currentPage?: number;
  totalCount?: number;
}

export async function getAllNotification({
  page,
  limit,
}: Filters): Promise<GetNotificationsState> {
  const pageQuery = page ? parseInt(page) : undefined;
  const skip = pageQuery && limit ? (pageQuery - 1) * limit : undefined;

  try {
    const totalCount = await db.notification.count();

    const notifications = (await db.notification.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        type: true,
        message: true,
        isRead: true,
        createdAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            image: true,
          },
        },
      },
    })) as Notification[];

    // Return the notifications and pagination info
    return {
      success: true,
      notifications,
      totalPages: limit ? Math.ceil(totalCount / limit) : 1,
      currentPage: pageQuery || 1,
      totalCount,
    };
  } catch (error) {
    return {
      success: false,
      error: "خطایی در دریافت محصولات رخ داده است.",
    };
  }
}