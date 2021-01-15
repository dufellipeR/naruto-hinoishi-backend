import FakeKekkeiRepository from '../repositories/fakes/FakeKekkeiRepository';
import CreateKekkeiService from './CreateKekkeiService';

let fakeKekkeiRepository: FakeKekkeiRepository;
let createKekkei: CreateKekkeiService;

describe('Create Kekkei Genkai ', () => {
  beforeEach(() => {
    fakeKekkeiRepository = new FakeKekkeiRepository();
    createKekkei = new CreateKekkeiService(fakeKekkeiRepository);
  });

  it('should be able to create a new kekkei genkai', async () => {
    const kekkei = await createKekkei.execute({
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

    expect(kekkei).toHaveProperty('id');
    expect(kekkei.name).toEqual('Sharingan II');
  });
});
