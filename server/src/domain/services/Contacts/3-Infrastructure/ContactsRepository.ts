import { injectable } from 'inversify';
import mongoose from 'mongoose';
import CustomError from '../../../../models/CustomError';
import Contact from '../../../entities/Contact';
import { IContactsRepository } from '../2-Domain/InfrastructureContracts';
import ContactDb from './ContactDb';
import EntityMapper from './EntityMapper';

@injectable()
export class ContactsRepository implements IContactsRepository {
  async get(userId: string): Promise<Contact | null> {
    const result = await ContactDb.findById(userId);
    if (!result) return null;
    const resultMapped = EntityMapper.mapToDomainObject(result);
    return resultMapped;
  }

  async create(request: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<Contact> {
    const { firstName, lastName, email, phone } = request;
    const result = await new ContactDb({
      firstName,
      lastName,
      email,
      phone
    }).save();

    const resultMapped = EntityMapper.mapToDomainObject(result);
    return resultMapped;
  }

  async delete(userId: string): Promise<void> {
    await ContactDb.deleteOne({ _id: userId });
    return;
  }

  async update(
    userId: string,
    request: {
      firstName?: string | undefined;
      lastName?: string | undefined;
      email?: string | undefined;
      phone?: string | undefined;
    }
  ): Promise<Contact> {
    const result = await ContactDb.findById(userId);
    if (!result) throw new CustomError(404, `User with id ${userId} not found`);
    if (request.firstName) result.firstName = request.firstName;
    if (request.lastName) result.lastName = request.lastName;
    if (request.email) result.email = request.email;
    if (request.phone) result.phone = request.phone;
    const updated = await result.save();
    return EntityMapper.mapToDomainObject(updated);
  }

  async getByEmail(email: string): Promise<Contact | null> {
    const result = await ContactDb.findOne({ email: email });
    if (!result) return null;
    return EntityMapper.mapToDomainObject(result);
  }

  async getAll(): Promise<Contact[]> {
    const result = await ContactDb.find();
    const resultMapped = result.map((contact) =>
      EntityMapper.mapToDomainObject(contact)
    );
    return resultMapped;
  }

  async getByEmailAndIdNotEqual(
    id: string,
    email: string
  ): Promise<Contact | null> {
    const result = await ContactDb.find({ email: email }).exec();
    const resultFiltered = result.find((x) => x._id!.toString() !== id);
    if (!resultFiltered) return null;
    return EntityMapper.mapToDomainObject(resultFiltered);
  }
}
