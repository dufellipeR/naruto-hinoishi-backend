import AppError from '@shared/errors/AppError';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import DeleteCharacterService from './DeleteCharacterService';

let fakeCharacterRepository: FakeCharactersRepository;
let deleteCharacter: DeleteCharacterService;

describe('Delete Character', () => {
  beforeEach(() => {
    fakeCharacterRepository = new FakeCharactersRepository();
    deleteCharacter = new DeleteCharacterService(fakeCharacterRepository);
  });

  it('should be able to delete a character', async () => {
    const char2 = await fakeCharacterRepository.create({
      render: 'www.nicepng.com/png/lee',
      type: 'Classic',
      name: 'Rock Lee',
      desc: " Rock Lee  was a shinobi of Konohagakure's Hyūga clan.",
      strength: 46,
      intelligence: 50,
      speed: 43,
      taijutsu: 49,
      ninjutsu: 45,
      genjutsu: 30,
      stamina: 40,
      willpower: 30,
      power: 42,
    });

    const characters = await deleteCharacter.execute(char2.id);

    expect(characters).toHaveLength(0);
  });

  it('should not be able to delete a character with invalid ID', async () => {
    await expect(deleteCharacter.execute('invalid-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
