import { injectable, inject } from 'tsyringe';
import overallCalc from '@shared/utils/overallCalc';
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
    strength,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    stamina,
    willpower,
  }: Omit<IUpdateCharacterDTO, 'power'>): Promise<Character | undefined> {
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

    const character = await this.charactersRepository.update({
      id,
      thumbnail,
      type,
      name,
      desc,
      stat_id,
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

    return character;
  }
}

export default UpdateCharacterService;
