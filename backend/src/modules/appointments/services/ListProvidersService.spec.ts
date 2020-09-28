import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'teste dois',
      email: 'testedois@teste.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'qwerty123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
