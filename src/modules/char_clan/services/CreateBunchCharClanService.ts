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
    const afts = this.charClanRepository.createBunch({
      items,
      character_id,
    });
    return afts;
  }
}

export default CreateBunchCharClanService;
