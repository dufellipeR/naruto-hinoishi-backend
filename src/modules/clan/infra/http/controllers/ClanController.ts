import CreateClanService from '@modules/clan/services/CreateClanService';
import DeleteClanService from '@modules/clan/services/DeleteClanService';
import ListClanService from '@modules/clan/services/ListClanService';
import ShowClanService from '@modules/clan/services/ShowClanService';
import UpdateClanService from '@modules/clan/services/UpdateClanService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ClanController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
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
    } = req.body;

    const createClan = container.resolve(CreateClanService);

    const clan = await createClan.execute({
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
    });

    return res.json(clan).status(200);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listsClan = container.resolve(ListClanService);

    const clans = await listsClan.execute();

    return res.json(clans);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { clan_id } = req.params;

    const showClan = container.resolve(ShowClanService);

    const clan = await showClan.execute(clan_id);

    return res.json(clan);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { clan_id } = req.params;
    const {
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
    } = req.body;

    const updateClan = container.resolve(UpdateClanService);

    const clan = await updateClan.execute(clan_id, {
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
    });

    return res.json(clan);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { clan_id } = req.params;

    const deleteClan = container.resolve(DeleteClanService);

    const clans = await deleteClan.execute(clan_id);

    return res.json(clans).status(200);
  }
}
