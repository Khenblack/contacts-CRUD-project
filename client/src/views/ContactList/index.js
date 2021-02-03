// @flow
import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';

import Loader from '../../components/common/Loader';
import Link from '../../components/common/Link';
import ContactList from '../../components/ContactList';
import Message from '../../components/common/Message';
import ContactContext from '../../context/ContactContext';

type Props = {
  history: { push: (route: string) => void }
};

const ContactListView = (props: Props) => {
  const store = useContext(ContactContext);

  useEffect((): void => {
    store.fetchContacts();
  }, [store, store.fetchContacts]);

  const onEditHandler = (id): void => {
    props.history.push(`/edit/${id}`);
  };

  const onDeleteHandler = (id): void => {
    store.deleteContact(id);
  };

  const renderContent = () => {
    if (store.isLoading) return <Loader />;
    if (store.contacts.length === 0)
      return (
        <div className='ui segment'>
          <Message
            type='info'
            header='No contacts found'
            body='Create a new contact'
          />
        </div>
      );
    return (
      <div className='ui segment'>
        <ContactList
          contacts={store.contacts}
          onEdit={(id) => onEditHandler(id)}
          onDelete={(id) => onDeleteHandler(id)}
        />
      </div>
    );
  };

  return (
    <>
      <h2 className='ui header'>Contact List</h2>
      {renderContent()}
      <Link text='Add contact' icon='add' type='primary' to='/add' />
    </>
  );
};

export default observer(ContactListView);
