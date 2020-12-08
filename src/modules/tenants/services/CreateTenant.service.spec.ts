import ServiceException from '@shared/errors/ServiceException';

import FakeTenantRepository from '../repositories/fakes/FakeTenantRepository';
import ITenantRepository from '../repositories/ITenantRepository';
import CreateTenantService from './CreateTenant.service';

describe('CreateTenantService', () => {
  let fakeTenantRepository: ITenantRepository;
  let createTenantService: CreateTenantService;

  beforeEach(() => {
    fakeTenantRepository = new FakeTenantRepository();
    createTenantService = new CreateTenantService(fakeTenantRepository);
  });

  it('should be able to create tenant', async () => {
    const tenant = await createTenantService.execute({ alias: 'my-tenant' });
    expect(tenant).toHaveProperty('id');
    expect(tenant.active).toBe(true);
    expect(tenant.alias).toBe('my-tenant');
    expect(tenant).toHaveProperty('name');
  });

  it('should not be able to create tenant if already exists', async () => {
    await createTenantService.execute({ alias: 'my-tenant' });

    await expect(
      createTenantService.execute({ alias: 'my-tenant' }),
    ).rejects.toBeInstanceOf(ServiceException);
  });
});
