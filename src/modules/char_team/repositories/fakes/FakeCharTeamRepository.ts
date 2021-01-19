import ICreateCharTeamDTO from '@modules/char_team/dtos/ICreateChar_teamDTO';
import Char_team from '@modules/char_team/infra/typeorm/entities/char_team';
import { v4 as uuid } from 'uuid';
import ICharTeamRepository from '../ICharTeamRepository';

class FakeCharTeamRepository implements ICharTeamRepository {
  private char_team: Char_team[] = [];

  public async create({
    team_id,
    character_id,
  }: ICreateCharTeamDTO): Promise<Char_team> {
    const charClan = new Char_team();

    const createChar_team = Object.assign(charClan, {
      id: uuid(),
      team_id,
      character_id,
    });

    this.char_team.push(createChar_team);

    return createChar_team;
  }

  public async findCharacterTeams(character_id: string): Promise<Char_team[]> {
    const charTeams = this.char_team.filter(
      charTeam => charTeam.character_id === character_id,
    );

    return charTeams;
  }

  public async findById(char_team_id: string): Promise<Char_team | undefined> {
    const charTeam = this.char_team.find(char => char.id === char_team_id);

    return charTeam;
  }

  public async delete(charAffiliation: Char_team): Promise<Char_team[]> {
    this.char_team = this.char_team.filter(
      char => char.id !== charAffiliation.id,
    );

    return this.char_team;
  }
}

export default FakeCharTeamRepository;
