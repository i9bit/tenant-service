import Tenant from '../models/Tenant';

interface IListOrganizations {
  id: string;
}
class CreateTenantService {
  async execute({ id }: IListOrganizations) {
    const response = await Tenant.AllByTenant(id);
    return response;
  }
}

export default new CreateTenantService();
