import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";
import { z } from "zod";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  address1: (schema) => schema.min(1, "Address is required"),
  city: (schema) => schema.min(1, "City is required"),
  state: (schema) => schema.max(3, "State must be less than 3 characters"),
  email: (schema) => schema.email("Invalid email address"),
  zip: (schema) => schema.regex(/^\d{4}$/, "Invalid Zip code"),
  phone: (schema) =>
    schema.regex(/^(?:\+?61|0)4\d{8}$/, "Invalid Australian phone number"),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
