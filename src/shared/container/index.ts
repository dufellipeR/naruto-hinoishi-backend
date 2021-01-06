import { container } from 'tsyringe';

import '@modules/user/providers';
import './providers';

import CharactersRepository from '@modules/characters/infra/typeorm/repositories/CharactersRepository';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';
import IUserTokensRepository from '@modules/user/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<ICharactersRepository>(
  'CharactersRepository',
  CharactersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
