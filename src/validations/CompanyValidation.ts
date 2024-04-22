import { z } from 'zod';

export const CompanyValidation = z.object({
  name: z.string().min(1),
});

export const EditCompanyValidation = z.object({
  id: z.coerce.number(),
  name: z.string().min(1),
});

export const DeleteCompanyValidation = z.object({
  id: z.coerce.number(),
});
