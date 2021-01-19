import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITeamRepository from '../repositories/ITeamRepository';
import Team from '../infra/typeorm/entities/Team';

interface IRequestDTO {
  name: string;
  icon?: string;
  strength: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  stamina: number;
  willpower: number;
}

@injectable()
class UpdateTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(
    team_id: string,
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
    }: IRequestDTO,
  ): Promise<Team> {
    const team = await this.teamRepository.findById(team_id);
    if (!team) {
      throw new AppError(`There's no team  with given id: ${team_id}`);
    }

    const UpdatedTeam = await this.teamRepository.update(team, {
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

    return UpdatedTeam;
  }
}

export default UpdateTeamService;
