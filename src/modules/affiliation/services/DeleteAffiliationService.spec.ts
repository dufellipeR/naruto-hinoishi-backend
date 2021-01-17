import FakeAffiliationRepository from '../repositories/fakes/FakeAffiliationRepository';
import DeleteAffiliationService from './DeleteAffiliationService';

let fakeAffiliationRepository: FakeAffiliationRepository;
let deleteAffiliation: DeleteAffiliationService;

describe('Delete a affiliation', () => {
  beforeEach(() => {
    fakeAffiliationRepository = new FakeAffiliationRepository();
    deleteAffiliation = new DeleteAffiliationService(fakeAffiliationRepository);
  });

  it('should be able to delete a affiliation', async () => {
    const aft1 = await fakeAffiliationRepository.create({
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

    await deleteAffiliation.execute(aft1.id);

    const affiliations = await fakeAffiliationRepository.findAll();

    expect(affiliations).toHaveLength(1);
  });
});
