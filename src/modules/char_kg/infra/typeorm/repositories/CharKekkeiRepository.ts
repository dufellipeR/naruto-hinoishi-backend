import ICreateCharKgDTO from '@modules/char_kg/dtos/ICreateChar_kgDTO';
import ICharKekkeiRepository from '@modules/char_kg/repositories/ICharKekkeiRepository';
import { getRepository, Repository } from 'typeorm';
import Char_kg from '../entities/char_kg';

class CharKekkeiRepository implements ICharKekkeiRepository {
  private ormRepository: Repository<Char_kg>;

  constructor() {
    this.ormRepository = getRepository(Char_kg);
  }

  public async create({
    kekkei_id,
    character_id,
  }: ICreateCharKgDTO): Promise<Char_kg> {
    const createChar_kg = this.ormRepository.create({
      kekkei_id,
      character_id,
    });

    await this.ormRepository.save(createChar_kg);

    return createChar_kg;
  }

  public async findCharacterKekkeis(character_id: string): Promise<Char_kg[]> {
    const charKekkeis = this.ormRepository.find({
      where: {
        character_id,
      },
    });

    return charKekkeis;
  }

  public async findById(char_kg_id: string): Promise<Char_kg | undefined> {
    const charkekkei = await this.ormRepository.findOne(char_kg_id);

    return charkekkei;
  }

  public async delete(charKekkei: Char_kg): Promise<void> {
    await this.ormRepository.remove(charKekkei);
  }
}

export default CharKekkeiRepository;
