// import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Clan from '../infra/typeorm/entities/Clan';
import IClanRepository from '../repositories/IClanRepository';

@injectable()
export default class ShowClanService {
  constructor(
    @inject('ClanRepository')
    private clanRepository: IClanRepository,
  ) {}

  public async execute(clan_id: string): Promise<Clan> {
    const clan = await this.clanRepository.findById(clan_id);
    if (!clan) {
      throw new AppError(`There's no clan with the given id ${clan_id}`);
    }
    return clan;
  }
}
