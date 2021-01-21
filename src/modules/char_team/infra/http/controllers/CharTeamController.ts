import CreateBunchCharTeamService from '@modules/char_team/services/CreateBunchCharTeamService';
import CreateCharTeamService from '@modules/char_team/services/CreateCharTeamService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharTeamController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { team_id, character_id } = req.body;

    const createCharTeam = container.resolve(CreateCharTeamService);

    const charClan = await createCharTeam.execute({
      team_id,
      character_id,
    });

    return res.json(charClan).status(200);
  }

  public async createBunch(req: Request, res: Response): Promise<Response> {
    const { items, character_id } = req.body;

    const createBunchCharTeam = container.resolve(CreateBunchCharTeamService);

    const charTeams = await createBunchCharTeam.execute({
      items,
      character_id,
    });

    return res.json(charTeams).status(200);
  }
}
