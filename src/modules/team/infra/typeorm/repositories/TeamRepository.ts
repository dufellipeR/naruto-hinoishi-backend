import ICreateClanDTO from '@modules/clan/dtos/ICreateClanDTO';
import ICreateTeamDTO from '@modules/team/dtos/ICreateTeamDTO';
import ITeamRepository from '@modules/team/repositories/ITeamRepository';
import { getRepository, Repository } from 'typeorm';
import Team from '../entities/Team';

class TeamRepository implements ITeamRepository {
  private ormRepository: Repository<Team>;

  constructor() {
    this.ormRepository = getRepository(Team);
  }

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
  }: ICreateClanDTO): Promise<Team> {
    const team = this.ormRepository.create({
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

    await this.ormRepository.save(team);

    return team;
  }

  public async findAll(): Promise<Team[]> {
    const teams = await this.ormRepository.find();
    return teams;
  }

  public async findById(team_id: string): Promise<Team | undefined> {
    const team = await this.ormRepository.findOne(team_id);

    return team;
  }

  public async delete(team: Team): Promise<Team[]> {
    await this.ormRepository.remove(team);

    const teams = await this.ormRepository.find();

    return teams;
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
      name,
      icon: icon || team.icon,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    await this.ormRepository.save(newTeam);

    return newTeam;
  }
}

export default TeamRepository;
