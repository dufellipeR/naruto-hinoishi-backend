import { injectable, inject } from 'tsyringe';
import Char_clan from '../infra/typeorm/entities/char_clan';
import ICharClanRepository from '../repositories/ICharClanRepository';

interface IObjectRequest {
  value: string;
  label: string;
}

interface IRequestDTO {
  items: IObjectRequest[];
  character_id: string;
}

@injectable()
class CreateBunchCharClanService {
  constructor(
    @inject('CharClanRepository')
    private charClanRepository: ICharClanRepository,
  ) {}

  public async execute({
    items,
    character_id,
  }: IRequestDTO): Promise<Char_clan[]> {
    const charClans = await this.charClanRepository.findCharacterClans(
      character_id,
    );

    charClans.forEach(async item => {
      await this.charClanRepository.delete(item);
    });

    const clans = this.charClanRepository.createBunch({
      items,
      character_id,
    });
    return clans;
  }
}

export default CreateBunchCharClanService;
