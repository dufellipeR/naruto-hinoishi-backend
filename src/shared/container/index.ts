import CharactersRepository from '@modules/characters/infra/typeorm/repositories/CharactersRepository';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICharactersRepository>(
  'CharactersRepository',
  CharactersRepository,
);
