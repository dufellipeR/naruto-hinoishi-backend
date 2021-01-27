import CreateKekkeiService from '@modules/kekkei/services/CreateKekkeiService';
import DeleteKekkeiService from '@modules/kekkei/services/DeleteKekkeiService';
import ListKekkeisService from '@modules/kekkei/services/ListKekkeisService';
import ShowKekkeiService from '@modules/kekkei/services/ShowKekkeiService';
import UpdateKekkeiService from '@modules/kekkei/services/UpdateKekkeiService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class KekkeiController {
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

    const createKekkei = container.resolve(CreateKekkeiService);

    const kekkei = await createKekkei.execute({
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

    return res.json(kekkei).status(200);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listKekkei = container.resolve(ListKekkeisService);

    const kekkeis = await listKekkei.execute();

    return res.json(kekkeis);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { kekkei_id } = req.params;

    const showKekkei = container.resolve(ShowKekkeiService);

    const kekkei = await showKekkei.execute(kekkei_id);

    return res.json(kekkei);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { kekkei_id } = req.params;
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

    const updateKekkei = container.resolve(UpdateKekkeiService);

    const kekkei = await updateKekkei.execute(kekkei_id, {
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

    return res.json(kekkei);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { kekkei_id } = req.params;

    const deleteKekkei = container.resolve(DeleteKekkeiService);

    const kekkeis = await deleteKekkei.execute(kekkei_id);

    return res.json(kekkeis).status(200);
  }
}
