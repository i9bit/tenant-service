import { Request, Response } from 'express';

import CreateTenantService from '../services/CreateTenant.service';
import ListTenantsService from '../services/ListTenants.service';

class TenantsController {
  async index(_request: Request, response: Response) {
    const tenants = await ListTenantsService.execute();
    return response.json(tenants);
  }

  async create(_request: Request, response: Response) {
    await CreateTenantService.execute({
      alias: 'alias',
    });

    return response.json();
  }
}

export default new TenantsController();
