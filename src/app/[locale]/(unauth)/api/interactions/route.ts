import { NextResponse } from "next/server";

import { db } from "@/libs/DB";
import { logger } from "@/libs/Logger";
import { companiesSchema, interactionsSchema } from "@/models/Schema";
import {
  InteractionListValidation,
  InteractionPostValidation,
} from "@/validations/InteractionValidation";
import { eq } from "drizzle-orm";

export async function GET() {
  const dbInteractions = await db
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
    const interactions = await db
      .insert(interactionsSchema)
      .values(parse.data)
      .returning();

    logger.info(
      "A new interaction has been created with the following data: %j",
      parse.data,
    );

    return NextResponse.json({
      id: interactions[0]?.id,
    });
  } catch (error) {
    logger.error(error, "An error occurred while creating an interaction");

    return NextResponse.json({}, { status: 500 });
  }
}
