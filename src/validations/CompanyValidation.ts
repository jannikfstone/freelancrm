import { z } from 'zod';

export const companyStatusEnum = z.enum(['ACTIVE', 'INACTIVE']);

export const CompanyPostValidation = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  website: z.string().url().optional().or(z.literal('')),
  status: companyStatusEnum.default('ACTIVE'),
});

const CompanyId = z.object({
  id: z.coerce.number(),
});

export const CompanyValidation = z.intersection(
  CompanyPostValidation,
  CompanyId,
);

export const DeleteCompanyValidation = CompanyId;

export const CompaniesListValidation = z.array(CompanyValidation);