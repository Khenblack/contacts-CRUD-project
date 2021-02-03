import { Container } from 'inversify';
import { IContactsServiceLibrary } from './1-ServiceLibrary/Contracts';
import { ContactsServiceLibrary } from './1-ServiceLibrary/Implementations';
import { IContactsDomainServices } from './2-Domain/Contracts';
import { ContactsDomainServices } from './2-Domain/Implementations';
import { IContactsRepository } from './2-Domain/InfrastructureContracts';
import { ContactsRepository } from './3-Infrastructure/ContactsRepository';

export default class ContactsRegistry {
  static RegisterModule(container: Container): void {
    container
      .bind<IContactsServiceLibrary>('IContactsServiceLibrary')
      .to(ContactsServiceLibrary)
      .inSingletonScope();
    container
      .bind<IContactsDomainServices>('IContactsDomainServices')
      .to(ContactsDomainServices)
      .inSingletonScope();
    container
      .bind<IContactsRepository>('IContactsRepository')
      .to(ContactsRepository)
      .inSingletonScope();
  }
}
