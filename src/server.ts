import 'reflect-metadata';
import serverless from 'serverless-http';
import app from './app/app';

export const handler = serverless(app);
