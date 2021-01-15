import { injectable, inject } from 'tsyringe';
import Char_kg from '../infra/typeorm/entities/char_kg';
import ICharKekkeiRepository from '../repositories/ICharKekkeiRepository';

interface IRequestDTO {
  kekkei_id: string;
  character_id: string;
}

@injectable()
class CreateCharKekkeiService {
  constructor(
    @inject('CharKekkeiRepository')
    private charKekkeiRepository: ICharKekkeiRepository,
  ) {}

  public async execute({
    kekkei_id,
    character_id,
  }: IRequestDTO): Promise<Char_kg> {
    const kekkei = this.charKekkeiRepository.create({
      kekkei_id,
      character_id,
    });
    return kekkei;
  }
}

export default CreateCharKekkeiService;
