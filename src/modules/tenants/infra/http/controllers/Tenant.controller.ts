import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetTenantService from '@modules/tenants/services/GetTenant.service';

class TenantController {
  async read(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getTenantService = container.resolve(GetTenantService);
    const tenant = await getTenantService.execute(id);
    return response.json(tenant);
  }
}

export default TenantController;
