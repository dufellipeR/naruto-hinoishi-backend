// import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Affiliation from '../infra/typeorm/entities/Affiliation';
import IAffiliationRepository from '../repositories/IAffiliationRepository';

@injectable()
export default class ListAffiliationService {
  constructor(
    @inject('AffiliationRepository')
    private affiliationRepository: IAffiliationRepository,
  ) {}

  public async execute(): Promise<Affiliation[]> {
    const affiliations = await this.affiliationRepository.findAll();

    return affiliations;
  }
}
