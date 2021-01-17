import ICreateCharAftDTO from '../dtos/ICreateChar_aftDTO';
import Char_aft from '../infra/typeorm/entities/char_aft';

export default interface ICharAffiliationRepository {
  create(data: ICreateCharAftDTO): Promise<Char_aft>;
  delete(charAffiliation: Char_aft): Promise<Char_aft[]>;
  findCharacterAffiliations(character_id: string): Promise<Char_aft[]>;
  findById(char_aft_id: string): Promise<Char_aft | undefined>;
}
