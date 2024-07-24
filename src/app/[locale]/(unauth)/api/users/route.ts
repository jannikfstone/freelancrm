import { NextResponse } from "next/server";
import { UserPostValidation } from "@/validations/UserValidation";
import bcrypt from "bcrypt";
import { db } from "@/libs/DB";
import { userSchema } from "@/models/Schema";

export async function POST(req: Request) {
  const body = await req.json();
  const parseResult = UserPostValidation.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.format() },
      { status: 400 },
    );
  }
  const hashedPassword = bcrypt.hashSync(parseResult.data.password, 10);
  try {
    await db.insert(userSchema).values({
      email: parseResult.data.email,
      password: hashedPassword
    }).returning();
  } catch (e) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 },
    );
  }
  return NextResponse.json({ success: true });
}
