import { QueryResponse, ScanResponse } from '@config/dynamoose';
import Tenant from '../infra/dynamoose/entities/Tenant';

export default interface ITenantRepository {
  getTenant(id: string): Promise<Tenant>;
  create(data: Partial<Tenant>): Promise<Tenant>;
  findAll(): Promise<ScanResponse<Tenant>>;
  findAllOrganizationsByTenant(id: string): Promise<QueryResponse<Tenant>>;
  getTenantByAlias(alias: string): Promise<QueryResponse<Tenant>>;
}
