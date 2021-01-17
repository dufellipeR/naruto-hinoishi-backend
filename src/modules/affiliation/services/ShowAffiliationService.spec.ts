import FakeAffiliationRepository from '../repositories/fakes/FakeAffiliationRepository';
import ShowAffiliationService from './ShowAffiliationService';

let fakeAffiliationRepository: FakeAffiliationRepository;
let showAffiliation: ShowAffiliationService;

describe('Show an affiliation', () => {
  beforeEach(() => {
    fakeAffiliationRepository = new FakeAffiliationRepository();
    showAffiliation = new ShowAffiliationService(fakeAffiliationRepository);
  });

  it('should be able to show a specific affiliation', async () => {
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

    const aft2 = await fakeAffiliationRepository.create({
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

    const aft = await showAffiliation.execute(aft2.id);

    expect(aft.name).toBe(aft2.name);
  });
});
