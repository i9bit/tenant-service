import { Router } from 'express';

import TenantsController from '../controllers/Tenants.controller';
import OrganizationsController from '../controllers/Organizations.controller';

const tenantsRouter = Router();

const tenantsController = new TenantsController();
const organizationsController = new OrganizationsController();

tenantsRouter.post('/', tenantsController.create);
tenantsRouter.get('/', tenantsController.index);
tenantsRouter.get('/:id/organizations', organizationsController.index);
tenantsRouter.post('/:id/organizations', organizationsController.create);

export default tenantsRouter;
