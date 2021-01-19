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
}
