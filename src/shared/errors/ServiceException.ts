import { ValidationError } from 'yup';

import IHttpStatusCode from '../http/IHttpStatusCode';

interface IServiceException {
  message: string;
  statusCode?: IHttpStatusCode;
  messages?: ValidationError;
}

class ServiceException {
  public readonly message: string;

  public readonly statusCode: IHttpStatusCode;

  public readonly messages?: ValidationError;

  constructor({
    message,
    messages,
    statusCode = IHttpStatusCode.BAD_REQUEST,
  }: IServiceException) {
    this.message = message;
    this.statusCode = statusCode;
    this.messages = messages;
  }
}

export default ServiceException;
