import ICreateTeamDTO from '../dtos/ICreateTeamDTO';
import Team from '../infra/typeorm/entities/Team';

export default interface ITeamRepository {
  create(data: ICreateTeamDTO): Promise<Team>;
  update(team: Team, data: ICreateTeamDTO): Promise<Team>;
  delete(team: Team): Promise<Team[]>;
  findAll(): Promise<Team[]>;
  findById(team_id: string): Promise<Team | undefined>;
}
