import Contact from '../../../../entities/Contact';

export interface IContactsRepository {
  getAll(): Promise<Contact[]>;
  get(userId: string): Promise<Contact | null>;
  create(request: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<Contact>;
  delete(userId: string): Promise<void>;

  update(
    userId: string,
    request: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
    }
  ): Promise<Contact>;

  getByEmail(email: string): Promise<Contact | null>;
  getByEmailAndIdNotEqual(id: string, email: string): Promise<Contact | null>;
}
