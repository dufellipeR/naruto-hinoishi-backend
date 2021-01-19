import CreateTeamService from '@modules/team/services/CreateTeamService';
import DeleteTeamService from '@modules/team/services/DeleteTeamService';
import ListTeamService from '@modules/team/services/ListTeamService';
import ShowTeamService from '@modules/team/services/ShowTeamService';
import UpdateTeamService from '@modules/team/services/UpdateTeamService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TeamController {
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

    const createTeam = container.resolve(CreateTeamService);

    const team = await createTeam.execute({
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

    return res.json(team).status(200);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listTeams = container.resolve(ListTeamService);

    const teams = await listTeams.execute();

    return res.json(teams);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { team_id } = req.params;

    const showTeam = container.resolve(ShowTeamService);

    const team = await showTeam.execute(team_id);

    return res.json(team);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { team_id } = req.params;
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

    const updateTeam = container.resolve(UpdateTeamService);

    const team = await updateTeam.execute(team_id, {
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

    return res.json(team);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { team_id } = req.params;

    const deleteTeam = container.resolve(DeleteTeamService);

    const teams = await deleteTeam.execute(team_id);

    return res.json(teams).status(200);
  }
}
