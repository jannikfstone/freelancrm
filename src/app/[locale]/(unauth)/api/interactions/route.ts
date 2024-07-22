import { InteractionPostValidation } from "@/validations/InteractionValidation";
import { NextResponse } from "next/server";
import { db } from "@/libs/DB";
import { interactionsSchema } from "@/models/Schema";
import { logger } from "@/libs/Logger";

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
      'A new interaction has been created with the following data: %j',
      parse.data,
    );

    return NextResponse.json({
      id: interactions[0]?.id,
    });
  } catch (error) {
    logger.error(error, 'An error occurred while creating an interaction');

    return NextResponse.json({}, { status: 500 });
  }
}