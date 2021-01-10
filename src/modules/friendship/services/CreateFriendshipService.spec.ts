import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import FakeFriendshipsRepository from '../repositories/fakes/FakeFriendshipsRepository';
import CreateFriendshipService from './CreateFriendshipService';

let fakeUsersRepository: FakeUsersRepository;
let fakeFriendshipsRepository: FakeFriendshipsRepository;
let createFriendship: CreateFriendshipService;

describe('Create Friendship ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFriendshipsRepository = new FakeFriendshipsRepository();
    createFriendship = new CreateFriendshipService(
      fakeFriendshipsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new friendship', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'dicey',
      email: 'dicey@gmail.com',
      password: 'some-password',
      tag: 'dice#4355',
      power: 0,
    });

    const user2 = await fakeUsersRepository.create({
      name: 'zero',
      email: 'zero@gmail.com',
      password: 'some-password',
      tag: 'zero#4355',
      power: 0,
    });

    const friendship = await createFriendship.execute({
      user1_id: user1.id,
      user_tag: 'zero#4355',
    });

    expect(friendship.user2_id).toEqual(user2.id);
  });
});
