import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'teste@teste.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to recover a non existing email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate user tokens', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'teste@teste.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
