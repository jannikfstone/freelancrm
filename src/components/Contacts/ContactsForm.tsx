'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { ContactPostValidation } from '@/validations/ContactValidation';

type IContactFormProps = (
  | {
      edit: true;
      id: number;
      defaultValues: z.infer<typeof ContactPostValidation>;
      handleStopEditing: () => void;
    }
  | { edit?: false }
) & {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ContactsForm = (props: IContactFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ContactPostValidation>>({
    resolver: zodResolver(ContactPostValidation),
    defaultValues: props.edit ? props.defaultValues : undefined,
  });
  const router = useRouter();

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

    props.setModalOpen(false);
    router.refresh();
  });

  return (
    <Modal open={props.modalOpen} onClose={() => props.setModalOpen(false)}>
      <form onSubmit={handleCreate}>
        <Box id="form-fields-container" sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ display: 'flex' }}
                id="first-name-input"
                label="firstName"
                helperText={errors.firstName?.message}
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ display: 'flex' }}
                id="name-input"
                label="name"
                helperText={errors.name?.message}
                {...register('name')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ display: 'flex' }}
                id="email-input"
                label="email"
                helperText={errors.email?.message}
                {...register('email')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ display: 'flex' }}
                id="phone-input"
                label="phone"
                helperText={errors.phone?.message}
                {...register('phone')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ display: 'flex' }}
                id="role-input"
                label="role"
                helperText={errors.role?.message}
                {...register('role')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ display: 'flex' }}
                id="company-name-input"
                label="companyName"
                helperText={errors.companyName?.message}
                {...register('companyName')}
              />
            </Grid>
          </Grid>
          <Box
            id="send-container"
            sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}
          >
            <Button variant="outlined" type="submit">
              save
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export { ContactsForm };
