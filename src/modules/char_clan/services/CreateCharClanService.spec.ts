import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import FakeClanRepository from '@modules/clan/repositories/fakes/FakeClanRepository';
import FakeCharClanRepository from '../repositories/fakes/FakeCharClanRepository';
import CreateCharClanService from './CreateCharClanService';

let fakeClanRepository: FakeClanRepository;
let fakeCharacterRepository: FakeCharactersRepository;
let fakeCharClanRepository: FakeCharClanRepository;
let createCharClan: CreateCharClanService;

describe('Create A Character Clan ', () => {
  beforeEach(() => {
    fakeClanRepository = new FakeClanRepository();
    fakeCharacterRepository = new FakeCharactersRepository();
    fakeCharClanRepository = new FakeCharClanRepository();
    createCharClan = new CreateCharClanService(fakeCharClanRepository);
  });

  it('should be able to create a new Character Clan', async () => {
    const clan = await fakeClanRepository.create({
      name: 'Hatake',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 5,
      stamina: 20,
      taijutsu: 0,
      willpower: 15,
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

    const createNewCharClan = await createCharClan.execute({
      character_id: character.id,
      clan_id: clan.id,
    });

    expect(createNewCharClan).toHaveProperty('id');
    expect(createNewCharClan.character_id).toEqual(character.id);
  });
});
