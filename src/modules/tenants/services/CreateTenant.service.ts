import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import ServiceException from '@shared/errors/ServiceException';

import Tenant from '../infra/dynamoose/entities/Tenant';
import ITenantRepository from '../repositories/ITenantRepository';

interface ICreateTenant {
  alias: string;
}

@injectable()
class CreateTenantService {
  constructor(
    @inject('TenantRepository')
    private tenantRepository: ITenantRepository,
  ) {}

  async execute({ alias }: ICreateTenant): Promise<Tenant> {
    const alreadyExists = await this.tenantRepository.getTenantByAlias(alias);

    if (alreadyExists.count) {
      throw new ServiceException({
        message: "Alias for tenant doesn't available",
        statusCode: 400,
      });
    }
    const response = await this.tenantRepository.create({
      id: uuid(),
      organization_id: uuid(),
      active: true,
      alias,
      name: `tenant-${uuid()}`,
    });
    return response;
  }
}

export default CreateTenantService;
