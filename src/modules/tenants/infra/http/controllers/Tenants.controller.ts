import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTenantService from '@modules/tenants/services/CreateTenant.service';
import ListTenantsService from '@modules/tenants/services/ListTenants.service';

class TenantsController {
  async index(_request: Request, response: Response): Promise<Response> {
    const listTenantsService = container.resolve(ListTenantsService);
    const tenants = await listTenantsService.execute();
    return response.json(tenants);
  }

  async create(_request: Request, response: Response): Promise<Response> {
    const createTenantService = container.resolve(CreateTenantService);
    await createTenantService.execute({
      alias: 'alias',
    });

    return response.json();
  }
}

export default TenantsController;
