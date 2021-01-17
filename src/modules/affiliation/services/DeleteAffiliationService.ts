import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAffiliationRepository from '../repositories/IAffiliationRepository';

@injectable()
export default class DeleteAffiliationService {
  constructor(
    @inject('AffiliationRepository')
    private affiliationRepository: IAffiliationRepository,
  ) {}

  public async execute(affiliation_id: string): Promise<void> {
    const affiliation = await this.affiliationRepository.findById(
      affiliation_id,
    );
    if (!affiliation) {
      throw new AppError(
        `There's no affiliation with the given id: ${affiliation_id}`,
      );
    }
    await this.affiliationRepository.delete(affiliation);
  }
}
