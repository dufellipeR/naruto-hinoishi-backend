import { injectable, inject } from 'tsyringe';
import Char_team from '../infra/typeorm/entities/char_team';
import ICharTeamRepository from '../repositories/ICharTeamRepository';

interface IRequestDTO {
  team_id: string;
  character_id: string;
}

@injectable()
class CreateCharTeamService {
  constructor(
    @inject('CharTeamRepository')
    private charTeamRepository: ICharTeamRepository,
  ) {}

  public async execute({
    team_id,
    character_id,
  }: IRequestDTO): Promise<Char_team> {
    const team = this.charTeamRepository.create({
      team_id,
      character_id,
    });
    return team;
  }
}

export default CreateCharTeamService;
