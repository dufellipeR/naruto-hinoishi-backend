import FakeKekkeiRepository from '../repositories/fakes/FakeKekkeiRepository';
import DeleteKekkeiService from './DeleteKekkeiService';

let fakeKekkeiRepository: FakeKekkeiRepository;
let deleteKekkei: DeleteKekkeiService;

describe('List All Kekkeis', () => {
  beforeEach(() => {
    fakeKekkeiRepository = new FakeKekkeiRepository();
    deleteKekkei = new DeleteKekkeiService(fakeKekkeiRepository);
  });

  it('should be able to list all kekkeis', async () => {
    const kekkei1 = await fakeKekkeiRepository.create({
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

    await deleteKekkei.execute(kekkei1.id);

    const kekkeis = await fakeKekkeiRepository.findAll();

    expect(kekkeis).toHaveLength(1);
  });
});
