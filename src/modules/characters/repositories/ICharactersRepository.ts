import ICreateCharacterDTO from '../dtos/ICreateCharacterDTO';
import IUpdateCharacterDTO from '../dtos/IUpdateCharacterDTO';
import Character from '../infra/typeorm/entities/Characters';

export default interface ICharactersRepository {
  create(data: ICreateCharacterDTO): Promise<Character>;
  findById(id: string): Promise<Character | undefined>;
  findAll(): Promise<Character[]>;
  update(data: IUpdateCharacterDTO): Promise<Character | undefined>;
}
