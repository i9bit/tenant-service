import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetTenantAndOrganizationService from '@modules/tenants/services/GetTenantAndOrganization.service';

class TenantController {
  async read(request: Request, response: Response): Promise<Response> {
    const { id, organization_id } = request.params;
    const getTenantAndOrganizationService = container.resolve(
      GetTenantAndOrganizationService,
    );
    const tenant = await getTenantAndOrganizationService.execute({
      id,
      organization_id,
    });

    return response.json(tenant);
  }
}

export default TenantController;
