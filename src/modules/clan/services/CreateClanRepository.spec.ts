import FakeClanRepository from '../repositories/fakes/FakeClanRepository';
import CreateClanService from './CreateClanService';

let fakeClanRepository: FakeClanRepository;
let createClan: CreateClanService;

describe('Create Clan ', () => {
  beforeEach(() => {
    fakeClanRepository = new FakeClanRepository();
    createClan = new CreateClanService(fakeClanRepository);
  });

  it('should be able to create a new clan', async () => {
    const clan = await createClan.execute({
      name: 'Uchiha',
      strength: 0,
      genjutsu: 10,
      speed: 0,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 20,
    });

    expect(clan).toHaveProperty('id');
    expect(clan.name).toEqual('Uchiha');
  });
});
