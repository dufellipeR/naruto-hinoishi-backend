// import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Friendship from '../infra/typeorm/entities/Friendship';
import IFriendshipsRepository from '../repositories/IFriendshipsRepository';

@injectable()
export default class ListUserFriendsService {
  constructor(
    @inject('FriendshipsRepository')
    private friendshipsRepository: IFriendshipsRepository,
  ) {}

  public async execute(user_id: string): Promise<Friendship[]> {
    const friends = await this.friendshipsRepository.findAllUserFriends(
      user_id,
    );

    return friends;
  }
}
