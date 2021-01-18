import FakeClanRepository from '../repositories/fakes/FakeClanRepository';
import UpdateClanService from './UpdateClanService';

let fakeClanRepository: FakeClanRepository;
let updateClan: UpdateClanService;

describe('Update a clan ', () => {
  beforeEach(() => {
    fakeClanRepository = new FakeClanRepository();
    updateClan = new UpdateClanService(fakeClanRepository);
  });

  it('should be able to update a clan', async () => {
    const clan = await fakeClanRepository.create({
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

    const newclan = await updateClan.execute(clan.id, {
      name: 'Hyuuga',
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

    expect(newclan.id).toBe(clan.id);
    expect(newclan.name).toEqual('Hyuuga');
  });
});
