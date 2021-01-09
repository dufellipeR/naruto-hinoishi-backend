import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import IUpdateCharacterDTO from '@modules/characters/dtos/IUpdateCharacterDTO';
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
    strength,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    stamina,
    willpower,
    power,
  }: ICreateCharacterDTO): Promise<Character> {
    const character = new Character();

    Object.assign(character, {
      id: uuid(),
      thumbnail,
      type,
      name,
      desc,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
      power,
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

  public async update({
    id,
    thumbnail,
    type,
    name,
    desc,
    strength,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    stamina,
    willpower,
    power,
  }: IUpdateCharacterDTO): Promise<Character> {
    this.characters = this.characters.filter(char => char.id !== id);

    const character = new Character();

    Object.assign(character, {
      id,
      thumbnail,
      type,
      name,
      desc,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
      power,
    });

    this.characters.push(character);

    return character;
  }
}

export default FakeCharactersRepository;
