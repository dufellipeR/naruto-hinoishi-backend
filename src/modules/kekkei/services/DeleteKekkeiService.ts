import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IKekkeiRepository from '../repositories/IKekkeiRepository';

@injectable()
export default class DeleteKekkeiService {
  constructor(
    @inject('KekkeiRepository')
    private kekkeiRepository: IKekkeiRepository,
  ) {}

  public async execute(kekkei_id: string): Promise<void> {
    const kekkei = await this.kekkeiRepository.findById(kekkei_id);
    if (!kekkei) {
      throw new AppError(
        `There's no kekkei genkai with the given id: ${kekkei_id}`,
      );
    }
    await this.kekkeiRepository.delete(kekkei);
  }
}
