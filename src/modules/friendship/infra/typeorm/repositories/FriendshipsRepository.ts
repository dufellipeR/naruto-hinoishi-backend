import ICreateFriendshipDTO from '@modules/friendship/dtos/ICreateFriendshipDTO';
import Friendship from '@modules/friendship/infra/typeorm/entities/Friendship';
import IFriendshipsRepository from '@modules/friendship/repositories/IFriendshipsRepository';
import { getRepository, Repository } from 'typeorm';

class FriendshipsRepository implements IFriendshipsRepository {
  private ormRepository: Repository<Friendship>;

  constructor() {
    this.ormRepository = getRepository(Friendship);
  }

  public async create({
    user1_id,
    user2_id,
  }: ICreateFriendshipDTO): Promise<Friendship> {
    const friendship = this.ormRepository.create({
      user1_id,
      user2_id,
    });

    await this.ormRepository.save(friendship);

    return friendship;
  }

  public async findAllUserFriends(user1_id: string): Promise<Friendship[]> {
    const friends = await this.ormRepository.query(
      `SELECT friendship.id, users.power, users.name
      FROM friendship
      INNER JOIN users on friendship.user2_id=users.id
      WHERE friendship.user1_id='${user1_id}'
      ORDER BY users.power DESC`,
    );

    return friends;
  }

  public async findFriendship({
    user1_id,
    user2_id,
  }: ICreateFriendshipDTO): Promise<Friendship | undefined> {
    const friends = await this.ormRepository.findOne({
      where: { user1_id, user2_id },
    });

    return friends;
  }

  public async deleteFriendship(friendship: Friendship): Promise<void> {
    await this.ormRepository.delete(friendship);
  }
}

export default FriendshipsRepository;
