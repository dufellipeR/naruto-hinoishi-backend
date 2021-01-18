import FakeAffiliationRepository from '../repositories/fakes/FakeAffiliationRepository';
import ListAffiliationService from './ListAffiliationServices';

let fakeAffiliationRepository: FakeAffiliationRepository;
let listAffiliations: ListAffiliationService;

describe('List All Affiliation', () => {
  beforeEach(() => {
    fakeAffiliationRepository = new FakeAffiliationRepository();
    listAffiliations = new ListAffiliationService(fakeAffiliationRepository);
  });

  it('should be able to list all affiliation', async () => {
    await fakeAffiliationRepository.create({
      name: 'Akatsuki',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 5,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    await fakeAffiliationRepository.create({
      name: 'Konohagakure',
      strength: 0,
      genjutsu: 10,
      speed: 15,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    const affiliations = await listAffiliations.execute();

    expect(affiliations).toHaveLength(2);
  });
});
