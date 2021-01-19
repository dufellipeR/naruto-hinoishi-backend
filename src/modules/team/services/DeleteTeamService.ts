import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ITeamRepository from '../repositories/ITeamRepository';

@injectable()
export default class DeleteTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(team_id: string): Promise<void> {
    const team = await this.teamRepository.findById(team_id);
    if (!team) {
      throw new AppError(`There's no team with the given id: ${team_id}`);
    }
    await this.teamRepository.delete(team);
  }
}
