import { injectable, inject } from 'tsyringe';
import Char_team from '../infra/typeorm/entities/char_team';
import ICharTeamRepository from '../repositories/ICharTeamRepository';

interface IObjectRequest {
  value: string;
  label: string;
}

interface IRequestDTO {
  items: IObjectRequest[];
  character_id: string;
}

@injectable()
class CreateBunchCharTeamService {
  constructor(
    @inject('CharTeamRepository')
    private charTeamRepository: ICharTeamRepository,
  ) {}

  public async execute({
    items,
    character_id,
  }: IRequestDTO): Promise<Char_team[]> {
    const teams = this.charTeamRepository.createBunch({
      items,
      character_id,
    });
    return teams;
  }
}

export default CreateBunchCharTeamService;
