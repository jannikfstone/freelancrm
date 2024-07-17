import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { ContactForm } from '@/components/ContactForm';
import { ContactsList } from '@/components/ContactsList';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'ContactOverview',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const Contact = () => {
  const t = useTranslations('ContactOverview');

  return (
    <>
      <ContactForm />

      <Suspense fallback={<p>{t('loading_contacts')}</p>}>
        <ContactsList />
      </Suspense>

    </>
  );
};

export default Contact;
