// import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Kekkei_genkai from '../infra/typeorm/entities/Kekkei_genkai';
import IKekkeiRepository from '../repositories/IKekkeiRepository';

@injectable()
export default class ShowKekkeiService {
  constructor(
    @inject('KekkeiRepository')
    private kekkeiRepository: IKekkeiRepository,
  ) {}

  public async execute(kekkei_id: string): Promise<Kekkei_genkai> {
    const kekkei = await this.kekkeiRepository.findById(kekkei_id);
    if (!kekkei) {
      throw new AppError(
        `There's no kekkei genkai with the given id ${kekkei_id}`,
      );
    }
    return kekkei;
  }
}
