// import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Team from '../infra/typeorm/entities/Team';
import ITeamRepository from '../repositories/ITeamRepository';

@injectable()
export default class ShowTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(team_id: string): Promise<Team> {
    const team = await this.teamRepository.findById(team_id);
    if (!team) {
      throw new AppError(`There's no team with the given id ${team_id}`);
    }
    return team;
  }
}
