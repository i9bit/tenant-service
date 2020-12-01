import { Request, Response } from 'express';

import ListOrganizationsService from '../services/ListOrganizations.service';
import CreateOrganizationService from '../services/CreateOrganization.service';

class OrganizationsController {
  async create(request: Request, response: Response) {
    const { id } = request.params;
    const { name, alias } = request.body;
    const organizations = await CreateOrganizationService.execute({
      id,
      name,
      alias,
    });
    return response.json(organizations);
  }

  async index(request: Request, response: Response) {
    const { id } = request.params;
    const organizations = await ListOrganizationsService.execute({ id });
    return response.json(organizations);
  }
}

export default new OrganizationsController();
