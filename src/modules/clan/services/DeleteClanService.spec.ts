import FakeClanRepository from '../repositories/fakes/FakeClanRepository';
import DeleteClanService from './DeleteClanService';

let fakeClanRepository: FakeClanRepository;
let deleteClan: DeleteClanService;

describe('Delete a clan', () => {
  beforeEach(() => {
    fakeClanRepository = new FakeClanRepository();
    deleteClan = new DeleteClanService(fakeClanRepository);
  });

  it('should be able to delete a clan', async () => {
    const clan1 = await fakeClanRepository.create({
      name: 'Uchiha',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 15,
      stamina: 0,
      taijutsu: 0,
      willpower: 15,
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

    await deleteClan.execute(clan1.id);

    const clans = await fakeClanRepository.findAll();

    expect(clans).toHaveLength(1);
  });
});
