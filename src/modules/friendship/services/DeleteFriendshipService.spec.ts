import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeFriendshipsRepository from '../repositories/fakes/FakeFriendshipsRepository';
import DeleteFriendshipService from './DeleteFriendshipService';

let fakeUsersRepository: FakeUsersRepository;
let fakeFriendshipsRepository: FakeFriendshipsRepository;
let deleteFriend: DeleteFriendshipService;

describe('Create Friendship ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFriendshipsRepository = new FakeFriendshipsRepository();
    deleteFriend = new DeleteFriendshipService(fakeFriendshipsRepository);
  });

  it('should be able to delete a friend', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'dicey',
      email: 'dicey@gmail.com',
      password: 'some-password',
      tag: 'dice#4355',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'zero',
      email: 'zero@gmail.com',
      password: 'some-password',
      tag: 'zero#4355',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'three',
      email: 'three@gmail.com',
      password: 'some-password',
      tag: 'thre#4321',
    });

    await fakeFriendshipsRepository.create({
      user1_id: user1.id,
      user2_id: user2.id,
    });

    await fakeFriendshipsRepository.create({
      user1_id: user1.id,
      user2_id: user3.id,
    });

    await deleteFriend.execute({ user1_id: user1.id, user2_id: user2.id });

    const friendships = await fakeFriendshipsRepository.findAllUserFriends(
      user1.id,
    );

    expect(friendships).toHaveLength(1);
  });

  it('should not be able to delete a non friend', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'dicey',
      email: 'dicey@gmail.com',
      password: 'some-password',
      tag: 'dice#4355',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'zero',
      email: 'zero@gmail.com',
      password: 'some-password',
      tag: 'zero#4355',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'three',
      email: 'three@gmail.com',
      password: 'some-password',
      tag: 'thre#4321',
    });

    await fakeFriendshipsRepository.create({
      user1_id: user1.id,
      user2_id: user2.id,
    });

    await fakeFriendshipsRepository.create({
      user1_id: user1.id,
      user2_id: user3.id,
    });

    await expect(
      deleteFriend.execute({ user1_id: user1.id, user2_id: 'user2.id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
