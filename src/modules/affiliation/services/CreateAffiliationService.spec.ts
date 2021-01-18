import FakeAffiliationRepository from '../repositories/fakes/FakeAffiliationRepository';
import CreateAffiliationService from './CreateAffiliationService';

let fakeAffiliationRepository: FakeAffiliationRepository;
let createAffiliation: CreateAffiliationService;

describe('Create Affiliation ', () => {
  beforeEach(() => {
    fakeAffiliationRepository = new FakeAffiliationRepository();
    createAffiliation = new CreateAffiliationService(fakeAffiliationRepository);
  });

  it('should be able to create a new affiliation', async () => {
    const affiliation = await createAffiliation.execute({
      name: 'Akatsuki',
      strength: 0,
      genjutsu: 0,
      speed: 0,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 15,
    });

    expect(affiliation).toHaveProperty('id');
    expect(affiliation.name).toEqual('Akatsuki');
  });
});
