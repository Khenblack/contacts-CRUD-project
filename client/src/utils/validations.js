// @flow
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};
