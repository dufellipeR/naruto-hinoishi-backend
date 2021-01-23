import { injectable, inject } from 'tsyringe';
import Char_kg from '../infra/typeorm/entities/char_kg';
import ICharKekkeiRepository from '../repositories/ICharKekkeiRepository';

interface IObjectRequest {
  value: string;
  label: string;
}

interface IRequestDTO {
  items: IObjectRequest[];
  character_id: string;
}

@injectable()
class CreateBunchCharKekkeiService {
  constructor(
    @inject('CharKekkeiRepository')
    private charKekkeiRepository: ICharKekkeiRepository,
  ) {}

  public async execute({
    items,
    character_id,
  }: IRequestDTO): Promise<Char_kg[]> {
    const charKekkeis = await this.charKekkeiRepository.findCharacterKekkeis(
      character_id,
    );

    charKekkeis.forEach(async item => {
      await this.charKekkeiRepository.delete(item);
    });

    const kekkeis = this.charKekkeiRepository.createBunch({
      items,
      character_id,
    });
    return kekkeis;
  }
}

export default CreateBunchCharKekkeiService;
