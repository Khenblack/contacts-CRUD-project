import Contact from '../../../entities/Contact';
import { IContactDB } from './ContactDb';

export default class EntityMapper {
  static mapToDomainObject(contactDb: IContactDB): Contact {
    const id = contactDb._id!.toString() as string;
    const email = contactDb.email;
    const firstName = contactDb.firstName;
    const lastName = contactDb.lastName;
    const phone = contactDb.phone;

    const result = new Contact({ id, email, firstName, lastName, phone });
    return result;
  }
}
