import { ScanResponse } from '@config/dynamoose';

import Tenant from '../infra/dynamoose/entities/Tenant';

export default interface ITenantRepository {
  get(id: string): Promise<Tenant | undefined>;
  create(data: Partial<Tenant>): Promise<Tenant>;
  all(): Promise<ScanResponse<Tenant>>;
}
