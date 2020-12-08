import ServiceException from '@shared/errors/ServiceException';

import FakeTenantRepository from '../repositories/fakes/FakeTenantRepository';
import ITenantRepository from '../repositories/ITenantRepository';
import CreateOrganizationService from './CreateOrganization.service';

describe('CreateOrganizationService', () => {
  let fakeTenantRepository: ITenantRepository;
  let createOrganizationService: CreateOrganizationService;

  beforeEach(() => {
    fakeTenantRepository = new FakeTenantRepository();
    createOrganizationService = new CreateOrganizationService(
      fakeTenantRepository,
    );
  });

  it('should be able to create organization', async () => {
    const tenant = await createOrganizationService.execute({
      id: 'my-tenant',
      alias: 'production',
      name: 'Tenant Production',
    });
    expect(tenant.id).toBe('my-tenant');
    expect(tenant.active).toBe(true);
    expect(tenant.alias).toBe('production');
    expect(tenant.name).toBe('Tenant Production');
  });

  it('should not be able to create organization if already exists', async () => {
    await createOrganizationService.execute({
      id: 'my-tenant',
      alias: 'production',
      name: 'Tenant Production',
    });

    await expect(
      createOrganizationService.execute({
        id: 'my-tenant',
        alias: 'production',
        name: 'Tenant Production',
      }),
    ).rejects.toBeInstanceOf(ServiceException);
  });
});
