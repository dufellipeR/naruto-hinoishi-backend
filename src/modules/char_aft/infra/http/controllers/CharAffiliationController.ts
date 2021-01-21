import CreateBunchCharAffiliationService from '@modules/char_aft/services/CreateBunchCharAffiliationService';
import CreateCharAffiliationService from '@modules/char_aft/services/CreateCharAffiliationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharAffiliationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { affiliation_id, character_id } = req.body;

    const createCharAffiliation = container.resolve(
      CreateCharAffiliationService,
    );

    const charAffiliation = await createCharAffiliation.execute({
      affiliation_id,
      character_id,
    });

    return res.json(charAffiliation).status(200);
  }

  public async createBunch(req: Request, res: Response): Promise<Response> {
    const { items, character_id } = req.body;

    const createBunchCharAft = container.resolve(
      CreateBunchCharAffiliationService,
    );

    const CharAfts = await createBunchCharAft.execute({
      items,
      character_id,
    });

    return res.json(CharAfts).status(200);
  }
}
