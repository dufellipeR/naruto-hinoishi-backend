import { injectable, inject } from 'tsyringe';
import Team from '../infra/typeorm/entities/Team';
import ITeamRepository from '../repositories/ITeamRepository';

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
class CreateTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute({
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
  }: IRequestDTO): Promise<Team> {
    const clan = this.teamRepository.create({
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
    return clan;
  }
}

export default CreateTeamService;
