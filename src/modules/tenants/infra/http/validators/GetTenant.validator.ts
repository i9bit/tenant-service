import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

import ServiceException from '@shared/errors/ServiceException';

export const schema = Yup.object().shape({
  id: Yup.string().uuid().required(),
});

export default async (
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await schema.validate(request.params, { abortEarly: false });
    return next();
  } catch (err) {
    throw new ServiceException({
      message: 'Validation failed!',
      statusCode: 400,
      messages: err.inner,
    });
  }
};
