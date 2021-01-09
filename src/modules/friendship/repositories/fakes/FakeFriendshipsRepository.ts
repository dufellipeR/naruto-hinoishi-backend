import ICreateFriendshipDTO from '@modules/friendship/dtos/ICreateFriendshipDTO';
import Friendship from '@modules/friendship/infra/typeorm/entities/Friendship';
import { v4 as uuid } from 'uuid';
import IFriendshipsRepository from '../IFriendshipsRepository';

class FakeFriendshipsRepository implements IFriendshipsRepository {
  private friendships: Friendship[] = [];

  public async create({
    user1_id,
    user2_id,
  }: ICreateFriendshipDTO): Promise<Friendship> {
    const friendship = new Friendship();

    Object.assign(friendship, {
      id: uuid(),
      user1_id,
      user2_id,
    });

    this.friendships.push(friendship);

    return friendship;
  }

  public async findAllUserFriends(user1_id: string): Promise<Friendship[]> {
    let friends: Friendship[] = [];

    friends = this.friendships.filter(friend => friend.user1_id === user1_id);

    return friends;
  }

  public async findFriendship({
    user1_id,
    user2_id,
  }: ICreateFriendshipDTO): Promise<Friendship | undefined> {
    const friendship = this.friendships.find(
      friend => friend.user1_id === user1_id && friend.user2_id === user2_id,
    );

    return friendship;
  }

  public async deleteFriendship(friendship: Friendship): Promise<void> {
    const friends: Friendship[] = this.friendships.filter(
      friend => friend.id !== friendship.id,
    );

    this.friendships = friends;
  }
}

export default FakeFriendshipsRepository;
