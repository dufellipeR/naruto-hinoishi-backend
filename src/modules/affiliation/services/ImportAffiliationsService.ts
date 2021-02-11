/* eslint-disable no-useless-return */
import { injectable, inject } from 'tsyringe';
import csvParse from 'csv-parse';
import fs from 'fs';
import IAffiliationRepository from '../repositories/IAffiliationRepository';

export interface IImportedAffiliation {
  name: string;
  icon: string;
  strength: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  stamina: number;
  willpower: number;
  pcolor: string;
  scolor: string;
}

@injectable()
class ImportAffiliationsService {
  constructor(
    @inject('AffiliationRepository')
    private affiliationRepository: IAffiliationRepository,
  ) {}

  public async execute(filePath: string): Promise<IImportedAffiliation[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const affiliations: IImportedAffiliation[] = [];

    parseCSV.on('data', async line => {
      const [
        name,
        icon,
        strength,
        intelligence,
        speed,
        taijutsu,
        ninjutsu,
        genjutsu,
        stamina,
        willpower,
        pcolor,
        scolor,
      ] = line;

      // if (
      //   !name ||
      //   !strength ||
      //   !icon ||
      //   !intelligence ||
      //   !speed ||
      //   !taijutsu ||
      //   !ninjutsu ||
      //   !genjutsu ||
      //   !stamina ||
      //   !willpower ||
      //   !pcolor ||
      //   !scolor
      // ) {
      //   return;
      // }

      affiliations.push({
        name,
        icon,
        strength,
        intelligence,
        speed,
        taijutsu,
        ninjutsu,
        genjutsu,
        stamina,
        willpower,
        pcolor,
        scolor,
      });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    console.log(affiliations);

    affiliations.map(async affiliation => {
      await this.affiliationRepository.create({
        name: affiliation.name,
        icon: affiliation.icon,
        strength: affiliation.strength,
        intelligence: affiliation.intelligence,
        speed: affiliation.speed,
        taijutsu: affiliation.taijutsu,
        ninjutsu: affiliation.ninjutsu,
        genjutsu: affiliation.genjutsu,
        stamina: affiliation.stamina,
        willpower: affiliation.willpower,
        pcolor: affiliation.pcolor,
        scolor: affiliation.scolor,
      });
    });

    await fs.promises.unlink(filePath);
    return affiliations;
  }
}

export default ImportAffiliationsService;
