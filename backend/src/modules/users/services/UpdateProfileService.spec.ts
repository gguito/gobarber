import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste dois',
      email: 'testedois@teste.com',
    });

    expect(updatedUser.name).toBe('teste dois');
  });

  it('should not be able to update profile from non existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: '123456',
        name: 'teste dois',
        email: 'testedois@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change another user profile', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste dois',
      email: 'testedois@teste.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste dois',
        email: 'testedois@teste.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste dois',
        email: 'testedois@teste.com',
        old_password: 'wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
