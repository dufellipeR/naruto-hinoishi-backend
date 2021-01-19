import FakeTeamRepository from '../repositories/fakes/FakeTeamRepository';
import UpdateTeamService from './UpdateTeamService';

let fakeTeamRepository: FakeTeamRepository;
let updateTeam: UpdateTeamService;

describe('Update a team ', () => {
  beforeEach(() => {
    fakeTeamRepository = new FakeTeamRepository();
    updateTeam = new UpdateTeamService(fakeTeamRepository);
  });

  it('should be able to update a team', async () => {
    const team = await fakeTeamRepository.create({
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

    const newteam = await updateTeam.execute(team.id, {
      name: 'Hyuuga',
      strength: 0,
      genjutsu: 10,
      speed: 15,
      intelligence: 0,
      ninjutsu: 10,
      stamina: 0,
      taijutsu: 0,
      willpower: 5,
      icon: 'www.fefwefqwef.com',
    });

    expect(newteam.id).toBe(team.id);
    expect(newteam.name).toEqual('Hyuuga');
  });
});
