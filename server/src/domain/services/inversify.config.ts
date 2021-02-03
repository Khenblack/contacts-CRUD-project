import { Container } from 'inversify';
import 'reflect-metadata';
import ContactsRegistry from './Contacts/ContactsRegistry';

const container = new Container();
ContactsRegistry.RegisterModule(container);

export default container;
