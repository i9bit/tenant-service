import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { schema as CreateTenantValidator } from '@modules/tenants/infra/http/validators/CreateTenant.validator';
import CreateTenantService from '@modules/tenants/services/CreateTenant.service';
import ListTenantsService from '@modules/tenants/services/ListTenants.service';

class TenantsController {
  async index(_request: Request, response: Response): Promise<Response> {
    const listTenantsService = container.resolve(ListTenantsService);
    const tenants = await listTenantsService.execute();
    return response.json(tenants);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, master } = await CreateTenantValidator.validate(request.body);
    const createTenantService = container.resolve(CreateTenantService);
    await createTenantService.execute({
      name,
      master,
    });
    return response.json();
  }
}

export default TenantsController;
