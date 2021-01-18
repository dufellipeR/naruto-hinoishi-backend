import ICreateClanDTO from '@modules/clan/dtos/ICreateClanDTO';
import IClanRepository from '@modules/clan/repositories/IClanRepository';
import { getRepository, Repository } from 'typeorm';
import Clan from '../entities/Clan';

class ClanRepository implements IClanRepository {
  private ormRepository: Repository<Clan>;

  constructor() {
    this.ormRepository = getRepository(Clan);
  }

  public async create({
    name,
    icon,
    strength,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    stamina,
    willpower,
  }: ICreateClanDTO): Promise<Clan> {
    const clan = this.ormRepository.create({
      name,
      icon,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    await this.ormRepository.save(clan);

    return clan;
  }

  public async findAll(): Promise<Clan[]> {
    const clans = await this.ormRepository.find();
    return clans;
  }

  public async findById(clan_id: string): Promise<Clan | undefined> {
    const clan = await this.ormRepository.findOne(clan_id);

    return clan;
  }

  public async delete(clan: Clan): Promise<Clan[]> {
    await this.ormRepository.remove(clan);

    const clans = await this.ormRepository.find();

    return clans;
  }

  public async update(
    clan: Clan,
    {
      name,
      icon,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    }: ICreateClanDTO,
  ): Promise<Clan> {
    const newClan = Object.assign(clan, {
      name,
      icon: icon || clan.icon,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    await this.ormRepository.save(newClan);

    return newClan;
  }
}

export default ClanRepository;
