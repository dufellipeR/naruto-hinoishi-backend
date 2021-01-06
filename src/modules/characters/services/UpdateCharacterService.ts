import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import overallCalc from '@shared/utils/overallCalc';
import AppError from '@shared/errors/AppError';
import Character from '../infra/typeorm/entities/Characters';
import ICharactersRepository from '../repositories/ICharactersRepository';
import IUpdateCharacterDTO from '../dtos/IUpdateCharacterDTO';

@injectable()
class UpdateCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({
    id,
    thumbnail,
    type,
    name,
    desc,
    stat_id,
    power,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    endurance,
    willpower,
  }: Omit<IUpdateCharacterDTO, 'overall'>): Promise<Character | undefined> {
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

    const character = await this.charactersRepository.update({
      id,
      thumbnail,
      type,
      name,
      desc,
      stat_id,
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

export default UpdateCharacterService;
