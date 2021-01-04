import AppError from '@shared/errors/AppError';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import ShowCharacterService from './ShowCharacterService';

let fakeCharacterRepository: FakeCharactersRepository;
let showCharacter: ShowCharacterService;

describe('Show Character', () => {
  beforeEach(() => {
    fakeCharacterRepository = new FakeCharactersRepository();
    showCharacter = new ShowCharacterService(fakeCharacterRepository);
  });

  it('should be able to show a character', async () => {
    const char2 = await fakeCharacterRepository.create({
      thumbnail: 'www.nicepng.com/png/lee',
      type: 'Classic',
      name: 'Rock Lee',
      desc: " Rock Lee  was a shinobi of Konohagakure's Hyūga clan.",
      power: 46,
      intelligence: 50,
      speed: 43,
      taijutsu: 49,
      ninjutsu: 45,
      genjutsu: 30,
      endurance: 40,
      willpower: 30,
      overall: 42,
    });

    const character = await showCharacter.execute(char2.id);

    expect(character).toEqual(char2);
  });

  it('should not be able to show a character with invalid ID', async () => {
    await expect(showCharacter.execute('invalid-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
