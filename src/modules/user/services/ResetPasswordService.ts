import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokensRepository';
import UserToken from '../infra/typeorm/entities/UserToken';
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  token : string;
  password: string;

}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) {}

  public async execute( {token, password} : IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if ( !userToken) {
      throw new AppError('User Token does not exists')
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if(!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }
}
