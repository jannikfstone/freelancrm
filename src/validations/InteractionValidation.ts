import { z } from 'zod';

export const InteractionPostValidation = z.object({
  companyId: z.number(),
  date: z.string().optional(),
  notes: z.string(),
})

export const InteractionId = z.object({
  id: z.coerce.number(),
})