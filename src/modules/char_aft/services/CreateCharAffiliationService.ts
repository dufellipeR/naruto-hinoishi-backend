import { injectable, inject } from 'tsyringe';
import Char_aft from '../infra/typeorm/entities/char_aft';
import ICharAffiliationRepository from '../repositories/ICharAffiliationRepository';

interface IRequestDTO {
  affiliation_id: string;
  character_id: string;
}

@injectable()
class CreateCharKekkeiService {
  constructor(
    @inject('CharAffiliationRepository')
    private charAffiliationRepository: ICharAffiliationRepository,
  ) {}

  public async execute({
    affiliation_id,
    character_id,
  }: IRequestDTO): Promise<Char_aft> {
    const affiliation = this.charAffiliationRepository.create({
      affiliation_id,
      character_id,
    });
    return affiliation;
  }
}

export default CreateCharKekkeiService;
