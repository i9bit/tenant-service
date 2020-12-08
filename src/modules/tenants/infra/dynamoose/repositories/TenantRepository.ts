import { QueryResponse, ScanResponse } from '@config/dynamoose';
import ITenantRepository, {
  ITenantAndOrganizationRequest,
} from '@modules/tenants/repositories/ITenantRepository';

import Tenant from '../entities/Tenant';
import Schema from '../entities/Tenant/schema';

class TenantRepository implements ITenantRepository {
  getTenantAndOrganization({
    id,
    organization_id,
  }: ITenantAndOrganizationRequest): Promise<QueryResponse<Tenant>> {
    return Schema.query('id')
      .eq(id)
      .where('organization_id')
      .eq(organization_id)
      .exec();
  }

  public getTenant(id: string): Promise<Tenant | undefined> {
    return Schema.get(id);
  }

  public create(data: Partial<Tenant>): Promise<Tenant> {
    return Schema.create(data);
  }

  public findAll(): Promise<ScanResponse<Tenant>> {
    return Schema.scan().exec();
  }

  public findAllOrganizationsByTenant(
    id: string,
  ): Promise<QueryResponse<Tenant>> {
    return Schema.query('id').eq(id).exec();
  }

  public getTenantByAlias(alias: string): Promise<QueryResponse<Tenant>> {
    return Schema.query('alias')
      .eq(alias)
      .using('idx_organization_alias')
      .exec();
  }
}

export default TenantRepository;
