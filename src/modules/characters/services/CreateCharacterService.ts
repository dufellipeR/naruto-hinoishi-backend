import { injectable, inject } from 'tsyringe';
import overallCalc from '@shared/utils/overallCalc';
import Character from '../infra/typeorm/entities/Characters';
import ICharactersRepository from '../repositories/ICharactersRepository';
import IStatsRepository from '../repositories/IStatsRepository';

interface IRequestDTO {
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
class CreateCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,

    @inject('StatsRepository')
    private statsRepository: IStatsRepository,
  ) {}

  public async execute({
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
  }: IRequestDTO): Promise<Character> {
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

    const stat = await this.statsRepository.create({
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
      power,
    });

    const character = await this.charactersRepository.create({
      render,
      type,
      name,
      desc,
      stat_id: stat.id,
    });

    return character;
  }
}

export default CreateCharacterService;
