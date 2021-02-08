import 'reflect-metadata';
import Contact from '../../../../entities/Contact';
import { IContactsDomainServices } from '../../2-Domain/Contracts';
import { ContactsServiceLibrary } from '../Implementations';
import CustomError from '../../../../../models/CustomError';

let IContactsDomainServicesMock;
let userMock;
let allUsersMock;

beforeAll(() => {
  userMock = new Contact({
    id: '1',
    email: 'test@email.com',
    firstName: 'Test first name',
    lastName: 'Test last name',
    phone: '666554433'
  });

  allUsersMock = [userMock];

  afterAll(() => {
    IContactsDomainServicesMock = null;
    userMock = null;
  });

  const Mock = jest.fn<IContactsDomainServices, []>(() => ({
    get: jest.fn((id: string) => Promise.resolve({ ...userMock, id })),
    getAll: jest.fn().mockReturnValue(Promise.resolve([userMock])),
    create: jest.fn().mockReturnValue(Promise.resolve(userMock)),
    update: jest.fn().mockReturnValue(Promise.resolve(userMock)),
    delete: jest.fn().mockReturnValue(Promise.resolve(userMock))
  }));
  IContactsDomainServicesMock = new Mock();
});

describe('ContactServiceLibrary test', () => {
  it('Should call get method from domain services', async () => {
    const contactServiceLibrary = new ContactsServiceLibrary(
      IContactsDomainServicesMock
    );
    const result = await contactServiceLibrary.get('4');
    expect(IContactsDomainServicesMock.get).toBeCalledTimes(1);
    expect(result.id).toEqual('4');
  });

  it('Should throw an error if call get method without an userID', async () => {
    const contactServiceLibrary = new ContactsServiceLibrary(
      IContactsDomainServicesMock
    );
    try {
      await contactServiceLibrary.get(null);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toEqual(422);
      expect(error.message).toEqual('User id param is required');
    }
  });

  it('Should to return all contacts', async () => {
    const contactServiceLibrary = new ContactsServiceLibrary(
      IContactsDomainServicesMock
    );
    const result = await contactServiceLibrary.getAll();

    expect(result.length).toEqual(allUsersMock.length);
    expect(result[0]).toEqual(allUsersMock[0]);
  });

  it('Should throw an error if call update method without an UserID', async () => {
    const contactServiceLibrary = new ContactsServiceLibrary(
      IContactsDomainServicesMock
    );
    try {
      await contactServiceLibrary.update(null, {});
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toEqual(422);
      expect(error.message).toEqual('User id param is required');
    }
  });

  it('Should throw an error if call delete method without an UserID', async () => {
    const contactServiceLibrary = new ContactsServiceLibrary(
      IContactsDomainServicesMock
    );
    try {
      await contactServiceLibrary.delete(null);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toEqual(422);
      expect(error.message).toEqual('User id param is required');
    }
  });

  it('Should call create method from domain services', async () => {
    const contactServiceLibrary = new ContactsServiceLibrary(
      IContactsDomainServicesMock
    );

    await contactServiceLibrary.create({
      firstName: 'name',
      lastName: 'lastName',
      email: 'test@email.com',
      phone: '666554433'
    });
    expect(IContactsDomainServicesMock.create).toHaveBeenCalledTimes(1);
  });
});
