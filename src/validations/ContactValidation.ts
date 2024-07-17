import { z } from 'zod';

export const ContactValidation = z.object({
  name: z.string().min(1),
  firstName: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  position: z.string().optional().or(z.literal('')),
  companyName: z.string().optional(),
});

const ContactId = z.object({
  id: z.coerce.number(),
});

export const EditContactValidation = z.intersection(
  ContactValidation,
  ContactId,
);

export const DeleteContactValidation = ContactId;
