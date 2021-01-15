import ICreateKekkeiDTO from '@modules/kekkei/dtos/ICreateKekkeiDTO';
import IKekkeiRepository from '@modules/kekkei/repositories/IKekkeiRepository';
import { getRepository, Repository } from 'typeorm';
import Kekkei_genkai from '../entities/Kekkei_genkai';

class KekkeiRepository implements IKekkeiRepository {
  private ormRepository: Repository<Kekkei_genkai>;

  constructor() {
    this.ormRepository = getRepository(Kekkei_genkai);
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
  }: ICreateKekkeiDTO): Promise<Kekkei_genkai> {
    const kekkei = await this.ormRepository.create({
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

    await this.ormRepository.save(kekkei);

    return kekkei;
  }

  public async findAll(): Promise<Kekkei_genkai[]> {
    const kekkeis = await this.ormRepository.find();
    return kekkeis;
  }

  public async findById(kekkei_id: string): Promise<Kekkei_genkai | undefined> {
    const kekkei = await this.ormRepository.findOne(kekkei_id);

    return kekkei;
  }

  public async delete(kekkei: Kekkei_genkai): Promise<Kekkei_genkai[]> {
    await this.ormRepository.remove(kekkei);

    const kekkeis = await this.ormRepository.find();

    return kekkeis;
  }

  public async update(
    kekkei: Kekkei_genkai,
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
    }: ICreateKekkeiDTO,
  ): Promise<Kekkei_genkai> {
    const newKekkei = Object.assign(kekkei, {
      name,
      icon: icon || kekkei.icon,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    await this.ormRepository.save(newKekkei);

    return newKekkei;
  }
}

export default KekkeiRepository;
