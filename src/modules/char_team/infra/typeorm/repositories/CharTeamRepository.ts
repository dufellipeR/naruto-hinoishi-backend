import ICreateCharTeamDTO from '@modules/char_team/dtos/ICreateChar_teamDTO';
import ICharTeamRepository from '@modules/char_team/repositories/ICharTeamRepository';
import { getRepository, Repository } from 'typeorm';
import Char_team from '../entities/char_team';

class CharTeamRepository implements ICharTeamRepository {
  private ormRepository: Repository<Char_team>;

  constructor() {
    this.ormRepository = getRepository(Char_team);
  }

  public async create({
    team_id,
    character_id,
  }: ICreateCharTeamDTO): Promise<Char_team> {
    const createChar_team = this.ormRepository.create({
      team_id,
      character_id,
    });

    await this.ormRepository.save(createChar_team);

    return createChar_team;
  }

  public async findCharacterTeams(character_id: string): Promise<Char_team[]> {
    const charTeams = this.ormRepository.find({
      where: {
        character_id,
      },
    });

    return charTeams;
  }

  public async findById(char_team_id: string): Promise<Char_team | undefined> {
    const charTeam = await this.ormRepository.findOne(char_team_id);

    return charTeam;
  }

  public async delete(charTeam: Char_team): Promise<Char_team[]> {
    await this.ormRepository.remove(charTeam);

    const charTeams = await this.ormRepository.find();

    return charTeams;
  }
}

export default CharTeamRepository;
