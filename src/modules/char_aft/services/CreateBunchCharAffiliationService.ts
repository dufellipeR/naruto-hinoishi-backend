import { injectable, inject } from 'tsyringe';
import Char_aft from '../infra/typeorm/entities/char_aft';
import ICharAffiliationRepository from '../repositories/ICharAffiliationRepository';

interface IObjectRequest {
  value: string;
  label: string;
}

interface IRequestDTO {
  items: IObjectRequest[];
  character_id: string;
}

@injectable()
class CreateBunchCharAffiliationService {
  constructor(
    @inject('CharAffiliationRepository')
    private charAffiliationRepository: ICharAffiliationRepository,
  ) {}

  public async execute({
    items,
    character_id,
  }: IRequestDTO): Promise<Char_aft[]> {
    const charAfts = await this.charAffiliationRepository.findCharacterAffiliations(
      character_id,
    );

    charAfts.forEach(async item => {
      await this.charAffiliationRepository.delete(item);
    });

    const afts = this.charAffiliationRepository.createBunch({
      items,
      character_id,
    });
    return afts;
  }
}

export default CreateBunchCharAffiliationService;
