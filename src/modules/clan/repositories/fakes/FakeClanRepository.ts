import ICreateClanDTO from '@modules/clan/dtos/ICreateClanDTO';
import Clan from '@modules/clan/infra/typeorm/entities/Clan';
import { v4 as uuid } from 'uuid';
import IClanRepository from '../IClanRepository';

class FakeClanRepository implements IClanRepository {
  private clans: Clan[] = [];

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
    const clan = new Clan();

    Object.assign(clan, {
      id: uuid(),
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

    this.clans.push(clan);

    return clan;
  }

  public async findAll(): Promise<Clan[]> {
    return this.clans;
  }

  public async findById(clan_id: string): Promise<Clan | undefined> {
    const clang = this.clans.find(clanx => clanx.id === clan_id);

    return clang;
  }

  public async delete(aft: Clan): Promise<Clan[]> {
    this.clans = this.clans.filter(Clang => Clang.id !== aft.id);

    return this.clans;
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
      id: clan.id,
      name,
      icon: icon || clan.icon || 'icon',
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    return newClan;
  }
}

export default FakeClanRepository;
