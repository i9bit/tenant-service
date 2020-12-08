import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import ServiceException from '@shared/errors/ServiceException';

import Tenant from '../infra/dynamoose/entities/Tenant';
import ITenantRepository from '../repositories/ITenantRepository';

interface ICreateOrganization {
  alias: string;
  id: string;
  name: string;
}

@injectable()
class CreateOrganizationService {
  constructor(
    @inject('TenantRepository')
    private readonly tenantRepository: ITenantRepository | ITenantRepository,
  ) {}

  async execute({ id, name, alias }: ICreateOrganization): Promise<Tenant> {
    const alreadyExists = await this.tenantRepository.getTenantByAlias(alias);

    if (alreadyExists.count) {
      throw new ServiceException({
        message: "Alias for organization doesn't available",
        statusCode: 400,
      });
    }

    const response = await this.tenantRepository.create({
      id,
      organization_id: uuid(),
      active: true,
      alias,
      name,
    });
    return response;
  }
}

export default CreateOrganizationService;
