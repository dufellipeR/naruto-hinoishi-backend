import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUpdatePowerDTO from '@modules/user/dtos/IUpdatePowerDTO';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find({
      order: {
        power: 'DESC',
      },
    });

    return users;
  }

  public async updatePower({
    power,
    user_id,
  }: IUpdatePowerDTO): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id);

    if (user) {
      user.power = power;
      await this.ormRepository.save(user);
    }

    return user;
  }

  public async findByTag(tag: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { tag },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    name,
    email,
    tag,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, tag, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
