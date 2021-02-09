import 'reflect-metadata';
import Contact from '../../../../domain/entities/Contact';
import { ContactsDomainServices } from '../../../../domain/services/Contacts/2-Domain/Implementations';
import { IContactsRepository } from '../../../../domain/services/Contacts/2-Domain/InfrastructureContracts';
import CustomError from '../../../../models/CustomError';

let IContactsRepositoryMock;
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
    IContactsRepositoryMock = null;
    userMock = null;
  });

  const Mock = jest.fn<IContactsRepository, []>(() => ({
    getAll: jest.fn().mockReturnValue(Promise.resolve([userMock])),
    get: jest.fn((userId: string) =>
      Promise.resolve({ ...userMock, id: userId })
    ),
    create: jest.fn().mockReturnValue(userMock),
    delete: jest.fn(),
    update: jest.fn().mockReturnValue(userMock),
    getByEmail: jest.fn().mockReturnValue(userMock),
    getByEmailAndIdNotEqual: jest.fn()
  }));
  IContactsRepositoryMock = new Mock();
});

describe('ContactDomainServices test', () => {
  it('Should call to getAll method from repository', async () => {
    const contactsDomainServices = new ContactsDomainServices(
      IContactsRepositoryMock
    );
    const result = await contactsDomainServices.getAll();
    expect(IContactsRepositoryMock.getAll).toBeCalledTimes(1);
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(userMock);
  });

  it('Should call to get method from repository', async () => {
    const contactsDomainServices = new ContactsDomainServices(
      IContactsRepositoryMock
    );
    const user = await contactsDomainServices.get('3');
    expect(user.id).toEqual('3');
  });

  it('Should call to delete method from contacts repository', () => {
    const contactsDomainServices = new ContactsDomainServices(
      IContactsRepositoryMock
    );

    contactsDomainServices.delete('3');
    expect(IContactsRepositoryMock.delete).toBeCalledTimes(1);
  });

  it('Should throw an error if updateContactRequest is null ', async () => {
    const contactsDomainServices = new ContactsDomainServices(
      IContactsRepositoryMock
    );
    try {
      await contactsDomainServices.update('1', null);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toEqual(404);
      expect(error.message).toEqual(
        'Params firstName, lastName, email and phone could not be null'
      );
    }
  });

  it('Should throw an error if email have incorrect format ', async () => {
    const contactsDomainServices = new ContactsDomainServices(
      IContactsRepositoryMock
    );
    try {
      await contactsDomainServices.update('1', {
        firstName: 'Test',
        lastName: 'Test lastName',
        email: 'emailerror',
        phone: '999887766'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toEqual(422);
      expect(error.message).toEqual('Invalid email');
    }
  });

  it('Should throw an error if phone have incorrect format ', async () => {
    const contactsDomainServices = new ContactsDomainServices(
      IContactsRepositoryMock
    );
    try {
      await contactsDomainServices.update('1', {
        firstName: 'Test',
        lastName: 'Test lastName',
        email: 'test@test.com',
        phone: '334'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toEqual(422);
      expect(error.message).toEqual('Invalid Phone');
    }
    expect(IContactsRepositoryMock.update).not.toBeCalled();
  });

  it('Should call to update method if all props are valid', async () => {
    const contactsDomainServices = new ContactsDomainServices(
      IContactsRepositoryMock
    );
    await contactsDomainServices.update('1', {
      firstName: 'Test',
      lastName: 'Test lastName',
      email: 'test@test.com',
      phone: '610445566'
    });
    expect(IContactsRepositoryMock.update).toBeCalledTimes(1);
  });
});
