import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IClanRepository from '../repositories/IClanRepository';
import Clan from '../infra/typeorm/entities/Clan';

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
class UpdateClanService {
  constructor(
    @inject('ClanRepository')
    private clanRepository: IClanRepository,
  ) {}

  public async execute(
    clan_id: string,
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
  ): Promise<Clan> {
    const clan = await this.clanRepository.findById(clan_id);
    if (!clan) {
      throw new AppError(`There's no clan  with given id: ${clan_id}`);
    }

    const Updatedclan = await this.clanRepository.update(clan, {
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

    return Updatedclan;
  }
}

export default UpdateClanService;
