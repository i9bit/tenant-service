import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import ServiceException from '../errors/ServiceException';

export default async (
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
    });

    await schema.validateAsync(request.body, { abortEarly: false });
    return next();
  } catch (err) {
    throw new ServiceException({
      message: 'Validation failed!',
      statusCode: 400,
      messages: err.details,
    });
  }
};
