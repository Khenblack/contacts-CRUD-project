// @flow
import axios from 'axios';
import type { Contact } from '../types';

const contactApi = axios.create({
  baseURL: 'http://localhost:4000'
});

export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await contactApi.get('/contacts');
  return response.data;
};

export const createContact = async (
  contact: Contact
): Promise<[Contact | null, string | null]> => {
  return contactApi
    .post('/contacts/add', contact)
    .then((response) => [response.data, null])
    .catch((err) => [null, err.response.data.message]);
};

export const getSingleContact = async (
  id: string
): Promise<[Contact | null, string | null]> => {
  return contactApi
    .get(`/contacts/${id}`)
    .then((response) => [response.data, null])
    .catch((err) => [null, err.response.data.message]);
};

export const deleteContact = async (
  id: string
): Promise<[Contact | null, string | null]> => {
  return contactApi
    .delete(`/contacts/${id}`)
    .then((response) => [response.data, null])
    .catch((err) => [null, err.response.data.message]);
};

export const updateContact = async (
  contact: Contact
): Promise<[Contact | null, string | null]> => {
  return contactApi
    .patch('/contacts', contact)
    .then((response) => [response.data, null])
    .catch((err) => [null, err.response.data.message]);
};
