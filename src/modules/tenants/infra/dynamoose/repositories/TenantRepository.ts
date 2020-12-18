import { ScanResponse } from '@config/dynamoose';
import ITenantRepository from '@modules/tenants/repositories/ITenantRepository';

import Tenant from '../entities/Tenant';
import Schema from '../entities/Tenant/schema';

class TenantRepository implements ITenantRepository {
  public getTenant(id: string): Promise<Tenant | undefined> {
    return Schema.get(id);
  }

  public create(data: Partial<Tenant>): Promise<Tenant> {
    return Schema.create(data);
  }

  public findAll(): Promise<ScanResponse<Tenant>> {
    return Schema.scan().exec();
  }
}

export default TenantRepository;
