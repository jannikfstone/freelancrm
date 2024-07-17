import { z } from 'zod';

export const companyStatusEnum = z.enum(['ACTIVE', 'INACTIVE']);

export const CompanyValidation = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  website: z.string().url().optional().or(z.literal('')),
  status: companyStatusEnum.default('ACTIVE'),
});

const CompanyId = z.object({
  id: z.coerce.number(),
});

export const EditCompanyValidation = z.intersection(
  CompanyValidation,
  CompanyId,
);

export const DeleteCompanyValidation = CompanyId;
