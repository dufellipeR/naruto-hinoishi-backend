import ICreateBunchCharkgDTO from '@modules/char_kg/dtos/ICreateBunchChar_kgDTO';
import ICreateCharKgDTO from '@modules/char_kg/dtos/ICreateChar_kgDTO';
import Char_kg from '@modules/char_kg/infra/typeorm/entities/char_kg';
import { v4 as uuid } from 'uuid';
import ICharKekkeiRepository from '../ICharKekkeiRepository';

class FakeCharKekkeiRepository implements ICharKekkeiRepository {
  private char_kg: Char_kg[] = [];

  public async create({
    kekkei_id,
    character_id,
  }: ICreateCharKgDTO): Promise<Char_kg> {
    const Charkekkei = new Char_kg();

    const createChar_kg = Object.assign(Charkekkei, {
      id: uuid(),
      kekkei_id,
      character_id,
    });

    this.char_kg.push(createChar_kg);

    return createChar_kg;
  }

  public async createBunch({
    items,
    character_id,
  }: ICreateBunchCharkgDTO): Promise<Char_kg[]> {
    const kekkeis: Char_kg[] = [];
    items.forEach(item => {
      const Charkekkei = new Char_kg();

      const createChar_kg = Object.assign(Charkekkei, {
        id: uuid(),
        kekkei_id: item.value,
        character_id,
      });

      kekkeis.push(createChar_kg);

      this.char_kg.push(createChar_kg);
    });

    return kekkeis;
  }

  public async findCharacterKekkeis(character_id: string): Promise<Char_kg[]> {
    const charkekkeis = this.char_kg.filter(
      charKekkei => charKekkei.character_id === character_id,
    );

    return charkekkeis;
  }

  public async findById(char_kg_id: string): Promise<Char_kg | undefined> {
    const charkekkei = this.char_kg.find(
      charKekkei => charKekkei.id === char_kg_id,
    );

    return charkekkei;
  }

  public async delete(charKekkei: Char_kg): Promise<void> {
    this.char_kg = this.char_kg.filter(char_kg => char_kg.id !== charKekkei.id);
  }
}

export default FakeCharKekkeiRepository;
