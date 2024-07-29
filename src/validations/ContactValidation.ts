import { z } from 'zod';

export const ContactPostValidation = z.object({
  name: z.string().min(1),
  firstName: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  role: z.string().optional().or(z.literal('')),
  companyName: z.string().optional(),
});

const ContactId = z.object({
  id: z.coerce.number(),
});

export const ContactGetValidation = z.intersection(
  ContactPostValidation,
  ContactId,
);

export const ContactListValidation = z.array(ContactGetValidation);
export const DeleteContactValidation = ContactId;
