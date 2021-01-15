import ICreateCharKgDTO from '../dtos/ICreateChar_kgDTO';
import Char_kg from '../infra/typeorm/entities/char_kg';

export default interface ICharKekkeiRepository {
  create(data: ICreateCharKgDTO): Promise<Char_kg>;
  delete(charKekkei: Char_kg): Promise<void>;
  findCharacterKekkeis(character_id: string): Promise<Char_kg[]>;
  findById(char_kg_id: string): Promise<Char_kg | undefined>;
}
