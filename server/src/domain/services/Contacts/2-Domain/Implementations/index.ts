import { inject, injectable } from 'inversify';
import CustomError from '../../../../../models/CustomError';
import Contact from '../../../../entities/Contact';
import {
  CreateContactRequest,
  IContactsDomainServices,
  UpdateContactRequest
} from '../Contracts';
import { IContactsRepository } from '../InfrastructureContracts';

import { validateEmail, validatePhone } from '../../../../../utils/validations';

@injectable()
export class ContactsDomainServices implements IContactsDomainServices {
  private readonly iContactsRepository: IContactsRepository;

  constructor(
    @inject('IContactsRepository') IContactsRepository: IContactsRepository
  ) {
    this.iContactsRepository = IContactsRepository;
  }

  get(userId: string): Promise<Contact | null> {
    return this.iContactsRepository.get(userId);
  }

  async create(request: CreateContactRequest): Promise<Contact> {
    const { firstName, lastName, email, phone } = request;
    if (!firstName || !lastName || !email || !phone)
      throw new CustomError(
        404,
        'Params firstName, lastName, email and phone could not be null'
      );

    if (!validateEmail(email)) throw new CustomError(422, 'Invalid email');
    if (!validatePhone(phone)) throw new CustomError(422, 'Invalid Phone');

    const userByEmail = await this.iContactsRepository.getByEmail(email);
    if (userByEmail)
      throw new CustomError(409, 'User with this email already exists');

    return this.iContactsRepository.create(request);
  }

  delete(userId: string): Promise<void> {
    return this.iContactsRepository.delete(userId);
  }

  async update(
    userId: string,
    request: UpdateContactRequest
  ): Promise<Contact> {
    if (!request)
      throw new CustomError(
        404,
        'Params firstName, lastName, email and phone could not be null'
      );

    const { firstName, lastName, email, phone } = request;
    if (!firstName || !lastName || !email || !phone)
      throw new CustomError(
        404,
        'Params firstName, lastName, email and phone could not be null'
      );

    if (!validateEmail(email)) throw new CustomError(422, 'Invalid email');
    if (!validatePhone(phone)) throw new CustomError(422, 'Invalid Phone');

    const userByEmail = await this.iContactsRepository.getByEmailAndIdNotEqual(
      userId,
      email
    );
    if (userByEmail)
      throw new CustomError(409, 'User with this email already exists');

    return this.iContactsRepository.update(userId, request);
  }

  getAll(): Promise<Contact[]> {
    return this.iContactsRepository.getAll();
  }
}
