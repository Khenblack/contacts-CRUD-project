import { NextFunction, Request, Response } from 'express';
import { IContactsServiceLibrary } from '../domain/services/Contacts/1-ServiceLibrary/Contracts';

import container from '../domain/services/inversify.config';

const iContactsServiceLibrary = container.get<IContactsServiceLibrary>(
  'IContactsServiceLibrary'
);

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const result = await iContactsServiceLibrary.create({
      firstName,
      lastName,
      email,
      phone
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await iContactsServiceLibrary.get(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await iContactsServiceLibrary.getAll();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await iContactsServiceLibrary.delete(req.params.id);
    res.send();
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    const result = await iContactsServiceLibrary.update(id, {
      firstName,
      lastName,
      email,
      phone
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};
