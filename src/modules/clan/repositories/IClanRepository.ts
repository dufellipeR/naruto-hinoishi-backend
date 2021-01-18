import ICreateClanDTO from '../dtos/ICreateClanDTO';
import Clan from '../infra/typeorm/entities/Clan';

export default interface IClanRepository {
  create(data: ICreateClanDTO): Promise<Clan>;
  update(clan: Clan, data: ICreateClanDTO): Promise<Clan>;
  delete(clan: Clan): Promise<Clan[]>;
  findAll(): Promise<Clan[]>;
  findById(clan_id: string): Promise<Clan | undefined>;
}
