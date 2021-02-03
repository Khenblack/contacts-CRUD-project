// @flow
import { observer } from 'mobx-react';
import React, { useCallback, useContext, useEffect } from 'react';
import ContactForm from '../../components/ContactForm';
import ContactContext from '../../context/ContactContext';

type Props = {
  history: {
    push: (route: string) => void
  }
};

const ContactFormView = (props: Props) => {
  const contactStore = useContext(ContactContext);

  const onFormSubmitHandler = (contact) => {
    contactStore.clearErrors();
    contactStore.createContact(contact);
  };

  const { clearErrors, isSuccess } = contactStore;
  const { push } = props.history;

  const redirectToMain: () => void = useCallback(() => {
    push('/');
  }, [push]);

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  useEffect(() => {
    if (isSuccess) redirectToMain();
  }, [redirectToMain, isSuccess]);

  return (
    <>
      <h2 className='ui header'>Add Contact</h2>
      <div className='ui segment'>
        <ContactForm
          onFormSubmit={onFormSubmitHandler}
          error={contactStore.errorMessage}
        />
      </div>
    </>
  );
};

export default observer(ContactFormView);
