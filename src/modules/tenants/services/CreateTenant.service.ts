import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import Tenant, { AuthenticationType } from '../infra/dynamoose/entities/Tenant';
import ITenantRepository from '../repositories/ITenantRepository';

interface ICreateTenant {
  name: string;
  master: boolean;
}

@injectable()
class CreateTenantService {
  constructor(
    @inject('TenantRepository')
    private readonly tenantRepository: ITenantRepository | ITenantRepository,
  ) {}

  async execute({ name, master }: ICreateTenant): Promise<Tenant> {
    const response = await this.tenantRepository.create({
      id: uuid(),
      active: true,
      name,
      master,
      authentications: [
        {
          type: AuthenticationType.BEARER,
        },
      ],
    });
    return response;
  }
}

export default CreateTenantService;
