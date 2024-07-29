'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import TextInputField from '@/components/TextInputField';
import {
  CompanyPostValidation,
  companyStatusEnum,
} from '@/validations/CompanyValidation';

type ICompaniesFormProps =
  | {
      edit: true;
      id: number;
      defaultValues: z.infer<typeof CompanyPostValidation>;
      handleStopEditing: () => void;
    }
  | { edit?: false };

const CompaniesForm = (props: ICompaniesFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof CompanyPostValidation>>({
    resolver: zodResolver(CompanyPostValidation),
    defaultValues: props.edit ? props.defaultValues : undefined,
  });
  const router = useRouter();

  const handleCreate = handleSubmit(async (data) => {
    if (props.edit) {
      await fetch(`/api/companies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: props.id,
          ...data,
        }),
      });

      props.handleStopEditing();
    } else {
      await fetch(`/api/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      reset();
    }

    router.refresh();
  });

  return (
    <form onSubmit={handleCreate}>
      <div>
        <Box
          sx={{
            display: 'inline-flex',
          }}
        >
          {TextInputField({
            label: 'name',
            errors,
            name: 'name',
            register,
          })}
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            paddingLeft: 2,
          }}
        >
          {TextInputField({
            label: 'website',
            errors,
            name: 'website',
            register,
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            paddingY: 2,
            minWidth: '100%',
          }}
        >
          {TextInputField({
            label: 'description',
            errors,
            name: 'description',
            register,
          })}
        </Box>
        <div>
          <InputLabel id="company-status-label">status</InputLabel>
          <Select
            labelId="company-status-label"
            sx={{
              minWidth: '130px',
            }}
            defaultValue={companyStatusEnum.options[0]}
            {...register('status')}
          >
            {companyStatusEnum.options.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="rounded bg-blue-500 px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50"
          type="submit"
        >
          save
        </button>
      </div>
    </form>
  );
};

export { CompaniesForm };
