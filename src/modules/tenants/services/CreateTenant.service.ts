import { v4 as uuid } from 'uuid';
import Tenant from '../models/Tenant';

interface ICreateTenant {
  alias: string;
}
class CreateTenantService {
  async execute({ alias }: ICreateTenant) {
    const response = await Tenant.Create({
      id: uuid(),
      organization_id: uuid(),
      active: true,
      alias,
      name: `tenant-${uuid()}`,
    });
    return response;
  }
}

export default new CreateTenantService();
