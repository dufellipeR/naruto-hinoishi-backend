import CreateFriendshipService from '@modules/friendship/services/CreateFriendshipService';
import DeleteFriendshipService from '@modules/friendship/services/DeleteFriendshipService';
import ListUserFriendsService from '@modules/friendship/services/ListUserFriendsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FriendshipController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user1_id = req.user.id;
    const { user_tag } = req.body;

    const createFriendship = container.resolve(CreateFriendshipService);

    await createFriendship.execute({
      user1_id,
      user_tag,
    });

    return res.json().status(200);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listUserFriends = container.resolve(ListUserFriendsService);

    const friendships = await listUserFriends.execute(user_id);

    return res.json(friendships);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { friend_id } = req.body;

    const deleteFriendship = container.resolve(DeleteFriendshipService);

    await deleteFriendship.execute({ user1_id: user_id, user2_id: friend_id });

    return res.json().status(204);
  }
}
