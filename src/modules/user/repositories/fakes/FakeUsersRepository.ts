import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUpdatePowerDTO from '@modules/user/dtos/IUpdatePowerDTO';
import { v4 as uuid } from 'uuid';

import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async updatePower({
    user_id,
    power,
  }: IUpdatePowerDTO): Promise<User | undefined> {
    const editUser = this.users.find(users => users.id === user_id);

    if (editUser) {
      editUser.power = power;
    }
    return editUser;
  }

  public async findByTag(tag: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.tag === tag);

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
