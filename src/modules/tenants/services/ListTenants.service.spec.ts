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
      alias: 'alias-2',
    });

    await createTenantService.execute({
      alias: 'alias-3',
    });

    const tenants = await listTenantsService.execute();

    expect(tenants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          active: true,
          alias: 'alias-2',
        }),
        expect.objectContaining({
          active: true,
          alias: 'alias-3',
        }),
      ]),
    );
  });
});
