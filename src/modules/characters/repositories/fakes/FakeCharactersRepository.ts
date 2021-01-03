import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import Character from '@modules/characters/infra/typeorm/entities/Characters';
import { v4 as uuid } from 'uuid';
import ICharactersRepository from '../ICharactersRepository';

class FakeCharactersRepository implements ICharactersRepository {
  private characters: Character[] = [];

  public async create({
    thumbnail,
    type,
    name,
    desc,
    power,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    endurance,
    willpower,
    overall,
  }: ICreateCharacterDTO): Promise<Character> {
    const character = new Character();

    Object.assign(character, {
      id: uuid(),
      thumbnail,
      type,
      name,
      desc,
      power,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      endurance,
      willpower,
      overall,
    });

    this.characters.push(character);

    return character;
  }

  public async findById(id: string): Promise<Character | undefined> {
    return this.characters.find(character => character.id === id);
  }

  public async findAll(): Promise<Character[]> {
    return this.characters;
  }
}

export default FakeCharactersRepository;
