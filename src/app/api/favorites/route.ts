import { db } from "@/app/db/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Assuming you have a similar setup to your existing POST and DELETE
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const favorites = await db.favorite.findMany({
      where: { userId: userId! },
    });

    return NextResponse.json({ success: true, favorites });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطایی رخ داده است" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { userId, productId } = await req.json();

  try {
    const favorite = await db.favorite.create({
      data: {
        userId: userId,
        productId: productId,
      },
    });

    revalidatePath("/profile");
    return NextResponse.json({ success: true, favorite });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطایی رخ داده است" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { userId, productId } = await req.json();

  try {
    await db.favorite.deleteMany({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    revalidatePath("/profile");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطایی رخ داده است" },
      { status: 500 }
    );
  }
}
