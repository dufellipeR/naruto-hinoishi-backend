import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import FakeKekkeiRepository from '@modules/kekkei/repositories/fakes/FakeKekkeiRepository';
import FakeCharKekkeiRepository from '../repositories/fakes/FakeCharkekkeiRepository';
import CreateBunchCharKekkeiService from './CreateBunchCharKekkeiService';

let fakeKekkeiRepository: FakeKekkeiRepository;
let fakeCharacterRepository: FakeCharactersRepository;
let fakeCharKekkeiRepository: FakeCharKekkeiRepository;
let createBunchCharKekkei: CreateBunchCharKekkeiService;

describe('Create A bunch of Character Kekkei Genkai ', () => {
  beforeEach(() => {
    fakeKekkeiRepository = new FakeKekkeiRepository();
    fakeCharacterRepository = new FakeCharactersRepository();
    fakeCharKekkeiRepository = new FakeCharKekkeiRepository();
    createBunchCharKekkei = new CreateBunchCharKekkeiService(
      fakeCharKekkeiRepository,
    );
  });

  it('should be able to create a bunch of new Character kekkei genkai', async () => {
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

    const kekkei2 = await fakeKekkeiRepository.create({
      name: 'Rinnegan',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 45,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    const character = await fakeCharacterRepository.create({
      render: 'google@images.com',
      type: 'default',
      name: 'Kakakashi Hatake',
      desc: `Kakashi Hatake (はたけカカシ, Hatake Kakashi) is a shinobi of
      Konohagakure's Hatake clan.
      Famed as Kakashi of the Sharingan (写輪眼のカカシ, Sharingan no Kakashi)`,
      strength: 70,
      intelligence: 70,
      speed: 70,
      genjutsu: 70,
      ninjutsu: 70,
      taijutsu: 70,
      stamina: 70,
      willpower: 70,
      power: 70,
    });

    const createNewBunchCharKekkei = await createBunchCharKekkei.execute({
      character_id: character.id,
      items: [
        { value: kekkei.id, label: kekkei.name },
        { value: kekkei2.id, label: kekkei2.name },
      ],
    });

    expect(createNewBunchCharKekkei).toHaveLength(2);
  });
});
