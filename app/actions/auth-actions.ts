"use server";

import bcrypt from "bcryptjs";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export async function registerUser(data: { name: string; email: string; password: string }) {
  try {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return { error: "Missing required fields" };
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Internal server error" };
  }
}