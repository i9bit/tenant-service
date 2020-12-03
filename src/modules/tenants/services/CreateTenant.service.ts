import { v4 as uuid } from 'uuid';

import { inject, injectable } from 'tsyringe';

import ITenantRepository from '../repositories/ITenantRepository';
import Tenant from '../infra/dynamoose/entities/Tenant';

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
