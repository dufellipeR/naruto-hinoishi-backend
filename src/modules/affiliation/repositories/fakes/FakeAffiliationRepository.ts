import ICreateAffiliationDTO from '@modules/affiliation/dtos/ICreateAffiliationDTO';
import Affiliation from '@modules/affiliation/infra/typeorm/entities/Affiliation';
import { v4 as uuid } from 'uuid';
import IAffiliationRepository from '../IAffiliationRepository';

class FakeAffiliationRepository implements IAffiliationRepository {
  private affiliations: Affiliation[] = [];

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
  }: ICreateAffiliationDTO): Promise<Affiliation> {
    const affiliation = new Affiliation();

    Object.assign(affiliation, {
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

    this.affiliations.push(affiliation);

    return affiliation;
  }

  public async findAll(): Promise<Affiliation[]> {
    return this.affiliations;
  }

  public async findById(
    affiliation_id: string,
  ): Promise<Affiliation | undefined> {
    const affiliationg = this.affiliations.find(
      affiliationx => affiliationx.id === affiliation_id,
    );

    return affiliationg;
  }

  public async delete(aft: Affiliation): Promise<Affiliation[]> {
    this.affiliations = this.affiliations.filter(
      affiliationg => affiliationg.id !== aft.id,
    );

    return this.affiliations;
  }

  public async update(
    affiliation: Affiliation,
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
    }: ICreateAffiliationDTO,
  ): Promise<Affiliation> {
    const newAffiliation = Object.assign(affiliation, {
      id: affiliation.id,
      name,
      icon: icon || affiliation.icon || 'icon',
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    return newAffiliation;
  }
}

export default FakeAffiliationRepository;
