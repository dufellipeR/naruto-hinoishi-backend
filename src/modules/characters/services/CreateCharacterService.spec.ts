// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import CreateCharacterService from './CreateCharacterService';

let fakeCharactersRepository: FakeCharactersRepository;
let createCharacter: CreateCharacterService;

describe('Create Character ', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    createCharacter = new CreateCharacterService(fakeCharactersRepository);
  });

  it('should be able to create a new character', async () => {
    const character = await createCharacter.execute({
      thumbnail: 'google@images.com',
      type: 'default',
      name: 'Kakakashi Hatake',
      desc: `Kakashi Hatake (はたけカカシ, Hatake Kakashi) is a shinobi of
      Konohagakure's Hatake clan.
      Famed as Kakashi of the Sharingan (写輪眼のカカシ, Sharingan no Kakashi)`,
      power: 70,
      intelligence: 70,
      speed: 70,
      genjutsu: 70,
      ninjutsu: 70,
      taijutsu: 70,
      endurance: 70,
      willpower: 70,
    });

    expect(character).toHaveProperty('id');
    expect(character.name).toBe('Kakakashi Hatake');
  });

  it('should not be able to create a new character with overall 100+', async () => {
    await expect(
      createCharacter.execute({
        thumbnail: 'google@images.com',
        type: 'default',
        name: 'Kakakashi Hatake',
        desc: `Kakashi Hatake (はたけカカシ, Hatake Kakashi) is a shinobi of
      Konohagakure's Hatake clan.
      Famed as Kakashi of the Sharingan (写輪眼のカカシ, Sharingan no Kakashi)`,
        power: 101,
        intelligence: 101,
        speed: 101,
        genjutsu: 101,
        ninjutsu: 101,
        taijutsu: 101,
        endurance: 101,
        willpower: 101,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
