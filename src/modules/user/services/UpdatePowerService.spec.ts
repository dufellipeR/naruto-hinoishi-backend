import FakeCardsRepository from '@modules/cards/repositories/fakes/FakeCardsRepository';
import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdatePowerService from './UpdatePowerService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCharactersRepository: FakeCharactersRepository;
let fakeCardsRepository: FakeCardsRepository;
let updateUserPower: UpdatePowerService;

describe('Should be able to Update User Power', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCardsRepository = new FakeCardsRepository();
    updateUserPower = new UpdatePowerService(
      fakeUsersRepository,
      fakeCardsRepository,
    );
  });

  it('should be able to update user power', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      tag: 'john#9982',
      power: 0,
    });

    const char1 = await fakeCharactersRepository.create({
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

    await fakeCardsRepository.create({
      character_id: char1.id,
      user_id: user.id,
    });

    await updateUserPower.execute({ user_id: user.id });
    expect(user).toHaveProperty('name');
    expect(user.power).toEqual(90); // Not reliable test
  });
});
