import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAffiliationRepository from '../repositories/IAffiliationRepository';
import Affiliation from '../infra/typeorm/entities/Affiliation';

interface IRequestDTO {
  name: string;
  icon?: string;
  strength: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  stamina: number;
  willpower: number;
}

@injectable()
class UpdateAffiliationService {
  constructor(
    @inject('AffiliationRepository')
    private affiliationRepository: IAffiliationRepository,
  ) {}

  public async execute(
    kekkei_id: string,
    {
      name,
      icon,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    }: IRequestDTO,
  ): Promise<Affiliation> {
    const kekkei = await this.affiliationRepository.findById(kekkei_id);
    if (!kekkei) {
      throw new AppError(
        `There's no kekkei genkai with given id: ${kekkei_id}`,
      );
    }

    const UpdatedKekkei = await this.affiliationRepository.update(kekkei, {
      name,
      icon,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    return UpdatedKekkei;
  }
}

export default UpdateAffiliationService;
