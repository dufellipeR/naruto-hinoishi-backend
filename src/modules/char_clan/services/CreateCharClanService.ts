import { injectable, inject } from 'tsyringe';
import Char_clan from '../infra/typeorm/entities/char_clan';
import ICharClanRepository from '../repositories/ICharClanRepository';

interface IRequestDTO {
  clan_id: string;
  character_id: string;
}

@injectable()
class CreateCharClanService {
  constructor(
    @inject('CharClanRepository')
    private charClanRepository: ICharClanRepository,
  ) {}

  public async execute({
    clan_id,
    character_id,
  }: IRequestDTO): Promise<Char_clan> {
    const clan = this.charClanRepository.create({
      clan_id,
      character_id,
    });
    return clan;
  }
}

export default CreateCharClanService;
