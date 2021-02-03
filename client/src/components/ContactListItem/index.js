// @flow
import React, { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import Button from '../common/Button';
import type { Contact } from '../../types';

type Props = {
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
  contact: Contact
};

const ContactListItem = ({ contact, onEdit, onDelete }: Props) => {
  const { handleModal, hideModal } = useContext(ModalContext);

  const renderModalContent = (contact) => {
    return (
      <>
        <div className='header'>Delete contact</div>
        <div className='content'>
          <div className='description'>
            <p>
              {`Do you want delete contact 
              ${contact.firstName} ${contact.lastName}`}
              ?
            </p>
          </div>
        </div>
        <div className='actions'>
          <Button
            text='Delete'
            type='positive'
            onClick={() => {
              hideModal();
              onDelete(contact.id);
            }}
          />
          <Button text='Cancel' onClick={() => hideModal()} />
        </div>
      </>
    );
  };

  return (
    <div className='item'>
      <div className='right floated content'>
        <Button
          text='Edit'
          icon='edit'
          type='primary'
          onClick={() => onEdit(contact.id)}
        />
        <Button
          text='Delete'
          icon='trash alternate'
          type='red'
          onClick={() => handleModal(renderModalContent(contact))}
        />
      </div>
      <i className='large user circle middle aligned icon'></i>
      <div className='content'>
        <span className='header'>{`${contact.firstName} ${contact.lastName}`}</span>
        <div className='description'>{contact.email}</div>
      </div>
    </div>
  );
};

export default ContactListItem;
