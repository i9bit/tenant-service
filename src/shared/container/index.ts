import { container } from 'tsyringe';

import ITenantRepository from '@modules/tenants/repositories/ITenantRepository';
import TenantRepository from '@modules/tenants/infra/dynamoose/repositories/TenantRepository';

container.registerSingleton<ITenantRepository>(
  'TenantRepository',
  TenantRepository,
);
