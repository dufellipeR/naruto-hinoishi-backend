import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import FakeCardsRepository from '../repositories/fakes/FakeCardsRepository';
import ListUserCardsService from './ListUserCardsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCharactersRepository: FakeCharactersRepository;
let fakeCardsRepository: FakeCardsRepository;
let listCards: ListUserCardsService;

describe('List Random User CArds', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCharactersRepository = new FakeCharactersRepository();
    fakeCardsRepository = new FakeCardsRepository();
    listCards = new ListUserCardsService(fakeCardsRepository);
  });

  it('should be able to list user cards', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'ex@ample.com.br',
      name: 'user1',
      password: '123123',
      tag: 'user#4493',
      power: 0,
    });

    const char1 = await fakeCharactersRepository.create({
      render:
        'https://www.nicepng.com/png/detail/356-3564607_neji-hyuga-neji-hyuga-part-1.png',
      type: 'Classic',
      name: 'Neji Hyūga',
      desc:
        " Neji Hyūga (日向ネジ, Hyūga Neji) was a shinobi of Konohagakure's Hyūga clan.",
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

    await fakeCardsRepository.create({
      character_id: char1.id,
      user_id: user1.id,
    });

    await fakeCardsRepository.create({
      character_id: char1.id,
      user_id: user1.id,
    });

    const cards = await listCards.execute(user1.id);

    expect(cards).toHaveLength(2);
  });
});
