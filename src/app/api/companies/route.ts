import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { dbPlain } from '@/libs/Db';
import { companiesSchema } from "@/models/Schema";
import {
  CompanyPostValidation,
  DeleteCompanyValidation,
  CompanyValidation, CompaniesListValidation
} from "@/validations/CompanyValidation";

export const GET = async () => {
  const dbCompanies = await dbPlain.select().from(companiesSchema).all();
  const apiCompanies = CompaniesListValidation.parse(dbCompanies);


  return NextResponse.json(apiCompanies);
};

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = CompanyPostValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    const companies = await dbPlain
      .insert(companiesSchema)
      .values(parse.data)
      .returning();


    return NextResponse.json({
      id: companies[0]?.id,
    });
  } catch (error) {

    return NextResponse.json({}, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = CompanyValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await dbPlain
      .update(companiesSchema)
      .set({
        ...parse.data,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(companiesSchema.id, parse.data.id))
      .run();


    return NextResponse.json({});
  } catch (error) {

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
    await dbPlain
      .delete(companiesSchema)
      .where(eq(companiesSchema.id, parse.data.id))
      .run();


    return NextResponse.json({});
  } catch (error) {

    return NextResponse.json({}, { status: 500 });
  }
};
