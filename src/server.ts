import 'reflect-metadata';
import serverless from 'serverless-http';

import app from './shared/http/app';

export const handler = serverless(app);
