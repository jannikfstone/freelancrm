'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { ContactValidation } from '@/validations/ContactValidation';

type IContactFormProps =
  | {
      edit: true;
      id: number;
      defaultValues: z.infer<typeof ContactValidation>;
      handleStopEditing: () => void;
    }
  | { edit?: false };

const ContactForm = (props: IContactFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ContactValidation>>({
    resolver: zodResolver(ContactValidation),
    defaultValues: props.edit ? props.defaultValues : undefined,
  });
  const router = useRouter();
  const t = useTranslations('ContactForm');

  const handleCreate = handleSubmit(async (data) => {
    if (props.edit) {
      await fetch(`/api/contacts`, {
        method: 'PATCH',
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
      await fetch(`/api/contacts`, {
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
      <Box>
        <Grid container spacing={2}>
          <Grid xs="auto">
            <TextField
              id="name-input"
              label={t('name')}
              helperText={errors.name?.message}
              {...register('name')}
            />
          </Grid>
          <Grid xs="auto">
            <TextField
              id="first-name-input"
              label={t('firstName')}
              helperText={errors.firstName?.message}
              {...register('firstName')}
            />
          </Grid>
          <Grid xs="auto">
            <TextField
              id="email-input"
              label={t('email')}
              helperText={errors.email?.message}
              {...register('email')}
            />
          </Grid>
          <Grid xs="auto">
            <TextField
              id="phone-input"
              label={t('phone')}
              helperText={errors.phone?.message}
              {...register('phone')}
            />
          </Grid>
          <Grid xs="auto">
            <TextField
              id="role-input"
              label={t('role')}
              helperText={errors.role?.message}
              {...register('role')}
            />
          </Grid>
          <Grid xs="auto">
            <TextField
              id="company-name-input"
              label={t('companyName')}
              helperText={errors.companyName?.message}
              {...register('companyName')}
            />
          </Grid>
        </Grid>
        <Box sx={{ alignSelf: 'right' }}>
          <Button type="submit">{t('save')}</Button>
        </Box>
      </Box>
    </form>
  );
};

export { ContactForm };
