import { z } from "zod";

export const InteractionPostValidation = z.object({
  companyId: z.number(),
  date: z.string(),
  notes: z.string(),
});

export const InteractionJoinedValidation = z.intersection(InteractionPostValidation, z.object({
  companyName: z.string(),
}));

export const InteractionId = z.object({
  id: z.coerce.number(),
});

export const InteractionValidation = z.intersection(
  InteractionPostValidation,
  InteractionId,
);

export const InteractionListValidation = z.array(InteractionJoinedValidation);
