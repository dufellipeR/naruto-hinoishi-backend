import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import FakeTeamRepository from '@modules/team/repositories/fakes/FakeTeamRepository';
import FakeCharTeamRepository from '../repositories/fakes/FakeCharTeamRepository';
import CreateCharTeamService from './CreateCharTeamService';

let fakeTeamRepository: FakeTeamRepository;
let fakeCharacterRepository: FakeCharactersRepository;
let fakeCharTeamRepository: FakeCharTeamRepository;
let createCharTeam: CreateCharTeamService;

describe('Create A Character Team ', () => {
  beforeEach(() => {
    fakeTeamRepository = new FakeTeamRepository();
    fakeCharacterRepository = new FakeCharactersRepository();
    fakeCharTeamRepository = new FakeCharTeamRepository();
    createCharTeam = new CreateCharTeamService(fakeCharTeamRepository);
  });

  it('should be able to create a new Character Team', async () => {
    const team = await fakeTeamRepository.create({
      name: 'Team 7',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 5,
      stamina: 20,
      taijutsu: 0,
      willpower: 15,
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

    const createNewCharTeam = await createCharTeam.execute({
      character_id: character.id,
      team_id: team.id,
    });

    expect(createNewCharTeam).toHaveProperty('id');
    expect(createNewCharTeam.character_id).toEqual(character.id);
  });
});
