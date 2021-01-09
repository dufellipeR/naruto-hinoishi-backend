import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateFriendshipDTO from '../dtos/ICreateFriendshipDTO';
import IFriendshipsRepository from '../repositories/IFriendshipsRepository';

@injectable()
export default class DeleteFriendshipService {
  constructor(
    @inject('FriendshipsRepository')
    private friendshipsRepository: IFriendshipsRepository,
  ) {}

  public async execute({
    user1_id,
    user2_id,
  }: ICreateFriendshipDTO): Promise<void> {
    const friendship = await this.friendshipsRepository.findFriendship({
      user1_id,
      user2_id,
    });

    if (friendship) {
      await this.friendshipsRepository.deleteFriendship(friendship);
    } else {
      throw new AppError("There's no friendship between this users");
    }
  }
}
