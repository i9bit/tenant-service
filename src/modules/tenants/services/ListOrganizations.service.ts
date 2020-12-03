import { inject, injectable } from 'tsyringe';
import { QueryResponse } from '../../../@types/dynamoose';

import Tenant from '../infra/dynamoose/entities/Tenant';
import ITenantRepository from '../repositories/ITenantRepository';

interface IListOrganizations {
  id: string;
}

@injectable()
class ListOrganizationsService {
  constructor(
    @inject('TenantRepository')
    private tenantRepository: ITenantRepository,
  ) {}

  async execute({ id }: IListOrganizations): Promise<QueryResponse<Tenant>> {
    return this.tenantRepository.findAllOrganizationsByTenant(id);
  }
}

export default ListOrganizationsService;
