/* eslint-disable no-useless-return */
import { injectable, inject } from 'tsyringe';
import csvParse from 'csv-parse';
import fs from 'fs';
import overallCalc from '@shared/utils/overallCalc';
import ICharactersRepository from '../repositories/ICharactersRepository';
import IStatsRepository from '../repositories/IStatsRepository';

export interface IImportedCharacter {
  render: string;
  desc: string;
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
  power: number;
}

@injectable()
class ImportCharactersService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,

    @inject('StatsRepository')
    private statsRepository: IStatsRepository,
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
        render,
        desc,
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
        !render ||
        !desc ||
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
        render,
        desc,
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
      const stat = await this.statsRepository.create({
        strength: character.strength,
        intelligence: character.intelligence,
        speed: character.speed,
        taijutsu: character.taijutsu,
        ninjutsu: character.ninjutsu,
        genjutsu: character.genjutsu,
        stamina: character.stamina,
        willpower: character.willpower,
        power: character.power,
      });
      await this.charactersRepository.create({
        name: character.name,
        type: character.type,
        desc: character.desc,
        render: character.render,
        stat_id: stat.id,
      });
    });

    await fs.promises.unlink(filePath);
    return characters;
  }
}

export default ImportCharactersService;
