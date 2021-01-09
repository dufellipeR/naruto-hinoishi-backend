import ICreateFriendshipDTO from '../dtos/ICreateFriendshipDTO';
import Friendship from '../infra/typeorm/entities/Friendship';

export default interface IFriendshipsRepository {
  create({ user1_id, user2_id }: ICreateFriendshipDTO): Promise<Friendship>;
  findAllUserFriends(user1_id: string): Promise<Friendship[]>;
  deleteFriendship(friendship: Friendship): Promise<void>;
  findFriendship({
    user1_id,
    user2_id,
  }: ICreateFriendshipDTO): Promise<Friendship | undefined>;
}
