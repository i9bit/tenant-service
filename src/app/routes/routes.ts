import { Router } from 'express';

import TenantsController from '../controllers/Tenants.controller';
import OrganizationsController from '../controllers/Organizations.controller';

const routes = Router();

routes.post('/', TenantsController.create);
routes.get('/', TenantsController.index);
routes.get('/:id/organizations', OrganizationsController.index);
routes.post('/:id/organizations', OrganizationsController.create);

export default routes;
