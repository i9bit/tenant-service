import { Router } from 'express';

import TenantController from '../controllers/Tenant.controller';
import TenantsController from '../controllers/Tenants.controller';
import CreateTenantValidator from '../validators/CreateTenant.validator';
import GetTenantValidator from '../validators/GetTenant.validator';

const tenantsRouter = Router();

const tenantsController = new TenantsController();
const tenantController = new TenantController();

tenantsRouter.post('/', CreateTenantValidator, tenantsController.create);
tenantsRouter.get('/', tenantsController.index);
tenantsRouter.get('/:id', GetTenantValidator, tenantController.read);

export default tenantsRouter;
