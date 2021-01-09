import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import IFriendshipsRepository from '../repositories/IFriendshipsRepository';
import Friendship from '../infra/typeorm/entities/Friendship';

interface IRequestDTO {
  user1_id: string;
  user_tag: string;
}

@injectable()
class CreateFriendshipService {
  constructor(
    @inject('FriendshipsRepository')
    private friendshipsRepository: IFriendshipsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user1_id,
    user_tag,
  }: IRequestDTO): Promise<Friendship> {
    let friendship: Friendship = new Friendship();
    const user = await this.usersRepository.findByTag(user_tag);

    if (user) {
      friendship = await this.friendshipsRepository.create({
        user1_id,
        user2_id: user.id,
      });
    }

    return friendship;
  }
}

export default CreateFriendshipService;
