import { inject, injectable } from 'tsyringe';

import { ScanResponse } from '@config/dynamoose';

import Tenant from '../infra/dynamoose/entities/Tenant';
import ITenantRepository from '../repositories/ITenantRepository';

@injectable()
class ListTenantsService {
  constructor(
    @inject('TenantRepository')
    private readonly tenantRepository: ITenantRepository | ITenantRepository,
  ) {}

  async execute(): Promise<ScanResponse<Tenant>> {
    return this.tenantRepository.all();
  }
}

export default ListTenantsService;
