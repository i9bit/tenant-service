import FakeTenantRepository from '../repositories/fakes/FakeTenantRepository';
import ITenantRepository from '../repositories/ITenantRepository';
import CreateOrganizationService from './CreateOrganization.service';
import ListOrganizationsService from './ListOrganizations.service';

describe('ListOrganizationsService', () => {
  let fakeTenantRepository: ITenantRepository;
  let listOrganizationsService: ListOrganizationsService;
  let createOrganization: CreateOrganizationService;

  beforeEach(() => {
    fakeTenantRepository = new FakeTenantRepository();
    createOrganization = new CreateOrganizationService(fakeTenantRepository);
    listOrganizationsService = new ListOrganizationsService(
      fakeTenantRepository,
    );
  });

  it('should be able to list organizations', async () => {
    await createOrganization.execute({
      id: 'my-id',
      alias: 'alias-2',
      name: 'name-2',
    });

    await createOrganization.execute({
      id: 'my-id',
      alias: 'alias-3',
      name: 'name-3',
    });

    const tenants = await listOrganizationsService.execute({
      id: 'my-id',
    });

    expect(tenants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'my-id',
          active: true,
          alias: 'alias-2',
          name: 'name-2',
        }),
        expect.objectContaining({
          id: 'my-id',
          active: true,
          alias: 'alias-3',
          name: 'name-3',
        }),
      ]),
    );
  });
});
