import ICreateBunchCharAftDTO from '@modules/char_aft/dtos/ICreateBunchChar_aftDTO';
import ICreateCharAftDTO from '@modules/char_aft/dtos/ICreateChar_aftDTO';
import Char_aft from '@modules/char_aft/infra/typeorm/entities/char_aft';
import { v4 as uuid } from 'uuid';
import ICharAffiliationRepository from '../ICharAffiliationRepository';

class FakeCharAffiliationRepository implements ICharAffiliationRepository {
  private char_aft: Char_aft[] = [];

  public async create({
    affiliation_id,
    character_id,
  }: ICreateCharAftDTO): Promise<Char_aft> {
    const charAffiliation = new Char_aft();

    const createChar_aft = Object.assign(charAffiliation, {
      id: uuid(),
      affiliation_id,
      character_id,
    });

    this.char_aft.push(createChar_aft);

    return createChar_aft;
  }

  public async createBunch({
    items,
    character_id,
  }: ICreateBunchCharAftDTO): Promise<Char_aft[]> {
    const afts: Char_aft[] = [];
    items.forEach(item => {
      const charAft = new Char_aft();

      const createChar_aft = Object.assign(charAft, {
        id: uuid(),
        kekkei_id: item.value,
        character_id,
      });

      afts.push(createChar_aft);

      this.char_aft.push(createChar_aft);
    });

    return afts;
  }

  public async findCharacterAffiliations(
    character_id: string,
  ): Promise<Char_aft[]> {
    const charAffiliations = this.char_aft.filter(
      charAffiliation => charAffiliation.character_id === character_id,
    );

    return charAffiliations;
  }

  public async findById(Char_aft_id: string): Promise<Char_aft | undefined> {
    const charAft = this.char_aft.find(
      charAffiliation => charAffiliation.id === Char_aft_id,
    );

    return charAft;
  }

  public async delete(charAffiliation: Char_aft): Promise<Char_aft[]> {
    this.char_aft = this.char_aft.filter(
      char_aft => char_aft.id !== charAffiliation.id,
    );

    return this.char_aft;
  }
}

export default FakeCharAffiliationRepository;
