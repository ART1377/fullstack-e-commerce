import { db } from "@/app/db/db";

// Types for comments and response
type GetCommentsResponse = {
  success: boolean;
  comments?: CommentWithAuthor[];
  errors?: string;
};

export type CommentWithAuthor = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  user: {
    id: string;
    image: string | null;
    firstName: string;
    lastName: string;
  };
  likeCount: number;
  dislikeCount: number;
  children?: CommentWithAuthor[]; // For recursive comments
};

// Recursive function to fetch comments with children
async function fetchCommentsWithChildren(
  commentId?: string
): Promise<CommentWithAuthor[]> {
  const comments = await db.comment.findMany({
    where: {
      parentId: commentId || null,
    },
    include: {
      user: {
        select: {
          id: true,
          image: true,
          firstName: true,
          lastName: true,
        },
      },
      likes: {
        select: {
          isLike: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return await Promise.all(
    comments.map(async (comment) => {
      const likeCount = comment.likes.filter((like) => like.isLike).length;
      const dislikeCount = comment.likes.length - likeCount;

      return {
        ...comment,
        likeCount,
        dislikeCount,
        children: await fetchCommentsWithChildren(comment.id), // Fetch nested children recursively
      };
    })
  );
}

export const getComments = async (
  productId: string,
  sort?: string
): Promise<GetCommentsResponse> => {
  try {
    const comments = await fetchCommentsWithChildren();

    return { success: true, comments };
  } catch (error) {
    return {
      success: false,
      errors: "مشکلی در دریافت نظرات به وجود آمد",
    };
  }
};
