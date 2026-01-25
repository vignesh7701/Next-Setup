"use server";

import { verifySession, getUser } from "@/app/lib/dal";
import { revalidatePath } from "next/cache";

export async function getSessionUserProfile() {
  const session = await verifySession();
  if (!session) return { error: "Unauthorized" };

  const user = await getUser();
  return { user: JSON.parse(JSON.stringify(user)) };
} 
