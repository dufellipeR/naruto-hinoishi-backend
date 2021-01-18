import CreateCharClanService from '@modules/char_clan/services/CreateCharClanService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharClanController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { clan_id, character_id } = req.body;

    const createCharClan = container.resolve(CreateCharClanService);

    const charClan = await createCharClan.execute({
      clan_id,
      character_id,
    });

    return res.json(charClan).status(200);
  }
}
