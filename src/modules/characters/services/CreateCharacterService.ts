import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import overallCalc from '@shared/utils/overallCalc';
import Character from '../infra/typeorm/entities/Characters';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequestDTO {
  thumbnail: string;
  type: string;
  name: string;
  desc: string;
  power: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  endurance: number;
  willpower: number;
}

@injectable()
class CreateCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({
    thumbnail,
    type,
    name,
    desc,
    power,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    endurance,
    willpower,
  }: IRequestDTO): Promise<Character> {
    const overall = overallCalc({
      power,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      endurance,
      willpower,
    });

    const character = await this.charactersRepository.create({
      thumbnail,
      type,
      name,
      desc,
      power,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      endurance,
      willpower,
      overall,
    });

    return character;
  }
}

export default CreateCharacterService;
