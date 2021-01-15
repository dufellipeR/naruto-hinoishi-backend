import FakeKekkeiRepository from '../repositories/fakes/FakeKekkeiRepository';
import ShowKekkeiService from './ShowKekkeiService';

let fakeKekkeiRepository: FakeKekkeiRepository;
let showKekkei: ShowKekkeiService;

describe('List All Kekkeis', () => {
  beforeEach(() => {
    fakeKekkeiRepository = new FakeKekkeiRepository();
    showKekkei = new ShowKekkeiService(fakeKekkeiRepository);
  });

  it('should be able to show a specific kekkei', async () => {
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

    const kekkei2 = await fakeKekkeiRepository.create({
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

    const kekkei = await showKekkei.execute(kekkei2.id);

    expect(kekkei.name).toBe(kekkei2.name);
  });
});
