import { getTranslations } from 'next-intl/server';
import ContactsPage from '@/components/Contacts/ContactsPage';

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
  return <ContactsPage />;
};

export default Contact;
