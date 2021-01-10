// import AppError from '@shared/errors/AppError';
import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import AppError from '@shared/errors/AppError';
import FakeCardsRepository from '../repositories/fakes/FakeCardsRepository';
import CreateCardService from './CreateCardService';

let fakeCharactersRepository: FakeCharactersRepository;
let fakeCardsRepository: FakeCardsRepository;
let createCard: CreateCardService;

describe('Create Card ', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    fakeCardsRepository = new FakeCardsRepository();
    createCard = new CreateCardService(fakeCardsRepository);
  });

  it('should be able to create a new card', async () => {
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

    const card = await createCard.execute({
      character_id: char1.id,
      user_id: 'existent_user_id',
    });

    console.log(card);

    expect(card).toHaveProperty('user_id');
    expect(card.character_id).toBe(char1.id);
  });
});
