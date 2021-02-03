// @flow
import React from 'react';
import { useForm } from 'react-hook-form';

import Field from '../common/Field';
import Message from '../common/Message';

import { validateEmail, validatePhone } from '../../utils/validations';

import type { Contact } from '../../types';
type Props = {
  contact?: Contact,
  error: string | null,
  onFormSubmit: (contact: Contact) => void
};

const ContactForm = ({ onFormSubmit, error, contact }: Props) => {
  const { register, handleSubmit, errors } = useForm({
    shouldFocusError: false
  });

  const onFormSubmitHandler = (contact): void => {
    onFormSubmit(contact);
  };

  return (
    <form className='ui form' onSubmit={handleSubmit(onFormSubmitHandler)}>
      <div className='two fields'>
        <Field
          label='First Name'
          placeholder='Enter your first name'
          ref={register({ required: 'Required field' })}
          name='firstName'
          defaultValue={contact ? contact.firstName : ''}
          error={errors.firstName}
        />
        <Field
          label='Last Name'
          placeholder='Enter your last name'
          name='lastName'
          ref={register({ required: 'Required field' })}
          defaultValue={contact ? contact.lastName : ''}
          error={errors.lastName}
        />
      </div>
      <div className='two fields'>
        <Field
          label='Email'
          name='email'
          placeholder='example@email.com'
          defaultValue={contact ? contact.email : ''}
          ref={register({
            required: 'Required field',
            validate: (val) => (validateEmail(val) ? null : 'Invalid email')
          })}
          error={errors.email}
        />
        <Field
          label='Phone'
          name='phone'
          placeholder='Enter your phone'
          defaultValue={contact ? contact.phone : ''}
          ref={register({
            required: 'Required field',
            validate: (val) => (validatePhone(val) ? null : 'Invalid phone')
          })}
          error={errors.phone}
        />
      </div>
      {error && <Message type='negative' body={error} />}
      <button className='ui button primary' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
