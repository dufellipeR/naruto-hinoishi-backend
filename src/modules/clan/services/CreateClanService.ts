import { injectable, inject } from 'tsyringe';
import Clan from '../infra/typeorm/entities/Clan';
import IClanRepository from '../repositories/IClanRepository';

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
class CreateClanService {
  constructor(
    @inject('ClanRepository')
    private clanRepository: IClanRepository,
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
  }: IRequestDTO): Promise<Clan> {
    const clan = this.clanRepository.create({
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

export default CreateClanService;
