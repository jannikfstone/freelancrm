'use client';

import { Button } from '@mui/material';
import React, { Suspense, useState } from 'react';

import { ContactsForm } from '@/components/Contacts/ContactsForm';
import { ContactsList } from '@/components/Contacts/ContactsList';

const ContactsPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ContactsForm modalOpen={open} setModalOpen={setOpen} />

      <Button onClick={() => setOpen(true)}>Add Contact</Button>
      <Suspense fallback={<p>Loading Contacts...</p>}>
        <ContactsList />
      </Suspense>
    </>
  );
};

export default ContactsPage;
