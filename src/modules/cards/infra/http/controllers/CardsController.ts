import CreateCardService from '@modules/cards/services/CreateCardService';
import UpdatePowerService from '@modules/user/services/UpdatePowerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CardsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { character_id, user_id } = req.body;

    const createCard = container.resolve(CreateCardService);

    const card = await createCard.execute({ character_id, user_id });

    const updateUserPower = container.resolve(UpdatePowerService);

    await updateUserPower.execute({ user_id });

    return res.json(card);
  }

  // public async index(req: Request, res: Response): Promise<Response> {
  //   const listCharacters = container.resolve(ListCharactersService);

  //   const characters = await listCharacters.execute();

  //   return res.json(characters);
  // }
}
