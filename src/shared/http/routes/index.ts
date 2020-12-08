import { Router } from 'express';

import routes from './routes';

const main = Router();

main.use(routes);

export default main;
