import { Router } from 'express';

import routes from './routes';

const main = Router();

main.use('/tenants', routes);

export default main;
