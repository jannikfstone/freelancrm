'use client';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import type { z } from 'zod';

import type { ContactPostValidation } from '@/validations/ContactValidation';

const ContactsEntry = (props: z.infer<typeof ContactPostValidation>) => {

  function getRoleText(contact: z.infer<typeof ContactPostValidation>): string {
    if (contact.role && contact.companyName) {
      return `: ${contact.role} at ${contact.companyName}`;
    }
    if (contact.role) {
      return `: ${contact.role}`;
    }
    if (contact.companyName) {
      return `: working_at ${contact.companyName}`;
    }
    return '';
  }

  const contactText = `${props.firstName} ${props.name}${getRoleText(props)}`;
  return (
    <Box>
      <Typography sx={{ margin: 0 }}>{contactText}</Typography>
    </Box>
  );
};

export { ContactsEntry };
