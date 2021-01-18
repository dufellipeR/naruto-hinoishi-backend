import ICreateCharClanDTO from '../dtos/ICreateChar_clanDTO';
import Char_clan from '../infra/typeorm/entities/char_clan';

export default interface ICharClanRepository {
  create(data: ICreateCharClanDTO): Promise<Char_clan>;
  delete(charClan: Char_clan): Promise<Char_clan[]>;
  findCharacterClans(character_id: string): Promise<Char_clan[]>;
  findById(char_clan_id: string): Promise<Char_clan | undefined>;
}
