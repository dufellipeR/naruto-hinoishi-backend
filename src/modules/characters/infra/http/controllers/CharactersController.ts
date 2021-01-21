import CreateCharacterService from '@modules/characters/services/CreateCharacterService';
import DeleteCharacterService from '@modules/characters/services/DeleteCharacterService';
import ImportCharactersService from '@modules/characters/services/ImportCharactersService';
import ListCharactersService from '@modules/characters/services/ListCharactersService';
import ShowCharacterService from '@modules/characters/services/ShowCharacterService';
import UpdateCharacterService from '@modules/characters/services/UpdateCharacterService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharactersController {
  public async import(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const importCharacters = container.resolve(ImportCharactersService);

    const characters = await importCharacters.execute(file.path);

    return res.json(characters);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      render,
      type,
      name,
      desc,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    } = req.body;

    const createCharacter = container.resolve(CreateCharacterService);

    const character = await createCharacter.execute({
      render,
      type,
      name,
      desc,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    return res.json(character);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listCharacters = container.resolve(ListCharactersService);

    const characters = await listCharacters.execute();

    return res.json(characters);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCharacter = container.resolve(ShowCharacterService);

    const character = await showCharacter.execute(id);

    return res.json(character);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      render,
      type,
      name,
      desc,
      stat_id,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    } = req.body;

    const updateCharacter = container.resolve(UpdateCharacterService);

    const character = await updateCharacter.execute({
      id,
      render,
      type,
      name,
      desc,
      stat_id,
      strength,
      intelligence,
      speed,
      taijutsu,
      ninjutsu,
      genjutsu,
      stamina,
      willpower,
    });

    return res.json(character);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCharacter = container.resolve(DeleteCharacterService);

    const characters = await deleteCharacter.execute(id);

    return res.json(characters);
  }
}
