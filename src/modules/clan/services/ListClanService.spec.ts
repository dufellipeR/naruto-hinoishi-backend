import FakeClanRepository from '../repositories/fakes/FakeClanRepository';
import ListClanService from './ListClanService';

let fakeClanRepository: FakeClanRepository;
let listClans: ListClanService;

describe('List All Clans', () => {
  beforeEach(() => {
    fakeClanRepository = new FakeClanRepository();
    listClans = new ListClanService(fakeClanRepository);
  });

  it('should be able to list all clans', async () => {
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

    await fakeClanRepository.create({
      name: 'Hyuuga',
      strength: 0,
      genjutsu: 10,
      speed: 15,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    const clans = await listClans.execute();

    expect(clans).toHaveLength(2);
  });
});
