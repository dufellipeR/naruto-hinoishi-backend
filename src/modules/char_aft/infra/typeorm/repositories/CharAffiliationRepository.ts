import ICreateCharAftDTO from '@modules/char_aft/dtos/ICreateChar_aftDTO';
import ICharAffiliationRepository from '@modules/char_aft/repositories/ICharAffiliationRepository';
import { getRepository, Repository } from 'typeorm';
import Char_aft from '../entities/char_aft';

class CharAffiliationRepository implements ICharAffiliationRepository {
  private ormRepository: Repository<Char_aft>;

  constructor() {
    this.ormRepository = getRepository(Char_aft);
  }

  public async create({
    affiliation_id,
    character_id,
  }: ICreateCharAftDTO): Promise<Char_aft> {
    const createChar_aft = this.ormRepository.create({
      affiliation_id,
      character_id,
    });

    await this.ormRepository.save(createChar_aft);

    return createChar_aft;
  }

  public async findCharacterAffiliations(
    character_id: string,
  ): Promise<Char_aft[]> {
    const charAffiliations = this.ormRepository.find({
      where: {
        character_id,
      },
    });

    return charAffiliations;
  }

  public async findById(Char_aft_id: string): Promise<Char_aft | undefined> {
    const charAffiliation = await this.ormRepository.findOne(Char_aft_id);

    return charAffiliation;
  }

  public async delete(charKekkei: Char_aft): Promise<Char_aft[]> {
    await this.ormRepository.remove(charKekkei);

    const charAfts = await this.ormRepository.find();

    return charAfts;
  }
}

export default CharAffiliationRepository;
