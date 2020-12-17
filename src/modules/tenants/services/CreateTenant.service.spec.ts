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
    const tenant = await createTenantService.execute({
      name: 'tenant',
      master: true,
    });
    expect(tenant).toHaveProperty('id');
    expect(tenant.active).toBe(true);
    expect(tenant.master).toBe(true);
    expect(tenant.name).toBe('tenant');
  });
});
