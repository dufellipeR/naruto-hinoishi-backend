import ICreateKekkeiDTO from '@modules/kekkei/dtos/ICreateKekkeiDTO';
import Kekkei_genkai from '@modules/kekkei/infra/typeorm/entities/Kekkei_genkai';
import { v4 as uuid } from 'uuid';
import IKekkeiRepository from '../IKekkeiRepository';

class FakeKekkeiRepository implements IKekkeiRepository {
  private kekkeis: Kekkei_genkai[] = [];

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
    const kekkei = new Kekkei_genkai();

    Object.assign(kekkei, {
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

    this.kekkeis.push(kekkei);

    return kekkei;
  }

  public async findAll(): Promise<Kekkei_genkai[]> {
    return this.kekkeis;
  }

  public async findById(kekkei_id: string): Promise<Kekkei_genkai | undefined> {
    const kekkei = this.kekkeis.find(kekkeig => kekkeig.id === kekkei_id);

    return kekkei;
  }

  public async delete(kekkei_genkai: Kekkei_genkai): Promise<void> {
    this.kekkeis = this.kekkeis.filter(
      kekkeig => kekkeig.id !== kekkei_genkai.id,
    );
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
      id: kekkei.id,
      name,
      icon: icon || 'icon',
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
      created_at: kekkei.created_at,
      updated_at: kekkei.updated_at,
    });

    return newKekkei;
  }
}

export default FakeKekkeiRepository;
