import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/user/services/CreateUserService';
import ListUsersService from '@modules/user/services/ListUsersService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.json(classToClass(user));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = container.resolve(ListUsersService);

    const users = await listUser.execute();

    return res.json(classToClass(users));
  }
}
