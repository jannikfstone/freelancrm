import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { companiesSchema } from '@/models/Schema';
import {
  CompanyValidation,
  DeleteCompanyValidation,
  EditCompanyValidation,
} from '@/validations/CompanyValidation';

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = CompanyValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    const companies = await db
      .insert(companiesSchema)
      .values(parse.data)
      .returning();

    logger.info('A new company has been created');

    return NextResponse.json({
      id: companies[0]?.id,
    });
  } catch (error) {
    logger.error(error, 'An error occurred while creating a company');

    return NextResponse.json({}, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = EditCompanyValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await db
      .update(companiesSchema)
      .set({
        ...parse.data,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(companiesSchema.id, parse.data.id))
      .run();

    logger.info('A company entry has been updated');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while updating a company');

    return NextResponse.json({}, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  const json = await request.json();
  const parse = DeleteCompanyValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await db
      .delete(companiesSchema)
      .where(eq(companiesSchema.id, parse.data.id))
      .run();

    logger.info('A company entry has been deleted');

    return NextResponse.json({});
  } catch (error) {
    logger.error(error, 'An error occurred while deleting a company');

    return NextResponse.json({}, { status: 500 });
  }
};
