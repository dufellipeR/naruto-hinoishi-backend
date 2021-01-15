import FakeKekkeiRepository from '../repositories/fakes/FakeKekkeiRepository';
import UpdateKekkeiService from './UpdateKekkeiService';

let fakeKekkeiRepository: FakeKekkeiRepository;
let updateKekkei: UpdateKekkeiService;

describe('Update Kekkei Genkai ', () => {
  beforeEach(() => {
    fakeKekkeiRepository = new FakeKekkeiRepository();
    updateKekkei = new UpdateKekkeiService(fakeKekkeiRepository);
  });

  it('should be able to update a kekkei genkai', async () => {
    const kekkei = await fakeKekkeiRepository.create({
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

    const newKekkei = await updateKekkei.execute(kekkei.id, {
      name: 'Sharingan III',
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

    expect(newKekkei.id).toBe(kekkei.id);
    expect(newKekkei.name).toEqual('Sharingan III');
  });
});
