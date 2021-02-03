import { inject, injectable } from 'inversify';
import { IContactsDomainServices } from '../../2-Domain/Contracts';
import {
  CreateContactRequest,
  IContactsServiceLibrary,
  UpdateContactRequest
} from '../Contracts';
import Contact from '../../../../entities/Contact';
import CustomError from '../../../../../models/CustomError';

@injectable()
export class ContactsServiceLibrary implements IContactsServiceLibrary {
  private readonly iContactsDomainServices: IContactsDomainServices;

  constructor(
    @inject('IContactsDomainServices')
    iContactsDomainServices: IContactsDomainServices
  ) {
    this.iContactsDomainServices = iContactsDomainServices;
  }

  get(userId: string): Promise<Contact | null> {
    if (!userId) throw new CustomError(422, 'User id param is required');
    return this.iContactsDomainServices.get(userId);
  }

  create(request: CreateContactRequest): Promise<Contact> {
    return this.iContactsDomainServices.create(request);
  }

  delete(userId: string): Promise<void> {
    if (!userId) throw new CustomError(422, 'User id param is required');
    return this.iContactsDomainServices.delete(userId);
  }

  update(userId: string, request: UpdateContactRequest): Promise<Contact> {
    if (!userId) throw new CustomError(422, 'User id param is required');
    return this.iContactsDomainServices.update(userId, request);
  }

  getAll(): Promise<Contact[]> {
    return this.iContactsDomainServices.getAll();
  }
}
