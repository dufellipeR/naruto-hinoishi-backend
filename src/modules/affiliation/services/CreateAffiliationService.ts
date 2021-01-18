import { injectable, inject } from 'tsyringe';
import Affiliation from '../infra/typeorm/entities/Affiliation';
import IAffiliationRepository from '../repositories/IAffiliationRepository';

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
class CreateAffiliationService {
  constructor(
    @inject('AffiliationRepository')
    private affiliationRepository: IAffiliationRepository,
  ) {}

  public async execute({
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
  }: IRequestDTO): Promise<Affiliation> {
    const affiliation = this.affiliationRepository.create({
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
    return affiliation;
  }
}

export default CreateAffiliationService;
