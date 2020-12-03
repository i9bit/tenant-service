import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import ServiceException from '@shared/errors/ServiceException';

export default async (
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    await schema.validateAsync(request.params, { abortEarly: false });
    return next();
  } catch (err) {
    throw new ServiceException({
      message: 'Validation failed!',
      statusCode: 400,
      messages: err.details,
    });
  }
};
