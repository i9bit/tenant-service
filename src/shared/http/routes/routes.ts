import { Router } from 'express';

import tenantsRouter from '../../../modules/tenants/infra/http/routes/tenants.router';

const routes = Router();

routes.use(tenantsRouter);

export default routes;
