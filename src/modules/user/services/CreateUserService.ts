import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import generateTag from '@shared/utils/generateTag';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const tag = generateTag(name);

    const user = await this.usersRepository.create({
      name,
      email,
      tag,
      password: hashedPassword,
      power: 0,
    });

    return user;
  }
}
