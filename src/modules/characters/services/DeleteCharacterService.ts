// import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Characters';
import ICharactersRepository from '../repositories/ICharactersRepository';

@injectable()
export default class DeleteCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute(id: string): Promise<Character[]> {
    const character = await this.charactersRepository.findById(id);

    if (!character) {
      throw new AppError(`There's no character with the ID of ${id}`);
    }

    const characters = await this.charactersRepository.delete(character);

    return characters;
  }
}
