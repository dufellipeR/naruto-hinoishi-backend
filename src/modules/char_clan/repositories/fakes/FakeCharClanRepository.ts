import ICreateCharClanDTO from '@modules/char_clan/dtos/ICreateChar_clanDTO';
import Char_clan from '@modules/char_clan/infra/typeorm/entities/char_clan';
import { v4 as uuid } from 'uuid';
import ICharClanRepository from '../ICharClanRepository';

class FakeCharClanRepository implements ICharClanRepository {
  private char_clan: Char_clan[] = [];

  public async create({
    clan_id,
    character_id,
  }: ICreateCharClanDTO): Promise<Char_clan> {
    const charClan = new Char_clan();

    const createChar_clan = Object.assign(charClan, {
      id: uuid(),
      clan_id,
      character_id,
    });

    this.char_clan.push(createChar_clan);

    return createChar_clan;
  }

  public async findCharacterClans(character_id: string): Promise<Char_clan[]> {
    const charClans = this.char_clan.filter(
      charClan => charClan.character_id === character_id,
    );

    return charClans;
  }

  public async findById(char_clan_id: string): Promise<Char_clan | undefined> {
    const charClan = this.char_clan.find(
      charcln => charcln.id === char_clan_id,
    );

    return charClan;
  }

  public async delete(charAffiliation: Char_clan): Promise<Char_clan[]> {
    this.char_clan = this.char_clan.filter(
      char_clan => char_clan.id !== charAffiliation.id,
    );

    return this.char_clan;
  }
}

export default FakeCharClanRepository;
