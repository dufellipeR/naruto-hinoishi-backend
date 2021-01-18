import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IClanRepository from '../repositories/IClanRepository';

@injectable()
export default class DeleteClanService {
  constructor(
    @inject('ClanRepository')
    private clanRepository: IClanRepository,
  ) {}

  public async execute(clan_id: string): Promise<void> {
    const clan = await this.clanRepository.findById(clan_id);
    if (!clan) {
      throw new AppError(`There's no clan with the given id: ${clan_id}`);
    }
    await this.clanRepository.delete(clan);
  }
}
