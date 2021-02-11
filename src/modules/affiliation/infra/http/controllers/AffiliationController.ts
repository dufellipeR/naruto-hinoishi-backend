import CreateAffiliationService from '@modules/affiliation/services/CreateAffiliationService';
import DeleteAffiliationService from '@modules/affiliation/services/DeleteAffiliationService';
import ImportAffiliationsService from '@modules/affiliation/services/ImportAffiliationsService';
import ListAffiliationService from '@modules/affiliation/services/ListAffiliationServices';
import ShowAffiliationService from '@modules/affiliation/services/ShowAffiliationService';
import UpdateAffiliationService from '@modules/affiliation/services/UpdateAffiliationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AffiliationController {
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
      pcolor,
      scolor,
    } = req.body;

    const createAffiliation = container.resolve(CreateAffiliationService);

    const kekkei = await createAffiliation.execute({
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
      pcolor,
      scolor,
    });

    return res.json(kekkei).status(200);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listAffiliation = container.resolve(ListAffiliationService);

    const affiliations = await listAffiliation.execute();

    return res.json(affiliations);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { affiliation_id } = req.params;

    const showAffiliation = container.resolve(ShowAffiliationService);

    const affiliation = await showAffiliation.execute(affiliation_id);

    return res.json(affiliation);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { affiliation_id } = req.params;
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
      pcolor,
      scolor,
    } = req.body;

    const updateAffiliation = container.resolve(UpdateAffiliationService);

    const affiliation = await updateAffiliation.execute(affiliation_id, {
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
      pcolor,
      scolor,
    });

    return res.json(affiliation);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { affiliation_id } = req.params;

    const deleteAffiliation = container.resolve(DeleteAffiliationService);

    const affiliations = await deleteAffiliation.execute(affiliation_id);

    return res.json(affiliations).status(200);
  }

  public async import(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    const importAffiliation = container.resolve(ImportAffiliationsService);

    const afts = await importAffiliation.execute(file.path);

    return res.json(afts).status(200);
  }
}
