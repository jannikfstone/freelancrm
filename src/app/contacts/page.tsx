import ContactsPage from '@/components/Contacts/ContactsPage';

export async function generateMetadata() {


  return {
    title: 'meta_title',
    description: 'meta_description',
  };
}

const Contact = () => {
  return <ContactsPage />;
};

export default Contact;
