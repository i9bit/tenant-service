import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

import ServiceException from '@shared/errors/ServiceException';

export const schema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  master: Yup.boolean().default(false),
});

export default async (
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await schema.validate(request.body, { abortEarly: false });
    return next();
  } catch (err) {
    throw new ServiceException({
      message: 'Validation failed!',
      statusCode: 400,
      messages: err.inner,
    });
  }
};
