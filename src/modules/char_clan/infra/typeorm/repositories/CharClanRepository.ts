import ICreateCharClanDTO from '@modules/char_clan/dtos/ICreateChar_clanDTO';
import ICharClanRepository from '@modules/char_clan/repositories/ICharClanRepository';
import { getRepository, Repository } from 'typeorm';
import Char_clan from '../entities/char_clan';

class CharClanRepository implements ICharClanRepository {
  private ormRepository: Repository<Char_clan>;

  constructor() {
    this.ormRepository = getRepository(Char_clan);
  }

  public async create({
    clan_id,
    character_id,
  }: ICreateCharClanDTO): Promise<Char_clan> {
    const createChar_clan = this.ormRepository.create({
      clan_id,
      character_id,
    });

    await this.ormRepository.save(createChar_clan);

    return createChar_clan;
  }

  public async findCharacterClans(character_id: string): Promise<Char_clan[]> {
    const charClans = this.ormRepository.find({
      where: {
        character_id,
      },
    });

    return charClans;
  }

  public async findById(char_clan_id: string): Promise<Char_clan | undefined> {
    const charClan = await this.ormRepository.findOne(char_clan_id);

    return charClan;
  }

  public async delete(charClan: Char_clan): Promise<Char_clan[]> {
    await this.ormRepository.remove(charClan);

    const charClans = await this.ormRepository.find();

    return charClans;
  }
}

export default CharClanRepository;
