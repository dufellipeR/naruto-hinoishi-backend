import FakeKekkeiRepository from '../repositories/fakes/FakeKekkeiRepository';
import ListKekkeisService from './ListKekkeisService';

let fakeKekkeiRepository: FakeKekkeiRepository;
let listKekkeis: ListKekkeisService;

describe('List All Kekkeis', () => {
  beforeEach(() => {
    fakeKekkeiRepository = new FakeKekkeiRepository();
    listKekkeis = new ListKekkeisService(fakeKekkeiRepository);
  });

  it('should be able to list a kekkei', async () => {
    await fakeKekkeiRepository.create({
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

    await fakeKekkeiRepository.create({
      name: 'Sharingan III',
      strength: 0,
      genjutsu: 10,
      speed: 15,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    const kekkeis = await listKekkeis.execute();

    expect(kekkeis).toHaveLength(2);
  });
});
