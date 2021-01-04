import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import ListCharactersService from './ListCharactersService';

let fakeCharacterRepository: FakeCharactersRepository;
let listCharacters: ListCharactersService;

describe('List Characters', () => {
  beforeEach(() => {
    fakeCharacterRepository = new FakeCharactersRepository();
    listCharacters = new ListCharactersService(fakeCharacterRepository);
  });

  it('should be able to list the characters', async () => {
    const char1 = await fakeCharacterRepository.create({
      thumbnail:
        'https://www.nicepng.com/png/detail/356-3564607_neji-hyuga-neji-hyuga-part-1.png',
      type: 'Classic',
      name: 'Neji Hyūga',
      desc:
        " Neji Hyūga (日向ネジ, Hyūga Neji) was a shinobi of Konohagakure's Hyūga clan.",
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

    const characters = await listCharacters.execute();

    expect(characters).toEqual([char1, char2]);
  });
});
