import { inject, injectable } from 'tsyringe';

import ServiceException from '@shared/errors/ServiceException';

import Tenant from '../infra/dynamoose/entities/Tenant';
import ITenantRepository, {
  ITenantAndOrganizationRequest,
} from '../repositories/ITenantRepository';

@injectable()
class GetTenantAndOrganizationService {
  constructor(
    @inject('TenantRepository')
    private tenantRepository: ITenantRepository,
  ) {}

  async execute({
    id,
    organization_id,
  }: ITenantAndOrganizationRequest): Promise<Tenant> {
    const response = await this.tenantRepository.getTenantAndOrganization({
      id,
      organization_id,
    });

    if (!response.count) {
      throw new ServiceException({ message: "Tenant doesn't found" });
    }

    const [tenant] = response;

    return tenant;
  }
}

export default GetTenantAndOrganizationService;
