import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { contactsSchema } from '@/models/Schema';

import { DeleteContactsEntry } from './DeleteContact';
import { EditableContactsEntry } from './EditableContact';

const ContactsList = async () => {
  const contacts = await db.select().from(contactsSchema).all();

  logger.info('Get all contacts entries');

  return (
    <div className="mt-5" data-testid="contacts-list">
      {contacts.map((elt) => (
        <div key={elt.id} className="mb-1 flex items-center gap-x-1">
          <DeleteContactsEntry id={elt.id} />

          <EditableContactsEntry id={elt.id} name={elt.name} />
        </div>
      ))}
    </div>
  );
};

export { ContactsList };
