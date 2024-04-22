'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { CompanyValidation } from '@/validations/CompanyValidation';

type ICompaniesFormProps =
  | {
      edit: true;
      id: number;
      defaultValues: z.infer<typeof CompanyValidation>;
      handleStopEditing: () => void;
    }
  | { edit?: false };

const CompaniesForm = (props: ICompaniesFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof CompanyValidation>>({
    resolver: zodResolver(CompanyValidation),
    defaultValues: props.edit ? props.defaultValues : undefined,
  });
  const router = useRouter();
  const t = useTranslations('CompanyForm');

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
        <label
          className="text-sm font-bold text-gray-700"
          htmlFor={`name${props.edit ? `-${props.id}` : ''}`}
        >
          {t('name')}
          <input
            id={`name${props.edit ? `-${props.id}` : ''}`}
            className="mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
            {...register('name')}
          />
        </label>
        {errors.name?.message && (
          <div className="my-2 text-xs italic text-red-500">
            {errors.name?.message}
          </div>
        )}
      </div>

      <div className="mt-5">
        <button
          className="rounded bg-blue-500 px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50"
          type="submit"
        >
          {t('save')}
        </button>
      </div>
    </form>
  );
};

export { CompaniesForm };
