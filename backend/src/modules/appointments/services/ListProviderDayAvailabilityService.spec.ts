import AppError from '@shared/errors/AppError';
import { getHours, setHours } from 'date-fns';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list available hours in a day', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '123456',
      date: new Date(2020, 11, 1, 14, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 11, 1, 11).getTime();
    });

    const available = await listProviderDayAvailabilityService.execute({
      provider_id: '123123',
      day: 1,
      year: 2020,
      month: 12,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
      ]),
    );
  });
});
