import ICreateAffiliationDTO from '@modules/affiliation/dtos/ICreateAffiliationDTO';
import IAffiliationRepository from '@modules/affiliation/repositories/IAffiliationRepository';
import { getRepository, Repository } from 'typeorm';
import Affiliation from '../entities/Affiliation';

class AffiliationRepository implements IAffiliationRepository {
  private ormRepository: Repository<Affiliation>;

  constructor() {
    this.ormRepository = getRepository(Affiliation);
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
    pcolor,
    scolor,
  }: ICreateAffiliationDTO): Promise<Affiliation> {
    const affiliation = this.ormRepository.create({
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
      pcolor,
      scolor,
    });

    await this.ormRepository.save(affiliation);

    return affiliation;
  }

  public async findAll(): Promise<Affiliation[]> {
    const affiliations = await this.ormRepository.find();
    return affiliations;
  }

  public async findById(
    affiliation_id: string,
  ): Promise<Affiliation | undefined> {
    const affiliation = await this.ormRepository.findOne(affiliation_id);

    return affiliation;
  }

  public async delete(aft: Affiliation): Promise<Affiliation[]> {
    await this.ormRepository.remove(aft);

    const affiliations = await this.ormRepository.find();

    return affiliations;
  }

  public async update(
    kekkei: Affiliation,
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
      pcolor,
      scolor,
    }: ICreateAffiliationDTO,
  ): Promise<Affiliation> {
    const newAffiliation = Object.assign(kekkei, {
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
      pcolor,
      scolor,
    });

    await this.ormRepository.save(newAffiliation);

    return newAffiliation;
  }
}

export default AffiliationRepository;
