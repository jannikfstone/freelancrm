import { NextResponse } from "next/server";

import { dbPlain } from "@/libs/Db";
import { companiesSchema, interactionsSchema } from "@/models/Schema";
import {
  InteractionListValidation,
  InteractionPostValidation,
} from "@/validations/InteractionValidation";
import { eq } from "drizzle-orm";

export async function GET() {
  const dbInteractions = await dbPlain
    .select({
      companyId: interactionsSchema.companyId,
      date: interactionsSchema.date,
      notes: interactionsSchema.notes,
      companyName: companiesSchema.name,
    })
    .from(interactionsSchema)
    .leftJoin(
      companiesSchema,
      eq(interactionsSchema.companyId, companiesSchema.id),
    )
    .all();
  const apiInteractions = InteractionListValidation.parse(dbInteractions);

  return NextResponse.json(apiInteractions);
}

export async function POST(request: Request) {
  const json = await request.json();
  const parse = InteractionPostValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 400 });
  }

  try {
    const interactions = await dbPlain
      .insert(interactionsSchema)
      .values(parse.data)
      .returning();


    return NextResponse.json({
      id: interactions[0]?.id,
    });
  } catch (error) {

    return NextResponse.json({}, { status: 500 });
  }
}
