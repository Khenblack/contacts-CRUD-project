// @flow
import { runInAction, makeAutoObservable } from 'mobx';

import * as ContactApi from '../api/ContactsApi';

import type { Contact } from '../types';

export class ContactStoreType {
  contacts: Contact[] = [];
  errorMessage: string | null = null;
  isSuccess: boolean | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setError = (error): void => {
    this.errorMessage = error;
  };

  fetchContacts = async (): Promise<void> => {
    try {
      this.isLoading = true;
      const contacts = await ContactApi.fetchContacts();
      runInAction(() => {
        this.contacts = contacts;
        this.isLoading = false;
      });
    } catch (error) {
      this.setError(error);
    }
  };

  getSingleContact = async (id): Promise<void> => {
    this.isLoading = true;
    const [contact, error] = await ContactApi.getSingleContact(id);
    runInAction(() => {
      if (error) this.errorMessage = error;
      else if (contact) {
        const index = this.contacts.findIndex((x) => x.id === contact.id);
        if (index !== -1) {
          this.contacts[index] = contact;
        } else this.contacts.push(contact);
      }
      this.isLoading = false;
    });
  };

  createContact = async (contact): Promise<void> => {
    this.isLoading = true;
    const [newContact, error] = await ContactApi.createContact(contact);
    runInAction(() => {
      if (error) this.errorMessage = error;
      if (newContact) {
        this.contacts.push(newContact);
        this.isSuccess = true;
      }
      this.isLoading = false;
    });
  };

  deleteContact = async (contactId: string): Promise<void> => {
    this.isLoading = true;
    // eslint-disable-next-line no-unused-vars
    const [_, error] = await ContactApi.deleteContact(contactId);

    if (error)
      runInAction(() => {
        this.errorMessage = error;
      });
    else {
      runInAction(() => {
        const index = this.contacts.findIndex((x) => x.id === contactId);
        if (index !== -1) this.contacts.splice(index, 1);
        this.isLoading = false;
      });
    }
  };

  updateContact = async (contact: Contact): Promise<void> => {
    this.isLoading = true;
    const [updatedContact, error] = await ContactApi.updateContact(contact);

    if (error)
      runInAction(() => {
        this.errorMessage = error;
      });
    else if (updatedContact) {
      runInAction(() => {
        const index = this.contacts.findIndex((x) => x.id === contact.id);
        if (index !== -1) {
          this.contacts[index] = updatedContact;
        }
        this.isLoading = false;
        this.isSuccess = true;
      });
    }
  };

  clearErrors = (): void => {
    this.setError(null);
    this.isSuccess = null;
  };
}

const instance: ContactStoreType = new ContactStoreType();

export default instance;
