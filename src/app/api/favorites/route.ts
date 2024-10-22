import { db } from "@/app/db/db";
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
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching favorites" },
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

    return NextResponse.json({ success: true, favorite });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.json(
      { success: false, message: "Error adding to favorites" },
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return NextResponse.json(
      { success: false, message: "Error removing from favorites" },
      { status: 500 }
    );
  }
}
