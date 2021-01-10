import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import ListUsersService from '@modules/user/services/ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('List Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list users ', async () => {
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

    const users = await listUsers.execute();

    expect(users).toHaveLength(2);
  });
});
