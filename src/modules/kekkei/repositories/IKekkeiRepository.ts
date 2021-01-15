import ICreateKekkeiDTO from '../dtos/ICreateKekkeiDTO';
import Kekkei_genkai from '../infra/typeorm/entities/Kekkei_genkai';

export default interface IKekkeiRepository {
  create(data: ICreateKekkeiDTO): Promise<Kekkei_genkai>;
  update(kekkei: Kekkei_genkai, data: ICreateKekkeiDTO): Promise<Kekkei_genkai>;
  delete(kekkei: Kekkei_genkai): Promise<Kekkei_genkai[]>;
  findAll(): Promise<Kekkei_genkai[]>;
  findById(kekkei_id: string): Promise<Kekkei_genkai | undefined>;
}
