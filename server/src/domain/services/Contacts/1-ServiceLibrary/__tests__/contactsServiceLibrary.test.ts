import 'reflect-metadata';
import Contact from '../../../../entities/Contact';
import { IContactsDomainServices } from '../../2-Domain/Contracts';
import { ContactsServiceLibrary } from '../Implementations';
import CustomError from '../../../../../models/CustomError';

const userMock = new Contact({
  id: '1',
  email: 'test@email.com',
  firstName: 'Test first name',
  lastName: 'Test last name',
  phone: '666554433'
});

const Mock = jest.fn<IContactsDomainServices, []>(() => ({
  get: jest.fn().mockReturnValue(Promise.resolve(userMock)),
  getAll: jest.fn().mockReturnValue(Promise.resolve([userMock])),
  create: jest.fn().mockReturnValue(Promise.resolve(userMock)),
  update: jest.fn().mockReturnValue(Promise.resolve(userMock)),
  delete: jest.fn().mockReturnValue(Promise.resolve(userMock))
}));
const mock = new Mock();

describe('ContactServiceLibrary test', () => {
  it('Should call get method from domain services', async () => {
    const contactServiceLibrary = new ContactsServiceLibrary(mock);
    const result = await contactServiceLibrary.get('1');
    expect(mock.get).toBeCalledTimes(1);
    expect(result).toEqual(userMock);
  });

  it('Should throw an error if call get method withoud userID', async () => {
    const contactServiceLibrary = new ContactsServiceLibrary(mock);
    try {
      await contactServiceLibrary.get(null);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toEqual(422);
      expect(error.message).toEqual('User id param is required');
    }
  });
});
