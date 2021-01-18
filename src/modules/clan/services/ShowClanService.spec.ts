import FakeClanRepository from '../repositories/fakes/FakeClanRepository';
import ShowClanService from './ShowClanService';

let fakeClanRepository: FakeClanRepository;
let showClan: ShowClanService;

describe('Show a clan', () => {
  beforeEach(() => {
    fakeClanRepository = new FakeClanRepository();
    showClan = new ShowClanService(fakeClanRepository);
  });

  it('should be able to show a specific clan', async () => {
    await fakeClanRepository.create({
      name: 'Uchiha',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 5,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    const clan2 = await fakeClanRepository.create({
      name: 'hyuuga',
      strength: 0,
      genjutsu: 10,
      speed: 15,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    const clan = await showClan.execute(clan2.id);

    expect(clan.name).toBe(clan2.name);
  });
});
