import FakeAffiliationRepository from '../repositories/fakes/FakeAffiliationRepository';
import UpdateAffiliationService from './UpdateAffiliationService';

let fakeAffiliationRepository: FakeAffiliationRepository;
let updateAffiliation: UpdateAffiliationService;

describe('Update an Affiliation ', () => {
  beforeEach(() => {
    fakeAffiliationRepository = new FakeAffiliationRepository();
    updateAffiliation = new UpdateAffiliationService(fakeAffiliationRepository);
  });

  it('should be able to update an affiliation', async () => {
    const affiliation = await fakeAffiliationRepository.create({
      name: 'Sharingan II',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 5,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    const newAffiliation = await updateAffiliation.execute(affiliation.id, {
      name: 'Akatsuki',
      strength: 0,
      genjutsu: 10,
      speed: 15,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
      icon: 'www.fefwefqwef.com',
    });

    expect(newAffiliation.id).toBe(affiliation.id);
    expect(newAffiliation.name).toEqual('Akatsuki');
  });
});
