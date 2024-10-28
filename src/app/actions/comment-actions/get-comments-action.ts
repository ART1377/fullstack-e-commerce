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
// Recursive function to fetch comments with children
async function fetchCommentsWithChildren(
  productId: string,
  sortOption: string,
  parentId?: string
): Promise<CommentWithAuthor[]> {
  const comments = await db.comment.findMany({
    where: { productId: productId, parentId: parentId || null },
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
    orderBy: sortOption === "newest" ? { createdAt: "desc" } : undefined, // Only sort here if by newest
  });

  // Process comments to calculate like and dislike counts
  const processedComments = await Promise.all(
    comments.map(async (comment) => {
      const likeCount = comment.likes.filter((like) => like.isLike).length;
      const dislikeCount = comment.likes.length - likeCount;

      return {
        ...comment,
        likeCount,
        dislikeCount,
        children: await fetchCommentsWithChildren(
          productId,
          sortOption,
          comment.id
        ),
      };
    })
  );

  // Sort by like/dislike counts after processing if needed
  if (sortOption === "mostLikes") {
    processedComments.sort((a, b) => b.likeCount - a.likeCount);
  } else if (sortOption === "mostDislikes") {
    processedComments.sort((a, b) => b.dislikeCount - a.dislikeCount);
  }

  return processedComments;
}


export const getComments = async (
  productId: string,
  sort?: string
): Promise<GetCommentsResponse> => {
  console.log("runningggggggggggggggg", sort);
  try {
    const comments = await fetchCommentsWithChildren(
      productId,
      sort || "newest"
    );
    return { success: true, comments };
  } catch (error) {
    return {
      success: false,
      errors: "مشکلی در دریافت نظرات به وجود آمد",
    };
  }
};
