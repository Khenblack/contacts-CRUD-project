const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^[0-9]{9}$/;

export const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string) => {
  return PHONE_REGEX.test(phone);
};
