import ICreateAffiliationDTO from '../dtos/ICreateAffiliationDTO';
import Affiliation from '../infra/typeorm/entities/Affiliation';

export default interface IAffiliationRepository {
  create(data: ICreateAffiliationDTO): Promise<Affiliation>;
  update(aft: Affiliation, data: ICreateAffiliationDTO): Promise<Affiliation>;
  delete(aft: Affiliation): Promise<Affiliation[]>;
  findAll(): Promise<Affiliation[]>;
  findById(affiliation_id: string): Promise<Affiliation | undefined>;
}
