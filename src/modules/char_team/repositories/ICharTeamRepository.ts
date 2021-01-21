import ICreateBunchCharTeamDTO from '../dtos/ICreateBunchChar_teamDTO';
import ICreateCharTeamDTO from '../dtos/ICreateChar_teamDTO';
import Char_team from '../infra/typeorm/entities/char_team';

export default interface ICharTeamRepository {
  create(data: ICreateCharTeamDTO): Promise<Char_team>;
  createBunch(data: ICreateBunchCharTeamDTO): Promise<Char_team[]>;
  delete(charClan: Char_team): Promise<Char_team[]>;
  findCharacterTeams(character_id: string): Promise<Char_team[]>;
  findById(char_team_id: string): Promise<Char_team | undefined>;
}
