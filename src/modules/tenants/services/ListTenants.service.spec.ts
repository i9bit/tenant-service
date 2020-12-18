import FakeTenantRepository from '../repositories/fakes/FakeTenantRepository';
import ITenantRepository from '../repositories/ITenantRepository';
import CreateTenantService from './CreateTenant.service';
import ListTenantsService from './ListTenants.service';

describe('ListTenantsService', () => {
  let fakeTenantRepository: ITenantRepository;
  let listTenantsService: ListTenantsService;
  let createTenantService: CreateTenantService;

  beforeEach(() => {
    fakeTenantRepository = new FakeTenantRepository();
    createTenantService = new CreateTenantService(fakeTenantRepository);
    listTenantsService = new ListTenantsService(fakeTenantRepository);
  });

  it('should be able to list tenants', async () => {
    await createTenantService.execute({
      name: 'tenant-1',
      master: false,
    });

    await createTenantService.execute({
      name: 'tenant-master',
      master: true,
    });

    const tenants = await listTenantsService.execute();

    expect(tenants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'tenant-1',
          active: true,
          master: false,
        }),
        expect.objectContaining({
          active: true,
          name: 'tenant-master',
          master: true,
        }),
      ]),
    );
  });
});
