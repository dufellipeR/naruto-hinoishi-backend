import FakeTeamRepository from '../repositories/fakes/FakeTeamRepository';
import ShowTeamService from './ShowTeamService';

let fakeTeamRepository: FakeTeamRepository;
let showTeam: ShowTeamService;

describe('Show a team', () => {
  beforeEach(() => {
    fakeTeamRepository = new FakeTeamRepository();
    showTeam = new ShowTeamService(fakeTeamRepository);
  });

  it('should be able to show a specific team', async () => {
    await fakeTeamRepository.create({
      name: 'Uchiha',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 5,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    const team2 = await fakeTeamRepository.create({
      name: 'hyuuga',
      strength: 0,
      genjutsu: 10,
      speed: 15,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    const team = await showTeam.execute(team2.id);

    expect(team.name).toBe(team2.name);
  });
});
