import CreateRandomCardService from '@modules/cards/services/CreateRandomCardService';
import ListUserCardsService from '@modules/cards/services/ListUserCardsService';
import UpdatePowerService from '@modules/user/services/UpdatePowerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RandomCardsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { quantity } = req.body;

    const createRandomCards = container.resolve(CreateRandomCardService);
    const updateUserPower = container.resolve(UpdatePowerService);

    const cards = await createRandomCards.execute({ quantity, user_id });

    await updateUserPower.execute({ user_id });

    return res.json(cards);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { filter, name } = req.query;

    const listUserCards = container.resolve(ListUserCardsService);

    const cards = await listUserCards.execute(
      user_id,
      filter as string,
      name as string,
    );

    return res.json(cards);
  }
}
