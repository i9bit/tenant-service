import AWSXRay from 'aws-xray-sdk';
import cors from 'cors';
import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import helmet from 'helmet';

import '../container';
import * as logs from '@config/logs';

import ServiceException from '../errors/ServiceException';
import routes from './routes';

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(AWSXRay.express.openSegment('tenant-service-app'));
  }

  routes() {
    this.server.use(routes);
  }

  errors() {
    this.server.use(
      (
        error: Error,
        _request: Request,
        response: Response,
        _: NextFunction,
      ) => {
        if (error instanceof ServiceException) {
          logs.debug(error);
          return response.status(error.statusCode).json({
            message: error.message,
            messages: error.messages,
          });
        }

        if (error.name === 'BadRequestError') {
          logs.warn(error);
          return response.status(400).json({
            message: error.message,
          });
        }

        logs.error(error);
        return response.status(500).json({
          message: 'Internal server error',
          category: 'INTERNAL_ERROR',
        });
      },
    );
    this.server.use(AWSXRay.express.closeSegment());
  }
}

export default new App().server;
