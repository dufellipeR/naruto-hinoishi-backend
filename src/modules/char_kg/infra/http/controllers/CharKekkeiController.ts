import CreateCharKekkeiService from '@modules/char_kg/services/CreateCharKekkeiService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharKekkeiController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { kekkei_id, character_id } = req.body;

    const createCharkekkei = container.resolve(CreateCharKekkeiService);

    const Charkekkei = await createCharkekkei.execute({
      kekkei_id,
      character_id,
    });

    return res.json(Charkekkei).status(200);
  }
}
