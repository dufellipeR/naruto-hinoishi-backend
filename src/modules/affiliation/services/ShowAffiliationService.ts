// import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Affiliation from '../infra/typeorm/entities/Affiliation';
import IAffiliationRepository from '../repositories/IAffiliationRepository';

@injectable()
export default class ShowAffiliationService {
  constructor(
    @inject('AffiliationRepository')
    private affiliationRepository: IAffiliationRepository,
  ) {}

  public async execute(aft_id: string): Promise<Affiliation> {
    const affiliation = await this.affiliationRepository.findById(aft_id);
    if (!affiliation) {
      throw new AppError(`There's no affiliation with the given id ${aft_id}`);
    }
    return affiliation;
  }
}
