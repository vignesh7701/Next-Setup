import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-config";
import { redirect } from "next/navigation";
import { cache } from "react";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export const verifySession = cache(async () => {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }

  return { isAuth: true, userId: (session.user as any).id };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  
  try {
    await dbConnect();
    // Use lean() for faster queries if we don't need mongoose document methods
    const user = await User.findById(session.userId).select('-password').lean();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
});
