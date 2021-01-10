import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdatePowerDTO from '../dtos/IUpdatePowerDTO';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findByTag(user_tag: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  updatePower({ power, user_id }: IUpdatePowerDTO): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
