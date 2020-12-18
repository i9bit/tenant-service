import { inject, injectable } from 'tsyringe';

import ServiceException from '@shared/errors/ServiceException';

import Tenant from '../infra/dynamoose/entities/Tenant';
import ITenantRepository from '../repositories/ITenantRepository';

@injectable()
class GetTenantService {
  constructor(
    @inject('TenantRepository')
    private tenantRepository: ITenantRepository | ITenantRepository,
  ) {}

  async execute(id: string): Promise<Tenant> {
    const response = await this.tenantRepository.get(id);

    if (!response) {
      throw new ServiceException({ message: "Tenant doesn't found" });
    }

    return response;
  }
}

export default GetTenantService;
