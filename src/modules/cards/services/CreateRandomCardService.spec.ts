import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import FakeCardsRepository from '../repositories/fakes/FakeCardsRepository';
import CreateRandomCardService from './CreateRandomCardService';

let fakeCharactersRepository: FakeCharactersRepository;
let fakeCardsRepository: FakeCardsRepository;
let createRandomCard: CreateRandomCardService;

describe('Create Random Cards ', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    fakeCardsRepository = new FakeCardsRepository();
    createRandomCard = new CreateRandomCardService(fakeCardsRepository);
  });

  it('should be able to create a bunch of random cards', async () => {
    const quantity = 4;
    await fakeCharactersRepository.create({
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

    await fakeCharactersRepository.create({
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

    await fakeCharactersRepository.create({
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

    const cards = await createRandomCard.execute({
      quantity,
      user_id: 'existent_user_id',
    });

    expect(cards).toHaveLength(4);
  });
});
