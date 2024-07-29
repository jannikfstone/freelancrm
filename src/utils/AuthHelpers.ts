import bcrypt from "bcryptjs";
import { z } from "zod";
import { UserValidation } from "@/validations/UserValidation";
import { db } from "@/libs/Db";
import { eq } from "drizzle-orm";
import { userSchema } from "@/models/Schema";
import { logger } from "@/libs/Logger";

/**
 * Get user from the database.
 * @param email
 * @param password plain text(!) password
 * @returns User object if found, undefined otherwise. Returns undefined if the password does not match.
 */
export async function getExistingUserFromDb(email: string, password: string) : Promise<z.infer<typeof UserValidation> | undefined> {
  const user = await db.query.userSchema.findFirst({where: eq(userSchema.email, email)})
  if (!user) {
    return undefined
  }
  const passwordMatch = bcrypt.compareSync(password, user.password)
  if (!passwordMatch) {
    logger.error("Password does not match")
    return undefined
  }
  return UserValidation.parse(user)
}