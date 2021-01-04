// import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Characters';
import ICharactersRepository from '../repositories/ICharactersRepository';

@injectable()
export default class ListCharactersService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute(): Promise<Character[]> {
    const characters = await this.charactersRepository.findAll();

    return characters;
  }
}
