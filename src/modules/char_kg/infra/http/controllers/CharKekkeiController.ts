import CreateBunchCharKekkeiService from '@modules/char_kg/services/CreateBunchCharKekkeiService';
import CreateCharKekkeiService from '@modules/char_kg/services/CreateCharKekkeiService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharKekkeiController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { kekkei_id, character_id } = req.body;

    const createCharkekkei = container.resolve(CreateCharKekkeiService);

    const charkekkei = await createCharkekkei.execute({
      kekkei_id,
      character_id,
    });

    return res.json(charkekkei).status(200);
  }

  public async createBunch(req: Request, res: Response): Promise<Response> {
    const { items, character_id } = req.body;

    const createBunchCharkekkei = container.resolve(
      CreateBunchCharKekkeiService,
    );

    const charkekkeis = await createBunchCharkekkei.execute({
      items,
      character_id,
    });

    return res.json(charkekkeis).status(200);
  }
}
