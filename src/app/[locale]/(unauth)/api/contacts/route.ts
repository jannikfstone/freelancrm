import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { contactsSchema } from '@/models/Schema';
import {
  ContactValidation,
  DeleteContactValidation,
  EditContactValidation,
} from '@/validations/ContactValidation';

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = ContactValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    const contacts = await db
      .insert(contactsSchema)
      .values(parse.data)
      .returning();

    logger.info(
      'A new contact has been created with the following data: %j',
      parse.data,
    );

    return NextResponse.json({
      id: contacts[0]?.id,
    });
  } catch (error) {
    logger.error(error, 'An error occurred while creating a contact');

    return NextResponse.json({}, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = EditContactValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await db
      .update(contactsSchema)
      .set({
        ...parse.data,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(contactsSchema.id, parse.data.id))
      .run();

    logger.info('A contact entry has been updated');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while updating a contact');

    return NextResponse.json({}, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  const json = await request.json();
  const parse = DeleteContactValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await db
      .delete(contactsSchema)
      .where(eq(contactsSchema.id, parse.data.id))
      .run();

    logger.info('A contact entry has been deleted');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while deleting a contact');

    return NextResponse.json({}, { status: 500 });
  }
};
