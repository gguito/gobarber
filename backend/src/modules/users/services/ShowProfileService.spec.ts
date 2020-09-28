import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const userProfile = await showProfile.execute({
      user_id: user.id,
    });

    expect(userProfile.name).toBe('teste');
    expect(userProfile.email).toBe('teste@teste.com');
  });

  it('should not be able to show profile from non existing user', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      showProfile.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
