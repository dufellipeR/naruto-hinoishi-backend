/* eslint-disable no-useless-return */
import { injectable, inject } from 'tsyringe';
import csvParse from 'csv-parse';
import fs from 'fs';
import overallCalc from '@shared/utils/overallCalc';
import ICharactersRepository from '../repositories/ICharactersRepository';

export interface IImportedCharacter {
  type: string;
  name: string;
  strength: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  stamina: number;
  willpower: number;
  power?: number;
}

@injectable()
class ImportCharactersService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute(filePath: string): Promise<IImportedCharacter[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const characters: IImportedCharacter[] = [];

    parseCSV.on('data', async line => {
      const [
        type,
        name,
        strength,
        intelligence,
        speed,
        taijutsu,
        ninjutsu,
        genjutsu,
        stamina,
        willpower,
      ] = line;

      if (
        !type ||
        !name ||
        !strength ||
        !intelligence ||
        !speed ||
        !taijutsu ||
        !ninjutsu ||
        !genjutsu ||
        !stamina ||
        !willpower
      ) {
        return;
      }

      characters.push({
        type,
        name,
        strength,
        intelligence,
        speed,
        taijutsu,
        ninjutsu,
        genjutsu,
        stamina,
        willpower,
        power: overallCalc({
          strength: Number(strength),
          intelligence: Number(intelligence),
          speed: Number(speed),
          taijutsu: Number(taijutsu),
          ninjutsu: Number(ninjutsu),
          genjutsu: Number(genjutsu),
          stamina: Number(stamina),
          willpower: Number(willpower),
        }),
      });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    characters.map(async character => {
      await this.charactersRepository.create({
        ...character,
      });
    });

    await fs.promises.unlink(filePath);
    return characters;
  }
}

export default ImportCharactersService;
