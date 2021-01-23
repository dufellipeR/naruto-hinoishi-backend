import { injectable, inject } from 'tsyringe';
import overallCalc from '@shared/utils/overallCalc';
import AppError from '@shared/errors/AppError';
import Character from '../infra/typeorm/entities/Characters';
import ICharactersRepository from '../repositories/ICharactersRepository';
import IStatsRepository from '../repositories/IStatsRepository';

interface IRequest {
  id: string;
  render: string;
  type: string;
  name: string;
  desc: string;
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
class UpdateCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,

    @inject('StatsRepository')
    private statsRepository: IStatsRepository,
  ) {}

  public async execute({
    id,
    render,
    type,
    name,
    desc,
    strength,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    stamina,
    willpower,
  }: IRequest): Promise<Character | undefined> {
    const power = overallCalc({
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    const char = await this.charactersRepository.findById(id);

    if (!char) {
      throw new AppError('No Character with the given ID');
    }

    const stat = await this.statsRepository.findById(char.stat_id);

    if (!stat) {
      throw new AppError('No Stat with the given ID');
    }

    await this.statsRepository.update(stat, {
      strength,
      speed,
      intelligence,
      ninjutsu,
      taijutsu,
      genjutsu,
      power,
      stamina,
      willpower,
    });

    const character = await this.charactersRepository.update({
      id,
      render,
      type,
      name,
      desc,
    });

    return character;
  }
}

export default UpdateCharacterService;
