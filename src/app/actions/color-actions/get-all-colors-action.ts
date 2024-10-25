"use server";

import { db } from "../../db/db";

export const getAllColors = async () => {
  try {
    const colors = await db.color.findMany({});
    return colors;
  } catch (error) {
    console.log(error);
  }
};
