import FakeTeamRepository from '../repositories/fakes/FakeTeamRepository';
import CreateTeamService from './CreateTeamService';

let fakeTeamRepository: FakeTeamRepository;
let createTeam: CreateTeamService;

describe('Create Team ', () => {
  beforeEach(() => {
    fakeTeamRepository = new FakeTeamRepository();
    createTeam = new CreateTeamService(fakeTeamRepository);
  });

  it('should be able to create a new team', async () => {
    const team = await createTeam.execute({
      name: 'Team 7',
      strength: 0,
      genjutsu: 0,
      speed: 10,
      intelligence: 10,
      ninjutsu: 10,
      stamina: 15,
      taijutsu: 10,
      willpower: 25,
    });

    expect(team).toHaveProperty('id');
    expect(team.name).toEqual('Team 7');
  });
});
