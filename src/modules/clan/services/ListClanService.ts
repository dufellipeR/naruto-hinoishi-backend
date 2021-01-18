// import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Clan from '../infra/typeorm/entities/Clan';
import IClanRepository from '../repositories/IClanRepository';

@injectable()
export default class ListClanService {
  constructor(
    @inject('ClanRepository')
    private clanRepository: IClanRepository,
  ) {}

  public async execute(): Promise<Clan[]> {
    const clans = await this.clanRepository.findAll();

    return clans;
  }
}
