// @flow
import React from 'react';

import ContactListItem from '../ContactListItem';
import type { Contact } from '../../types';

type Props = {
  contacts: Contact[],
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
};
const ContactList = ({ contacts, onEdit, onDelete }: Props) => {
  return (
    <div className='ui relaxed divided list'>
      {contacts.map((x) => (
        <ContactListItem
          key={x.id}
          contact={x}
          onEdit={(id) => onEdit(id)}
          onDelete={(id) => onDelete(id)}
        />
      ))}
    </div>
  );
};

export default ContactList;
