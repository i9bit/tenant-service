import { v4 as uuid } from 'uuid';
import ServiceException from '../errors/ServiceException';
import Tenant from '../models/Tenant';

interface ICreateOrganization {
  alias: string;
  id: string;
  name: string;
}

class CreateOrganizationService {
  async execute({ id, name, alias }: ICreateOrganization) {
    const alreadyExists = await Tenant.GetByAlias(alias);

    if (alreadyExists.count) {
      throw new ServiceException({
        message: "Alias for organization doesn't available",
        statusCode: 400,
      });
    }

    const response = await Tenant.Create({
      id,
      organization_id: uuid(),
      active: true,
      alias,
      name,
    });
    return response;
  }
}

export default new CreateOrganizationService();
