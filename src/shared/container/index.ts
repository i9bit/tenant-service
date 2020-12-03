import { container } from 'tsyringe';

import TenantRepository from '@modules/tenants/infra/dynamoose/repositories/TenantRepository';
import ITenantRepository from '@modules/tenants/repositories/ITenantRepository';

container.registerSingleton<ITenantRepository>(
  'TenantRepository',
  TenantRepository,
);
