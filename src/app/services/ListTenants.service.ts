import Tenant from '../models/Tenant';

class ListTenantsService {
  async execute() {
    return Tenant.All();
  }
}

export default new ListTenantsService();
