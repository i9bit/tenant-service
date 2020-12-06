import { Router } from 'express';

import OrganizationsController from '../controllers/Organizations.controller';
import TenantController from '../controllers/Tenant.controller';
import TenantsController from '../controllers/Tenants.controller';
import CreateOrganizationValidator from '../validators/CreateOrganization.validator';
import CreateTenantValidator from '../validators/CreateTenant.validator';
import GetTenantValidator from '../validators/GetTenant.validator';
import GetTenantAndOrganizationValidator from '../validators/GetTenantAndOrganization.validator';

const tenantsRouter = Router();

const tenantsController = new TenantsController();
const organizationsController = new OrganizationsController();
const tenantController = new TenantController();

tenantsRouter.post('/', CreateTenantValidator, tenantsController.create);
tenantsRouter.get('/', tenantsController.index);
tenantsRouter.get(
  '/:id/organizations',
  GetTenantValidator,
  organizationsController.index,
);
tenantsRouter.post(
  '/:id/organizations',
  GetTenantValidator,
  CreateOrganizationValidator,
  organizationsController.create,
);
tenantsRouter.get(
  '/:id/organizations/:organization_id',
  GetTenantAndOrganizationValidator,
  tenantController.read,
);

export default tenantsRouter;
