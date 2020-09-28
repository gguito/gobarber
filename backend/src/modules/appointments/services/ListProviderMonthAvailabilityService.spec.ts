import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list available days in a month', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 2, 8, 0, 0),
    });

    const available = await listProviderMonthAvailabilityService.execute({
      provider_id: '123123',
      year: 2020,
      month: 12,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: true },
      ]),
    );
  });
});
