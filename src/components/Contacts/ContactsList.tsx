import { List, ListItem } from '@mui/material';

import { ContactListValidation } from '@/validations/ContactValidation';

import { ContactsEntry } from './ContactsEntry';
import { DeleteContactsEntry } from '../DeleteContact';

const ContactsList = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/contacts`,
  ).then((res) => res.json());
  const contacts = ContactListValidation.parse(result);

  return (
    <div className="mt-5" data-testid="contacts-list">
      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <List>
          {contacts.map((contact) => (
            <ListItem
              key={`contact-row-${contact.id}`}
              sx={{ display: 'inline-flex' }}
            >
              <ContactsEntry {...contact} />
              <DeleteContactsEntry id={contact.id} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export { ContactsList };
