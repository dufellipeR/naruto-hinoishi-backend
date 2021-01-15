import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
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
class UpdateKekkeiService {
  constructor(
    @inject('KekkeiRepository')
    private kekkeiRepository: IKekkeiRepository,
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
  ): Promise<Kekkei_genkai> {
    const kekkei = await this.kekkeiRepository.findById(kekkei_id);
    if (!kekkei) {
      throw new AppError(
        `There's no kekkei genkai with given id: ${kekkei_id}`,
      );
    }

    const UpdatedKekkei = await this.kekkeiRepository.update(kekkei, {
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

export default UpdateKekkeiService;
