import CreateRandomCardService from '@modules/cards/services/CreateRandomCardService';
import ListUserCardsService from '@modules/cards/services/ListUserCardsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RandomCardsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { quantity } = req.body;

    const createRandomCards = container.resolve(CreateRandomCardService);

    const cards = await createRandomCards.execute({ quantity, user_id });

    return res.json(cards);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listUserCards = container.resolve(ListUserCardsService);

    const cards = await listUserCards.execute(user_id);

    return res.json(cards);
  }
}
