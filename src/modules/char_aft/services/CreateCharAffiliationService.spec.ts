import FakeAffiliationRepository from '@modules/affiliation/repositories/fakes/FakeAffiliationRepository';
import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import FakeCharAffiliationRepository from '../repositories/fakes/FakeCharAffiliationRepository';
import CreateCharAffiliationService from './CreateCharAffiliationService';

let fakeAffiliationRepository: FakeAffiliationRepository;
let fakeCharacterRepository: FakeCharactersRepository;
let fakeCharAffiliationRepository: FakeCharAffiliationRepository;
let createCharAffiliation: CreateCharAffiliationService;

describe('Create A Character Affiliation ', () => {
  beforeEach(() => {
    fakeAffiliationRepository = new FakeAffiliationRepository();
    fakeCharacterRepository = new FakeCharactersRepository();
    fakeCharAffiliationRepository = new FakeCharAffiliationRepository();
    createCharAffiliation = new CreateCharAffiliationService(
      fakeCharAffiliationRepository,
    );
  });

  it('should be able to create a new Character affiliation', async () => {
    const aft = await fakeAffiliationRepository.create({
      name: 'Konohagakure',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 5,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
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

    const createNewCharAffiliation = await createCharAffiliation.execute({
      character_id: character.id,
      affiliation_id: aft.id,
    });

    expect(createNewCharAffiliation).toHaveProperty('id');
    expect(createNewCharAffiliation.character_id).toEqual(character.id);
  });
});
