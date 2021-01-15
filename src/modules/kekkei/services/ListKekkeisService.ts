// import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Kekkei_genkai from '../infra/typeorm/entities/Kekkei_genkai';
import IKekkeiRepository from '../repositories/IKekkeiRepository';

@injectable()
export default class ListKekkeisService {
  constructor(
    @inject('KekkeiRepository')
    private kekkeiRepository: IKekkeiRepository,
  ) {}

  public async execute(): Promise<Kekkei_genkai[]> {
    const kekkeis = await this.kekkeiRepository.findAll();

    return kekkeis;
  }
}
