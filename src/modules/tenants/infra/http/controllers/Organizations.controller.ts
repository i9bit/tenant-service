import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrganizationsService from '@modules/tenants/services/ListOrganizations.service';
import CreateOrganizationService from '@modules/tenants/services/CreateOrganization.service';

class OrganizationsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, alias } = request.body;
    const createOrganizationService = container.resolve(
      CreateOrganizationService,
    );
    const organizations = await createOrganizationService.execute({
      id,
      name,
      alias,
    });
    return response.json(organizations);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listOrganizationsService = container.resolve(
      ListOrganizationsService,
    );
    const organizations = await listOrganizationsService.execute({ id });
    return response.json(organizations);
  }
}

export default OrganizationsController;
