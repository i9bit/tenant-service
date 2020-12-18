import ServiceException from '@shared/errors/ServiceException';

import FakeTenantRepository from '../repositories/fakes/FakeTenantRepository';
import ITenantRepository from '../repositories/ITenantRepository';
import CreateTenantService from './CreateTenant.service';
import GetTenantService from './GetTenant.service';

describe('GetTenantService', () => {
  let fakeTenantRepository: ITenantRepository;
  let getTenantService: GetTenantService;
  let createTenantService: CreateTenantService;

  beforeEach(() => {
    fakeTenantRepository = new FakeTenantRepository();
    createTenantService = new CreateTenantService(fakeTenantRepository);
    getTenantService = new GetTenantService(fakeTenantRepository);
  });

  it('should be able to get tenant', async () => {
    const response = await createTenantService.execute({
      name: 'tenant-1',
      master: false,
    });
    const tenant = await getTenantService.execute(response.id);
    expect(tenant).toEqual(response);
  });

  it('should not be able to get tenant if non-existing', async () => {
    await expect(getTenantService.execute('wrong-id')).rejects.toBeInstanceOf(
      ServiceException,
    );
  });
});
