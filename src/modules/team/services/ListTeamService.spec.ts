import FakeTeamRepository from '../repositories/fakes/FakeTeamRepository';
import ListTeamService from './ListTeamService';

let fakeTeamRepository: FakeTeamRepository;
let listTeam: ListTeamService;

describe('List All Teams', () => {
  beforeEach(() => {
    fakeTeamRepository = new FakeTeamRepository();
    listTeam = new ListTeamService(fakeTeamRepository);
  });

  it('should be able to list all teams', async () => {
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

    const teams = await listTeam.execute();

    expect(teams).toHaveLength(2);
  });
});
