import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const companiesSchema = sqliteTable('companies', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  website: text('website'),
  status: text('status').default('ACTIVE'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});

export const contactsSchema = sqliteTable('contacts', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  firstName: text('first_name').notNull(),
  email: text('email'),
  phone: text('phone'),
  position: text('position'),
  companyName: text('name'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});
