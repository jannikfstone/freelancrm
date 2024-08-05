import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const companiesSchema = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name", ).notNull(),
  description: text("description", ),
  website: text("website"),
  status: text("status").default("ACTIVE"),
  createdAt: timestamp("created_at", { withTimezone: false}).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: false}).defaultNow()
});

export const contactsSchema = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  firstName: text("first_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  role: text("position"),
  companyName: text("company_name"),
  createdAt: timestamp("created_at", { withTimezone: false}).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: false}).defaultNow()
});

export const interactionsSchema = pgTable("interactions", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companiesSchema.id),
  date: text("date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: false}).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: false}).defaultNow()
});

export const userSchema = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  role: text("role").default("USER"),
  createdAt: timestamp("created_at", { withTimezone: false}).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: false}).defaultNow()
});


