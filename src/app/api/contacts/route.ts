import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/libs/Db';
import { contactsSchema } from '@/models/Schema';
import {
  ContactListValidation,
  ContactPostValidation,
  DeleteContactValidation,
  ContactGetValidation,
} from '@/validations/ContactValidation';

export const GET = async () => {
  const dbContacts = await db.select().from(contactsSchema);
  const apiContacts = ContactListValidation.parse(dbContacts);


  return NextResponse.json(apiContacts);
};

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = ContactPostValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    const contacts = await db
      .insert(contactsSchema)
      .values(parse.data)
      .returning();


    return NextResponse.json({
      id: contacts[0]?.id,
    });
  } catch (error) {

    return NextResponse.json({}, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = ContactGetValidation.safeParse(json);

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
      .where(eq(contactsSchema.id, parse.data.id));


    return NextResponse.json({});
  } catch (error) {

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
      .where(eq(contactsSchema.id, parse.data.id));


    return NextResponse.json({});
  } catch (error) {

    return NextResponse.json({}, { status: 500 });
  }
};
