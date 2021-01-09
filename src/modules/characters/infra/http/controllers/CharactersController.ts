import CreateCharacterService from '@modules/characters/services/CreateCharacterService';
import ListCharactersService from '@modules/characters/services/ListCharactersService';
import ShowCharacterService from '@modules/characters/services/ShowCharacterService';
import UpdateCharacterService from '@modules/characters/services/UpdateCharacterService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharactersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      thumbnail,
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
      thumbnail,
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
      thumbnail,
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
      thumbnail,
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
}
