import ICreateTeamDTO from '@modules/team/dtos/ICreateTeamDTO';
import Team from '@modules/team/infra/typeorm/entities/Team';
import { v4 as uuid } from 'uuid';
import ITeamRepository from '../ITeamRepository';

class FakeTeamRepository implements ITeamRepository {
  private teams: Team[] = [];

  public async create({
    name,
    icon,
    strength,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    stamina,
    willpower,
  }: ICreateTeamDTO): Promise<Team> {
    const team = new Team();

    Object.assign(team, {
      id: uuid(),
      name,
      icon,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    this.teams.push(team);

    return team;
  }

  public async findAll(): Promise<Team[]> {
    return this.teams;
  }

  public async findById(team_id: string): Promise<Team | undefined> {
    const team = this.teams.find(teamx => teamx.id === team_id);

    return team;
  }

  public async delete(team: Team): Promise<Team[]> {
    this.teams = this.teams.filter(teamg => teamg.id !== team.id);

    return this.teams;
  }

  public async update(
    team: Team,
    {
      name,
      icon,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    }: ICreateTeamDTO,
  ): Promise<Team> {
    const newTeam = Object.assign(team, {
      id: team.id,
      name,
      icon: icon || team.icon || 'icon',
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    return newTeam;
  }
}

export default FakeTeamRepository;
