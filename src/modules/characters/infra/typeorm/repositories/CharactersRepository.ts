import { getRepository, Repository } from 'typeorm';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import Character from '../entities/Characters';
import Stat from '../entities/Stat';

class CharactersRepository implements ICharactersRepository {
  private characterOrmRepository: Repository<Character>;

  private statOrmRepository: Repository<Stat>;

  constructor() {
    this.characterOrmRepository = getRepository(Character);
    this.statOrmRepository = getRepository(Stat);
  }

  public async create({
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
  }: ICreateCharacterDTO): Promise<Character> {
    const stat = this.statOrmRepository.create({
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

    await this.statOrmRepository.save(stat);

    const character = this.characterOrmRepository.create({
      thumbnail,
      type,
      name,
      desc,
      stat_id: stat.id,
    });

    await this.characterOrmRepository.save(character);

    return character;
  }

  public async findById(id: string): Promise<Character | undefined> {
    const character = await this.characterOrmRepository.findOne({
      where: {
        id,
      },
    });

    return character;
  }

  public async findAll(): Promise<Character[]> {
    const characters = await this.characterOrmRepository.find();

    return characters;
  }
}

export default CharactersRepository;
