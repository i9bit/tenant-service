import { Router } from 'express';

import tenantsRouter from '@modules/tenants/infra/http/routes/tenants.router';

const routes = Router();

routes.use('/tenants', tenantsRouter);

export default routes;
