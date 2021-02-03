// @flow
import * as React from 'react';
import contactStore, { ContactStoreType } from '../store/ContactStore';

const ContactContext: React.Context<ContactStoreType> = React.createContext<ContactStoreType>(
  contactStore
);

export const ContactProvider = ({ children }: { children: React.Node }) => {
  return (
    <ContactContext.Provider value={contactStore}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
