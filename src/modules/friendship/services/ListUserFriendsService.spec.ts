import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import FakeFriendshipsRepository from '../repositories/fakes/FakeFriendshipsRepository';
import ListUserFriendsService from './ListUserFriendsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeFriendshipRepository: FakeFriendshipsRepository;
let listFriends: ListUserFriendsService;

describe('List User Friends', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFriendshipRepository = new FakeFriendshipsRepository();
    listFriends = new ListUserFriendsService(fakeFriendshipRepository);
  });

  it('should be able to list user friends', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'ex@ample.com.br',
      name: 'user1',
      password: '123123',
      tag: 'user#3302',
      power: 0,
    });

    const user2 = await fakeUsersRepository.create({
      email: 'ex@ample.com.br',
      name: 'user2',
      password: '123123',
      tag: 'user#3554',
      power: 0,
    });

    const user3 = await fakeUsersRepository.create({
      email: 'ex@ample.com.br',
      name: 'user2',
      password: '123123',
      tag: 'user#3554',
      power: 0,
    });

    await fakeFriendshipRepository.create({
      user1_id: user1.id,
      user2_id: user2.id,
    });

    await fakeFriendshipRepository.create({
      user1_id: user1.id,
      user2_id: user3.id,
    });

    const friends = await listFriends.execute(user1.id);

    expect(friends).toHaveLength(2);
  });
});
