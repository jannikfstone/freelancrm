import { NextResponse } from "next/server";
import { UserPostValidation } from "@/validations/UserValidation";
import { dbPlain } from "@/libs/Db";
import { userSchema } from "@/models/Schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();
  const parseResult = UserPostValidation.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.format() },
      { status: 400 },
    );
  }
  try {
    await dbPlain
      .insert(userSchema)
      .values({
        email: parseResult.data.email,
        id: uuidv4(),
      })
      .returning();
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
