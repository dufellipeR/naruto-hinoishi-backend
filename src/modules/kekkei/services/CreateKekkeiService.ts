import { injectable, inject } from 'tsyringe';
import Kekkei_genkai from '../infra/typeorm/entities/Kekkei_genkai';
import IKekkeiRepository from '../repositories/IKekkeiRepository';

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
class CreateKekkeiService {
  constructor(
    @inject('KekkeiRepository')
    private kekkeiRepository: IKekkeiRepository,
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
  }: IRequestDTO): Promise<Kekkei_genkai> {
    const kekkei = this.kekkeiRepository.create({
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
    return kekkei;
  }
}

export default CreateKekkeiService;
