'use client';

import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { Suspense, useState } from 'react';

import { ContactsForm } from '@/components/Contacts/ContactsForm';
import { ContactsList } from '@/components/Contacts/ContactsList';

const ContactsPage = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations('ContactOverview');

  return (
    <>
      <ContactsForm modalOpen={open} setModalOpen={setOpen} />

      <Button onClick={() => setOpen(true)}>{t('add_contact')}</Button>
      <Suspense fallback={<p>{t('loading_contacts')}</p>}>
        <ContactsList />
      </Suspense>
    </>
  );
};

export default ContactsPage;
