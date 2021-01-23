import { getRepository, Repository } from 'typeorm';
import IUpdateStatDTO from '@modules/characters/dtos/IUpdateStatDTO';
import IStatsRepository from '@modules/characters/repositories/IStatsRepository';
import ICreateStatDTO from '@modules/characters/dtos/ICreateStatDTO';
import Stat from '../entities/Stat';

class StatsRepository implements IStatsRepository {
  private statOrmRepository: Repository<Stat>;

  constructor() {
    this.statOrmRepository = getRepository(Stat);
  }

  public async create({
    strength,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    stamina,
    willpower,
    power,
  }: ICreateStatDTO): Promise<Stat> {
    const stat = this.statOrmRepository.create({
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

    await this.statOrmRepository.save(stat);

    return stat;
  }

  public async findById(id: string): Promise<Stat | undefined> {
    const stat = await this.statOrmRepository.findOne({
      where: {
        id,
      },
    });

    return stat;
  }

  public async update(
    stat: Stat,
    {
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
      power,
    }: IUpdateStatDTO,
  ): Promise<Stat> {
    const updatedStat = await this.statOrmRepository.save({
      id: stat.id,
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

    return updatedStat;
  }
}

export default StatsRepository;
