import {z} from "zod";

const userRoles = ["ADMIN", "USER"] as const;

export const UserPostValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(userRoles).optional(),
});

export const UserValidation = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(userRoles),
});
