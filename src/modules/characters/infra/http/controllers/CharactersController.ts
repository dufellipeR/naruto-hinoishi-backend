import CreateCharacterService from '@modules/characters/services/CreateCharacterService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharactersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
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
    } = req.body;

    const createCharacter = container.resolve(CreateCharacterService);

    const character = await createCharacter.execute({
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
    });

    return res.json(character);
  }
}
