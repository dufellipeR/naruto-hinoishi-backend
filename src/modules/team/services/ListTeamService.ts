// import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Team from '../infra/typeorm/entities/Team';
import ITeamRepository from '../repositories/ITeamRepository';

@injectable()
export default class ListTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(): Promise<Team[]> {
    const teams = await this.teamRepository.findAll();

    return teams;
  }
}
