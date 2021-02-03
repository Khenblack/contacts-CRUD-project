import Contact from '../../../../entities/Contact';

export type CreateContactRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type UpdateContactRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};
export interface IContactsServiceLibrary {
  getAll(): Promise<Contact[]>;
  get(userId: string): Promise<Contact | null>;
  create(request: CreateContactRequest): Promise<Contact>;
  delete(userId: string): Promise<void>;
  update(userId: string, request: UpdateContactRequest): Promise<Contact>;
}
