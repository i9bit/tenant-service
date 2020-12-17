import { ScanResponse } from '@config/dynamoose';
import Tenant from '@modules/tenants/infra/dynamoose/entities/Tenant';

import ITenantRepository from '../ITenantRepository';

type Full<T> = {
  [P in keyof T]-?: T[P];
};

class FakeTenantRepository implements ITenantRepository {
  private tenants: Tenant[] = [];

  public get(id: string): Promise<Tenant | undefined> {
    const response = this.tenants.find(item => item.id === id);
    return Promise.resolve(response);
  }

  public create(data: Partial<Tenant>): Promise<Tenant> {
    const tenant = data as Full<Tenant>;
    this.tenants.push(tenant);
    return Promise.resolve(tenant);
  }

  public all(): Promise<ScanResponse<Tenant>> {
    const data = this.tenants as ScanResponse<Tenant>;
    Object.assign(data, {
      scannedCount: this.tenants.length,
      timesScanned: 0,
      count: this.tenants.length,
      lastKey: undefined,
    });
    return Promise.resolve(data);
  }
}

export default FakeTenantRepository;
