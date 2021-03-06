import { container } from 'tsyringe';

import '@modules/user/providers';
import './providers';

import CharactersRepository from '@modules/characters/infra/typeorm/repositories/CharactersRepository';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';
import IUserTokensRepository from '@modules/user/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokensRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import CardsRepository from '@modules/cards/infra/typeorm/repositories/CardsRepository';
import FriendshipsRepository from '@modules/friendship/infra/typeorm/repositories/FriendshipsRepository';
import IFriendshipsRepository from '@modules/friendship/repositories/IFriendshipsRepository';
import IKekkeiRepository from '@modules/kekkei/repositories/IKekkeiRepository';
import KekkeiRepository from '@modules/kekkei/infra/typeorm/repositories/KekkeiRepository';
import ICharKekkeiRepository from '@modules/char_kg/repositories/ICharKekkeiRepository';
import CharKekkeiRepository from '@modules/char_kg/infra/typeorm/repositories/CharKekkeiRepository';
import ICharAffiliationRepository from '@modules/char_aft/repositories/ICharAffiliationRepository';
import CharAffiliationRepository from '@modules/char_aft/infra/typeorm/repositories/CharAffiliationRepository';
import IAffiliationRepository from '@modules/affiliation/repositories/IAffiliationRepository';
import AffiliationRepository from '@modules/affiliation/infra/typeorm/repositories/AffiliationRepository';
import IClanRepository from '@modules/clan/repositories/IClanRepository';
import ICharClanRepository from '@modules/char_clan/repositories/ICharClanRepository';
import ClanRepository from '@modules/clan/infra/typeorm/repositories/ClanRepository';
import CharClanRepository from '@modules/char_clan/infra/typeorm/repositories/CharClanRepository';
import TeamRepository from '@modules/team/infra/typeorm/repositories/TeamRepository';
import ITeamRepository from '@modules/team/repositories/ITeamRepository';
import ICharTeamRepository from '@modules/char_team/repositories/ICharTeamRepository';
import CharTeamRepository from '@modules/char_team/infra/typeorm/repositories/CharTeamRepository';
import IStatsRepository from '@modules/characters/repositories/IStatsRepository';
import StatsRepository from '@modules/characters/infra/typeorm/repositories/StatsRepository';

container.registerSingleton<ICharTeamRepository>(
  'CharTeamRepository',
  CharTeamRepository,
);

container.registerSingleton<ITeamRepository>('TeamRepository', TeamRepository);

container.registerSingleton<ICharClanRepository>(
  'CharClanRepository',
  CharClanRepository,
);

container.registerSingleton<IClanRepository>('ClanRepository', ClanRepository);

container.registerSingleton<ICharAffiliationRepository>(
  'CharAffiliationRepository',
  CharAffiliationRepository,
);

container.registerSingleton<IAffiliationRepository>(
  'AffiliationRepository',
  AffiliationRepository,
);

container.registerSingleton<ICharKekkeiRepository>(
  'CharKekkeiRepository',
  CharKekkeiRepository,
);

container.registerSingleton<IKekkeiRepository>(
  'KekkeiRepository',
  KekkeiRepository,
);

container.registerSingleton<IStatsRepository>(
  'StatsRepository',
  StatsRepository,
);

container.registerSingleton<ICharactersRepository>(
  'CharactersRepository',
  CharactersRepository,
);

container.registerSingleton<ICardsRepository>(
  'CardsRepository',
  CardsRepository,
);

container.registerSingleton<IFriendshipsRepository>(
  'FriendshipsRepository',
  FriendshipsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
