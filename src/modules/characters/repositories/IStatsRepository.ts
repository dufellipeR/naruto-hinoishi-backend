import ICreateStatDTO from '../dtos/ICreateStatDTO';
import IUpdateStatDTO from '../dtos/IUpdateStatDTO';
import Stat from '../infra/typeorm/entities/Stat';

export default interface IStatsRepository {
  create(data: ICreateStatDTO): Promise<Stat>;
  findById(id: string): Promise<Stat | undefined>;
  update(stat: Stat, data: IUpdateStatDTO): Promise<Stat>;
}
