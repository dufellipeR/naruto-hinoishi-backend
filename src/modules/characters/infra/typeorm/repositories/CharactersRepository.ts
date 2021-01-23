import { getRepository, Repository } from 'typeorm';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import IUpdateCharacterDTO from '@modules/characters/dtos/IUpdateCharacterDTO';
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
    render,
    type,
    name,
    desc,
    stat_id,
  }: ICreateCharacterDTO): Promise<Character> {
    const character = this.characterOrmRepository.create({
      render,
      type,
      name,
      desc,
      stat_id,
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

  public async delete(char: Character): Promise<Character[]> {
    await this.characterOrmRepository.remove(char);

    const characters = await this.characterOrmRepository.find();

    return characters;
  }

  public async update({
    id,
    render,
    type,
    name,
    desc,
  }: IUpdateCharacterDTO): Promise<Character> {
    const char = await this.characterOrmRepository.save({
      id,
      render,
      type,
      name,
      desc,
    });

    return char;
  }
}

export default CharactersRepository;
