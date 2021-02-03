// @flow
import React, { useContext, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react';

import ContactForm from '../../components/ContactForm';
import ContactContext from '../../context/ContactContext';

import type { Contact } from '../../types';

type Props = {
  match: {
    params: { id: string }
  },
  history: {
    push: (route: string) => void
  }
};

const ContactEdit = (props: Props) => {
  const contactStore = useContext(ContactContext);

  const { contacts, getSingleContact } = contactStore;
  const { id } = props.match.params;

  useEffect((): void => {
    getSingleContact(id);
  }, [id, getSingleContact]);

  const onFormSubmitHandler = (contact: Contact): void => {
    contactStore.clearErrors();
    contactStore.updateContact({ ...contact, id });
  };

  const { clearErrors, isSuccess } = contactStore;
  const { push } = props.history;

  const redirectToMain = useCallback((): void => {
    push('/');
  }, [push]);

  useEffect((): (() => void) => {
    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  useEffect(() => {
    if (isSuccess) redirectToMain();
  }, [redirectToMain, isSuccess]);

  const contact = contacts.find((x) => x.id === id);

  return (
    <>
      <h2 className='ui header'>Add Contact</h2>
      <div className='ui segment'>
        <ContactForm
          onFormSubmit={onFormSubmitHandler}
          error={contactStore.errorMessage}
          contact={contact}
        />
      </div>
    </>
  );
};

export default observer(ContactEdit);
