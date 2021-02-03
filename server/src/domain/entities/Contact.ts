export default class Contact {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phone: string;

  constructor({
    id,
    firstName,
    lastName,
    email,
    phone
  }: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }
}
