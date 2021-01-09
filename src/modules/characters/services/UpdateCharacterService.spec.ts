// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import UpdateCharacterService from './UpdateCharacterService';

let fakeCharactersRepository: FakeCharactersRepository;
let updateCharacter: UpdateCharacterService;

describe('Update Character ', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    updateCharacter = new UpdateCharacterService(fakeCharactersRepository);
  });

  it('should be able to update a character', async () => {
    const char1 = await fakeCharactersRepository.create({
      thumbnail: 'google@images.com',
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

    await updateCharacter.execute({
      id: char1.id,
      thumbnail: 'google@images.com',
      type: 'default',
      name: 'Asuma Sarutobi',
      desc: `Kakashi Hatake (はたけカカシ, Hatake Kakashi) is a shinobi of
      Konohagakure's Hatake clan.
      Famed as Kakashi of the Sharingan (写輪眼のカカシ, Sharingan no Kakashi)`,
      stat_id: 'some_stat_id',
      strength: 70,
      intelligence: 70,
      speed: 70,
      genjutsu: 70,
      ninjutsu: 70,
      taijutsu: 70,
      stamina: 70,
      willpower: 70,
    });

    const character = await fakeCharactersRepository.findById(char1.id);

    expect(character?.name).toBe('Asuma Sarutobi');
  });
});
