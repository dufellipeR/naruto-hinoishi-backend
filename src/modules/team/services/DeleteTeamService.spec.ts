import FakeTeamRepository from '../repositories/fakes/FakeTeamRepository';
import DeleteTeamService from './DeleteTeamService';

let fakeTeamRepository: FakeTeamRepository;
let deleteTeam: DeleteTeamService;

describe('Delete a team', () => {
  beforeEach(() => {
    fakeTeamRepository = new FakeTeamRepository();
    deleteTeam = new DeleteTeamService(fakeTeamRepository);
  });

  it('should be able to delete a team', async () => {
    const team1 = await fakeTeamRepository.create({
      name: 'Time 7',
      strength: 0,
      genjutsu: 0,
      speed: 5,
      intelligence: 0,
      ninjutsu: 15,
      stamina: 0,
      taijutsu: 0,
      willpower: 15,
    });

    await fakeTeamRepository.create({
      name: 'Hyuuga',
      strength: 0,
      genjutsu: 10,
      speed: 15,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
    });

    await deleteTeam.execute(team1.id);

    const teams = await fakeTeamRepository.findAll();

    expect(teams).toHaveLength(1);
  });
});
